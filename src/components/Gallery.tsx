"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

const filters = ["ALLE", "DARK ART", "MYSTISCH", "BLACK & GREY", "NEO TRADITIONAL", "SENTIMENTAL"];

function SkullRoseSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      <path d="M80 18 C45 18 25 48 25 82 C25 108 38 126 55 136 L55 155 L105 155 L105 136 C122 126 135 108 135 82 C135 48 115 18 80 18 Z" strokeWidth="2" strokeLinejoin="round"/>
      <ellipse cx="60" cy="82" rx="16" ry="18" strokeWidth="1.5" fill="currentColor" fillOpacity="0.18"/>
      <ellipse cx="100" cy="82" rx="16" ry="18" strokeWidth="1.5" fill="currentColor" fillOpacity="0.18"/>
      <path d="M76 106 Q80 112 84 106" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="55" y1="155" x2="55" y2="168" strokeWidth="1.5"/>
      <line x1="68" y1="155" x2="68" y2="172" strokeWidth="1.5"/>
      <line x1="80" y1="155" x2="80" y2="173" strokeWidth="1.5"/>
      <line x1="92" y1="155" x2="92" y2="172" strokeWidth="1.5"/>
      <line x1="105" y1="155" x2="105" y2="168" strokeWidth="1.5"/>
      <path d="M52 168 L108 168" strokeWidth="1.5"/>
      <circle cx="80" cy="12" r="8" strokeWidth="1.5"/>
      <path d="M72 12 Q80 4 88 12 Q80 18 72 12" strokeWidth="1" fill="currentColor" fillOpacity="0.12"/>
      <path d="M75 8 Q80 2 85 8" strokeWidth="1"/>
      <path d="M80 20 Q68 24 66 32" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M80 20 Q92 24 94 32" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="35" cy="55" r="1.5" fill="currentColor"/>
      <circle cx="28" cy="70" r="1" fill="currentColor"/>
      <circle cx="125" cy="55" r="1.5" fill="currentColor"/>
      <circle cx="132" cy="70" r="1" fill="currentColor"/>
    </svg>
  );
}

function MoonHandSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      <path d="M55 185 L55 155 Q55 148 48 140 L48 115 Q48 108 55 108 L55 95 Q55 88 62 88 L62 80 Q62 73 69 73 L69 68 Q69 61 76 61 L76 55 Q76 48 83 48 L85 48 Q92 48 92 55 L92 100 L94 75 Q94 68 101 68 Q108 68 108 75 L108 100 L108 80 Q108 73 115 73 Q122 73 122 80 L122 105 L122 95 Q122 88 129 88 Q136 88 136 95 L136 130 L136 155 L105 185 Z" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M80 20 C65 25 55 38 60 52 C65 38 78 30 92 32 C84 25 80 20 80 20 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
      <path d="M40 30 L42 26 L44 30 L40 28 L44 28 Z" fill="currentColor" strokeWidth="0.5"/>
      <path d="M120 18 L122 14 L124 18 L120 16 L124 16 Z" fill="currentColor" strokeWidth="0.5"/>
      <circle cx="135" cy="45" r="2" fill="currentColor" stroke="none"/>
      <circle cx="28" cy="42" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="108" cy="10" r="1.5" fill="currentColor" stroke="none"/>
      <path d="M68 170 Q80 165 92 170" strokeWidth="1" strokeLinecap="round"/>
      <path d="M72 176 Q80 172 88 176" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function WolfSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      <path d="M80 30 L65 18 L58 35 L40 38 L52 52 L42 68 L60 65 L65 80 L80 72 L95 80 L100 65 L118 68 L108 52 L120 38 L102 35 L95 18 Z" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
      <path d="M60 65 Q65 85 80 90 Q95 85 100 65" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
      <ellipse cx="68" cy="55" rx="6" ry="5" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3"/>
      <ellipse cx="92" cy="55" rx="6" ry="5" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3"/>
      <path d="M75 82 Q80 86 85 82" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 42 L25 35 M38 52 L22 52 M38 62 L26 68" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M122 42 L135 35 M122 52 L138 52 M122 62 L134 68" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M55 88 Q45 110 50 140 L80 155 L110 140 Q115 110 105 88" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08"/>
      <path d="M42 88 Q30 100 28 120" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M118 88 Q130 100 132 120" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M55 155 Q50 175 55 190" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M105 155 Q110 175 105 190" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function ButterflyMoonSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      <path d="M80 100 C70 90 40 70 25 55 C20 40 30 25 45 28 C60 31 75 60 80 100 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1"/>
      <path d="M80 100 C90 90 120 70 135 55 C140 40 130 25 115 28 C100 31 85 60 80 100 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1"/>
      <path d="M80 100 C72 108 48 118 35 135 C30 148 38 158 50 152 C65 145 75 120 80 100 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.08"/>
      <path d="M80 100 C88 108 112 118 125 135 C130 148 122 158 110 152 C95 145 85 120 80 100 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.08"/>
      <ellipse cx="80" cy="100" rx="4" ry="18" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3"/>
      <path d="M48 52 C40 56 38 66 44 72 C44 62 50 56 58 56 C52 54 48 52 48 52 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.25"/>
      <circle cx="105" cy="48" r="2" fill="currentColor" stroke="none"/>
      <circle cx="115" cy="38" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="32" cy="40" r="2" fill="currentColor" stroke="none"/>
      <path d="M95 35 L96.5 31 L98 35 L94 33 L98 33 Z" fill="currentColor" strokeWidth="0.5"/>
      <path d="M78 82 Q68 65 65 52" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="65" cy="52" r="2.5" strokeWidth="1.2"/>
      <path d="M82 82 Q92 65 95 52" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="95" cy="52" r="2.5" strokeWidth="1.2"/>
    </svg>
  );
}

function RoseDaggerSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      <path d="M80 15 L90 90 L80 100 L70 90 Z" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12"/>
      <line x1="80" y1="20" x2="80" y2="90" strokeWidth="0.8" opacity="0.6"/>
      <path d="M55 100 Q80 95 105 100" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="72" y="100" width="16" height="55" rx="2" strokeWidth="1.8"/>
      <line x1="72" y1="112" x2="88" y2="112" strokeWidth="1" opacity="0.5"/>
      <line x1="72" y1="122" x2="88" y2="122" strokeWidth="1" opacity="0.5"/>
      <line x1="72" y1="132" x2="88" y2="132" strokeWidth="1" opacity="0.5"/>
      <ellipse cx="80" cy="158" rx="12" ry="6" strokeWidth="1.5"/>
      <path d="M62 72 C52 65 48 52 58 48 C65 46 70 55 70 55" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M56 80 C44 78 40 65 50 62 C58 60 62 72 62 72" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M62 90 C54 95 45 88 50 80 C54 74 64 80 64 80" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="70" cy="72" r="8" strokeWidth="1.5"/>
      <path d="M64 72 Q70 66 76 72 Q70 76 64 72" strokeWidth="1"/>
      <path d="M50 60 Q42 72 48 82" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M45 68 Q35 68 38 78" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function MotherChildSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      <path d="M80 175 C20 135 15 80 40 60 C55 50 68 55 80 70 C92 55 105 50 120 60 C145 80 140 135 80 175 Z" strokeWidth="2"/>
      <circle cx="72" cy="88" r="10" strokeWidth="1.5"/>
      <path d="M62 98 C58 118 60 138 68 150" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M82 98 C86 108 86 128 80 148" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M62 110 Q72 118 88 112" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="90" cy="100" r="7" strokeWidth="1.5"/>
      <path d="M90 107 Q95 115 92 122" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M45 100 L46.5 96 L48 100 L44 98 L48 98 Z" fill="currentColor" strokeWidth="0.5"/>
      <path d="M108 88 L109.5 84 L111 88 L107 86 L111 86 Z" fill="currentColor" strokeWidth="0.5"/>
      <circle cx="55" cy="130" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="112" cy="120" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="80" cy="80" r="1" fill="currentColor" stroke="none"/>
      <circle cx="32" cy="90" r="1" fill="currentColor" stroke="none"/>
      <circle cx="128" cy="90" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const works = [
  { tag: "DARK ART", label: "Skull & Rose", size: "large", SVG: SkullRoseSVG },
  { tag: "MYSTISCH", label: "Moon Hand", size: "small", SVG: MoonHandSVG },
  { tag: "BLACK & GREY", label: "Wolf Silhouette", size: "small", SVG: WolfSVG },
  { tag: "NEO TRADITIONAL", label: "Rose & Dagger", size: "large", SVG: RoseDaggerSVG },
  { tag: "SENTIMENTAL", label: "Mutter & Kind", size: "small", SVG: MotherChildSVG },
  { tag: "MYSTISCH", label: "Luna Moth", size: "small", SVG: ButterflyMoonSVG },
];

function GalleryCard({
  work,
  index,
  onOpen,
}: {
  work: (typeof works)[0];
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const inViewRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "-40px" });
  const { SVG } = work;

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`;
    el.style.transition = "transform 0.08s ease-out";
  };

  const handleTiltLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    setHovered(false);
  };

  return (
    <div
      ref={inViewRef}
      className={work.size === "large" ? "aspect-[4/5]" : "aspect-[3/4]"}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        <div
          ref={tiltRef}
          onMouseMove={handleTiltMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleTiltLeave}
          onClick={onOpen}
          className="relative overflow-hidden cursor-pointer group bg-[#0a0a0a] border border-cream/5 hover:border-gold/25 transition-colors duration-500 w-full h-full"
          style={{ willChange: "transform" }}
        >
          {/* SVG art */}
          <div className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-500 ${hovered ? "scale-105" : "scale-100"}`}>
            <div className="w-full h-full text-cream/30 group-hover:text-cream/55 transition-colors duration-500">
              <SVG />
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/0 group-hover:border-gold/50 transition-all duration-300" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/0 group-hover:border-gold/50 transition-all duration-300" />

          {/* Glow */}
          <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.06)_0%,transparent_70%)] transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

          {/* Tag */}
          <div className={`absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm border border-gold/30 transition-all duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
            <span className="font-sans text-[8px] tracking-[0.2em] text-gold">{work.tag}</span>
          </div>

          {/* Zoom hint */}
          <div className={`absolute top-3 left-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <span className="text-white/70 text-xs">⊕</span>
          </div>

          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
            <p className="font-display text-base font-bold text-cream">{work.label}</p>
            <p className="font-sans text-[9px] tracking-[0.2em] text-gold/70 uppercase mt-0.5">{work.tag}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALLE");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = useMemo(
    () => (activeFilter === "ALLE" ? works : works.filter((w) => w.tag === activeFilter)),
    [activeFilter]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft" && lightboxIdx > 0) setLightboxIdx(lightboxIdx - 1);
      if (e.key === "ArrowRight" && lightboxIdx < filtered.length - 1)
        setLightboxIdx(lightboxIdx + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIdx, filtered]);

  const handleFilterChange = (f: string) => {
    setActiveFilter(f);
    setLightboxIdx(null);
  };

  return (
    <section id="portfolio" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div ref={ref} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">Flash Art · Echte Arbeiten</span>
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

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`font-sans text-[9px] tracking-[0.2em] uppercase px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                activeFilter === f
                  ? "bg-white text-black font-bold"
                  : "border border-cream/10 text-cream/30 hover:border-white/25 hover:text-white/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((work, i) => (
            <GalleryCard
              key={`${work.label}-${activeFilter}`}
              work={work}
              index={i}
              onOpen={() => setLightboxIdx(i)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-sans text-xs text-cream/20 leading-relaxed">
            Illustrationen im NataschaLee-Stil — echte Fotos folgen demnächst
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10 text-sm"
            >
              ✕
            </button>

            {/* Prev */}
            {lightboxIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10"
              >
                ←
              </button>
            )}

            {/* Next */}
            {lightboxIdx < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10"
              >
                →
              </button>
            )}

            {/* SVG */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-[min(75vw,360px)] h-[min(80vh,460px)] text-cream/75"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const { SVG } = filtered[lightboxIdx];
                return <SVG />;
              })()}
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <p className="font-display text-lg font-bold text-cream/80">{filtered[lightboxIdx].label}</p>
              <p className="font-sans text-[9px] tracking-[0.2em] text-cream/35 uppercase mt-1">{filtered[lightboxIdx].tag}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
