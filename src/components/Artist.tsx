"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const artistFacts = [
  { value: "2020", label: "Studio gegründet" },
  { value: "4.7★", label: "Google Rating" },
  { value: "100%", label: "Custom Designs" },
  { value: "Lemgo", label: "NRW" },
];

export default function Artist() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ueberuns" className="py-0">
      {/* Marquee ticker */}
      <div className="overflow-hidden border-y border-gold/10 bg-[#050505] py-3">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) =>
            ["✦ DARK ART", "✦ WANNA DOs", "✦ SKULLS", "✦ MYSTISCH", "✦ BLACK & GREY", "✦ NEO TRADITIONAL", "✦ LEMGO NRW", "✦ SEIT 2020", "✦ CUSTOM DESIGNS"].map(
              (item) => (
                <span
                  key={`${i}-${item}`}
                  className="font-sans text-[11px] tracking-[0.25em] text-gold/40"
                >
                  {item}
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* Artist section */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-16 py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[3/4] bg-[#0d0d0d] border border-white/6 relative overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/18 z-10" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/18 z-10" />

              {/* Real photo — add file to /public/images/artist.jpg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/artist.jpg"
                alt="NataschaLee — Lemgo INK"
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />

              {/* Placeholder — hidden when real photo loads */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <div className="w-20 h-20 rounded-full border border-white/8 flex items-center justify-center">
                  <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
                    <circle cx="18" cy="13" r="9" stroke="white" strokeOpacity="0.18" strokeWidth="1.5"/>
                    <path d="M2 40 C2 27 34 27 34 40" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-display text-base font-bold text-white/20 tracking-widest">NATASCHA LEE</p>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/12 mt-1">Künstlerin · Lemgo INK</p>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/95 to-transparent p-6 z-10">
                <div className="grid grid-cols-2 gap-4">
                  {artistFacts.map((f) => (
                    <div key={f.label}>
                      <div className="font-display text-lg font-bold text-white">{f.value}</div>
                      <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/30">{f.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">Über das Studio</span>
            </div>

            <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold leading-tight mb-6">
              Jedes Tattoo ist{" "}
              <span className="gradient-text">einmalig.</span>
            </h2>

            <p className="font-sans text-cream/45 leading-[1.9] mb-5 font-light text-[15px]">
              Lemgo INK ist ein privates Tattoo-Studio im Herzen von Lemgo, NRW.
              Natascha Lee arbeitet ausschließlich nach Terminvereinbarung — für
              ein Erlebnis, das so einzigartig ist wie dein Motiv.
            </p>

            <p className="font-sans text-cream/45 leading-[1.9] mb-8 font-light text-[15px]">
              Kein Massengeschäft. Keine Kompromisse. Nur dein Tattoo — so wie
              du es dir vorstellst, mit höchster Präzision und Liebe zum Detail.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {["Black & Grey", "Realism", "Fine Line", "Portraits", "Cover-Up", "Piercing"].map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-gold/20 text-cream/40 hover:border-gold/50 hover:text-gold transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.22em] uppercase text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors duration-300"
            >
              Jetzt Termin anfragen
              <span>→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
