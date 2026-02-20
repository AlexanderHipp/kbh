import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface ProjectMedia {
  id: string;
  project_slug: string;
  position: number;
  type: "image" | "gif" | "video";
  file_path: string;
  alt_text: string | null;
  created_at: string;
}

export interface ProjectMediaWithUrl extends ProjectMedia {
  url: string;
}

// Get media storage URL
export function getMediaUrl(filePath: string): string {
  if (!supabase) return "";
  const { data } = supabase.storage.from("media").getPublicUrl(filePath);
  return data.publicUrl;
}

// Fetch all media for a project, ordered by position
export async function getProjectMedia(projectSlug: string): Promise<ProjectMediaWithUrl[]> {
  if (!supabase) {
    console.warn("Supabase not configured");
    return [];
  }

  const { data, error } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_slug", projectSlug)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching project media:", error);
    return [];
  }

  return (data || []).map((item) => ({
    ...item,
    url: getMediaUrl(item.file_path),
  }));
}

// Fetch media for multiple projects at once
export async function getMediaForProjects(slugs: string[]): Promise<Record<string, ProjectMediaWithUrl[]>> {
  if (!supabase || slugs.length === 0) {
    return {};
  }

  const { data, error } = await supabase
    .from("project_media")
    .select("*")
    .in("project_slug", slugs)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching media for projects:", error);
    return {};
  }

  const grouped: Record<string, ProjectMediaWithUrl[]> = {};
  for (const item of data || []) {
    if (!grouped[item.project_slug]) {
      grouped[item.project_slug] = [];
    }
    grouped[item.project_slug].push({
      ...item,
      url: getMediaUrl(item.file_path),
    });
  }

  return grouped;
}

// Upload media file and create database record
export async function uploadProjectMedia(
  projectSlug: string,
  file: File,
  altText?: string
): Promise<ProjectMediaWithUrl | null> {
  if (!supabase) {
    console.error("Supabase not configured");
    return null;
  }

  // Generate unique filename
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const fileName = `${projectSlug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // Determine type
  let type: ProjectMedia["type"] = "image";
  if (ext === "gif") {
    type = "gif";
  } else if (["mp4", "webm", "mov", "avi"].includes(ext)) {
    type = "video";
  }

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(fileName, file);

  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return null;
  }

  // Get the next position for this project
  const { data: existingMedia } = await supabase
    .from("project_media")
    .select("position")
    .eq("project_slug", projectSlug)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = existingMedia && existingMedia.length > 0
    ? existingMedia[0].position + 1
    : 0;

  // Insert database record
  const { data, error: insertError } = await supabase
    .from("project_media")
    .insert({
      project_slug: projectSlug,
      position: nextPosition,
      type,
      file_path: fileName,
      alt_text: altText || null,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Error creating media record:", insertError);
    // Try to clean up uploaded file
    await supabase.storage.from("media").remove([fileName]);
    return null;
  }

  return {
    ...data,
    url: getMediaUrl(data.file_path),
  };
}

// Update positions for reordering
export async function updateMediaPositions(
  items: { id: string; position: number }[]
): Promise<boolean> {
  if (!supabase) {
    console.error("Supabase not configured");
    return false;
  }

  // Update each item's position
  const updates = items.map(({ id, position }) =>
    supabase
      .from("project_media")
      .update({ position })
      .eq("id", id)
  );

  const results = await Promise.all(updates);
  const hasError = results.some((r) => r.error);

  if (hasError) {
    console.error("Error updating positions");
    return false;
  }

  return true;
}

// Update alt text
export async function updateMediaAltText(
  id: string,
  altText: string
): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from("project_media")
    .update({ alt_text: altText })
    .eq("id", id);

  return !error;
}

// Delete media (file and database record)
export async function deleteProjectMedia(id: string): Promise<boolean> {
  if (!supabase) {
    console.error("Supabase not configured");
    return false;
  }

  // Get the file path first
  const { data: media, error: fetchError } = await supabase
    .from("project_media")
    .select("file_path")
    .eq("id", id)
    .single();

  if (fetchError || !media) {
    console.error("Error fetching media for deletion:", fetchError);
    return false;
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from("media")
    .remove([media.file_path]);

  if (storageError) {
    console.error("Error deleting from storage:", storageError);
    // Continue anyway to clean up database
  }

  // Delete database record
  const { error: deleteError } = await supabase
    .from("project_media")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Error deleting media record:", deleteError);
    return false;
  }

  return true;
}

// Move media to a different project
export async function moveMediaToProject(
  id: string,
  newProjectSlug: string
): Promise<boolean> {
  if (!supabase) return false;

  // Get the next position for the new project
  const { data: existingMedia } = await supabase
    .from("project_media")
    .select("position")
    .eq("project_slug", newProjectSlug)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = existingMedia && existingMedia.length > 0
    ? existingMedia[0].position + 1
    : 0;

  const { error } = await supabase
    .from("project_media")
    .update({
      project_slug: newProjectSlug,
      position: nextPosition
    })
    .eq("id", id);

  return !error;
}
