"use client";

import { useLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 text-xs font-medium uppercase text-muted-foreground hover:text-foreground hover:bg-transparent"
      onClick={() => setLocale(locale === "en" ? "de" : "en")}
    >
      {locale === "en" ? "DE" : "EN"}
    </Button>
  );
}
