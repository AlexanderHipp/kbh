"use client";

import { useLocale } from "@/lib/i18n";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function Process() {
  const { t } = useLocale();

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          {t.process.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.process.steps.map((step, index) => (
            <Card key={index} className="rounded-sm border-border shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                  <span className="text-xl font-semibold text-foreground">
                    {step.number}
                  </span>
                </div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
