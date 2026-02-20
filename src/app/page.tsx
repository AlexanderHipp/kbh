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
        <ImageComparisonSection />
        <WorkGallery />
        <Services />
        <Process />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
