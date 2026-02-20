import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the supabase client for use in other modules
export const supabase = supabaseClient;

function getSupabase(): SupabaseClient | null {
  return supabaseClient;
}

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "image" | "gif" | "video";
  created_at: string;
};

export async function getMediaItems(): Promise<MediaItem[]> {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn("Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    return [];
  }

  const { data, error } = await supabase.storage.from("media").list("", {
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) {
    console.error("Error fetching media:", error);
    return [];
  }

  if (!data) return [];

  const mediaItems: MediaItem[] = data
    .filter((file) => !file.name.startsWith("."))
    .map((file) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(file.name);

      const extension = file.name.split(".").pop()?.toLowerCase();
      let type: MediaItem["type"] = "image";

      if (extension === "gif") {
        type = "gif";
      } else if (["mp4", "webm", "mov", "avi"].includes(extension || "")) {
        type = "video";
      }

      return {
        id: file.id,
        name: file.name,
        url: publicUrl,
        type,
        created_at: file.created_at,
      };
    });

  return mediaItems;
}

export async function uploadMedia(file: File): Promise<MediaItem | null> {
  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase not configured");
    return null;
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage.from("media").upload(fileName, file);

  if (error) {
    console.error("Error uploading media:", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(fileName);

  const extension = file.name.split(".").pop()?.toLowerCase();
  let type: MediaItem["type"] = "image";

  if (extension === "gif") {
    type = "gif";
  } else if (["mp4", "webm", "mov", "avi"].includes(extension || "")) {
    type = "video";
  }

  return {
    id: fileName,
    name: fileName,
    url: publicUrl,
    type,
    created_at: new Date().toISOString(),
  };
}

export async function deleteMedia(fileName: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase not configured");
    return false;
  }

  const { error } = await supabase.storage.from("media").remove([fileName]);

  if (error) {
    console.error("Error deleting media:", error);
    return false;
  }

  return true;
}
