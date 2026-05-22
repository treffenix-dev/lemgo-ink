"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const filters = ["ALLE", "BLACK & GREY", "REALISM", "FINE LINE", "COVER-UP"];

const works = [
  { tag: "BLACK & GREY", gradient: "from-[#1a1a1a] via-[#2a2520] to-[#1a1510]", label: "Rosen & Ranken", size: "large" },
  { tag: "REALISM", gradient: "from-[#201810] via-[#2a1e10] to-[#1a1208]", label: "Portrait", size: "small" },
  { tag: "FINE LINE", gradient: "from-[#0d0d18] via-[#14141f] to-[#0d0d14]", label: "Geometric", size: "small" },
  { tag: "BLACK & GREY", gradient: "from-[#141414] via-[#1e1e1e] to-[#141414]", label: "Dark Art", size: "large" },
  { tag: "COVER-UP", gradient: "from-[#1a1208] via-[#201810] to-[#141008]", label: "Cover-Up", size: "small" },
  { tag: "REALISM", gradient: "from-[#1a1010] via-[#201818] to-[#141010]", label: "Tierpotrait", size: "small" },
];

function GalleryCard({
  work, index,
}: {
  work: typeof works[0]; index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden cursor-pointer group ${
        work.size === "large" ? "aspect-[4/5]" : "aspect-[3/4]"
      }`}
    >
      {/* Visual placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-br ${work.gradient} transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`} />

      {/* Gold corner accent */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`} />

      {/* Tag */}
      <div className={`absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-gold/25 transition-all duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
        <span className="font-sans text-[9px] tracking-[0.2em] text-gold">{work.tag}</span>
      </div>

      {/* Label bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
        <p className="font-display text-lg font-bold text-cream">{work.label}</p>
        <p className="font-sans text-[10px] tracking-[0.2em] text-gold/70 uppercase mt-1">{work.tag}</p>
      </div>

      {/* Placeholder text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-0 transition-opacity duration-300">
        <span className="font-sans text-[9px] tracking-[0.3em] text-cream/30 uppercase">Foto folgt</span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALLE");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = activeFilter === "ALLE" ? works : works.filter((w) => w.tag === activeFilter);

  return (
    <section id="portfolio" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={ref} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">Echte Arbeiten</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(32px,5vw,62px)] font-bold leading-tight"
            >
              Getragen.
              <br />
              <span className="gradient-text">Für immer.</span>
            </motion.h2>
          </div>

          <motion.a
            href="https://instagram.com/tattooartist_nataschalee"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-sans text-[10px] tracking-[0.22em] uppercase text-gold/50 border-b border-gold/20 pb-1 hover:text-gold hover:border-gold whitespace-nowrap transition-colors duration-300 self-start md:self-auto"
          >
            Mehr auf Instagram →
          </motion.a>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-sans text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 border whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                activeFilter === f
                  ? "bg-gold border-gold text-black font-bold"
                  : "border-cream/10 text-cream/30 hover:border-gold/30 hover:text-gold/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((work, i) => (
            <GalleryCard key={`${work.label}-${i}`} work={work} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-sans text-xs text-cream/20 leading-relaxed">
            Platzhalter — echte Fotos werden von Natascha bereitgestellt.
          </p>
        </div>
      </div>
    </section>
  );
}
