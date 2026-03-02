"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { WorkDetailWithMedia } from "@/components/work-detail-with-media";
import type { WorkItem } from "@/data/work-items";
import type { Locale } from "@/lib/i18n";

interface WorkModalProps {
  item: WorkItem;
  locale: Locale;
  onClose: () => void;
}

export function WorkModal({ item, locale, onClose }: WorkModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-[98vw] max-w-[98vw] overflow-visible p-0 sm:!max-w-7xl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute -top-10 2xl:top-0 right-0 2xl:-right-24 z-30 gap-2"
            aria-label="Close popup"
          >
            <X className="h-4 w-4" />
            Close
          </Button>
        </DialogClose>
        <VisuallyHidden.Root>
          <DialogTitle>{item.title[locale]}</DialogTitle>
        </VisuallyHidden.Root>
        <div className="max-h-[95vh] overflow-y-auto p-3 sm:p-5">
          <WorkDetailWithMedia
            item={item}
            locale={locale}
            isModal={true}
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
