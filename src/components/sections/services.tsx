"use client";

import { useLocale } from "@/lib/i18n";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const serviceImages = [
  "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format",
];

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          {t.services.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.items.map((item, index) => (
            <Card key={index} className="rounded-sm border-border shadow-none overflow-hidden flex flex-row py-0">
              <div className="w-1/3 shrink-0 self-stretch overflow-hidden">
                <img
                  src={serviceImages[index]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="flex-1 justify-center py-6">
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
