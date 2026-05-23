"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";

const PhoenixScene = dynamic(() => import("./PhoenixScene"), { ssr: false });

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* Magnetic button hook */
function useMagnetic() {
  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x    = (e.clientX - rect.left - rect.width  / 2) * 0.28;
    const y    = (e.clientY - rect.top  - rect.height / 2) * 0.28;
    btn.style.transform  = `translate(${x}px, ${y}px)`;
    btn.style.transition = "transform 0.1s ease-out";
  };
  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform  = "translate(0,0)";
    e.currentTarget.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
  };
  return { onMouseMove: handleMove, onMouseLeave: handleLeave };
}

/* Stagger variants */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } },
};
const slideIn = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const magnetic     = useMagnetic();

  useEffect(() => {
    const onScroll = () => {
      if (indicatorRef.current)
        indicatorRef.current.style.opacity = String(Math.max(0, 1 - window.scrollY / 200));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex items-center">

      {/* ── PHOENIX 3D — full bleed background ── */}
      <div className="absolute inset-0 z-0">
        <PhoenixScene />
      </div>

      {/* ── LEFT GRADIENT — text readability ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(6,5,10,0.94) 0%, rgba(6,5,10,0.72) 42%, rgba(6,5,10,0.18) 72%, transparent 100%)" }}
      />

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
        style={{ background: "linear-gradient(to top, #06050A, transparent)" }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[640px]"
        >
          {/* Label */}
          <motion.div variants={slideIn} className="flex items-center gap-4 mb-12">
            <div className="w-10 h-px bg-gold/40" />
            <span className="font-sans text-[9px] tracking-[0.42em] uppercase text-gold/55">
              Privates Studio · Lemgo NRW · seit 2020
            </span>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            variants={fadeUp}
            className="font-display leading-[0.88] tracking-wide mb-10"
            style={{ fontSize: "clamp(76px,13vw,168px)" }}
          >
            <span className="block text-ivory/88">KEIN</span>
            <span className="block text-ivory/88">KOMPROMISS.</span>
            <span className="block gold-text">KEINE</span>
            <span className="block gold-text">KOPIEN.</span>
          </motion.h1>

          {/* Noble divider line */}
          <motion.div variants={fadeUp} className="w-16 h-px bg-gold/25 mb-8" />

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-[clamp(13px,1.8vw,15px)] text-cream/38 leading-[2.1] mb-12 max-w-[380px] font-light tracking-wide"
          >
            Natascha Lee tätowiert in ihrem privaten Studio in Lemgo mit der
            Präzision einer Chirurgin — und der Seele einer Künstlerin.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => scrollTo("kontakt")}
              data-cursor="BUCHEN"
              {...magnetic}
              className="magnetic flex items-center gap-3 px-8 py-4
                bg-gold text-black font-sans font-bold text-[10px] tracking-[0.28em] uppercase
                hover:bg-gold-light active:scale-[0.97] transition-all duration-500"
            >
              Termin anfragen
              <span className="opacity-60 text-sm">→</span>
            </button>

            <button
              onClick={() => scrollTo("portfolio")}
              data-cursor="MEHR"
              {...magnetic}
              className="magnetic flex items-center gap-3 px-8 py-4
                border border-ivory/12 text-ivory/45
                hover:border-gold/35 hover:text-ivory/75
                font-sans font-light text-[10px] tracking-[0.28em] uppercase
                transition-all duration-500"
            >
              Portfolio
              <span className="opacity-50 text-sm">↓</span>
            </button>
          </motion.div>

          {/* Social proof — minimal */}
          <motion.div variants={fadeUp} className="flex items-center gap-5 flex-wrap">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold/70 text-[11px]">★</span>
              ))}
            </div>
            <span className="font-sans text-[10px] text-cream/28 tracking-wider">
              4.7 · 39 Google Bewertungen
            </span>
            <div className="w-px h-3 bg-cream/10" />
            <a
              href="https://instagram.com/tattooartist_nataschalee"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[10px] text-cream/22 hover:text-gold/70 transition-colors duration-500 tracking-wider"
            >
              @tattooartist_nataschalee
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-gold/60 to-transparent"
        />
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-gold/40">Scroll</span>
      </div>

      {/* ── CORNER ACCENT ── */}
      <div className="absolute top-6 right-6 z-10 w-12 h-12 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-gold/30" />
        <div className="absolute top-0 right-0 w-px h-full bg-gold/30" />
      </div>
    </section>
  );
}
