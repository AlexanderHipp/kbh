"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false },
);

export function Hero() {
  const { t } = useLocale();
  const words = t.hero.headline.trim().split(/\s+/);
  const splitIndex = Math.ceil(words.length / 2);
  const headlineLineOne = words.slice(0, splitIndex).join(" ");
  const headlineLineTwo = words.slice(splitIndex).join(" ");

  return (
    <section className="relative h-[800px] sm:h-[900px] lg:h-[1000px] flex items-center justify-center overflow-hidden border border-muted/80 border-b-2">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
        <h1 className="mx-auto max-w-[14ch] text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.03em] font-semibold mb-8">
          <span className="block">{headlineLineOne}</span>
          <span className="block">{headlineLineTwo}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-foreground mb-10 max-w-3xl mx-auto bg-background/75 backdrop-blur-sm border border-border/60 rounded-md px-4 py-3">
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
