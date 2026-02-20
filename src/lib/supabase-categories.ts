import { supabase } from "./supabase";

export interface Category {
  id: string;
  slug: string;
  title_en: string;
  title_de: string;
  subtitle_en: string | null;
  subtitle_de: string | null;
  description_en: string | null;
  description_de: string | null;
  thumbnail_path: string | null;
  position: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithThumbnailUrl extends Category {
  thumbnail_url: string | null;
}

export interface CategoryInput {
  slug: string;
  title_en: string;
  title_de: string;
  subtitle_en?: string;
  subtitle_de?: string;
  description_en?: string;
  description_de?: string;
  thumbnail_path?: string;
  position?: number;
  is_published?: boolean;
}

// Get thumbnail URL from path
export function getCategoryThumbnailUrl(path: string | null): string | null {
  if (!path || !supabase) return null;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

// Add thumbnail URL to category
function addThumbnailUrl(category: Category): CategoryWithThumbnailUrl {
  return {
    ...category,
    thumbnail_url: getCategoryThumbnailUrl(category.thumbnail_path),
  };
}

// Get all published categories ordered by position
export async function getCategories(): Promise<CategoryWithThumbnailUrl[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data || []).map(addThumbnailUrl);
}

// Get all categories (including unpublished) for admin
export async function getAllCategories(): Promise<CategoryWithThumbnailUrl[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }

  return (data || []).map(addThumbnailUrl);
}

// Get a single category by slug
export async function getCategoryBySlug(slug: string): Promise<CategoryWithThumbnailUrl | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      console.error("Error fetching category:", error);
    }
    return null;
  }

  return addThumbnailUrl(data);
}

// Upload category thumbnail
export async function uploadCategoryThumbnail(
  categorySlug: string,
  file: File
): Promise<string | null> {
  if (!supabase) {
    return null;
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `thumbnails/${categorySlug}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error } = await supabase.storage.from("media").upload(fileName, file);

  if (error) {
    console.error("Error uploading thumbnail:", error);
    return null;
  }

  return fileName;
}

// Delete category thumbnail
export async function deleteCategoryThumbnail(path: string): Promise<boolean> {
  if (!supabase || !path) {
    return false;
  }

  const { error } = await supabase.storage.from("media").remove([path]);

  if (error) {
    console.error("Error deleting thumbnail:", error);
    return false;
  }

  return true;
}

// Create a new category
export async function createCategory(input: CategoryInput): Promise<CategoryWithThumbnailUrl | null> {
  if (!supabase) {
    return null;
  }

  // Get the highest position to place new category at the end
  const { data: existing } = await supabase
    .from("categories")
    .select("position")
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = existing && existing.length > 0 ? existing[0].position + 1 : 0;

  const { data, error } = await supabase
    .from("categories")
    .insert({
      ...input,
      position: input.position ?? nextPosition,
      is_published: input.is_published ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    return null;
  }

  return addThumbnailUrl(data);
}

// Update an existing category
export async function updateCategory(
  id: string,
  input: Partial<CategoryInput>
): Promise<CategoryWithThumbnailUrl | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("categories")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating category:", error);
    return null;
  }

  return addThumbnailUrl(data);
}

// Delete a category and its associated media
export async function deleteCategory(id: string): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  // First get the category to find its slug and thumbnail
  const { data: category } = await supabase
    .from("categories")
    .select("slug, thumbnail_path")
    .eq("id", id)
    .single();

  if (category) {
    // Delete thumbnail if exists
    if (category.thumbnail_path) {
      await deleteCategoryThumbnail(category.thumbnail_path);
    }

    // Delete all media associated with this category
    await supabase.from("category_media").delete().eq("category_slug", category.slug);
  }

  // Delete the category
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    return false;
  }

  return true;
}

// Update category positions (for reordering)
export async function updateCategoryPositions(
  items: { id: string; position: number }[]
): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  const client = supabase;
  const updates = items.map((item) =>
    client
      .from("categories")
      .update({ position: item.position, updated_at: new Date().toISOString() })
      .eq("id", item.id)
  );

  const results = await Promise.all(updates);
  const hasError = results.some((result) => result.error);

  if (hasError) {
    console.error("Error updating category positions");
    return false;
  }

  return true;
}

// Seed categories from static data (useful for initial setup)
export async function seedCategoriesFromStatic(
  workItems: Array<{
    slug: string;
    title: { en: string; de: string };
    subtitle?: { en: string; de: string };
    description: { en: string; de: string };
    thumbnail: string;
  }>
): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  // Check if categories already exist
  const { data: existing } = await supabase
    .from("categories")
    .select("slug")
    .limit(1);

  if (existing && existing.length > 0) {
    console.log("Categories already exist, skipping seed");
    return true;
  }

  const categoriesToInsert = workItems.map((item, index) => ({
    slug: item.slug,
    title_en: item.title.en,
    title_de: item.title.de,
    subtitle_en: item.subtitle?.en || null,
    subtitle_de: item.subtitle?.de || null,
    description_en: item.description.en,
    description_de: item.description.de,
    thumbnail_path: null, // Will need to be uploaded separately
    position: index,
    is_published: true,
  }));

  const { error } = await supabase.from("categories").insert(categoriesToInsert);

  if (error) {
    console.error("Error seeding categories:", error);
    return false;
  }

  console.log("Categories seeded successfully");
  return true;
}
