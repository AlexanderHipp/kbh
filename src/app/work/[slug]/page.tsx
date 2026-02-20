import { notFound } from "next/navigation";
import { getWorkBySlug, workItems, type WorkItem } from "@/data/work-items";
import { getProjectBySlug, getProjects, type Project } from "@/lib/supabase-projects";
import { getLocale } from "@/lib/i18n/get-locale";
import { WorkDetailPage } from "./work-detail-page";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

// Convert Project to WorkItem format
function projectToWorkItem(project: Project): WorkItem {
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
    media: [], // Media is loaded separately via WorkDetailWithMedia
  };
}

// Generate static params - fetch from Supabase with fallback
export async function generateStaticParams() {
  const projects = await getProjects();

  if (projects.length > 0) {
    return projects.map((project) => ({
      slug: project.slug,
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
  const project = await getProjectBySlug(slug);

  if (project) {
    const title = locale === "de" ? project.title_de : project.title_en;
    const description = locale === "de" ? project.description_de : project.description_en;

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
  const project = await getProjectBySlug(slug);

  if (project) {
    const item = projectToWorkItem(project);
    return <WorkDetailPage item={item} locale={locale} />;
  }

  // Fallback to static data
  const item = getWorkBySlug(slug);

  if (!item) {
    notFound();
  }

  return <WorkDetailPage item={item} locale={locale} />;
}
