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
        className="max-h-[95vh] w-[min(96vw,1500px)] max-w-[96vw] overflow-y-auto p-5 sm:p-8"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute -top-12 right-0 z-20"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogClose>
        <VisuallyHidden.Root>
          <DialogTitle>{item.title[locale]}</DialogTitle>
        </VisuallyHidden.Root>
        <WorkDetailWithMedia
          item={item}
          locale={locale}
          isModal={true}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
