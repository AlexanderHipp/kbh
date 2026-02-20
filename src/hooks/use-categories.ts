"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getCategories,
  getAllCategories,
  getCategoryBySlug,
  type CategoryWithThumbnailUrl,
} from "@/lib/supabase-categories";
import { workItems, type WorkItem } from "@/data/work-items";

// Convert static WorkItem to Category format
function workItemToCategory(item: WorkItem, index: number): CategoryWithThumbnailUrl {
  return {
    id: item.slug, // Use slug as ID for static items
    slug: item.slug,
    title_en: item.title.en,
    title_de: item.title.de,
    subtitle_en: item.subtitle?.en || null,
    subtitle_de: item.subtitle?.de || null,
    description_en: item.description.en,
    description_de: item.description.de,
    thumbnail_path: null,
    thumbnail_url: item.thumbnail, // Use static thumbnail URL
    position: index,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Convert Category to WorkItem format (for compatibility with existing components)
export function categoryToWorkItem(category: CategoryWithThumbnailUrl): WorkItem {
  return {
    slug: category.slug,
    title: {
      en: category.title_en,
      de: category.title_de,
    },
    subtitle: category.subtitle_en || category.subtitle_de
      ? {
          en: category.subtitle_en || "",
          de: category.subtitle_de || "",
        }
      : undefined,
    description: {
      en: category.description_en || "",
      de: category.description_de || "",
    },
    thumbnail: category.thumbnail_url || "",
    media: [], // Media is loaded separately
  };
}

// Hook to fetch published categories with fallback to static data
export function useCategories() {
  const [categories, setCategories] = useState<CategoryWithThumbnailUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCategories();

      if (data.length > 0) {
        setCategories(data);
      } else {
        // Fallback to static data
        const staticCategories = workItems.map(workItemToCategory);
        setCategories(staticCategories);
      }
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Failed to load categories");
      // Fallback to static data on error
      const staticCategories = workItems.map(workItemToCategory);
      setCategories(staticCategories);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: loadCategories,
  };
}

// Hook to fetch all categories (including unpublished) for admin
export function useAllCategories() {
  const [categories, setCategories] = useState<CategoryWithThumbnailUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getAllCategories();

      if (data.length > 0) {
        setCategories(data);
      } else {
        // Fallback to static data
        const staticCategories = workItems.map(workItemToCategory);
        setCategories(staticCategories);
      }
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Failed to load categories");
      const staticCategories = workItems.map(workItemToCategory);
      setCategories(staticCategories);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    setCategories,
    isLoading,
    error,
    refetch: loadCategories,
  };
}

// Hook to fetch a single category by slug
export function useCategory(slug: string | null) {
  const [category, setCategory] = useState<CategoryWithThumbnailUrl | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setCategory(null);
      setIsLoading(false);
      return;
    }

    async function loadCategory() {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getCategoryBySlug(slug);

        if (data) {
          setCategory(data);
        } else {
          // Fallback to static data
          const staticItem = workItems.find((item) => item.slug === slug);
          if (staticItem) {
            const index = workItems.indexOf(staticItem);
            setCategory(workItemToCategory(staticItem, index));
          } else {
            setCategory(null);
          }
        }
      } catch (err) {
        console.error("Error loading category:", err);
        setError("Failed to load category");
        // Fallback to static data
        const staticItem = workItems.find((item) => item.slug === slug);
        if (staticItem) {
          const index = workItems.indexOf(staticItem);
          setCategory(workItemToCategory(staticItem, index));
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadCategory();
  }, [slug]);

  return {
    category,
    isLoading,
    error,
  };
}
