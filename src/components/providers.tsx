"use client";

import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  locale: Locale;
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
