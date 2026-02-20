import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface CategoryMedia {
  id: string;
  category_slug: string;
  position: number;
  type: "image" | "gif" | "video";
  file_path: string;
  alt_text: string | null;
  created_at: string;
}

export interface CategoryMediaWithUrl extends CategoryMedia {
  url: string;
}

// Get media storage URL
export function getMediaUrl(filePath: string): string {
  if (!supabase) return "";
  const { data } = supabase.storage.from("media").getPublicUrl(filePath);
  return data.publicUrl;
}

// Fetch all media for a category, ordered by position
export async function getCategoryMedia(categorySlug: string): Promise<CategoryMediaWithUrl[]> {
  if (!supabase) {
    console.warn("Supabase not configured");
    return [];
  }

  const { data, error } = await supabase
    .from("category_media")
    .select("*")
    .eq("category_slug", categorySlug)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching category media:", error);
    return [];
  }

  return (data || []).map((item) => ({
    ...item,
    url: getMediaUrl(item.file_path),
  }));
}

// Fetch media for multiple categories at once
export async function getMediaForCategories(slugs: string[]): Promise<Record<string, CategoryMediaWithUrl[]>> {
  if (!supabase || slugs.length === 0) {
    return {};
  }

  const { data, error } = await supabase
    .from("category_media")
    .select("*")
    .in("category_slug", slugs)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching media for categories:", error);
    return {};
  }

  const grouped: Record<string, CategoryMediaWithUrl[]> = {};
  for (const item of data || []) {
    if (!grouped[item.category_slug]) {
      grouped[item.category_slug] = [];
    }
    grouped[item.category_slug].push({
      ...item,
      url: getMediaUrl(item.file_path),
    });
  }

  return grouped;
}

// Upload media file and create database record
export async function uploadCategoryMedia(
  categorySlug: string,
  file: File,
  altText?: string
): Promise<CategoryMediaWithUrl | null> {
  if (!supabase) {
    console.error("Supabase not configured");
    return null;
  }

  // Generate unique filename
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const fileName = `${categorySlug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // Determine type
  let type: CategoryMedia["type"] = "image";
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

  // Get the next position for this category
  const { data: existingMedia } = await supabase
    .from("category_media")
    .select("position")
    .eq("category_slug", categorySlug)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = existingMedia && existingMedia.length > 0
    ? existingMedia[0].position + 1
    : 0;

  // Insert database record
  const { data, error: insertError } = await supabase
    .from("category_media")
    .insert({
      category_slug: categorySlug,
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
      .from("category_media")
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
    .from("category_media")
    .update({ alt_text: altText })
    .eq("id", id);

  return !error;
}

// Delete media (file and database record)
export async function deleteCategoryMedia(id: string): Promise<boolean> {
  if (!supabase) {
    console.error("Supabase not configured");
    return false;
  }

  // Get the file path first
  const { data: media, error: fetchError } = await supabase
    .from("category_media")
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
    .from("category_media")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Error deleting media record:", deleteError);
    return false;
  }

  return true;
}

// Move media to a different category
export async function moveMediaToCategory(
  id: string,
  newCategorySlug: string
): Promise<boolean> {
  if (!supabase) return false;

  // Get the next position for the new category
  const { data: existingMedia } = await supabase
    .from("category_media")
    .select("position")
    .eq("category_slug", newCategorySlug)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = existingMedia && existingMedia.length > 0
    ? existingMedia[0].position + 1
    : 0;

  const { error } = await supabase
    .from("category_media")
    .update({
      category_slug: newCategorySlug,
      position: nextPosition
    })
    .eq("id", id);

  return !error;
}
