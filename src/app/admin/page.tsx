"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
import {
  GripVertical,
  Trash2,
  Upload,
  LogOut,
  Plus,
  Pencil,
  ImageIcon,
} from "lucide-react";

import {
  getCategoryMedia,
  uploadCategoryMedia,
  deleteCategoryMedia,
  updateMediaPositions,
  type CategoryMediaWithUrl,
} from "@/lib/supabase-media";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryPositions,
  uploadCategoryThumbnail,
  deleteCategoryThumbnail,
  seedCategoriesFromStatic,
  type CategoryWithThumbnailUrl,
  type CategoryInput,
} from "@/lib/supabase-categories";
import { useAllCategories } from "@/hooks/use-categories";
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

  const {
    categories,
    setCategories,
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithThumbnailUrl | null>(null);
  const [media, setMedia] = useState<CategoryMediaWithUrl[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Category form state
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryWithThumbnailUrl | null>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryInput>({
    slug: "",
    title_en: "",
    title_de: "",
    subtitle_en: "",
    subtitle_de: "",
    description_en: "",
    description_de: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Check auth on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  // Seed categories on first load if authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoadingCategories) {
      seedCategoriesFromStatic(workItems);
    }
  }, [isAuthenticated, isLoadingCategories]);

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

  // Load media when category changes
  const loadMedia = useCallback(async () => {
    if (!selectedCategory || !isAuthenticated) return;
    setIsLoadingMedia(true);
    const items = await getCategoryMedia(selectedCategory.slug);
    setMedia(items);
    setIsLoadingMedia(false);
  }, [selectedCategory, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && selectedCategory) {
      loadMedia();
    }
  }, [loadMedia, isAuthenticated, selectedCategory]);

  // Handle file upload
  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !selectedCategory) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const result = await uploadCategoryMedia(selectedCategory.slug, file);
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

  // Handle drag end for category reordering
  const handleCategoryDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((item) => item.id === active.id);
      const newIndex = categories.findIndex((item) => item.id === over.id);

      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);

      const updates = newCategories.map((item, index) => ({
        id: item.id,
        position: index,
      }));
      await updateCategoryPositions(updates);
    }
  };

  // Handle media delete
  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Delete this media item?")) return;

    const success = await deleteCategoryMedia(id);
    if (success) {
      setMedia((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Handle category delete
  const handleDeleteCategory = async (category: CategoryWithThumbnailUrl) => {
    if (
      !confirm(
        `Delete category "${category.title_en}"? This will also delete all associated media.`,
      )
    )
      return;

    const success = await deleteCategory(category.id);
    if (success) {
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
      if (selectedCategory?.id === category.id) {
        setSelectedCategory(null);
        setMedia([]);
      }
    }
  };

  // Handle thumbnail file selection
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open category dialog for new category
  const handleNewCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      slug: "",
      title_en: "",
      title_de: "",
      subtitle_en: "",
      subtitle_de: "",
      description_en: "",
      description_de: "",
    });
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setIsCategoryDialogOpen(true);
  };

  // Open category dialog for editing
  const handleEditCategory = (category: CategoryWithThumbnailUrl) => {
    setEditingCategory(category);
    setCategoryForm({
      slug: category.slug,
      title_en: category.title_en,
      title_de: category.title_de,
      subtitle_en: category.subtitle_en || "",
      subtitle_de: category.subtitle_de || "",
      description_en: category.description_en || "",
      description_de: category.description_de || "",
    });
    setThumbnailFile(null);
    setThumbnailPreview(category.thumbnail_url || null);
    setIsCategoryDialogOpen(true);
  };

  // Save category
  const handleSaveCategory = async () => {
    if (!categoryForm.slug || !categoryForm.title_en || !categoryForm.title_de) {
      return;
    }

    setIsSavingCategory(true);

    let thumbnailPath: string | null | undefined = undefined;

    // Upload new thumbnail if selected
    if (thumbnailFile) {
      const path = await uploadCategoryThumbnail(categoryForm.slug, thumbnailFile);
      if (path) {
        thumbnailPath = path;
        // Delete old thumbnail if editing
        if (editingCategory?.thumbnail_path) {
          await deleteCategoryThumbnail(editingCategory.thumbnail_path);
        }
      }
    }

    const formData: CategoryInput = {
      ...categoryForm,
      ...(thumbnailPath !== undefined && { thumbnail_path: thumbnailPath }),
    };

    if (editingCategory) {
      const updated = await updateCategory(editingCategory.id, formData);
      if (updated) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? updated : c)),
        );
        if (selectedCategory?.id === editingCategory.id) {
          setSelectedCategory(updated);
        }
      }
    } else {
      const created = await createCategory(formData);
      if (created) {
        setCategories((prev) => [...prev, created]);
      }
    }

    setIsSavingCategory(false);
    setIsCategoryDialogOpen(false);
    setThumbnailFile(null);
    setThumbnailPreview(null);
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
          <h1 className="text-xl font-semibold mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
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
            <h1 className="text-3xl font-semibold tracking-tight mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage categories and their media
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>

        {/* Categories Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <Button onClick={handleNewCategory} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Category
            </Button>
          </div>

          {isLoadingCategories ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-muted rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleCategoryDragEnd}
            >
              <SortableContext
                items={categories.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {categories.map((category) => (
                    <SortableCategoryItem
                      key={category.id}
                      category={category}
                      isSelected={selectedCategory?.id === category.id}
                      onSelect={() => setSelectedCategory(category)}
                      onEdit={() => handleEditCategory(category)}
                      onDelete={() => handleDeleteCategory(category)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </section>

        {/* Media Section - only show when a category is selected */}
        {selectedCategory && (
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Media for &quot;{selectedCategory.title_en}&quot;
              </h2>
              <p className="text-sm text-muted-foreground">
                Upload and organize media for this category
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
                    <p className="font-medium">
                      Drop files here or click to upload
                    </p>
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
                  <div
                    key={i}
                    className="aspect-square bg-muted rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : media.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No media uploaded yet for this category.</p>
                <p className="text-sm mt-1">
                  Upload files above to get started.
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleMediaDragEnd}
              >
                <SortableContext
                  items={media.map((m) => m.id)}
                  strategy={rectSortingStrategy}
                >
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
                {media.length} item{media.length !== 1 ? "s" : ""} - Drag to
                reorder
              </p>
            )}
          </section>
        )}

        {/* Category Form Dialog */}
        <Dialog
          open={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
        >
          <DialogContent className="max-w-4xl w-full overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "New Category"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Slug *
                </label>
                <Input
                  value={categoryForm.slug}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    }))
                  }
                  placeholder="category-slug"
                  disabled={!!editingCategory}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Title (EN) *
                  </label>
                  <Input
                    value={categoryForm.title_en}
                    onChange={(e) =>
                      setCategoryForm((prev) => ({
                        ...prev,
                        title_en: e.target.value,
                      }))
                    }
                    placeholder="English title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Title (DE) *
                  </label>
                  <Input
                    value={categoryForm.title_de}
                    onChange={(e) =>
                      setCategoryForm((prev) => ({
                        ...prev,
                        title_de: e.target.value,
                      }))
                    }
                    placeholder="German title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Subtitle (EN)
                  </label>
                  <Input
                    value={categoryForm.subtitle_en}
                    onChange={(e) =>
                      setCategoryForm((prev) => ({
                        ...prev,
                        subtitle_en: e.target.value,
                      }))
                    }
                    placeholder="English subtitle"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Subtitle (DE)
                  </label>
                  <Input
                    value={categoryForm.subtitle_de}
                    onChange={(e) =>
                      setCategoryForm((prev) => ({
                        ...prev,
                        subtitle_de: e.target.value,
                      }))
                    }
                    placeholder="German subtitle"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Description (EN)
                </label>
                <Textarea
                  value={categoryForm.description_en}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      description_en: e.target.value,
                    }))
                  }
                  placeholder="English description"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Description (DE)
                </label>
                <Textarea
                  value={categoryForm.description_de}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      description_de: e.target.value,
                    }))
                  }
                  placeholder="German description"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Thumbnail
                </label>
                <div className="flex items-start gap-4">
                  <div
                    className="relative w-32 h-24 rounded-lg overflow-hidden bg-muted border-2 border-dashed border-muted-foreground/25 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    {thumbnailPreview ? (
                      <Image
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailSelect}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => thumbnailInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Thumbnail
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended: 800x600px or larger
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsCategoryDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCategory}
                  disabled={
                    isSavingCategory ||
                    !categoryForm.slug ||
                    !categoryForm.title_en ||
                    !categoryForm.title_de
                  }
                >
                  {isSavingCategory ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Sortable category item component
interface SortableCategoryItemProps {
  category: CategoryWithThumbnailUrl;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function SortableCategoryItem({
  category,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: SortableCategoryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

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

      <button onClick={onSelect} className="flex-1 text-left">
        <div className="flex items-center gap-3">
          {category.thumbnail_url && (
            <div className="relative w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={category.thumbnail_url}
                alt={category.title_en}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          )}
          <div>
            <p className="font-medium">{category.title_en}</p>
            {category.subtitle_en && (
              <p className="text-sm text-muted-foreground">
                {category.subtitle_en}
              </p>
            )}
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
  item: CategoryMediaWithUrl;
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
