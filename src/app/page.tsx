import ScrollReset from "@/components/ScrollReset";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Artist from "@/components/Artist";
import FlashDesigns from "@/components/FlashDesigns";
import StylesSection from "@/components/StylesSection";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* ── Infrastructure ── */}
      <SmoothScroll />
      <ScrollReset />
      <ScrollProgress />
      <WhatsAppButton />
      <CustomCursor />
      <Navbar />

      {/* ── 1. Hero — Phoenix particle scene ── */}
      <Hero />

      {/* ── 2. Trust indicators ── */}
      <Stats />

      {/* ── 3. Artist / About ── */}
      <Artist />

      {/* ── 4. Flash Designs / Inspiration ── */}
      <FlashDesigns />

      {/* ── 5. Styles — horizontal scroll ── */}
      <StylesSection />

      {/* ── 6. Portfolio — masonry gallery ── */}
      <Gallery />

      {/* ── 7. Reviews ── */}
      <Reviews />

      {/* ── 8. Process ── */}
      <Process />

      {/* ── 9. FAQ ── */}
      <FAQ />

      {/* ── 10. Contact — glassmorphism booking ── */}
      <Contact />

      <Footer />
    </main>
  );
}
