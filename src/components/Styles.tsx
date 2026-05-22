"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const styles = [
  {
    num: "01",
    name: "Dark Art & Gothic",
    desc: "Skulls, Dark Entities, dunkle Charaktere — kraftvoll, theatralisch und unverwechselbar. Natascha liebt das Dunkle.",
    keywords: ["Skulls", "Dark Art", "Gothic"],
    color: "from-[#1a0a0a] to-[#2a1010]",
    imgGradient: "from-[#0d0505] via-[#1a0808] to-[#110606]",
    imgPattern: "radial-gradient(circle at 40% 40%, rgba(139,0,0,0.15) 0%, transparent 60%)",
    imgLabel: "Dark Art · Gothic",
  },
  {
    num: "02",
    name: "Black & Grey Realism",
    desc: "Tiefe Schattierungen, fotorealistische Qualität — Wolf, Portraits, Tiere. Jede Linie sitzt mit Absicht.",
    keywords: ["Wolf", "Portrait", "Realism"],
    color: "from-[#1a1a1a] to-[#2a2a2a]",
    imgGradient: "from-[#0a0a0a] via-[#1c1c1c] to-[#141414]",
    imgPattern: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 60%)",
    imgLabel: "Black & Grey Realism",
  },
  {
    num: "03",
    name: "Mystisch & Celestial",
    desc: "Mondphasen, mystische Hände, Schmetterlinge, Sterne — spirituell, feminin und voller Symbolik.",
    keywords: ["Moon", "Mystisch", "Celestial"],
    color: "from-[#0d0d18] to-[#1a1a28]",
    imgGradient: "from-[#080810] via-[#10101e] to-[#0c0c16]",
    imgPattern: "radial-gradient(circle at 50% 35%, rgba(180,160,255,0.08) 0%, transparent 65%)",
    imgLabel: "Mystisch · Celestial",
  },
  {
    num: "04",
    name: "Neo Traditional",
    desc: "Kräftige Konturen, Rosen, Dolche, klassische Motive mit modernem Twist — bold und zeitlos schön.",
    keywords: ["Rosen", "Bold Lines", "Klassisch"],
    color: "from-[#140808] to-[#1e1010]",
    imgGradient: "from-[#120808] via-[#1c0c0c] to-[#140808]",
    imgPattern: "radial-gradient(circle at 40% 40%, rgba(139,0,0,0.1) 0%, transparent 60%)",
    imgLabel: "Neo Traditional",
  },
  {
    num: "05",
    name: "Sentimental & Portrait",
    desc: "Mutter & Kind, Familienportraits, Liebe in Tinte — Motive die ewig tragen und tief bedeuten.",
    keywords: ["Familie", "Liebe", "Portrait"],
    color: "from-[#0d0a08] to-[#1a1610]",
    imgGradient: "from-[#0c0a08] via-[#181410] to-[#100e0a]",
    imgPattern: "radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.07) 0%, transparent 60%)",
    imgLabel: "Sentimental · Portrait",
  },
  {
    num: "06",
    name: "Cover-Up & Piercing",
    desc: "Altes Tattoo überarbeiten oder komplett verwandeln — plus professionelles Piercing mit höchster Hygiene.",
    keywords: ["Cover-Up", "Piercing", "Neustart"],
    color: "from-[#0a0f0a] to-[#141e14]",
    imgGradient: "from-[#080e08] via-[#101810] to-[#0c140c]",
    imgPattern: "radial-gradient(circle at 50% 40%, rgba(150,200,150,0.05) 0%, transparent 60%)",
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
      className="group relative p-7 border border-gold/8 hover:border-gold/25 bg-surface/30 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Gold hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.color} transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.1)_0%,transparent_70%)] transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

      {/* Reference image area */}
      <div className="aspect-[4/3] overflow-hidden relative mb-0 -mx-7 -mt-7 mb-6">
        {/* Gradient placeholder — replace with <img src="..." /> when photos are ready */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.imgGradient}`} />
        <div className="absolute inset-0" style={{ background: style.imgPattern }} />
        {/* Style indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-px bg-gold/30 mx-auto mb-3" />
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-cream/20">{style.imgLabel}</span>
            <div className="w-8 h-px bg-gold/30 mx-auto mt-3" />
          </div>
        </div>
        {/* Number badge */}
        <span className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.2em] text-cream/20">{style.num}</span>
        {/* Hover shimmer */}
        <div className={`absolute inset-0 bg-gold/5 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-xl font-bold group-hover:text-gold transition-colors duration-300">
            {style.name}
          </h3>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-7 h-7 border border-gold/20 flex items-center justify-center group-hover:border-gold/60 transition-colors flex-shrink-0 ml-3"
          >
            <span className="text-gold/60 text-xs leading-none">+</span>
          </motion.div>
        </div>

        <p className="font-sans text-sm text-cream/35 leading-[1.8] mb-5 font-light">{style.desc}</p>

        <div className="flex flex-wrap gap-2">
          {style.keywords.map((kw) => (
            <span key={kw} className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/25 px-2.5 py-1 border border-cream/8 group-hover:border-gold/20 transition-colors">
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
            <div className="w-8 h-px bg-gold" />
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/5">
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
          <a
            href="#kontakt"
            className="font-sans text-[11px] tracking-[0.22em] uppercase text-cream/30 border-b border-cream/15 pb-1 hover:text-gold hover:border-gold transition-colors duration-300"
          >
            Kostenlose Beratung anfragen →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
