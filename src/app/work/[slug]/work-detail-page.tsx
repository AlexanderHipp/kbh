"use client";

import { WorkDetailWithMedia } from "@/components/work-detail-with-media";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import type { WorkItem } from "@/data/work-items";
import type { Locale } from "@/lib/i18n";

interface WorkDetailPageProps {
  item: WorkItem;
  locale: Locale;
}

export function WorkDetailPage({ item, locale }: WorkDetailPageProps) {
  return (
    <>
      <Navigation />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <WorkDetail item={item} locale={locale} isModal={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}
