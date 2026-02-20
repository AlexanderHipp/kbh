"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";

export function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Kreativbüro Hipp. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/imprint"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.imprint}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
