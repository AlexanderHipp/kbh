"use client";

import { useLocale } from "@/lib/i18n";

export function Process() {
  const { t } = useLocale();

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          {t.process.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.process.steps.map((step, index) => (
            <div key={index} className="space-y-3">
              <span className="text-4xl font-light text-muted-foreground/50">
                {step.number}
              </span>
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
