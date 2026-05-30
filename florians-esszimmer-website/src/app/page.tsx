"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import Fachwerk from "@/components/Fachwerk";
import Hours from "@/components/Hours";
import Reviews from "@/components/Reviews";

const INFO = {
  tel: "01515 2495659",
  telLink: "+4915152495659",
  mail: "florians-esszimmer@web.de",
  strasse: "Mittelstraße 100",
  plz: "32657 Lemgo",
  rating: "4,8",
  maps: "https://www.google.com/maps/search/?api=1&query=Florians+Esszimmer+Mittelstra%C3%9Fe+100+Lemgo",
  instagram: "https://www.instagram.com/florians_esszimmer_/",
};

// Beispielbilder (lizenzfrei, Unsplash) — durch echte Restaurant-Fotos ersetzbar
const IMG = (id: string, w = 1000) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;
const HERO_IMG = IMG("1517248135467-4c7edcad34c4", 1200);
const FEATURE_IMG = IMG("1466978913421-dad2ebd01d17", 1400);

const SIGNATURES = [
  { n: "Ente", d: "Klassisch, präzise gegart. Ein Gästeliebling." },
  { n: "Scholle", d: "Fisch der Saison, ehrlich und fein." },
  { n: "Schnitzel", d: "Handwerk auf den Punkt, nichts Überflüssiges." },
];

const PAIRING = [
  { spirit: "Be Gin Man", gang: "Zum Auftakt", d: "Hausgin aus 28 regionalen Zutaten." },
  { spirit: "Obstbrand", gang: "Zum Hauptgang", d: "Reife Frucht aus eigenem Anbau, im Fass gereift." },
  { spirit: "Hauslikör", gang: "Zum Ausklang", d: "Süß, samtig, ehrlich." },
];

const GALERIE = [
  { label: "Der Gastraum", src: IMG("1544148103-0773bf10d330", 800) },
  { label: "Kerzenlicht", src: IMG("1551218808-94e220e084d2", 800) },
  { label: "Aus der Küche", src: IMG("1592861956120-e524fc739696", 800) },
  { label: "Aus der Brennerei", src: IMG("1424847651672-bf20a4b0982b", 800) },
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* ── Topbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-14 flex items-center justify-between">
          <a href="#top" className="font-display uppercase text-lg md:text-xl tracking-tight">
            Florian&apos;s Esszimmer
          </a>
          <nav className="hidden md:flex items-center gap-7 label">
            <a href="#konzept" className="hover:text-red transition-colors">Konzept</a>
            <a href="#herkunft" className="hover:text-red transition-colors">1284</a>
            <a href="#kueche" className="hover:text-red transition-colors">Küche</a>
            <a href="#besuch" className="hover:text-red transition-colors">Besuch</a>
          </nav>
          <a href={`tel:${INFO.telLink}`} className="bg-red text-paper px-4 py-2 label hover:bg-ink transition-colors">
            Reservieren
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="relative pt-14 border-b-2 border-ink">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.4fr_1fr]">
          <div className="px-5 md:px-8 py-14 md:py-20 lg:border-r-2 border-ink">
            <Reveal>
              <div className="flex items-center gap-3 label text-muted mb-8">
                <span className="text-red text-base leading-none">●</span>
                Lemgo · Mittelstraße 100 · seit 2025
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display uppercase leading-[0.86] text-ink text-[clamp(3.2rem,11vw,9rem)]">
                Florian&apos;s
                <span className="block text-red">Esszimmer</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-ink/80 text-lg leading-relaxed">
                Saisonal. Regional. Bei Kerzenlicht. Ein kleines Haus in der Lemgoer Altstadt,
                ehrliche Küche, begleitet von Spirituosen der eigenen Gutshof-Brennerei.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a href={`tel:${INFO.telLink}`} className="bg-ink text-paper px-7 py-4 font-display uppercase text-lg hover:bg-red transition-colors">
                  Tisch reservieren
                </a>
                <span className="label text-muted">{INFO.rating} ★ · 46 Google-Bewertungen</span>
              </div>
            </Reveal>
          </div>
          <div className="relative min-h-[42vh] lg:min-h-full">
            <Image src={HERO_IMG} alt="Florian's Esszimmer in Lemgo" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover grayscale-[15%]" priority />
            <div className="absolute inset-0 bg-ink/10" />
            <Fachwerk className="absolute inset-0 text-red/30" />
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee items={["4-Gang-Menü", "Kerzenlicht", "Seit 1284", "Regional & Saisonal", "Lemgo · Lippe", "Gutshof Brennerei"]} />

      {/* ── 01 Konzept ── */}
      <section id="konzept" className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-8 px-5 md:px-8 py-20 md:py-28">
          <div className="md:col-span-3">
            <span className="font-display text-red text-7xl md:text-8xl leading-none">01</span>
            <p className="label text-muted mt-3">Das Konzept</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <p className="font-display uppercase text-ink text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.05]">
                Erdig, doch überraschend. Eine Karte, die mit der Saison <span className="text-red">wechselt</span>, regional eingekauft, frisch gedacht.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-ink/75 leading-relaxed">
                Küchenchef Florian Grönnert kocht, was die Region hergibt. Nichts liegt herum, nichts
                ist beliebig. Dazu Kerzenlicht, ein paar gute Weine und Brände aus dem eigenen Haus,
                in einem Raum für nur 40 Gäste.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Feature-Bild ── */}
      <section className="relative h-[55vh] md:h-[75vh] border-b-2 border-ink overflow-hidden">
        <Image src={FEATURE_IMG} alt="Abend bei Kerzenlicht" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full">
          <div className="mx-auto max-w-7xl px-5 md:px-8 pb-10">
            <Reveal>
              <p className="font-display uppercase text-paper text-[clamp(1.8rem,5vw,4rem)] leading-[0.95] max-w-3xl">
                Ein Tisch, ein Kerzenschein,<br />
                <span className="text-red">ein Abend, der bleibt.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 02 Herkunft (invertiert) ── */}
      <section id="herkunft" className="relative border-b-2 border-ink bg-ink text-paper overflow-hidden">
        <Fachwerk className="absolute right-0 top-0 h-full w-1/2 text-paper/5" />
        <div className="relative mx-auto max-w-7xl grid md:grid-cols-12 gap-8 px-5 md:px-8 py-20 md:py-28">
          <div className="md:col-span-3">
            <span className="font-display text-paper text-7xl md:text-8xl leading-none">02</span>
            <p className="label text-paper/50 mt-3">Die Herkunft</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <div className="font-display uppercase text-red leading-[0.8] text-[clamp(5rem,20vw,16rem)]">1284</div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 font-display uppercase text-paper text-2xl md:text-3xl">Begatal. Seit über 700 Jahren.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-paper/70 leading-relaxed">
                Hinter dem Esszimmer steht die Gutshof Brennerei Begatal. Die Familie Begemann
                bewirtschaftet das Begatal seit dem Jahr 1284. In einer sanierten Fachwerkscheune
                entstehen feine Destillate aus regionalen Zutaten. Küche und Brennerei aus einer Hand.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 Küche ── */}
      <section id="kueche" className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-3">
              <span className="font-display text-red text-7xl md:text-8xl leading-none">03</span>
              <p className="label text-muted mt-3">Die Küche</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display uppercase text-ink text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95]">
                Was unsere<br /><span className="text-red">Gäste lieben</span>
              </h2>
              <p className="mt-4 text-muted text-sm max-w-md">
                Die Karte wechselt mit der Saison. Diese Klassiker kommen immer wieder gut an.
              </p>
            </div>
          </div>
          <div className="border-t-2 border-ink">
            {SIGNATURES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="group grid md:grid-cols-12 gap-4 items-baseline py-7 px-2 -mx-2 border-b border-line hover:bg-ink hover:text-paper transition-colors">
                  <span className="md:col-span-1 label text-muted group-hover:text-paper/60">0{i + 1}</span>
                  <span className="md:col-span-3 font-display uppercase text-3xl md:text-4xl">{s.n}</span>
                  <span className="md:col-span-8 text-ink/70 group-hover:text-paper/80">{s.d}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 label text-muted">
            4-Gang-Menü & Candle-Light-Dinner auf Anfrage ·{" "}
            <a href={`tel:${INFO.telLink}`} className="text-red border-b-2 border-red hover:text-ink hover:border-ink">telefonisch reservieren</a>
          </p>
        </div>
      </section>

      {/* ── Pairing ── */}
      <section className="border-b-2 border-ink bg-panel">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
          <Reveal>
            <h2 className="font-display uppercase text-ink text-[clamp(2rem,5.5vw,4rem)] leading-[0.95] mb-12">
              Jeder Gang trifft<br /><span className="text-red">sein Destillat</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 border-2 border-ink divide-y md:divide-y-0 md:divide-x divide-ink">
            {PAIRING.map((p, i) => (
              <Reveal key={p.spirit} delay={i * 0.08}>
                <div className="bg-paper p-8 h-full">
                  <span className="font-display text-red text-5xl leading-none">0{i + 1}</span>
                  <p className="label text-muted mt-4">{p.gang}</p>
                  <h3 className="font-display uppercase text-ink text-2xl mt-1">{p.spirit}</h3>
                  <p className="mt-3 text-ink/70 text-sm leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galerie ── */}
      <section className="border-b-2 border-ink">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-ink">
          {GALERIE.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.06}>
              <div className="group relative aspect-[3/4] overflow-hidden">
                <Image src={g.src} alt={g.label} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="absolute bottom-0 left-0 p-4 font-display uppercase text-paper text-lg">{g.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center label text-muted/60 py-4">Beispielbilder, durch echte Fotos vom Restaurant ersetzbar</p>
      </section>

      {/* ── Reviews ── */}
      <Reviews />

      {/* ── 04 Besuch: Telefon + Öffnungszeiten ── */}
      <section id="besuch" className="border-t-2 border-ink">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2">
          <div className="px-5 md:px-8 py-16 md:py-24 md:border-r-2 border-ink">
            <span className="font-display text-red text-7xl md:text-8xl leading-none">04</span>
            <p className="label text-muted mt-3 mb-6">Reservierung nur telefonisch</p>
            <h2 className="font-display uppercase text-ink text-[clamp(2.2rem,6vw,4rem)] leading-[0.9]">
              Ein Anruf,<br /><span className="text-red">ein Tisch.</span>
            </h2>
            <a href={`tel:${INFO.telLink}`} className="group mt-8 inline-flex items-center gap-4 bg-ink text-paper px-7 py-5 hover:bg-red transition-colors">
              <span className="text-2xl">☎</span>
              <span className="font-display uppercase text-2xl md:text-4xl tabular-nums">{INFO.tel}</span>
            </a>
            <div className="mt-8 text-sm">
              <p className="text-ink">{INFO.strasse}, {INFO.plz}</p>
              <a href={INFO.maps} target="_blank" rel="noopener noreferrer" className="label text-red border-b-2 border-red pb-0.5 hover:text-ink hover:border-ink inline-block mt-2">
                Auf der Karte ansehen →
              </a>
            </div>
          </div>
          <div className="px-5 md:px-8 py-16 md:py-24 bg-panel">
            <Hours />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="font-display uppercase text-3xl">
            Florian&apos;s <span className="text-red">Esszimmer</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 label text-paper/70">
            <a href={`tel:${INFO.telLink}`} className="hover:text-red transition-colors">{INFO.tel}</a>
            <a href={INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-red transition-colors">Instagram</a>
            <span>{INFO.strasse}, {INFO.plz}</span>
          </div>
        </div>
        <div className="border-t border-paper/15">
          <p className="mx-auto max-w-7xl px-5 md:px-8 py-5 label text-paper/40">
            Entwurf · unverbindliche Design-Vorschau
          </p>
        </div>
      </footer>
    </main>
  );
}
