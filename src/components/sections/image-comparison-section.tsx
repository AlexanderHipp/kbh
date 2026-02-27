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
    <section className="py-24 ">
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.imageComparison.title}
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {t.imageComparison.subtitle}
        </p>

        <div className="relative aspect-square mx-auto rounded-sm overflow-hidden">
          <ImageComparison className="h-full w-full">
            {/* 3D rendered product - shown on left side */}
            <ImageComparisonImage
              src="/images/right.jpeg"
              alt="3D rendered medical instrument"
              position="left"
              className="rotate-90 scale-[1.35]"
            />
            {/* CAD wireframe - revealed on right side */}
            <ImageComparisonImage
              src="/images/left.jpeg"
              alt="CAD wireframe design"
              position="right"
              className="rotate-90 scale-[1.35]"
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
                    d="M9 17l-5-5 5-5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7l5 5-5 5"
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
