"use client";

import { useState, useCallback } from "react";
import { MediaItem } from "@/lib/supabase";
import { MediaGallery } from "./media-gallery";
import { MediaUpload } from "./media-upload";

interface MediaPageClientProps {
  initialMedia: MediaItem[];
}

export function MediaPageClient({ initialMedia }: MediaPageClientProps) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);

  const handleUpload = useCallback((item: MediaItem) => {
    setMedia((prev) => [item, ...prev]);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return (
    <div className="space-y-8">
      <MediaUpload onUpload={handleUpload} />
      <MediaGalleryWithState media={media} onDelete={handleDelete} />
    </div>
  );
}

interface MediaGalleryWithStateProps {
  media: MediaItem[];
  onDelete: (id: string) => void;
}

function MediaGalleryWithState({ media, onDelete }: MediaGalleryWithStateProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  if (media.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No media uploaded yet.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Upload images, GIFs, or videos to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            onClick={() => setSelectedItem(item)}
            onDelete={() => onDelete(item.id)}
          />
        ))}
      </div>

      {selectedItem && (
        <MediaModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={() => {
            onDelete(selectedItem.id);
            setSelectedItem(null);
          }}
        />
      )}
    </>
  );
}

interface MediaCardProps {
  item: MediaItem;
  onClick: () => void;
  onDelete: () => void;
}

function MediaCard({ item, onClick, onDelete }: MediaCardProps) {
  return (
    <div className="group relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer">
      <div onClick={onClick} className="w-full h-full">
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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors pointer-events-none" />

      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-white text-sm truncate">{item.name}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
        aria-label="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>

      {item.type === "video" && (
        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/50 text-white text-xs pointer-events-none">
          VIDEO
        </div>
      )}
      {item.type === "gif" && (
        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/50 text-white text-xs pointer-events-none">
          GIF
        </div>
      )}
    </div>
  );
}

interface MediaModalProps {
  item: MediaItem;
  onClose: () => void;
  onDelete: () => void;
}

function MediaModal({ item, onClose, onDelete }: MediaModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {item.type === "video" ? (
          <video
            src={item.url}
            className="w-full max-h-[80vh] object-contain rounded-lg"
            controls
            autoPlay
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt={item.name}
            className="w-full max-h-[80vh] object-contain rounded-lg"
          />
        )}

        <div className="mt-4 flex items-center justify-between text-white">
          <p className="truncate">{item.name}</p>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
