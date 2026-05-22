import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Artist from "@/components/Artist";
import Stats from "@/components/Stats";
import FlashDesigns from "@/components/FlashDesigns";
import Styles from "@/components/Styles";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Stats />
      <Artist />
      <FlashDesigns />
      <Styles />
      <Gallery />
      <Reviews />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
