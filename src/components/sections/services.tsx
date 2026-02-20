"use client";

import { useLocale } from "@/lib/i18n";

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          {t.services.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {t.services.items.map((item, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
