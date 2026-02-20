"use client";

import { useState, useCallback, useRef } from "react";
import { uploadMedia, MediaItem } from "@/lib/supabase";

interface MediaUploadProps {
  onUpload: (item: MediaItem) => void;
}

export function MediaUpload({ onUpload }: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setIsUploading(true);
      const totalFiles = files.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        setUploadProgress(`Uploading ${i + 1} of ${totalFiles}: ${file.name}`);

        const result = await uploadMedia(file);
        if (result) {
          onUpload(result);
        }
      }

      setIsUploading(false);
      setUploadProgress(null);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
        ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"}
        ${isUploading ? "pointer-events-none opacity-50" : "cursor-pointer"}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.gif"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="flex flex-col items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>

        {isUploading ? (
          <p className="text-sm text-muted-foreground">{uploadProgress}</p>
        ) : (
          <>
            <p className="text-sm font-medium">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Supports images, GIFs, and videos
            </p>
          </>
        )}
      </div>
    </div>
  );
}
