"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkItem } from "@/data/work-items";
import type { Locale } from "@/lib/i18n";

interface WorkDetailProps {
  item: WorkItem;
  locale: Locale;
  isModal?: boolean;
  onClose?: () => void;
}

export function WorkDetail({
  item,
  locale,
  isModal = false,
  onClose,
}: WorkDetailProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className="relative">
      {/* Back button for page view */}
      {!isModal && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-6 -ml-2 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      )}

      {/* Title and description - full width */}
      <div className="mb-8">
        <h1 className="mb-2 mx-0 max-w-none text-left text-2xl font-semibold leading-tight tracking-tight">
          {item.title[locale]}
        </h1>
        {item.subtitle && (
          <p className="text-lg text-muted-foreground mb-4">
            {item.subtitle[locale]}
          </p>
        )}
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          {item.description[locale]}
        </p>
        {isModal && (
          <Button
            asChild
            className="mt-6"
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            <a href="#contact">
              {locale === "de" ? "Kontakt aufnehmen" : "Get in touch"}
            </a>
          </Button>
        )}
      </div>

      {/* Media gallery - two columns */}
      {item.media.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {item.media.map((media, index) => (
            <div
              key={index}
              className="relative aspect-[3/2] overflow-hidden rounded-sm bg-zinc-100"
            >
              {media.type === "video" ? (
                <video
                  src={media.src}
                  poster={media.poster}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={media.src}
                  alt={media.alt || item.title[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 50vw, 640px"
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
