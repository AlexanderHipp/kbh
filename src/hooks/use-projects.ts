"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProjects,
  getAllProjects,
  getProjectBySlug,
  type Project,
} from "@/lib/supabase-projects";
import { workItems, type WorkItem } from "@/data/work-items";

// Convert static WorkItem to Project format
function workItemToProject(item: WorkItem, index: number): Project {
  return {
    id: item.slug, // Use slug as ID for static items
    slug: item.slug,
    title_en: item.title.en,
    title_de: item.title.de,
    subtitle_en: item.subtitle?.en || null,
    subtitle_de: item.subtitle?.de || null,
    description_en: item.description.en,
    description_de: item.description.de,
    role: item.role || null,
    client: item.client || null,
    year: item.year,
    category: item.category,
    thumbnail: item.thumbnail,
    position: index,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Convert Project to WorkItem format (for compatibility with existing components)
export function projectToWorkItem(project: Project): WorkItem {
  return {
    slug: project.slug,
    title: {
      en: project.title_en,
      de: project.title_de,
    },
    subtitle: project.subtitle_en || project.subtitle_de
      ? {
          en: project.subtitle_en || "",
          de: project.subtitle_de || "",
        }
      : undefined,
    description: {
      en: project.description_en || "",
      de: project.description_de || "",
    },
    role: project.role || undefined,
    client: project.client || undefined,
    year: project.year || new Date().getFullYear(),
    category: project.category || "",
    thumbnail: project.thumbnail || "",
    media: [], // Media is loaded separately
  };
}

// Hook to fetch published projects with fallback to static data
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getProjects();

      if (data.length > 0) {
        setProjects(data);
      } else {
        // Fallback to static data
        const staticProjects = workItems.map(workItemToProject);
        setProjects(staticProjects);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
      setError("Failed to load projects");
      // Fallback to static data on error
      const staticProjects = workItems.map(workItemToProject);
      setProjects(staticProjects);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    isLoading,
    error,
    refetch: loadProjects,
  };
}

// Hook to fetch all projects (including unpublished) for admin
export function useAllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getAllProjects();

      if (data.length > 0) {
        setProjects(data);
      } else {
        // Fallback to static data
        const staticProjects = workItems.map(workItemToProject);
        setProjects(staticProjects);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
      setError("Failed to load projects");
      const staticProjects = workItems.map(workItemToProject);
      setProjects(staticProjects);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    setProjects,
    isLoading,
    error,
    refetch: loadProjects,
  };
}

// Hook to fetch a single project by slug
export function useProject(slug: string | null) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setProject(null);
      setIsLoading(false);
      return;
    }

    async function loadProject() {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getProjectBySlug(slug);

        if (data) {
          setProject(data);
        } else {
          // Fallback to static data
          const staticItem = workItems.find((item) => item.slug === slug);
          if (staticItem) {
            const index = workItems.indexOf(staticItem);
            setProject(workItemToProject(staticItem, index));
          } else {
            setProject(null);
          }
        }
      } catch (err) {
        console.error("Error loading project:", err);
        setError("Failed to load project");
        // Fallback to static data
        const staticItem = workItems.find((item) => item.slug === slug);
        if (staticItem) {
          const index = workItems.indexOf(staticItem);
          setProject(workItemToProject(staticItem, index));
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  return {
    project,
    isLoading,
    error,
  };
}
