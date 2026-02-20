"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Upload, LogOut, Plus, Pencil, ChevronDown, ChevronUp } from "lucide-react";

import {
  getProjectMedia,
  uploadProjectMedia,
  deleteProjectMedia,
  updateMediaPositions,
  type ProjectMediaWithUrl,
} from "@/lib/supabase-media";
import {
  createProject,
  updateProject,
  deleteProject,
  updateProjectPositions,
  seedProjectsFromStatic,
  type Project,
  type ProjectInput,
} from "@/lib/supabase-projects";
import { useAllProjects } from "@/hooks/use-projects";
import { workItems } from "@/data/work-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { projects, setProjects, isLoading: isLoadingProjects, refetch: refetchProjects } = useAllProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [media, setMedia] = useState<ProjectMediaWithUrl[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Project form state
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectInput>({
    slug: "",
    title_en: "",
    title_de: "",
    subtitle_en: "",
    subtitle_de: "",
    description_en: "",
    description_de: "",
    role: "",
    client: "",
    year: new Date().getFullYear(),
    category: "",
    thumbnail: "",
  });
  const [isSavingProject, setIsSavingProject] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Check auth on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  // Seed projects on first load if authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoadingProjects) {
      seedProjectsFromStatic(workItems);
    }
  }, [isAuthenticated, isLoadingProjects]);

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  // Load media when project changes
  const loadMedia = useCallback(async () => {
    if (!selectedProject || !isAuthenticated) return;
    setIsLoadingMedia(true);
    const items = await getProjectMedia(selectedProject.slug);
    setMedia(items);
    setIsLoadingMedia(false);
  }, [selectedProject, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && selectedProject) {
      loadMedia();
    }
  }, [loadMedia, isAuthenticated, selectedProject]);

  // Handle file upload
  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !selectedProject) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const result = await uploadProjectMedia(selectedProject.slug, file);
      if (result) {
        setMedia((prev) => [...prev, result]);
      }
    }

    setIsUploading(false);
  };

  // Handle drag end for media reordering
  const handleMediaDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = media.findIndex((item) => item.id === active.id);
      const newIndex = media.findIndex((item) => item.id === over.id);

      const newMedia = arrayMove(media, oldIndex, newIndex);
      setMedia(newMedia);

      const updates = newMedia.map((item, index) => ({
        id: item.id,
        position: index,
      }));
      await updateMediaPositions(updates);
    }
  };

  // Handle drag end for project reordering
  const handleProjectDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((item) => item.id === active.id);
      const newIndex = projects.findIndex((item) => item.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      setProjects(newProjects);

      const updates = newProjects.map((item, index) => ({
        id: item.id,
        position: index,
      }));
      await updateProjectPositions(updates);
    }
  };

  // Handle media delete
  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Delete this media item?")) return;

    const success = await deleteProjectMedia(id);
    if (success) {
      setMedia((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Handle project delete
  const handleDeleteProject = async (project: Project) => {
    if (!confirm(`Delete project "${project.title_en}"? This will also delete all associated media.`)) return;

    const success = await deleteProject(project.id);
    if (success) {
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      if (selectedProject?.id === project.id) {
        setSelectedProject(null);
        setMedia([]);
      }
    }
  };

  // Open project dialog for new project
  const handleNewProject = () => {
    setEditingProject(null);
    setProjectForm({
      slug: "",
      title_en: "",
      title_de: "",
      subtitle_en: "",
      subtitle_de: "",
      description_en: "",
      description_de: "",
      role: "",
      client: "",
      year: new Date().getFullYear(),
      category: "",
      thumbnail: "",
    });
    setIsProjectDialogOpen(true);
  };

  // Open project dialog for editing
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      slug: project.slug,
      title_en: project.title_en,
      title_de: project.title_de,
      subtitle_en: project.subtitle_en || "",
      subtitle_de: project.subtitle_de || "",
      description_en: project.description_en || "",
      description_de: project.description_de || "",
      role: project.role || "",
      client: project.client || "",
      year: project.year || new Date().getFullYear(),
      category: project.category || "",
      thumbnail: project.thumbnail || "",
    });
    setIsProjectDialogOpen(true);
  };

  // Save project
  const handleSaveProject = async () => {
    if (!projectForm.slug || !projectForm.title_en || !projectForm.title_de) {
      return;
    }

    setIsSavingProject(true);

    if (editingProject) {
      const updated = await updateProject(editingProject.id, projectForm);
      if (updated) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? updated : p))
        );
        if (selectedProject?.id === editingProject.id) {
          setSelectedProject(updated);
        }
      }
    } else {
      const created = await createProject(projectForm);
      if (created) {
        setProjects((prev) => [...prev, created]);
      }
    }

    setIsSavingProject(false);
    setIsProjectDialogOpen(false);
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm p-6">
          <h1 className="text-xl font-semibold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage projects and their media
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>

        {/* Projects Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            <Button onClick={handleNewProject} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          {isLoadingProjects ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleProjectDragEnd}
            >
              <SortableContext
                items={projects.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {projects.map((project) => (
                    <SortableProjectItem
                      key={project.id}
                      project={project}
                      isSelected={selectedProject?.id === project.id}
                      onSelect={() => setSelectedProject(project)}
                      onEdit={() => handleEditProject(project)}
                      onDelete={() => handleDeleteProject(project)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </section>

        {/* Media Section - only show when a project is selected */}
        {selectedProject && (
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Media for &quot;{selectedProject.title_en}&quot;
              </h2>
              <p className="text-sm text-muted-foreground">
                Upload and organize media for this project
              </p>
            </div>

            {/* Upload Zone */}
            <Card
              className={`
                relative mb-8 p-8 border-2 border-dashed transition-colors cursor-pointer
                ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"}
                ${isUploading ? "pointer-events-none opacity-50" : ""}
              `}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleUpload(e.dataTransfer.files);
              }}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*,video/*,.gif"
                className="hidden"
                onChange={(e) => handleUpload(e.target.files)}
              />
              <div className="flex flex-col items-center gap-3 text-center">
                <Upload className="h-10 w-10 text-muted-foreground" />
                {isUploading ? (
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                ) : (
                  <>
                    <p className="font-medium">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground">
                      Images, GIFs, and videos
                    </p>
                  </>
                )}
              </div>
            </Card>

            {/* Media Grid */}
            {isLoadingMedia ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : media.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No media uploaded yet for this project.</p>
                <p className="text-sm mt-1">Upload files above to get started.</p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleMediaDragEnd}
              >
                <SortableContext items={media.map((m) => m.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {media.map((item, index) => (
                      <SortableMediaItem
                        key={item.id}
                        item={item}
                        index={index}
                        onDelete={() => handleDeleteMedia(item.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            {/* Media Count */}
            {media.length > 0 && (
              <p className="text-sm text-muted-foreground mt-6">
                {media.length} item{media.length !== 1 ? "s" : ""} - Drag to reorder
              </p>
            )}
          </section>
        )}

        {/* Project Form Dialog */}
        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "New Project"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Slug *</label>
                  <Input
                    value={projectForm.slug}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      }))
                    }
                    placeholder="project-slug"
                    disabled={!!editingProject}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Year</label>
                  <Input
                    type="number"
                    value={projectForm.year}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        year: parseInt(e.target.value) || new Date().getFullYear(),
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Title (EN) *</label>
                  <Input
                    value={projectForm.title_en}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, title_en: e.target.value }))
                    }
                    placeholder="English title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Title (DE) *</label>
                  <Input
                    value={projectForm.title_de}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, title_de: e.target.value }))
                    }
                    placeholder="German title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Subtitle (EN)</label>
                  <Input
                    value={projectForm.subtitle_en}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, subtitle_en: e.target.value }))
                    }
                    placeholder="English subtitle"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Subtitle (DE)</label>
                  <Input
                    value={projectForm.subtitle_de}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, subtitle_de: e.target.value }))
                    }
                    placeholder="German subtitle"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Description (EN)</label>
                <Textarea
                  value={projectForm.description_en}
                  onChange={(e) =>
                    setProjectForm((prev) => ({ ...prev, description_en: e.target.value }))
                  }
                  placeholder="English description"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Description (DE)</label>
                <Textarea
                  value={projectForm.description_de}
                  onChange={(e) =>
                    setProjectForm((prev) => ({ ...prev, description_de: e.target.value }))
                  }
                  placeholder="German description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Role</label>
                  <Input
                    value={projectForm.role}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, role: e.target.value }))
                    }
                    placeholder="e.g., Lead Photographer"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Client</label>
                  <Input
                    value={projectForm.client}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, client: e.target.value }))
                    }
                    placeholder="Client name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Category</label>
                  <Input
                    value={projectForm.category}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, category: e.target.value }))
                    }
                    placeholder="e.g., Photography"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Thumbnail URL</label>
                  <Input
                    value={projectForm.thumbnail}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, thumbnail: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsProjectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProject}
                  disabled={isSavingProject || !projectForm.slug || !projectForm.title_en || !projectForm.title_de}
                >
                  {isSavingProject ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Sortable project item component
interface SortableProjectItemProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function SortableProjectItem({
  project,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: SortableProjectItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-3 p-3 rounded-lg border transition-colors
        ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"}
      `}
    >
      <div
        {...attributes}
        {...listeners}
        className="p-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      <button
        onClick={onSelect}
        className="flex-1 text-left"
      >
        <div className="flex items-center gap-3">
          {project.thumbnail && (
            <div className="relative w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={project.thumbnail}
                alt={project.title_en}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          )}
          <div>
            <p className="font-medium">{project.title_en}</p>
            <p className="text-sm text-muted-foreground">
              {project.year} - {project.category}
            </p>
          </div>
        </div>
      </button>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Sortable media item component
interface SortableMediaItemProps {
  item: ProjectMediaWithUrl;
  index: number;
  onDelete: () => void;
}

function SortableMediaItem({ item, index, onDelete }: SortableMediaItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
    >
      {/* Position badge */}
      <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded bg-black/60 text-white text-xs font-medium">
        {index + 1}
      </div>

      {/* Type badge */}
      {item.type !== "image" && (
        <div className="absolute top-2 right-10 z-10 px-2 py-1 rounded bg-black/60 text-white text-xs uppercase">
          {item.type}
        </div>
      )}

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-2 left-2 z-10 p-1.5 rounded bg-black/60 text-white cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Media preview */}
      {item.type === "video" ? (
        <video
          src={item.url}
          className="w-full h-full object-cover"
          muted
          playsInline
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      ) : (
        <Image
          src={item.url}
          alt={item.alt_text || `Media ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      )}
    </div>
  );
}
