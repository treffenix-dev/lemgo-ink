"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

const filters = ["ALLE", "BLACK & GREY", "REALISM", "DARK ART", "FINE LINE"];

/* Inline SVG placeholders ─────────────────────────────────────────────── */
const EyeSVG = () => (
  <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
    <path d="M15 112 Q80 75 145 112 Q80 149 15 112 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.06"/>
    <circle cx="80" cy="107" r="26" strokeWidth="1.5"/>
    <circle cx="80" cy="107" r="12" fill="currentColor" fillOpacity="0.85" strokeWidth="0.8"/>
    <circle cx="87" cy="100" r="4.5" fill="rgba(255,255,255,0.55)" stroke="none"/>
    <path d="M15 112 Q80 78 145 112" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M15 112 Q80 146 145 112" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M28 68 Q80 54 132 68" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const WolfSVG = () => (
  <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
    <path d="M80 30 L65 18 L58 35 L40 38 L52 52 L42 68 L60 65 L65 80 L80 72 L95 80 L100 65 L118 68 L108 52 L120 38 L102 35 L95 18 Z" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12"/>
    <ellipse cx="68" cy="55" rx="6" ry="5" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5"/>
    <ellipse cx="92" cy="55" rx="6" ry="5" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5"/>
    <path d="M75 82 Q80 86 85 82" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M55 88 Q45 110 50 140 L80 155 L110 140 Q115 110 105 88" strokeWidth="1.5" fill="currentColor" fillOpacity="0.07"/>
  </svg>
);
const LionSVG = () => (
  <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
    <ellipse cx="80" cy="100" rx="62" ry="60" strokeWidth="1" fill="currentColor" fillOpacity="0.04"/>
    <ellipse cx="80" cy="97" rx="37" ry="37" strokeWidth="1.5" fill="currentColor" fillOpacity="0.04"/>
    <ellipse cx="61" cy="86" rx="12" ry="9" strokeWidth="1.5"/>
    <ellipse cx="99" cy="86" rx="12" ry="9" strokeWidth="1.5"/>
    <ellipse cx="61" cy="86" rx="5" ry="7" fill="currentColor" fillOpacity="0.55" stroke="none"/>
    <ellipse cx="99" cy="86" rx="5" ry="7" fill="currentColor" fillOpacity="0.55" stroke="none"/>
    <circle cx="64" cy="83" r="1.8" fill="rgba(255,255,255,0.55)" stroke="none"/>
    <circle cx="102" cy="83" r="1.8" fill="rgba(255,255,255,0.55)" stroke="none"/>
    <path d="M71 105 Q80 111 89 105 L80 100 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.4"/>
    <path d="M80 111 Q72 121 67 119" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M80 111 Q88 121 93 119" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const SkullSVG = () => (
  <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
    <path d="M80 18 C45 18 25 48 25 82 C25 108 38 126 55 136 L55 155 L105 155 L105 136 C122 126 135 108 135 82 C135 48 115 18 80 18 Z" strokeWidth="2" strokeLinejoin="round"/>
    <ellipse cx="60" cy="82" rx="16" ry="18" strokeWidth="1.5" fill="currentColor" fillOpacity="0.18"/>
    <ellipse cx="100" cy="82" rx="16" ry="18" strokeWidth="1.5" fill="currentColor" fillOpacity="0.18"/>
    <path d="M76 106 Q80 112 84 106" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="55" y1="155" x2="55" y2="168" strokeWidth="1.5"/>
    <line x1="80" y1="155" x2="80" y2="173" strokeWidth="1.5"/>
    <line x1="105" y1="155" x2="105" y2="168" strokeWidth="1.5"/>
    <path d="M52 168 L108 168" strokeWidth="1.5"/>
  </svg>
);
const RoseSVG = () => (
  <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
    <circle cx="80" cy="85" r="22" strokeWidth="2"/>
    <path d="M58 85 Q80 62 102 85 Q80 108 58 85" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12"/>
    <path d="M80 63 Q68 55 66 45" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M80 63 Q92 55 94 45" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M80 107 L80 165" strokeWidth="1.8"/>
    <path d="M62 130 C52 130 48 120 60 115" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M98 130 C108 130 112 120 100 115" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const CompassSVG = () => (
  <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
    <circle cx="80" cy="100" r="58" strokeWidth="1" opacity="0.3"/>
    <path d="M80 42 L73 100 L80 87 L87 100 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.75"/>
    <path d="M80 158 L73 100 L80 113 L87 100 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.75"/>
    <path d="M138 100 L80 93 L94 100 L80 107 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.75"/>
    <path d="M22 100 L80 93 L66 100 L80 107 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.75"/>
    <circle cx="80" cy="100" r="11" strokeWidth="1.2" fill="currentColor" fillOpacity="0.07"/>
    <circle cx="80" cy="100" r="4" fill="currentColor" fillOpacity="0.9" stroke="none"/>
  </svg>
);

const works = [
  { tag: "BLACK & GREY", label: "Realistisches Auge",  size: "tall",   SVG: EyeSVG,     img: "/images/gallery/01.jpg" },
  { tag: "DARK ART",     label: "Wolf Realism",         size: "normal", SVG: WolfSVG,    img: "/images/gallery/02.jpg" },
  { tag: "REALISM",      label: "Löwen-Portrait",       size: "tall",   SVG: LionSVG,    img: "/images/gallery/03.jpg" },
  { tag: "DARK ART",     label: "Skull & Rose",         size: "normal", SVG: SkullSVG,   img: "/images/gallery/04.jpg" },
  { tag: "BLACK & GREY", label: "Rose & Blüte",         size: "normal", SVG: RoseSVG,    img: "/images/gallery/05.jpg" },
  { tag: "FINE LINE",    label: "Kompass & Sterne",     size: "tall",   SVG: CompassSVG, img: "/images/gallery/06.jpg" },
];

function GalleryCard({
  work, index, onOpen,
}: {
  work: (typeof works)[0];
  index: number;
  onOpen: () => void;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const { SVG } = work;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    el.style.transform  = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.03,1.03,1.03)`;
    el.style.transition = "transform 0.08s ease-out";
  };
  const handleLeave = () => {
    setHovered(false);
    if (!cardRef.current) return;
    cardRef.current.style.transform  = "perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)";
    cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
  };

  return (
    <div
      ref={ref}
      className={work.size === "tall" ? "row-span-2" : ""}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          onClick={onOpen}
          data-cursor="ZOOM"
          className={`relative overflow-hidden cursor-pointer group bg-surface border border-white/5
            hover:border-gold/25 transition-[border-color] duration-500
            ${work.size === "tall" ? "h-full min-h-[480px]" : "aspect-[4/5]"}`}
          style={{ willChange: "transform" }}
        >
          {/* Real photo */}
          {work.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={work.img}
              alt={work.label}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-108" : "scale-100"}`}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
            />
          )}

          {/* SVG fallback */}
          <div className={`absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}>
            <div className="w-full h-full text-cream/22 group-hover:text-gold/35 transition-colors duration-500">
              <SVG />
            </div>
          </div>

          {/* Cinematic overlay */}
          <div className={`absolute inset-0 bg-black/60 transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`} />

          {/* Gold scan line on hover */}
          <motion.div
            className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent pointer-events-none"
            animate={{ y: hovered ? "100%" : "0%", opacity: hovered ? [0, 1, 0] : 0 }}
            transition={{ duration: 0.8, ease: "linear" }}
          />

          {/* Tag */}
          <div className={`absolute top-3 right-3 px-2.5 py-1 bg-black/80 border border-gold/30 transition-all duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
            <span className="font-sans text-[8px] tracking-[0.2em] text-gold">{work.tag}</span>
          </div>

          {/* Label bar */}
          <div className={`absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400`}>
            <p className="font-display text-2xl text-cream/92">{work.label}</p>
            <p className="font-sans text-[9px] tracking-[0.25em] text-gold/70 uppercase mt-1">{work.tag}</p>
          </div>

          {/* Corner marks */}
          <div className={`absolute top-3 left-3 w-5 h-5 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute top-0 left-0 w-full h-px bg-gold/60" />
            <div className="absolute top-0 left-0 w-px h-full bg-gold/60" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALLE");
  const [lightboxIdx,  setLightboxIdx]  = useState<number | null>(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = useMemo(
    () => activeFilter === "ALLE" ? works : works.filter((w) => w.tag === activeFilter),
    [activeFilter]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape")     setLightboxIdx(null);
      if (e.key === "ArrowLeft"  && lightboxIdx > 0)                setLightboxIdx(lightboxIdx - 1);
      if (e.key === "ArrowRight" && lightboxIdx < filtered.length - 1) setLightboxIdx(lightboxIdx + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, filtered]);

  return (
    <section id="portfolio" className="py-28 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div ref={ref} className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-8 h-px bg-gold opacity-50" />
              <span className="section-label">Portfolio</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display text-cream/92 leading-none"
              style={{ fontSize: "clamp(44px,7vw,88px)" }}
            >
              GETRAGEN.<br />
              <span className="gold-text">FÜR IMMER.</span>
            </motion.h2>
          </div>
          <motion.a
            href="https://instagram.com/tattooartist_nataschalee"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-sans text-[10px] tracking-[0.22em] uppercase text-gold/45
              border-b border-gold/20 pb-1 hover:text-gold hover:border-gold
              whitespace-nowrap transition-colors duration-300 self-start md:self-auto"
          >
            Mehr auf Instagram →
          </motion.a>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setActiveFilter(f); setLightboxIdx(null); }}
              className={`font-sans text-[9px] tracking-[0.2em] uppercase px-4 py-2 whitespace-nowrap flex-shrink-0
                transition-all duration-300
                ${activeFilter === f
                  ? "bg-gold text-black font-bold"
                  : "border border-cream/10 text-cream/30 hover:border-gold/30 hover:text-gold/70"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          style={{ gridAutoRows: "240px" }}>
          {filtered.map((work, i) => (
            <GalleryCard
              key={`${work.label}-${activeFilter}`}
              work={work}
              index={i}
              onOpen={() => setLightboxIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] bg-black/97 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            <button onClick={() => setLightboxIdx(null)}
              className="absolute top-6 right-6 w-10 h-10 border border-gold/25
                flex items-center justify-center text-cream/50
                hover:text-gold hover:border-gold/50 transition-all z-10">
              ✕
            </button>

            {lightboxIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
                className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 w-10 h-10 border border-gold/25
                  flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 transition-all z-10">
                ←
              </button>
            )}
            {lightboxIdx < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
                className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 w-10 h-10 border border-gold/25
                  flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 transition-all z-10">
                →
              </button>
            )}

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-[min(80vw,480px)] h-[min(85vh,560px)] relative text-cream/65"
              onClick={(e) => e.stopPropagation()}
            >
              {filtered[lightboxIdx].img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={filtered[lightboxIdx].img}
                  alt={filtered[lightboxIdx].label}
                  className="absolute inset-0 w-full h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              )}
              <div className="w-full h-full">
                {(() => { const { SVG } = filtered[lightboxIdx]; return <SVG />; })()}
              </div>
              {/* Gold frame */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/40" />
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <p className="font-display text-xl text-cream/80">{filtered[lightboxIdx].label}</p>
              <p className="font-sans text-[9px] tracking-[0.25em] text-gold/55 uppercase mt-1">
                {filtered[lightboxIdx].tag}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
