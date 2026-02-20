import { Hero } from "@/components/sections/hero";
import { ImageComparisonSection } from "@/components/sections/image-comparison-section";
import { WorkGallery } from "@/components/sections/work-gallery";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Clients } from "@/components/sections/clients";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <div className="container mx-auto px-4 max-w-6xl border border-muted/80 border-l-2 border-r-2 border-t-0 border-b-0 ">
          <ImageComparisonSection />
          <Clients />
          <WorkGallery />
          <Services />
          <Process />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
