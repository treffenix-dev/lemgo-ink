"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

const filters = ["ALLE", "BLACK & GREY", "REALISM", "DARK ART", "FINE LINE", "COLOR"];

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

function CompassRoseSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      {/* Outer ring */}
      <circle cx="80" cy="108" r="66" strokeWidth="1" opacity="0.3"/>
      <circle cx="80" cy="108" r="52" strokeWidth="0.8" opacity="0.2"/>
      {/* N point */}
      <path d="M80 42 L73 108 L80 94 L87 108 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.75"/>
      {/* S point */}
      <path d="M80 174 L73 108 L80 122 L87 108 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.75"/>
      {/* E point */}
      <path d="M146 108 L80 101 L94 108 L80 115 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.75"/>
      {/* W point */}
      <path d="M14 108 L80 101 L66 108 L80 115 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.75"/>
      {/* NE */}
      <path d="M127 61 L84 104 L91 97 L97 104 Z" strokeWidth="1" fill="currentColor" fillOpacity="0.42"/>
      {/* NW */}
      <path d="M33 61 L76 104 L69 97 L63 104 Z" strokeWidth="1" fill="currentColor" fillOpacity="0.42"/>
      {/* SE */}
      <path d="M127 155 L84 112 L91 119 L97 112 Z" strokeWidth="1" fill="currentColor" fillOpacity="0.42"/>
      {/* SW */}
      <path d="M33 155 L76 112 L69 119 L63 112 Z" strokeWidth="1" fill="currentColor" fillOpacity="0.42"/>
      {/* Center disc */}
      <circle cx="80" cy="108" r="13" strokeWidth="1.2" fill="currentColor" fillOpacity="0.07"/>
      <circle cx="80" cy="108" r="5.5" strokeWidth="1" fill="currentColor" fillOpacity="0.3"/>
      <circle cx="80" cy="108" r="2" fill="currentColor" fillOpacity="0.9" stroke="none"/>
      {/* Rose between N and center */}
      <circle cx="80" cy="68" r="10" strokeWidth="1.2"/>
      <path d="M74 68 Q80 61 86 68 Q80 74 74 68" strokeWidth="0.9" fill="currentColor" fillOpacity="0.15"/>
      <path d="M77 63 Q80 59 83 63" strokeWidth="0.8"/>
      <path d="M80 78 Q73 80 72 74" strokeWidth="1" strokeLinecap="round"/>
      <path d="M80 78 Q87 80 88 74" strokeWidth="1" strokeLinecap="round"/>
      {/* N cardinal mark */}
      <path d="M76 29 L76 37 L84 29 L84 37" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Tick marks on outer ring */}
      <line x1="80" y1="42" x2="80" y2="46" strokeWidth="0.8" opacity="0.4"/>
      <line x1="80" y1="170" x2="80" y2="166" strokeWidth="0.8" opacity="0.4"/>
      <line x1="14" y1="108" x2="18" y2="108" strokeWidth="0.8" opacity="0.4"/>
      <line x1="146" y1="108" x2="142" y2="108" strokeWidth="0.8" opacity="0.4"/>
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

function LionPortraitSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      {/* Outer mane halo */}
      <ellipse cx="80" cy="100" rx="62" ry="60" strokeWidth="1" fill="currentColor" fillOpacity="0.05" opacity="0.5"/>
      {/* Mane fur strokes */}
      <path d="M80 38 Q72 30 64 39" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M80 38 Q88 30 96 39" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 50 Q40 42 38 54" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M110 50 Q120 42 122 54" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 72 Q18 66 20 78" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M132 72 Q142 66 140 78" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 98 Q14 93 17 105" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M136 98 Q146 93 143 105" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 124 Q18 122 22 132" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M132 124 Q142 122 138 132" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 148 Q37 150 41 158" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M116 148 Q123 150 119 158" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Inner mane layer */}
      <ellipse cx="80" cy="98" rx="46" ry="44" strokeWidth="0.8" opacity="0.3"/>
      {/* Face outline */}
      <ellipse cx="80" cy="97" rx="37" ry="37" strokeWidth="1.5" fill="currentColor" fillOpacity="0.04"/>
      {/* Eyes */}
      <ellipse cx="61" cy="86" rx="12" ry="9" strokeWidth="1.5"/>
      <ellipse cx="99" cy="86" rx="12" ry="9" strokeWidth="1.5"/>
      <ellipse cx="61" cy="86" rx="5" ry="7" fill="currentColor" fillOpacity="0.55" stroke="none"/>
      <ellipse cx="99" cy="86" rx="5" ry="7" fill="currentColor" fillOpacity="0.55" stroke="none"/>
      <circle cx="64" cy="83" r="1.8" fill="rgba(255,255,255,0.55)" stroke="none"/>
      <circle cx="102" cy="83" r="1.8" fill="rgba(255,255,255,0.55)" stroke="none"/>
      {/* Brow furrows */}
      <path d="M54 77 Q61 74 69 77" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M91 77 Q99 74 106 77" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Nose */}
      <path d="M71 105 Q80 111 89 105 L80 100 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.4"/>
      {/* Mouth */}
      <path d="M80 111 Q80 115 80 115" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M80 115 Q72 121 67 119" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M80 115 Q88 121 93 119" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Whisker dots */}
      <circle cx="61" cy="116" r="1.5" fill="currentColor" fillOpacity="0.5" stroke="none"/>
      <circle cx="61" cy="120" r="1.5" fill="currentColor" fillOpacity="0.5" stroke="none"/>
      <circle cx="61" cy="124" r="1.5" fill="currentColor" fillOpacity="0.5" stroke="none"/>
      <circle cx="99" cy="116" r="1.5" fill="currentColor" fillOpacity="0.5" stroke="none"/>
      <circle cx="99" cy="120" r="1.5" fill="currentColor" fillOpacity="0.5" stroke="none"/>
      <circle cx="99" cy="124" r="1.5" fill="currentColor" fillOpacity="0.5" stroke="none"/>
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

function RealisticEyeSVG() {
  return (
    <svg viewBox="0 0 160 200" fill="none" className="w-full h-full" stroke="currentColor">
      {/* Eyebrow */}
      <path d="M28 68 Q80 54 132 68" strokeWidth="2.2" strokeLinecap="round" fill="currentColor" fillOpacity="0.6"/>
      <path d="M36 69 Q44 63 54 67" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      <path d="M58 65 Q66 59 74 63" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      <path d="M78 63 Q86 57 94 61" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      <path d="M98 64 Q106 59 114 64" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      {/* Eye socket area */}
      <path d="M15 112 Q80 80 145 112 Q80 144 15 112 Z" fill="currentColor" fillOpacity="0.05" stroke="none"/>
      {/* Upper eyelid */}
      <path d="M15 112 Q48 80 80 78 Q112 80 145 112" strokeWidth="2" strokeLinecap="round"/>
      {/* Lower eyelid */}
      <path d="M15 112 Q48 134 80 136 Q112 134 145 112" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Iris */}
      <circle cx="80" cy="107" r="28" strokeWidth="1.5" fill="currentColor" fillOpacity="0.07"/>
      {/* Iris radial lines */}
      <line x1="80" y1="81" x2="80" y2="91" strokeWidth="0.7" opacity="0.35"/>
      <line x1="94" y1="84" x2="89" y2="93" strokeWidth="0.7" opacity="0.35"/>
      <line x1="105" y1="93" x2="97" y2="99" strokeWidth="0.7" opacity="0.35"/>
      <line x1="108" y1="107" x2="98" y2="107" strokeWidth="0.7" opacity="0.35"/>
      <line x1="105" y1="121" x2="97" y2="115" strokeWidth="0.7" opacity="0.35"/>
      <line x1="94" y1="130" x2="89" y2="121" strokeWidth="0.7" opacity="0.35"/>
      <line x1="80" y1="133" x2="80" y2="123" strokeWidth="0.7" opacity="0.35"/>
      <line x1="66" y1="130" x2="71" y2="121" strokeWidth="0.7" opacity="0.35"/>
      <line x1="55" y1="121" x2="63" y2="115" strokeWidth="0.7" opacity="0.35"/>
      <line x1="52" y1="107" x2="62" y2="107" strokeWidth="0.7" opacity="0.35"/>
      <line x1="55" y1="93" x2="63" y2="99" strokeWidth="0.7" opacity="0.35"/>
      <line x1="66" y1="84" x2="71" y2="93" strokeWidth="0.7" opacity="0.35"/>
      {/* Iris outer ring */}
      <circle cx="80" cy="107" r="28" strokeWidth="1.8" opacity="0.45"/>
      {/* Pupil */}
      <circle cx="80" cy="107" r="12" fill="currentColor" fillOpacity="0.88" strokeWidth="0.8"/>
      {/* Catch lights */}
      <circle cx="87" cy="100" r="4.5" fill="rgba(255,255,255,0.55)" stroke="none"/>
      <circle cx="76" cy="114" r="2" fill="rgba(255,255,255,0.2)" stroke="none"/>
      {/* Upper lashes */}
      <path d="M22 104 Q19 91 25 85" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M36 94 Q35 81 43 76" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M52 87 Q53 74 61 70" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M67 83 Q70 70 77 69" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M80 82 Q83 69 90 70" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M93 84 Q98 71 104 74" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M106 89 Q112 77 118 81" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M119 97 Q125 87 130 91" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M130 106 Q136 99 139 103" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Lower lashes (subtle) */}
      <path d="M32 122 Q30 130 35 132" strokeWidth="0.8" strokeLinecap="round" opacity="0.45"/>
      <path d="M54 130 Q54 138 59 139" strokeWidth="0.8" strokeLinecap="round" opacity="0.45"/>
      <path d="M76 133 Q77 141 82 141" strokeWidth="0.8" strokeLinecap="round" opacity="0.45"/>
      <path d="M98 130 Q99 138 104 137" strokeWidth="0.8" strokeLinecap="round" opacity="0.45"/>
      <path d="M118 122 Q120 130 124 128" strokeWidth="0.8" strokeLinecap="round" opacity="0.45"/>
    </svg>
  );
}

const works = [
  { tag: "BLACK & GREY", label: "Kompass & Rosen", size: "large", SVG: CompassRoseSVG },
  { tag: "REALISM", label: "Realistisches Auge", size: "small", SVG: RealisticEyeSVG },
  { tag: "DARK ART", label: "Wolf Realism", size: "small", SVG: WolfSVG },
  { tag: "REALISM", label: "Löwen-Portrait", size: "large", SVG: LionPortraitSVG },
  { tag: "DARK ART", label: "Skull & Rose", size: "small", SVG: SkullRoseSVG },
  { tag: "BLACK & GREY", label: "Rose & Dolch", size: "small", SVG: RoseDaggerSVG },
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
