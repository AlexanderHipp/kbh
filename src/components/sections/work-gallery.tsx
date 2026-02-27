"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { useWorkModal } from "@/hooks/use-work-modal";
import { useCategories, useCategory, categoryToWorkItem } from "@/hooks/use-categories";
import { WorkModal } from "@/components/work-modal";
import type { CategoryWithThumbnailUrl } from "@/lib/supabase-categories";
import type { Locale } from "@/lib/i18n";

function WorkGalleryContent() {
  const { locale, t } = useLocale();
  const { activeSlug, openWork, closeWork } = useWorkModal();
  const { categories, isLoading } = useCategories();
  const { category: activeCategory } = useCategory(activeSlug);

  if (isLoading) {
    return <WorkGallerySkeleton />;
  }

  const activeItem = activeCategory ? categoryToWorkItem(activeCategory) : null;

  return (
    <>
      <div className="rounded-sm border border-border/80 p-3 md:p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <WorkTile
            key={category.slug}
            category={category}
            locale={locale}
            onClick={() => openWork(category.slug)}
          />
        ))}
        </div>
      </div>

      {activeItem && (
        <WorkModal item={activeItem} locale={locale} onClose={closeWork} />
      )}
    </>
  );
}

export function WorkGallery() {
  const { t } = useLocale();

  return (
    <section id="work" className="scroll-mt-24 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.work.title}
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {t.work.subtitle}
        </p>

        <Suspense fallback={<WorkGallerySkeleton />}>
          <WorkGalleryContent />
        </Suspense>
      </div>
    </section>
  );
}

interface WorkTileProps {
  category: CategoryWithThumbnailUrl;
  locale: Locale;
  onClick: () => void;
}

function WorkTile({ category, locale, onClick }: WorkTileProps) {
  const title = locale === "de" ? category.title_de : category.title_en;
  const subtitle = locale === "de" ? category.subtitle_de : category.subtitle_en;

  return (
    <button onClick={onClick} className="group w-full cursor-pointer text-left">
      <article className="h-full overflow-hidden rounded-sm border-2 border-border bg-card p-3 transition-colors group-hover:border-muted-foreground/40">
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-sm border border-border/70 bg-muted">
        {category.thumbnail_url && (
          <Image
            src={category.thumbnail_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <h3 className="mb-1 text-lg font-medium transition-colors group-hover:text-muted-foreground">
        {title}
      </h3>
      {subtitle && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
      </article>
    </button>
  );
}

function WorkGallerySkeleton() {
  return (
    <div className="rounded-sm border border-border/80 p-3 md:p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-sm border-2 border-border bg-card p-3">
          <div className="mb-4 aspect-[4/3] rounded-sm border border-border/70 bg-muted" />
          <div className="mb-2 h-5 w-32 rounded bg-muted" />
          <div className="h-4 w-24 rounded bg-muted" />
        </div>
      ))}
      </div>
    </div>
  );
}
