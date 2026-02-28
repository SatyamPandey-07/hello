import dynamic from "next/dynamic";
import PorscheScene from "@/components/canvas/PorscheScene";
import OverlayUI from "@/components/ui/OverlayUI";
import ARExperienceCTA from "@/components/sections/ARExperienceCTA";
import GlobalLoader from "@/components/ui/GlobalLoader";
import ModelSwitcher from "@/components/ui/ModelSwitcher";
import Navbar from "@/components/ui/Navbar";

// Lazy load section components for better initial load performance
const FeatureCards = dynamic(() => import("@/components/sections/FeatureCards"), {
  loading: () => <div className="h-screen" />,
});
const ModelShowcase = dynamic(() => import("@/components/sections/ModelShowcase"), {
  loading: () => <div className="h-screen" />,
});
const TechnologySection = dynamic(() => import("@/components/sections/TechnologySection"), {
  loading: () => <div className="h-screen" />,
});
const ParallaxGallery = dynamic(() => import("@/components/sections/ParallaxGallery"), {
  loading: () => <div className="h-screen" />,
});
const Footer = dynamic(() => import("@/components/sections/Footer"), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0a]">
      {/* Navbar */}
      <Navbar />

      {/* Central 3D Loading Screen */}
      <GlobalLoader />

      {/* Model Navigation Controls */}
      <ModelSwitcher />

      {/* Hero 3D Scene with Overlay */}
      <PorscheScene />
      <OverlayUI />
      
      {/* Feature Cards Section */}
      <div id="experience">
        <FeatureCards />
      </div>
      
      {/* Model Showcase Carousel */}
      <div id="models">
        <ModelShowcase />
      </div>
      
      {/* Technology Timeline */}
      <div id="technology">
        <TechnologySection />
      </div>
      
      {/* Parallax Gallery */}
      <div id="gallery">
        <ParallaxGallery />
      </div>
      
      {/* AR Test Drive Experience */}
      <div id="configure">
        <ARExperienceCTA />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
