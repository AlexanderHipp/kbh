"use client";

import { useMemo } from "react";
import { WorkDetail } from "./work-detail";
import { useCategoryMedia } from "@/hooks/use-category-media";
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
  const { media, isLoading } = useCategoryMedia(item.slug, item.media);

  // Create a merged item with dynamic media
  const itemWithMedia = useMemo(
    () => {
      const hasThumbnail = Boolean(item.thumbnail);
      const dedupedMedia = hasThumbnail
        ? media.filter((entry) => entry.src !== item.thumbnail)
        : media;

      const mergedMedia = hasThumbnail
        ? [
            {
              type: "image" as const,
              src: item.thumbnail,
              alt: item.title[locale],
            },
            ...dedupedMedia,
          ]
        : dedupedMedia;

      return {
        ...item,
        media: mergedMedia,
      };
    },
    [item, locale, media]
  );

  if (isLoading) {
    return (
      <div className="relative">
        {/* Loading skeleton */}
        <div className="aspect-[3/2] rounded-lg bg-muted animate-pulse mb-8" />
        <div className="mb-8">
          <div className="h-8 w-48 bg-muted rounded animate-pulse mb-4" />
          <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
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
