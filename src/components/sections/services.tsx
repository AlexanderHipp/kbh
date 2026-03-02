"use client";

import { useLocale } from "@/lib/i18n";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const serviceImages = [
  "/images/services/medical.png",
  "/images/services/innovation.png",
  "/images/services/development.png",
  "/images/services/series.png",
];

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="scroll-mt-24 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.services.items.map((item, index) => (
            <Card
              key={index}
              className="rounded-sm border-muted shadow-none overflow-hidden flex flex-row py-0"
            >
              <div className="w-1/3 shrink-0 self-stretch overflow-hidden">
                <img
                  src={serviceImages[index]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="flex-1 justify-start py-6 px-2 mr-4">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
