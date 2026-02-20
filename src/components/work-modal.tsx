"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
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
        className="max-w-7xl max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
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
