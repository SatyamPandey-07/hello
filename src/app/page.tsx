import PorscheScene from "@/components/canvas/PorscheScene";
import OverlayUI from "@/components/ui/OverlayUI";

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0a]">
      <PorscheScene />
      <OverlayUI />
    </main>
  );
}
