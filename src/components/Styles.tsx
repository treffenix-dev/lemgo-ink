"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const styles = [
  {
    num: "01",
    name: "Black & Grey",
    desc: "Tiefe Schwarzwerte, sanfte Übergänge — zeitlos und ausdrucksstark. Die Königsdisziplin der Tätowierkunst.",
    keywords: ["Realism", "Schattierungen", "Tiefe"],
    color: "from-[#1a1a1a] to-[#2a2a2a]",
  },
  {
    num: "02",
    name: "Realism",
    desc: "Fotorealistisch bis auf die Pore. Portraits, Tiere, Szenen — so lebendig, dass man zweimal hinschaut.",
    keywords: ["Portrait", "Tier", "Foto-echt"],
    color: "from-[#1a1208] to-[#2a1e0a]",
  },
  {
    num: "03",
    name: "Fine Line",
    desc: "Zarte, präzise Linienführung. Minimalistisch, elegant und zeitlos — perfekt für filigrane Motive.",
    keywords: ["Filigran", "Minimalist", "Elegant"],
    color: "from-[#0d0d14] to-[#1a1a24]",
  },
  {
    num: "04",
    name: "Neo Traditional",
    desc: "Kräftige Konturen, satte Farben. Die Verbindung aus klassischer Tradition und modernem Design-Gefühl.",
    keywords: ["Farbe", "Bold", "Klassisch"],
    color: "from-[#140808] to-[#1e1010]",
  },
  {
    num: "05",
    name: "Cover-Up",
    desc: "Altes überarbeiten oder komplett abdecken — ein neues Kapitel auf deiner Haut. Kein Tattoo ist verloren.",
    keywords: ["Überarbeitung", "Neustart", "Kreativ"],
    color: "from-[#0a0a0a] to-[#1a1a1a]",
  },
  {
    num: "06",
    name: "Piercing",
    desc: "Professionelles Piercing mit höchster Sorgfalt, Hygiene und dem richtigen Gespür für Ästhetik und Platzierung.",
    keywords: ["Steril", "Präzise", "Ästhetisch"],
    color: "from-[#0d1208] to-[#1a201a]",
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

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <span className="font-sans text-[10px] tracking-[0.2em] text-cream/20">{style.num}</span>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 border border-gold/20 flex items-center justify-center group-hover:border-gold/60 transition-colors"
          >
            <span className="text-gold/60 text-sm leading-none">+</span>
          </motion.div>
        </div>

        <h3 className="font-display text-xl font-bold mb-3 group-hover:text-gold transition-colors duration-300">
          {style.name}
        </h3>
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
