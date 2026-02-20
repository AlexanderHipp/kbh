"use client";

import { useLocale } from "@/lib/i18n";
import { InfiniteSlider } from "@/components/core/infinite-slider";

const placeholderLogos = [
  { src: "https://placehold.co/160x60/e2e8f0/64748b?text=Partner+1", alt: "Partner 1" },
  { src: "https://placehold.co/160x60/e2e8f0/64748b?text=Partner+2", alt: "Partner 2" },
  { src: "https://placehold.co/160x60/e2e8f0/64748b?text=Partner+3", alt: "Partner 3" },
  { src: "https://placehold.co/160x60/e2e8f0/64748b?text=Partner+4", alt: "Partner 4" },
  { src: "https://placehold.co/160x60/e2e8f0/64748b?text=Partner+5", alt: "Partner 5" },
  { src: "https://placehold.co/160x60/e2e8f0/64748b?text=Partner+6", alt: "Partner 6" },
];

export function Clients() {
  const { t } = useLocale();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.clients.title}
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {t.clients.subtitle}
        </p>
      </div>

      <InfiniteSlider gap={48}>
        {placeholderLogos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="h-16 w-40 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />
        ))}
      </InfiniteSlider>
    </section>
  );
}
