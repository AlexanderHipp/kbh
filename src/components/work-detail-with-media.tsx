"use client";

import { useMemo } from "react";
import { WorkDetail } from "./work-detail";
import { useProjectMedia } from "@/hooks/use-project-media";
import type { WorkItem } from "@/data/work-items";
import type { Locale } from "@/lib/i18n";

interface WorkDetailWithMediaProps {
  item: WorkItem;
  locale: Locale;
  isModal?: boolean;
  onClose?: () => void;
}

export function WorkDetailWithMedia({
  item,
  locale,
  isModal = false,
  onClose,
}: WorkDetailWithMediaProps) {
  const { media, isLoading } = useProjectMedia(item.slug, item.media);

  // Create a merged item with dynamic media
  const itemWithMedia = useMemo(
    () => ({
      ...item,
      media,
    }),
    [item, media]
  );

  if (isLoading) {
    return (
      <div className="relative">
        {/* Loading skeleton */}
        <div className="aspect-[3/2] rounded-lg bg-muted animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-16 bg-muted rounded animate-pulse mb-2" />
                <div className="h-5 w-24 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-4" />
            <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <WorkDetail
      item={itemWithMedia}
      locale={locale}
      isModal={isModal}
      onClose={onClose}
    />
  );
}
