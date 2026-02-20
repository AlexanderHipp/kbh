import { getMediaItems } from "@/lib/supabase";
import { MediaPageClient } from "@/components/media-page-client";

export default async function Home() {
  const media = await getMediaItems();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Media Gallery
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage your images, GIFs, and videos
          </p>
        </header>

        <MediaPageClient initialMedia={media} />
      </main>
    </div>
  );
}
