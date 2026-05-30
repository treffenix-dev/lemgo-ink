"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Embers from "@/components/Embers";
import Reviews from "@/components/Reviews";
import Reservation from "@/components/Reservation";

/* ───────────────────────── Daten (öffentlich recherchiert) ───────────────────────── */

const INFO = {
  name: "Florian's Esszimmer",
  ort: "Lemgo",
  strasse: "Mittelstraße 100",
  plz: "32657 Lemgo",
  tel: "01515 2495659",
  telLink: "+4915152495659",
  mail: "florians-esszimmer@web.de",
  instagram: "https://www.instagram.com/florians_esszimmer_/",
  maps: "https://www.google.com/maps/search/?api=1&query=Florians+Esszimmer+Mittelstra%C3%9Fe+100+Lemgo",
  rating: "4,8",
  zeiten: [
    ["Montag", "17:00 – 22:00"],
    ["Dienstag", "Ruhetag"],
    ["Mittwoch – Freitag", "17:00 – 22:00"],
    ["Samstag & Sonntag", "12:00 – 22:00"],
  ],
};

const SIGNATURES = [
  { n: "Ente", d: "Klassisch, präzise gegart — ein Gästeliebling." },
  { n: "Scholle", d: "Fisch der Saison, ehrlich und fein." },
  { n: "Schnitzel", d: "Handwerk auf den Punkt, nichts Überflüssiges." },
];

/* ───────────────────────── Reveal-Helfer ───────────────────────── */

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────── Seite ───────────────────────── */

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Lenis Smooth-Scroll (SSR-sicher, mit Cleanup)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  // Sanfter Parallax für den Kerzen-Glow im Hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <main className="grain relative z-10 overflow-x-hidden">
      <Embers />
      {/* ── Navigation ── */}
      <header className="fixed top-0 inset-x-0 z-40">
        <nav className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <a href="#top" className="font-display text-xl tracking-wide text-cream">
            Florian's <span className="text-gold italic">Esszimmer</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-[0.72rem] uppercase tracking-[0.2em] text-muted">
            <a href="#konzept" className="hover:text-cream transition-colors">Konzept</a>
            <a href="#herkunft" className="hover:text-cream transition-colors">Herkunft</a>
            <a href="#kueche" className="hover:text-cream transition-colors">Küche</a>
            <a href="#reservierung" className="hover:text-cream transition-colors">Reservierung</a>
          </div>
          <a
            href={`tel:${INFO.telLink}`}
            className="text-[0.7rem] uppercase tracking-[0.18em] border border-gold/40 text-gold px-4 py-2 hover:bg-gold hover:text-bg transition-colors"
          >
            Tisch reservieren
          </a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section id="top" ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Kerzenlicht-Glow */}
        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[70vh] w-[70vh] rounded-full"
          aria-hidden
        >
          <div className="h-full w-full rounded-full bg-gold/20 blur-[120px]" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,transparent_40%,rgba(11,9,7,0.9)_100%)]" aria-hidden />

        <motion.div style={{ y: heroTextY }} className="relative z-10 text-center px-6">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-7">
              <span className="h-px w-10 bg-gold/60" />
              <span className="eyebrow">Lemgo · Mittelstraße 100</span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display font-light leading-[0.95] text-cream text-[clamp(3rem,9vw,7rem)]">
              Florian's
              <br />
              <span className="text-gold italic">Esszimmer</span>
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-8 max-w-xl mx-auto text-muted text-lg leading-relaxed font-display">
              Saisonal. Regional. Bei Kerzenlicht. Ein kleines Haus in der Lemgoer
              Altstadt — ehrliche Küche, begleitet von Spirituosen der eigenen Gutshof-Brennerei.
            </p>
          </Reveal>
          <Reveal delay={0.34}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${INFO.telLink}`}
                className="bg-gold text-bg px-8 py-3.5 text-[0.72rem] uppercase tracking-[0.2em] font-medium hover:bg-gold-lt transition-colors"
              >
                Tisch reservieren
              </a>
              <a href="#kueche" className="text-[0.72rem] uppercase tracking-[0.2em] text-cream/80 border-b border-gold/40 pb-1 hover:text-cream transition-colors">
                {INFO.rating} ★ · zur Küche
              </a>
            </div>
          </Reveal>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted text-[0.6rem] uppercase tracking-[0.3em] animate-pulse">
          scrollen
        </div>
      </section>

      {/* ── Konzept ── */}
      <section id="konzept" className="relative mx-auto max-w-4xl px-6 py-32 md:py-44 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Das Konzept</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display text-cream text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.3]">
            „Erdig, doch überraschend." Eine Karte, die mit der Saison wechselt —
            <span className="text-gold"> regional eingekauft, frisch gedacht</span>,
            in einem Raum für nur 40 Gäste.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-muted leading-relaxed max-w-2xl mx-auto">
            Küchenchef Florian Grönnert kocht, was die Region hergibt — nichts liegt herum,
            nichts ist beliebig. Dazu Kerzenlicht, ein paar gute Weine und Brände aus dem
            eigenen Haus. Mehr braucht ein guter Abend nicht.
          </p>
        </Reveal>
      </section>

      {/* ── Herkunft / Seit 1284 ── */}
      <section id="herkunft" className="relative bg-surface border-y border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-40 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="eyebrow mb-6">Herkunft</p>
              <div className="font-display text-gold leading-none text-[clamp(4rem,12vw,9rem)]">1284</div>
              <p className="mt-4 text-cream font-display text-2xl">Begatal. Seit über 700 Jahren.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="text-muted leading-relaxed space-y-5">
              <p>
                Hinter dem Esszimmer steht die <span className="text-cream">Gutshof Brennerei Begatal</span> —
                die Familie Begemann bewirtschaftet das Begatal seit dem Jahr 1284. In einer
                sanierten Fachwerkscheune entstehen feine Destillate aus regionalen Zutaten.
              </p>
              <p>
                Diese Herkunft schmeckt man: Hausgebrannter Gin, Obstbrände und Liköre begleiten
                das Menü — Küche und Brennerei aus einer Hand. Ein Stück Lippe auf dem Teller
                und im Glas.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Küche / Signatures ── */}
      <section id="kueche" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
        <Reveal>
          <div className="text-center mb-16">
            <p className="eyebrow mb-5">Die Küche</p>
            <h2 className="font-display text-cream text-[clamp(2rem,5vw,3.4rem)] font-light">
              Was unsere Gäste lieben
            </h2>
            <p className="mt-4 text-muted text-sm">
              Die Karte wechselt mit der Saison — diese Klassiker kommen immer wieder gut an.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {SIGNATURES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="h-full border border-border/70 bg-surface2/60 p-8 hover:border-gold/40 transition-colors">
                <div className="font-display text-gold text-3xl mb-3">{s.n}</div>
                <p className="text-muted leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-muted text-sm">
            4-Gang-Menü & Candle-Light-Dinner auf Anfrage ·{" "}
            <a href={`tel:${INFO.telLink}`} className="text-gold border-b border-gold/40 hover:text-gold-lt">
              Tisch reservieren
            </a>
          </p>
        </Reveal>
      </section>

      {/* ── Brennerei-Pairing (Alleinstellungsmerkmal) ── */}
      <section className="relative border-y border-border/60 bg-surface/40 py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="eyebrow mb-5">Küche & Brennerei aus einer Hand</p>
              <h2 className="font-display text-cream text-[clamp(2rem,5vw,3.6rem)] font-light leading-tight">
                Jeder Gang trifft sein <span className="text-gold italic">Destillat</span>
              </h2>
              <p className="mt-4 text-muted max-w-xl mx-auto">
                Was die Begemanns seit 1284 im Begatal anbauen, brennen wir nebenan — und stellen es
                an deinen Tisch. Ein Begleiter, den du nirgendwo sonst bekommst.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-border/60 border border-border/60">
            {[
              { gang: "Zum Auftakt", spirit: "Be Gin Man", desc: "Hausgin aus 28 regionalen Zutaten — klar, wacholdrig, ein Weckruf für den Gaumen." },
              { gang: "Zum Hauptgang", spirit: "Obstbrand", desc: "Reife Frucht aus eigenem Anbau, im Fass gereift — wärmt, ohne zu erschlagen." },
              { gang: "Zum Ausklang", spirit: "Hauslikör", desc: "Süß, samtig, ehrlich. Der ruhige Schlusspunkt eines langen Abends." },
            ].map((p, i) => (
              <Reveal key={p.spirit} delay={i * 0.1}>
                <div className="h-full bg-bg p-8 md:p-10 hover:bg-surface2/60 transition-colors">
                  <div className="eyebrow mb-4">{p.gang}</div>
                  <div className="font-display text-gold text-3xl mb-3">{p.spirit}</div>
                  <p className="text-muted leading-relaxed text-sm">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galerie (Platzhalter für echte Fotos) ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-28 md:pb-40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Kerzenlicht", "Der Gastraum", "Aus der Küche", "Aus der Brennerei"].map((label, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="relative aspect-[3/4] overflow-hidden border border-border/60 bg-gradient-to-b from-surface2 to-bg flex items-end">
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(198,158,76,0.12),transparent)]" />
                <span className="relative z-10 p-4 text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-[0.62rem] uppercase tracking-[0.2em] text-muted/60">
          Platzhalter — echte Fotos vom Restaurant einsetzen
        </p>
      </section>

      {/* ── Stimmen (echte Google-Rezensionen) ── */}
      <Reviews />

      {/* ── Reservierung / Kontakt ── */}
      <section id="reservierung" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40 grid md:grid-cols-2 gap-16 items-start">
        <Reveal>
          <div>
            <p className="eyebrow mb-6">Reservierung</p>
            <h2 className="font-display text-cream text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight">
              Ein Abend,
              <br />
              <span className="text-gold italic">der bleibt.</span>
            </h2>
            <p className="mt-6 text-muted leading-relaxed max-w-md">
              Wir haben Platz für nur 40 Gäste — Reservierung lohnt sich. Wähl rechts in wenigen
              Schritten deinen Tisch, wir bestätigen persönlich.
            </p>

            <div className="mt-10 border-t border-border/60 pt-8">
              <h3 className="font-display text-gold text-xl mb-5">Öffnungszeiten</h3>
              <dl className="space-y-2">
                {INFO.zeiten.map(([tag, zeit]) => (
                  <div key={tag} className="flex justify-between border-b border-border/40 pb-2 text-sm">
                    <dt className="text-cream">{tag}</dt>
                    <dd className="text-muted">{zeit}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 space-y-1 text-sm">
                <p className="text-cream">{INFO.strasse}, {INFO.plz}</p>
                <a href={`tel:${INFO.telLink}`} className="text-muted hover:text-cream transition-colors block">{INFO.tel}</a>
                <a href={INFO.maps} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-gold border-b border-gold/40 hover:text-gold-lt">
                  Auf der Karte ansehen →
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Reservation />
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/60 py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg text-cream">
            Florian's <span className="text-gold italic">Esszimmer</span>
          </div>
          <div className="flex items-center gap-6 text-[0.68rem] uppercase tracking-[0.18em] text-muted">
            <a href={`tel:${INFO.telLink}`} className="hover:text-cream transition-colors">{INFO.tel}</a>
            <a href={INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Instagram</a>
            <span>{INFO.plz}</span>
          </div>
        </div>
        <p className="mt-8 text-center text-[0.58rem] uppercase tracking-[0.25em] text-muted/50">
          Entwurf · unverbindliche Design-Vorschau
        </p>
      </footer>
    </main>
  );
}
