import PorscheScene from "@/components/canvas/PorscheScene";
import OverlayUI from "@/components/ui/OverlayUI";

export default function Home() {
  return (
    <main className="relative bg-porsche-grey">
      {/* 3D Scene - Fixed Background */}
      <PorscheScene />

      {/* Narrative UI - Scrollable Content */}
      <OverlayUI />
    </main>
  );
}
