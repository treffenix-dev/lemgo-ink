"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!scrollRef.current) return;
      scrollRef.current.style.opacity = String(
        Math.max(0, 1 - window.scrollY / 250)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* Very subtle depth — white/transparent only, no colors */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_40%,rgba(255,255,255,0.018)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,rgba(255,255,255,0.012)_0%,transparent_55%)]" />

      {/* Thin vertical accent line — right side */}
      <div className="absolute right-[12%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pt-24 pb-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-white/30" />
            <span className="section-label">Privates Studio · Lemgo NRW · seit 2020</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(52px,9vw,110px)] font-bold leading-[0.88] tracking-tight mb-8"
          >
            <span className="block text-white/90">Kein</span>
            <span className="block text-white/90">Kompromiss.</span>
            <span className="block gradient-text mt-1">Keine</span>
            <span className="block gradient-text">Kopien.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-[clamp(14px,2.5vw,17px)] text-cream/40 leading-[1.85] mb-10 max-w-md font-light"
          >
            Natascha Lee tätowiert in ihrem privaten Studio in Lemgo mit der
            Präzision einer Chirurgin — und der Seele einer Künstlerin.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => scrollTo("kontakt")}
              className="px-8 py-4 bg-white text-black font-sans font-bold text-xs tracking-[0.22em] uppercase hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
            >
              Termin anfragen
            </button>
            <button
              onClick={() => scrollTo("portfolio")}
              className="px-8 py-4 border border-white/12 text-white/60 font-sans font-medium text-xs tracking-[0.2em] uppercase hover:border-white/35 hover:text-white transition-all duration-300"
            >
              Portfolio ansehen
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-white/60 text-sm">★</span>
              ))}
            </div>
            <span className="font-sans text-xs text-cream/30 tracking-wide">
              <span className="text-cream/55 font-medium">4.7</span> · 39 Google Bewertungen
            </span>
            <div className="w-px h-4 bg-cream/10" />
            <a
              href="https://instagram.com/tattooartist_nataschalee"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xs text-cream/30 hover:text-white transition-colors tracking-wide"
            >
              @tattooartist_nataschalee
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/12 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 rounded-full bg-white/35" />
        </motion.div>
      </div>
    </section>
  );
}
