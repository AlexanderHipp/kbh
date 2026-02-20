"use client";

import { useLocale } from "@/lib/i18n";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/motion-primitives/image-comparison";

export function ImageComparisonSection() {
  const { t } = useLocale();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-12">
          {t.imageComparison.title}
        </h2>

        <div className="relative aspect-[16/9] max-w-4xl mx-auto rounded-lg overflow-hidden">
          <ImageComparison className="h-full w-full">
            {/* Left image (shown on right side of slider) */}
            <ImageComparisonImage
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop&auto=format"
              alt="Before"
              position="left"
            />
            {/* Right image (shown on left side of slider) */}
            <ImageComparisonImage
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop&auto=format"
              alt="After"
              position="right"
            />
            <ImageComparisonSlider className="bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </ImageComparisonSlider>
          </ImageComparison>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded text-sm font-medium">
            {t.imageComparison.labelLeft}
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded text-sm font-medium">
            {t.imageComparison.labelRight}
          </div>
        </div>
      </div>
    </section>
  );
}
