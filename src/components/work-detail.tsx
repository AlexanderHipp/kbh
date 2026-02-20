"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkItem } from "@/data/work-items";
import type { Locale } from "@/lib/i18n";

interface WorkDetailProps {
  item: WorkItem;
  locale: Locale;
  isModal?: boolean;
  onClose?: () => void;
}

export function WorkDetail({ item, locale, isModal = false, onClose }: WorkDetailProps) {
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
      {/* Close/Back button */}
      {isModal ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="absolute -top-2 -right-2 z-10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      ) : (
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

      {/* Hero media */}
      {item.media[0] && (
        <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-muted mb-8">
          {item.media[0].type === "video" ? (
            <video
              src={item.media[0].src}
              poster={item.media[0].poster}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={item.media[0].src}
              alt={item.media[0].alt || item.title[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          )}
        </div>
      )}

      {/* Metadata and content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left column - metadata */}
        <div className="space-y-4">
          {item.role && (
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium">{item.role}</p>
            </div>
          )}
          {item.client && (
            <div>
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="font-medium">{item.client}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground">Year</p>
            <p className="font-medium">{item.year}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium">{item.category}</p>
          </div>
        </div>

        {/* Right column - title and description */}
        <div className="md:col-span-2">
          <h1 className="text-2xl font-semibold mb-2">{item.title[locale]}</h1>
          {item.subtitle && (
            <p className="text-lg text-muted-foreground mb-4">
              {item.subtitle[locale]}
            </p>
          )}
          <p className="text-muted-foreground leading-relaxed">
            {item.description[locale]}
          </p>
        </div>
      </div>

      {/* Additional media gallery */}
      {item.media.length > 1 && (
        <div className="space-y-4">
          {item.media.slice(1).map((media, index) => (
            <div
              key={index}
              className="relative aspect-[3/2] rounded-lg overflow-hidden bg-muted"
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
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
