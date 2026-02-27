"use client";

import { cn } from "@/lib/utils";

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 24,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-infinite-scroll-reverse" : "animate-infinite-scroll"
        )}
        style={{ gap: `${gap}px` }}
      >
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
