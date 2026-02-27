"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash.replace("#", ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string,
    callback?: () => void,
  ) => {
    callback?.();

    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 72;
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        window.history.replaceState(null, "", `/#${section}`);
        window.scrollTo({
          top: elementTop - headerOffset,
          behavior: "smooth",
        });
      }
    }
  };

  const NavLinks = ({ onClick, mobile }: { onClick?: () => void; mobile?: boolean }) => (
    <>
      {navSections.map((section) => (
        <Link
          key={section}
          href={`/#${section}`}
          onClick={(e) => handleNavClick(e, section, onClick)}
          className={mobile
            ? "text-lg font-medium text-foreground hover:text-muted-foreground transition-colors py-2"
            : `text-sm transition-colors ${
                activeHash === section
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`
          }
        >
          {t.nav[section]}
        </Link>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4 max-w-6xl">
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
        >
          <Image
            src="/kbh-logo.svg"
            alt="Kreativbüro Hipp"
            width={240}
            height={20}
            className="h-5 w-auto dark:invert"
            priority
          />
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
            <SheetContent side="right" className="w-[280px] bg-background">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6 px-4">
                <NavLinks onClick={() => setIsOpen(false)} mobile />
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
