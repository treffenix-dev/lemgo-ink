"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tags = ["Black & Grey", "Realism", "Fine Line", "Portraits", "Cover-Up", "Piercing"];

const facts = [
  { value: "5+", label: "Jahre Erfahrung" },
  { value: "4.7★", label: "Google Rating" },
  { value: "100%", label: "Custom Designs" },
  { value: "0", label: "Kompromisse" },
];

const tickerItems = [
  "DARK ART", "BLACK & GREY", "WANNA DOs", "SKULLS", "MYSTISCH",
  "NEO TRADITIONAL", "LEMGO NRW", "SEIT 2020", "CUSTOM DESIGNS", "FINE LINE",
];

export default function Artist() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ueberuns" className="bg-[#06050A]">

      {/* ── Marquee ticker ── */}
      <div className="overflow-hidden border-y border-gold/10 py-3.5">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) =>
            tickerItems.map((item) => (
              <span
                key={`${i}-${item}`}
                className="font-sans text-[10px] tracking-[0.38em] uppercase text-gold/35"
              >
                ✦ {item}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-16 py-32 lg:py-40">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-28 items-start">

          {/* Left: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Photo frame */}
            <div className="aspect-[3/4] bg-surface relative overflow-hidden">
              {/* Gold corner accents */}
              <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-gold/40 z-20" />
              <div className="absolute top-5 right-5 w-10 h-10 border-t border-r border-gold/40 z-20" />
              <div className="absolute bottom-5 left-5 w-10 h-10 border-b border-l border-gold/40 z-20" />
              <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-gold/40 z-20" />

              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/artist.jpg"
                alt="Natascha Lee — Lemgo INK"
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />

              {/* Placeholder art */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center mb-6">
                    <svg width="40" height="46" viewBox="0 0 40 46" fill="none">
                      <circle cx="20" cy="14" r="10" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5"/>
                      <path d="M4 46 C4 31 36 31 36 46" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[22px] tracking-[0.35em] text-ivory/25">NATASCHA LEE</p>
                    <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-gold/30 mt-2">Tätowiererin · Lemgo INK</p>
                  </div>
                </div>
              </div>

              {/* Bottom gradient overlay with facts */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg via-bg/80 to-transparent pt-16 pb-6 px-6 z-10">
                <div className="grid grid-cols-2 gap-5">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <div className="font-display text-2xl text-gold leading-none mb-0.5">{f.value}</div>
                      <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/30">{f.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-5 left-6 right-6 h-px bg-gradient-to-r from-gold/30 via-gold/60 to-gold/30" />
          </motion.div>

          {/* Right: Editorial text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.36, 1] }}
            className="lg:pt-8"
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-px bg-gold/40" />
              <span className="section-label">Über das Studio</span>
            </div>

            {/* Giant headline */}
            <h2
              className="font-display leading-[0.85] tracking-wide mb-10"
              style={{ fontSize: "clamp(64px, 9vw, 120px)" }}
            >
              <span className="block text-ivory/85">JEDES</span>
              <span className="block text-ivory/85">TATTOO</span>
              <span className="block gold-text">EINMALIG.</span>
            </h2>

            {/* Divider */}
            <div className="w-12 h-px bg-gold/25 mb-9" />

            {/* Bio */}
            <p className="font-sans text-cream/42 leading-[2.1] mb-6 font-light text-[15px] max-w-[420px]">
              Lemgo INK ist ein privates Tattoo-Studio im Herzen von Lemgo, NRW.
              Natascha Lee arbeitet ausschließlich nach Terminvereinbarung — für
              ein Erlebnis, das so einzigartig ist wie dein Motiv.
            </p>
            <p className="font-sans text-cream/42 leading-[2.1] mb-12 font-light text-[15px] max-w-[420px]">
              Kein Massengeschäft. Keine Kompromisse. Nur dein Tattoo — exakt so
              wie du es dir vorstellst, ausgeführt mit chirurgischer Präzision
              und künstlerischer Seele.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5 mb-14">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-[9px] tracking-[0.22em] uppercase px-4 py-2
                    border border-gold/18 text-cream/35 hover:border-gold/45 hover:text-cream/65
                    transition-all duration-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-4 font-sans text-[10px] tracking-[0.28em] uppercase
                text-gold hover:text-gold-light transition-colors duration-400"
            >
              <span className="border-b border-gold/40 group-hover:border-gold pb-1 transition-colors duration-400">
                Jetzt Termin anfragen
              </span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
