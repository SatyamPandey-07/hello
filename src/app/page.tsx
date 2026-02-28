import PorscheScene from "@/components/canvas/PorscheScene";
import OverlayUI from "@/components/ui/OverlayUI";
import FeatureCards from "@/components/sections/FeatureCards";
import ModelShowcase from "@/components/sections/ModelShowcase";
import TechnologySection from "@/components/sections/TechnologySection";
import ParallaxGallery from "@/components/sections/ParallaxGallery";
import ARExperienceCTA from "@/components/sections/ARExperienceCTA";
import Footer from "@/components/sections/Footer";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0a]">
      {/* Central 3D Loading Screen */}
      <GlobalLoader />

      {/* Hero 3D Scene with Overlay */}
      <PorscheScene />
      <OverlayUI />
      
      {/* Feature Cards Section */}
      <FeatureCards />
      
      {/* Model Showcase Carousel */}
      <ModelShowcase />
      
      {/* Technology Timeline */}
      <TechnologySection />
      
      {/* Parallax Gallery */}
      <ParallaxGallery />
      
      {/* AR Test Drive Experience */}
      <ARExperienceCTA />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
