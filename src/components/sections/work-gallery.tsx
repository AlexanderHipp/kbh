"use client";

import { Suspense } from "react";
import Image from "next/image";
import { workItems, getWorkBySlug } from "@/data/work-items";
import { useLocale } from "@/lib/i18n";
import { useWorkModal } from "@/hooks/use-work-modal";
import { WorkModal } from "@/components/work-modal";
import type { WorkItem } from "@/data/work-items";
import type { Locale } from "@/lib/i18n";

function WorkGalleryContent() {
  const { locale, t } = useLocale();
  const { activeSlug, openWork, closeWork } = useWorkModal();
  const activeItem = activeSlug ? getWorkBySlug(activeSlug) : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {workItems.map((item) => (
          <WorkTile
            key={item.slug}
            item={item}
            locale={locale}
            onClick={() => openWork(item.slug)}
          />
        ))}
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
    <section id="work" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          {t.work.title}
        </h2>

        <Suspense fallback={<WorkGallerySkeleton />}>
          <WorkGalleryContent />
        </Suspense>
      </div>
    </section>
  );
}

interface WorkTileProps {
  item: WorkItem;
  locale: Locale;
  onClick: () => void;
}

function WorkTile({ item, locale, onClick }: WorkTileProps) {
  return (
    <button
      onClick={onClick}
      className="group text-left w-full"
    >
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-4">
        <Image
          src={item.thumbnail}
          alt={item.title[locale]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <h3 className="text-lg font-medium mb-1 group-hover:text-muted-foreground transition-colors">
        {item.title[locale]}
      </h3>
      <p className="text-sm text-muted-foreground">
        {item.category} · {item.year}
      </p>
    </button>
  );
}

function WorkGallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] rounded-lg bg-muted mb-4" />
          <div className="h-5 w-32 bg-muted rounded mb-2" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
