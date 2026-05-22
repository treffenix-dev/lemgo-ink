"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

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

function useMagnetic() {
  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    btn.style.transform = `translate(${x}px, ${y}px)`;
    btn.style.transition = "transform 0.1s ease-out";
  };
  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
    e.currentTarget.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
  };
  return { onMouseMove: handleMove, onMouseLeave: handleLeave };
}

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const magnetic = useMagnetic();

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
    <section className="relative min-h-[100dvh] w-full flex items-center overflow-hidden">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* Subtle depth gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_40%,rgba(255,255,255,0.018)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,rgba(255,255,255,0.012)_0%,transparent_55%)]" />

      {/* 3D Ink Scene — behind content */}
      <div className="absolute inset-0 z-[1] opacity-75 pointer-events-none">
        <Scene />
      </div>

      {/* Left-side text vignette — keeps headline readable */}
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,rgba(8,8,8,0.75)_0%,rgba(8,8,8,0.4)_50%,transparent_75%)] pointer-events-none" />

      {/* Thin vertical accent line */}
      <div className="absolute right-[12%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block z-[2]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-[3] pointer-events-none" />

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
              {...magnetic}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-white text-black font-sans font-bold text-xs tracking-[0.18em] uppercase rounded-full hover:bg-white/90 transition-colors duration-300 active:scale-[0.98]"
            >
              Termin anfragen
              <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-[11px] leading-none">→</span>
            </button>
            <button
              onClick={() => scrollTo("portfolio")}
              {...magnetic}
              className="flex items-center gap-2.5 px-7 py-3.5 border border-white/15 text-white/60 hover:text-white hover:border-white/30 font-sans font-medium text-xs tracking-[0.2em] uppercase rounded-full transition-colors duration-300"
            >
              Portfolio ansehen
              <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[11px] leading-none">↓</span>
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
