import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Artist from "@/components/Artist";
import Stats from "@/components/Stats";
import Styles from "@/components/Styles";
import Gallery from "@/components/Gallery";
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
      <Styles />
      <Gallery />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
