"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navSections = ["work", "about", "services", "contact"] as const;

export function Navigation() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string,
    callback?: () => void
  ) => {
    callback?.();

    // If on home page, handle smooth scroll manually
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If not on home page, let the browser navigate to /#section
  };

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navSections.map((section) => (
        <Link
          key={section}
          href={`/#${section}`}
          onClick={(e) => handleNavClick(e, section, onClick)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {t.nav[section]}
        </Link>
      ))}
      <Link
        href="/imprint"
        onClick={onClick}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {t.nav.imprint}
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4 max-w-6xl">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          Kreativbüro Hipp
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            <NavLinks />
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <NavLinks onClick={() => setIsOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Theme and Language toggles */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
