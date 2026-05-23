"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const styles = [
  {
    num:   "01",
    name:  "JAPANESE",
    sub:   "Irezumi",
    desc:  "Koi, Drachen, Chrysanthemen — lebendige Farbpaletten und jahrhundertealte Symbolik. Zeitlos und kraftvoll.",
    tags:  ["Koi", "Irezumi", "Dragon"],
    color: "#C09B30",
  },
  {
    num:   "02",
    name:  "OLD SCHOOL",
    sub:   "Traditional",
    desc:  "Kräftige Outlines, klassische Motive. Anker, Schiffe, Rosen — Tattoo-Tradition in ihrer reinsten Form.",
    tags:  ["Bold Lines", "Klassisch", "Rosen"],
    color: "#A08525",
  },
  {
    num:   "03",
    name:  "BLACK & GREY",
    sub:   "Realism",
    desc:  "Fotorealistische Schattierungen, tiefe Kontraste. Wolves, Portraits, Landschaften — Natascha's Spezialgebiet.",
    tags:  ["Portrait", "Wolf", "Tiefen"],
    color: "#D4AF37",
  },
  {
    num:   "04",
    name:  "FINELINE",
    sub:   "Delicate Art",
    desc:  "Hauchzarte Linien, Blumen, Mondphasen, botanische Motive. Minimalistisch, feminin und zeitlos elegant.",
    tags:  ["Fine Line", "Minimal", "Botanik"],
    color: "#E8CC70",
  },
  {
    num:   "05",
    name:  "REALISM",
    sub:   "Hyperrealistic",
    desc:  "Portraits, Tiere, Texturen — so präzise, dass man zweimal hinschaut. Maximale Handwerkskunst.",
    tags:  ["Hyperrealism", "Porträt", "Textur"],
    color: "#B8952A",
  },
];

function StyleCard({ style, index }: { style: (typeof styles)[0]; index: number }) {
  const ref     = useRef<HTMLDivElement>(null);
  const shimRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    el.style.transform  = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.04,1.04,1.04)`;
    el.style.transition = "transform 0.08s ease-out";

    /* Shimmer follow */
    if (shimRef.current) {
      const sx = ((e.clientX - rect.left) / rect.width)  * 100;
      const sy = ((e.clientY - rect.top)  / rect.height) * 100;
      shimRef.current.style.background =
        `radial-gradient(circle at ${sx}% ${sy}%, rgba(212,175,55,0.18) 0%, transparent 55%)`;
    }
  };

  const handleLeave = () => {
    setHovered(false);
    if (!ref.current) return;
    ref.current.style.transform  = "perspective(1000px) rotateY(0) rotateX(0) scale3d(1,1,1)";
    ref.current.style.transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1)";
    if (shimRef.current) shimRef.current.style.background = "transparent";
  };

  return (
    <div
      style={{ willChange: "transform", flexShrink: 0, width: "clamp(320px,30vw,420px)" }}
      className="px-2"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        className="relative h-[520px] bg-surface border border-white/6 hover:border-gold/30
          overflow-hidden cursor-pointer transition-[border-color] duration-500"
        style={{ willChange: "transform" }}
      >
        {/* Shimmer layer */}
        <div ref={shimRef} className="absolute inset-0 z-10 pointer-events-none transition-all duration-150" />

        {/* Number */}
        <div className="absolute top-6 left-6 z-20">
          <span className="font-display text-[80px] leading-none text-white/4 select-none">
            {style.num}
          </span>
        </div>

        {/* Placeholder art area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-32 h-32 border transition-all duration-500"
            style={{
              borderColor: hovered ? style.color : "rgba(255,255,255,0.08)",
              transform: hovered ? "rotate(45deg) scale(1.1)" : "rotate(45deg)",
              boxShadow: hovered ? `0 0 40px ${style.color}22` : "none",
            }}
          />
        </div>

        {/* Gold line accent */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: `linear-gradient(to bottom, transparent, ${style.color}, transparent)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20
          bg-gradient-to-t from-black/95 via-black/60 to-transparent">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase mb-2 block"
            style={{ color: style.color, opacity: 0.8 }}>
            {style.sub}
          </span>
          <h3 className="font-display text-5xl text-cream/92 leading-none mb-3">
            {style.name}
          </h3>
          <p className="font-sans text-xs text-cream/40 leading-[1.8] mb-4 font-light">
            {style.desc}
          </p>
          <div className="flex gap-2 flex-wrap">
            {style.tags.map((tag) => (
              <span key={tag}
                className="font-sans text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 border transition-colors duration-300"
                style={{ borderColor: hovered ? `${style.color}44` : "rgba(255,255,255,0.08)", color: hovered ? style.color : "rgba(245,245,245,0.3)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <div className={`absolute top-5 right-5 w-8 h-8 transition-all duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute top-0 right-0 w-full h-px" style={{ background: style.color }} />
          <div className="absolute top-0 right-0 w-px h-full" style={{ background: style.color }} />
        </div>
      </div>
    </div>
  );
}

export default function StylesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const inView       = useInView(headerRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const track     = trackRef.current;
      if (!container || !track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger:            container,
          pin:                true,
          pinSpacing:         true,
          start:              "top top",
          end:                () => `+=${-getScrollAmount() + window.innerWidth * 0.4}`,
          scrub:              1.4,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="stile" className="bg-black">
      {/* Section header — above pinned area */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-16 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-8 h-px bg-gold opacity-50" />
          <span className="section-label">Styles</span>
        </motion.div>
        <div className="flex items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display leading-none text-cream/92"
            style={{ fontSize: "clamp(52px,8vw,96px)" }}
          >
            FÜNF STILE.<br />
            <span className="gold-text">EINE HAND.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="hidden lg:block font-sans text-sm text-cream/30 max-w-[200px] text-right leading-[1.8]"
          >
            Scroll horizontal →
          </motion.p>
        </div>
      </div>

      {/* Pinned horizontal scroll container */}
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="horizontal-track items-center"
          style={{ paddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 64px))", paddingRight: "120px", gap: "24px" }}
        >
          {styles.map((s, i) => (
            <StyleCard key={s.num} style={s} index={i} />
          ))}

          {/* End card: Custom Design CTA */}
          <div style={{ flexShrink: 0, width: "clamp(320px,30vw,420px)" }} className="px-2">
            <div className="h-[520px] glass-gold flex flex-col items-center justify-center gap-6 p-10 text-center">
              <div className="w-16 h-16 border border-gold/40 flex items-center justify-center">
                <span className="font-display text-2xl text-gold">+</span>
              </div>
              <h3 className="font-display text-4xl text-cream/90">DEINE IDEE.</h3>
              <p className="font-sans text-sm text-cream/40 leading-[1.85]">
                Kein Stil passt exakt? Beschreib deine Vision — Natascha entwickelt das perfekte Custom Design.
              </p>
              <button
                onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-gold text-black font-sans font-bold text-[10px] tracking-[0.22em] uppercase
                  hover:bg-gold-light transition-colors"
              >
                Beratung anfragen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
