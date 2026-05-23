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
      <div className="absolute inset-0 z-[2] pointer-events-none
        bg-[linear-gradient(to_right,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.65)_45%,rgba(0,0,0,0.15)_75%,transparent_100%)]"
      />

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] pointer-events-none
        bg-gradient-to-t from-black to-transparent"
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
          <motion.div variants={slideIn} className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-gold opacity-60" />
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/70">
              Privates Studio · Lemgo NRW · seit 2020
            </span>
          </motion.div>

          {/* MAIN HEADLINE — Bebas Neue, cinematic scale */}
          <motion.h1
            variants={fadeUp}
            className="font-display leading-[0.90] tracking-wide mb-8"
            style={{ fontSize: "clamp(80px,14vw,172px)" }}
          >
            <span className="block text-cream/92">KEIN</span>
            <span className="block text-cream/92">KOMPROMISS.</span>
            <span className="block gold-text">KEINE</span>
            <span className="block gold-text">KOPIEN.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-[clamp(14px,2vw,16px)] text-cream/42 leading-[1.9] mb-10 max-w-md font-light"
          >
            Natascha Lee tätowiert in ihrem privaten Studio in Lemgo mit der
            Präzision einer Chirurgin — und der Seele einer Künstlerin.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => scrollTo("kontakt")}
              data-cursor="BUCHEN"
              {...magnetic}
              className="magnetic flex items-center gap-2.5 px-8 py-4
                bg-gold text-black font-sans font-bold text-[11px] tracking-[0.22em] uppercase
                hover:bg-gold-light active:scale-[0.97] transition-colors duration-300
                shadow-[0_0_40px_rgba(212,175,55,0.35)]"
            >
              Termin anfragen
              <span className="w-6 h-6 bg-black/15 flex items-center justify-center text-[11px]">→</span>
            </button>

            <button
              onClick={() => scrollTo("portfolio")}
              data-cursor="MEHR"
              {...magnetic}
              className="magnetic flex items-center gap-2.5 px-8 py-4
                border border-gold/30 text-cream/60
                hover:border-gold/60 hover:text-cream
                font-sans font-medium text-[11px] tracking-[0.22em] uppercase
                transition-all duration-300"
            >
              Portfolio
              <span className="w-6 h-6 border border-gold/20 flex items-center justify-center text-[11px]">↓</span>
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="flex items-center gap-5 flex-wrap">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold text-sm">★</span>
              ))}
            </div>
            <span className="font-sans text-xs text-cream/35">
              <span className="text-cream/60 font-medium">4.7</span> · 39 Google Bewertungen
            </span>
            <div className="w-px h-4 bg-cream/10" />
            <a
              href="https://instagram.com/tattooartist_nataschalee"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xs text-cream/30 hover:text-gold transition-colors"
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
