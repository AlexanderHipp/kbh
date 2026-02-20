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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Upload, X } from "lucide-react";

import { workItems } from "@/data/work-items";
import {
  getProjectMedia,
  uploadProjectMedia,
  deleteProjectMedia,
  updateMediaPositions,
  type ProjectMediaWithUrl,
} from "@/lib/supabase-media";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  const [selectedProject, setSelectedProject] = useState<string>(workItems[0]?.slug || "");
  const [media, setMedia] = useState<ProjectMediaWithUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load media when project changes
  const loadMedia = useCallback(async () => {
    if (!selectedProject) return;
    setIsLoading(true);
    const items = await getProjectMedia(selectedProject);
    setMedia(items);
    setIsLoading(false);
  }, [selectedProject]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Handle file upload
  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !selectedProject) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const result = await uploadProjectMedia(selectedProject, file);
      if (result) {
        setMedia((prev) => [...prev, result]);
      }
    }

    setIsUploading(false);
  };

  // Handle drag end for reordering
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = media.findIndex((item) => item.id === active.id);
      const newIndex = media.findIndex((item) => item.id === over.id);

      const newMedia = arrayMove(media, oldIndex, newIndex);
      setMedia(newMedia);

      // Update positions in database
      const updates = newMedia.map((item, index) => ({
        id: item.id,
        position: index,
      }));
      await updateMediaPositions(updates);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this media item?")) return;

    const success = await deleteProjectMedia(id);
    if (success) {
      setMedia((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const currentProject = workItems.find((w) => w.slug === selectedProject);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Media Manager</h1>
          <p className="text-muted-foreground">
            Upload and organize media for your projects
          </p>
        </header>

        {/* Project Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Select Project</label>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {workItems.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.title.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  Images, GIFs, and videos for &quot;{currentProject?.title.en}&quot;
                </p>
              </>
            )}
          </div>
        </Card>

        {/* Media Grid with Drag & Drop */}
        {isLoading ? (
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
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={media.map((m) => m.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.map((item, index) => (
                  <SortableMediaItem
                    key={item.id}
                    item={item}
                    index={index}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Media Count */}
        {media.length > 0 && (
          <p className="text-sm text-muted-foreground mt-6">
            {media.length} item{media.length !== 1 ? "s" : ""} · Drag to reorder
          </p>
        )}
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
