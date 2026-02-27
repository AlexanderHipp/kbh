"use client";

import { useLocale } from "@/lib/i18n";
import { InfiniteSlider } from "@/components/core/infinite-slider";

const partnerLogos = [
  { src: "/partners/ustomed.svg", alt: "Ustomed" },
  { src: "/partners/as.svg", alt: "AS" },
  { src: "/partners/bees.svg", alt: "Bees" },
  { src: "/partners/brokker.svg", alt: "Brokker" },
  { src: "/partners/dewimed.svg", alt: "Dewimed" },
  { src: "/partners/fetzer.svg", alt: "Fetzer" },
  { src: "/partners/kapp.svg", alt: "Kapp" },
  { src: "/partners/leibinger.svg", alt: "Leibinger" },
  { src: "/partners/lizard.svg", alt: "Lizard" },
  { src: "/partners/medtorque.svg", alt: "Medtorque" },
  { src: "/partners/nexor.svg", alt: "Nexor" },
  { src: "/partners/oertel.svg", alt: "Oertel" },
  { src: "/partners/ortho.svg", alt: "Ortho" },
  { src: "/partners/pacific.svg", alt: "Pacific" },
  { src: "/partners/rudolfstorz.svg", alt: "Rudolf Storz" },
  { src: "/partners/rz.svg", alt: "RZ" },
  { src: "/partners/surgical.svg", alt: "Surgical" },
  { src: "/partners/swiss.svg", alt: "Swiss" },
  { src: "/partners/taurus.svg", alt: "Taurus" },
  { src: "/partners/medcare.svg", alt: "Medcare" },
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
        {partnerLogos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="partner-logo h-20 w-auto rounded-sm object-contain"
          />
        ))}
      </InfiniteSlider>
    </section>
  );
}
