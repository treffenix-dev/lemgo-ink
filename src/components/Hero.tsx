"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollIndicatorRef.current) return;
      const opacity = Math.max(0, 1 - window.scrollY / 300);
      scrollIndicatorRef.current.style.opacity = String(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05050a] via-[#0a0a1a] to-[#05050a]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan/8 blur-[100px] pointer-events-none" />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-sm tracking-[0.3em] text-muted uppercase font-medium">
              Premium Web Studio
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
          >
            Wir bauen
            <br />
            <span className="gradient-text">digitale</span>
            <br />
            Erlebnisse.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-xl"
          >
            High-End Websites mit 3D-Animationen, die Kunden begeistern — was
            Agenturen für{" "}
            <span className="text-white font-semibold">€5.000–€25.000</span>{" "}
            verlangen, baust du jetzt selbst.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#works"
              className="px-8 py-4 rounded-full bg-accent hover:bg-accent/80 transition-all duration-300 text-white font-semibold text-sm tracking-wide hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)]"
            >
              Projekte ansehen
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-300 text-white font-semibold text-sm tracking-wide hover:scale-105"
            >
              Leistungen
            </a>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16 flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[
                "bg-accent",
                "bg-cyan",
                "bg-violet",
                "bg-pink-500",
                "bg-emerald-500",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full ${color} border-2 border-bg flex items-center justify-center text-xs font-bold`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted">
                <span className="text-white font-semibold">150+</span> Projekte
                erfolgreich umgesetzt
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </div>
    </section>
  );
}
