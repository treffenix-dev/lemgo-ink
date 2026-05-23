import ScrollReset from "@/components/ScrollReset";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Artist from "@/components/Artist";
import FlashDesigns from "@/components/FlashDesigns";
import Styles from "@/components/Styles";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <SmoothScroll />
      <ScrollReset />
      <ScrollProgress />
      <WhatsAppButton />
      <Navbar />

      {/* 1. Hero — Sofort-Eindruck + Headline */}
      <Hero />

      {/* 2. Trust / Zahlen — sofortige Glaubwürdigkeit */}
      <Stats />

      {/* 3. Über die Künstlerin — wer steckt dahinter */}
      <Artist />

      {/* 4. Wanna DOs — Inspiration & Motive */}
      <FlashDesigns />

      {/* 5. Stile — Services / was ich anbiete */}
      <Styles />

      {/* 6. Portfolio — Social Proof durch Arbeit */}
      <Gallery />

      {/* 7. Kundenbewertungen — Social Proof durch Stimmen */}
      <Reviews />

      {/* 8. Ablauf — Vertrauen durch Transparenz */}
      <Process />

      {/* 9. FAQ — Einwände ausräumen vor dem CTA */}
      <FAQ />

      {/* 10. Kontakt — finaler Call to Action */}
      <Contact />

      <Footer />
    </main>
  );
}
