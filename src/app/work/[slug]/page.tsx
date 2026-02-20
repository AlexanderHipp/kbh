import { notFound } from "next/navigation";
import { getWorkBySlug, workItems } from "@/data/work-items";
import { getLocale } from "@/lib/i18n/get-locale";
import { WorkDetailPage } from "./work-detail-page";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all work items
export function generateStaticParams() {
  return workItems.map((item) => ({
    slug: item.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  const locale = await getLocale();

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
  const item = getWorkBySlug(slug);
  const locale = await getLocale();

  if (!item) {
    notFound();
  }

  return <WorkDetailPage item={item} locale={locale} />;
}
