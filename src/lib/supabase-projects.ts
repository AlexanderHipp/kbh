import { supabase } from "./supabase";

export interface Project {
  id: string;
  slug: string;
  title_en: string;
  title_de: string;
  subtitle_en: string | null;
  subtitle_de: string | null;
  description_en: string | null;
  description_de: string | null;
  role: string | null;
  client: string | null;
  year: number | null;
  category: string | null;
  thumbnail: string | null;
  position: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  slug: string;
  title_en: string;
  title_de: string;
  subtitle_en?: string;
  subtitle_de?: string;
  description_en?: string;
  description_de?: string;
  role?: string;
  client?: string;
  year?: number;
  category?: string;
  thumbnail?: string;
  position?: number;
  is_published?: boolean;
}

// Get all published projects ordered by position
export async function getProjects(): Promise<Project[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

// Get all projects (including unpublished) for admin
export async function getAllProjects(): Promise<Project[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }

  return data || [];
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      console.error("Error fetching project:", error);
    }
    return null;
  }

  return data;
}

// Create a new project
export async function createProject(input: ProjectInput): Promise<Project | null> {
  if (!supabase) {
    return null;
  }

  // Get the highest position to place new project at the end
  const { data: existing } = await supabase
    .from("projects")
    .select("position")
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = existing && existing.length > 0 ? existing[0].position + 1 : 0;

  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...input,
      position: input.position ?? nextPosition,
      is_published: input.is_published ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    return null;
  }

  return data;
}

// Update an existing project
export async function updateProject(
  id: string,
  input: Partial<ProjectInput>
): Promise<Project | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    return null;
  }

  return data;
}

// Delete a project and its associated media
export async function deleteProject(id: string): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  // First get the project to find its slug
  const { data: project } = await supabase
    .from("projects")
    .select("slug")
    .eq("id", id)
    .single();

  if (project) {
    // Delete all media associated with this project
    await supabase.from("project_media").delete().eq("project_slug", project.slug);
  }

  // Delete the project
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    return false;
  }

  return true;
}

// Update project positions (for reordering)
export async function updateProjectPositions(
  items: { id: string; position: number }[]
): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  const client = supabase;
  const updates = items.map((item) =>
    client
      .from("projects")
      .update({ position: item.position, updated_at: new Date().toISOString() })
      .eq("id", item.id)
  );

  const results = await Promise.all(updates);
  const hasError = results.some((result) => result.error);

  if (hasError) {
    console.error("Error updating project positions");
    return false;
  }

  return true;
}

// Seed projects from static data (useful for initial setup)
export async function seedProjectsFromStatic(
  workItems: Array<{
    slug: string;
    title: { en: string; de: string };
    subtitle?: { en: string; de: string };
    description: { en: string; de: string };
    role?: string;
    client?: string;
    year: number;
    category: string;
    thumbnail: string;
  }>
): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  // Check if projects already exist
  const { data: existing } = await supabase
    .from("projects")
    .select("slug")
    .limit(1);

  if (existing && existing.length > 0) {
    console.log("Projects already exist, skipping seed");
    return true;
  }

  const projectsToInsert = workItems.map((item, index) => ({
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
  }));

  const { error } = await supabase.from("projects").insert(projectsToInsert);

  if (error) {
    console.error("Error seeding projects:", error);
    return false;
  }

  console.log("Projects seeded successfully");
  return true;
}
