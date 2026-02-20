"use client";

import { useLocale } from "@/lib/i18n";

export function Clients() {
  const { t } = useLocale();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          {t.clients.title}
        </h2>

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {t.clients.list.map((client, index) => (
            <span
              key={index}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
