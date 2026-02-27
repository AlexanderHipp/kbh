"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const toolLogos: Record<string, string> = {
  solidworks: "/software/solidworks.svg",
  keyshot: "/software/keyshot.svg",
  autocad: "/software/autodesk.svg",
};

export function Tools() {
  const { t } = useLocale();

  return (
    <section id="tools" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-5">
          {t.tools.title}
        </h2>
        <p className="text-lg text-muted-foreground mb-14 max-w-3xl">
          {t.tools.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {t.tools.items.map((tool) => {
            const logoSrc =
              toolLogos[tool.name.toLowerCase()] ?? "/software/autodesk.svg";

            return (
              <Card
                key={tool.name}
                className="rounded-sm border-border shadow-none bg-card"
              >
                <CardHeader className="space-y-2 pb-0">
                  <div className="flex min-h-28 items-center justify-center rounded-sm bg-background dark:bg-white px-1 pb-2 pt-1 border border-border">
                    <Image
                      src={logoSrc}
                      alt={`${tool.name} logo`}
                      width={280}
                      height={72}
                      className="h-16 w-auto opacity-95"
                    />
                  </div>
                  <CardTitle className="text-xl -mb-4">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
