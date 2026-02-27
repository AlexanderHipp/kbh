"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden border border-border border-b bg-background text-foreground pt-24">
      <div className="pointer-events-none absolute inset-0 " />

      <div className="relative z-10 mx-auto flex min-h-[860px] flex-col border-x border-border/70">
        <div className="flex flex-1 flex-col">
          <div className="flex min-h-[410px] flex-col items-center justify-center px-6 text-center ">
            <h1 className="text-6xl max-w-3xl mx-auto font-semibold">
              {t.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {t.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-10 bg-[#0202EF] px-6 text-white hover:bg-[#1A1AF2]"
              >
                <a href="#work">{t.hero.cta_primary}</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-10 px-6">
                <a href="#contact">{t.hero.cta_secondary}</a>
              </Button>
            </div>
          </div>

          <div className="flex flex-1 items-stretch px-4 py-6 sm:px-8 sm:py-8 max-w-6xl mx-auto w-full">
            <Card className="w-full overflow-hidden  border-border/70 bg-card p-0 shadow-none">
              <div className="relative aspect-video min-h-[340px] w-full overflow-hidden ">
                <Image
                  src="/bg.png"
                  alt="Medical technology product development"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
