"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <h1 className="text-4xl font-semibold tracking-tight mb-6">
          {t.hero.headline}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          {t.hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#work">{t.hero.cta_primary}</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">{t.hero.cta_secondary}</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
