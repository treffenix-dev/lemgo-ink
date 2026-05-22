"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTAScene = dynamic(() => import("./CTAScene"), { ssr: false });

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="kontakt"
      ref={ref}
      className="py-32 relative overflow-hidden"
    >
      {/* BG gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-bg to-cyan/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-accent/40" />

      {/* 3D background accent */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <CTAScene />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-accent font-medium">
            Jetzt verfügbar — 2 Slots offen
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Bereit für deine
          <br />
          <span className="gradient-text">Premium Website?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-muted leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Buche ein kostenloses 30-Minuten-Gespräch. Wir analysieren dein
          Business, zeigen dir konkrete Ideen — und machen ein faires Angebot.
          Kein Druck, keine Verpflichtung.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="mailto:hello@studio.de"
            className="px-10 py-5 rounded-full bg-gradient-to-r from-accent to-cyan text-white font-bold text-base tracking-wide hover:scale-105 hover:shadow-[0_0_60px_rgba(79,70,229,0.5)] transition-all duration-300"
          >
            Kostenloses Gespräch buchen →
          </a>
          <a
            href="mailto:hello@studio.de"
            className="px-10 py-5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white font-semibold text-base hover:border-white/30 hover:scale-105 transition-all duration-300"
          >
            hello@studio.de
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 text-sm text-muted"
        >
          {[
            "✓ Kostenloses Erstgespräch",
            "✓ Festpreise, keine Überraschungen",
            "✓ 4-Wochen-Liefergarantie",
            "✓ Unbegrenzte Revisionen",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
