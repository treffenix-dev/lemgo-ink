"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const styles = [
  {
    num: "01",
    name: "Dark Art & Gothic",
    desc: "Skulls, Dark Entities, dunkle Charaktere — kraftvoll, theatralisch und unverwechselbar. Natascha liebt das Dunkle.",
    keywords: ["Skulls", "Dark Art", "Gothic"],
    imgLabel: "Dark Art · Gothic",
  },
  {
    num: "02",
    name: "Black & Grey Realism",
    desc: "Tiefe Schattierungen, fotorealistische Qualität — Wolf, Portraits, Tiere. Jede Linie sitzt mit Absicht.",
    keywords: ["Wolf", "Portrait", "Realism"],
    imgLabel: "Black & Grey Realism",
  },
  {
    num: "03",
    name: "Mystisch & Celestial",
    desc: "Mondphasen, mystische Hände, Schmetterlinge, Sterne — spirituell, feminin und voller Symbolik.",
    keywords: ["Moon", "Mystisch", "Celestial"],
    imgLabel: "Mystisch · Celestial",
  },
  {
    num: "04",
    name: "Neo Traditional",
    desc: "Kräftige Konturen, Rosen, Dolche, klassische Motive mit modernem Twist — bold und zeitlos schön.",
    keywords: ["Rosen", "Bold Lines", "Klassisch"],
    imgLabel: "Neo Traditional",
  },
  {
    num: "05",
    name: "Sentimental & Portrait",
    desc: "Mutter & Kind, Familienportraits, Liebe in Tinte — Motive die ewig tragen und tief bedeuten.",
    keywords: ["Familie", "Liebe", "Portrait"],
    imgLabel: "Sentimental · Portrait",
  },
  {
    num: "06",
    name: "Cover-Up & Piercing",
    desc: "Altes Tattoo überarbeiten oder komplett verwandeln — plus professionelles Piercing mit höchster Hygiene.",
    keywords: ["Cover-Up", "Piercing", "Neustart"],
    imgLabel: "Cover-Up · Piercing",
  },
];

function StyleCard({ style, index }: { style: typeof styles[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-7 border border-white/5 hover:border-white/15 bg-[#0d0d0d] transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Hover glow — subtle white */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04)_0%,transparent_70%)] transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

      {/* Reference image area */}
      <div className="aspect-[4/3] overflow-hidden relative mb-6 -mx-7 -mt-7">
        <div className="absolute inset-0 bg-[#141414]" />
        <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-100 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_65%)]" : "opacity-0"}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-px bg-white/15 mx-auto mb-3" />
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-cream/20">{style.imgLabel}</span>
            <div className="w-8 h-px bg-white/15 mx-auto mt-3" />
          </div>
        </div>
        <span className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.2em] text-cream/15">{style.num}</span>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-xl font-bold group-hover:text-white transition-colors duration-300">
            {style.name}
          </h3>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-7 h-7 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors flex-shrink-0 ml-3"
          >
            <span className="text-white/40 text-xs leading-none">+</span>
          </motion.div>
        </div>

        <p className="font-sans text-sm text-cream/35 leading-[1.8] mb-5 font-light">{style.desc}</p>

        <div className="flex flex-wrap gap-2">
          {style.keywords.map((kw) => (
            <span key={kw} className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/25 px-2.5 py-1 border border-white/6 group-hover:border-white/15 transition-colors">
              {kw}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Styles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stile" className="py-28 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-white/30" />
            <span className="section-label">Was wir machen</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(32px,5vw,62px)] font-bold leading-tight"
          >
            Sechs Handschriften.
            <br />
            <span className="gradient-text">Eine</span> Künstlerin.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/4">
          {styles.map((style, i) => (
            <StyleCard key={style.num} style={style} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => scrollTo("kontakt")}
            className="font-sans text-[11px] tracking-[0.22em] uppercase text-cream/30 border-b border-cream/15 pb-1 hover:text-white hover:border-white/50 transition-colors duration-300"
          >
            Kostenlose Beratung anfragen →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
