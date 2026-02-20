"use client";

import { useState, useEffect } from "react";
import { getProjectMedia, type ProjectMediaWithUrl } from "@/lib/supabase-media";
import type { WorkMedia } from "@/data/work-items";

// Convert Supabase media to WorkMedia format
function toWorkMedia(item: ProjectMediaWithUrl): WorkMedia {
  return {
    type: item.type,
    src: item.url,
    alt: item.alt_text || undefined,
  };
}

export function useProjectMedia(
  projectSlug: string,
  fallbackMedia: WorkMedia[]
): {
  media: WorkMedia[];
  isLoading: boolean;
  isFromSupabase: boolean;
} {
  const [media, setMedia] = useState<WorkMedia[]>(fallbackMedia);
  const [isLoading, setIsLoading] = useState(true);
  const [isFromSupabase, setIsFromSupabase] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchMedia() {
      setIsLoading(true);
      const supabaseMedia = await getProjectMedia(projectSlug);

      if (mounted) {
        if (supabaseMedia.length > 0) {
          setMedia(supabaseMedia.map(toWorkMedia));
          setIsFromSupabase(true);
        } else {
          setMedia(fallbackMedia);
          setIsFromSupabase(false);
        }
        setIsLoading(false);
      }
    }

    fetchMedia();

    return () => {
      mounted = false;
    };
  }, [projectSlug, fallbackMedia]);

  return { media, isLoading, isFromSupabase };
}
