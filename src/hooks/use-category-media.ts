"use client";

import { useState, useEffect, useCallback } from "react";
import { getCategoryMedia, type CategoryMediaWithUrl } from "@/lib/supabase-media";
import type { WorkMedia } from "@/data/work-items";

// Convert CategoryMediaWithUrl to WorkMedia format
function categoryMediaToWorkMedia(item: CategoryMediaWithUrl): WorkMedia {
  return {
    type: item.type,
    src: item.url,
    alt: item.alt_text || undefined,
  };
}

export function useCategoryMedia(categorySlug: string, fallbackMedia: WorkMedia[] = []) {
  const [media, setMedia] = useState<WorkMedia[]>(fallbackMedia);
  const [isLoading, setIsLoading] = useState(true);
  const [isFromSupabase, setIsFromSupabase] = useState(false);

  const loadMedia = useCallback(async () => {
    setIsLoading(true);

    try {
      const supabaseMedia = await getCategoryMedia(categorySlug);

      if (supabaseMedia.length > 0) {
        setMedia(supabaseMedia.map(categoryMediaToWorkMedia));
        setIsFromSupabase(true);
      } else {
        // Use fallback media if no Supabase media found
        setMedia(fallbackMedia);
        setIsFromSupabase(false);
      }
    } catch (error) {
      console.error("Error loading category media:", error);
      setMedia(fallbackMedia);
      setIsFromSupabase(false);
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug, fallbackMedia]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  return {
    media,
    isLoading,
    isFromSupabase,
    refetch: loadMedia,
  };
}
