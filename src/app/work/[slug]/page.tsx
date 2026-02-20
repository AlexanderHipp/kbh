import { notFound } from "next/navigation";
import { getWorkBySlug, workItems, type WorkItem } from "@/data/work-items";
import { getCategoryBySlug, getCategories, type Category } from "@/lib/supabase-categories";
import { getLocale } from "@/lib/i18n/get-locale";
import { WorkDetailPage } from "./work-detail-page";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

// Convert Category to WorkItem format
function categoryToWorkItem(category: Category): WorkItem {
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
    thumbnail: "", // Thumbnail handled by category.thumbnail_url
    media: [], // Media is loaded separately via WorkDetailWithMedia
  };
}

// Generate static params - fetch from Supabase with fallback
export async function generateStaticParams() {
  const categories = await getCategories();

  if (categories.length > 0) {
    return categories.map((category) => ({
      slug: category.slug,
    }));
  }

  // Fallback to static data
  return workItems.map((item) => ({
    slug: item.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const locale = await getLocale();

  // Try Supabase first
  const category = await getCategoryBySlug(slug);

  if (category) {
    const title = locale === "de" ? category.title_de : category.title_en;
    const description = locale === "de" ? category.description_de : category.description_en;

    return {
      title: `${title} | Studio`,
      description: description || "",
    };
  }

  // Fallback to static data
  const item = getWorkBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: `${item.title[locale]} | Studio`,
    description: item.description[locale],
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const locale = await getLocale();

  // Try Supabase first
  const category = await getCategoryBySlug(slug);

  if (category) {
    const item = categoryToWorkItem(category);
    return <WorkDetailPage item={item} locale={locale} />;
  }

  // Fallback to static data
  const item = getWorkBySlug(slug);

  if (!item) {
    notFound();
  }

  return <WorkDetailPage item={item} locale={locale} />;
}
