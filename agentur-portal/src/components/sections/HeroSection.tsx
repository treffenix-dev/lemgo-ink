"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Mask reveal: text slides up from behind a clip — Basement Studio / Bureau Borsche pattern
function MaskReveal({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div style={{ overflow: "hidden", display: "block" }}>
      <motion.div
        initial={{ y: "108%", skewY: 1.5 }}
        animate={{ y: "0%", skewY: 0 }}
        transition={{ delay, duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const HEADLINE_LINES = ["Websites die", "wirklich", "überzeugen."];

const STATS = [
  { num: "50+", label: "Projekte" },
  { num: "5–28", label: "Tage Lieferzeit" },
  { num: "100%", label: "Persönlicher Support" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-follow radial spotlight — adds life without gimmicks
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ background: "#08080f" }}
    >
      {/* Mouse spotlight — neutral white, not purple */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx, 50%) var(--my, 35%), rgba(255,255,255,0.035) 0%, transparent 65%)",
        }}
      />

      {/* Static top-center ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(190,205,255,0.055) 0%, transparent 70%)",
        }}
      />

      {/* Film grain — adds texture depth without color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          <span className="block w-8 h-px bg-white/15" />
          <span className="text-[10px] font-medium tracking-[0.52em] uppercase text-white/28">
            Professionelles Webdesign · Deutschland
          </span>
        </motion.div>

        {/* Headline — per-line mask reveal */}
        <h1 className="mb-14 text-[clamp(50px,9.5vw,130px)] font-bold leading-[0.84] tracking-[-0.035em] text-white">
          {HEADLINE_LINES.map((line, i) => (
            <MaskReveal key={line} delay={0.15 + i * 0.12}>
              <span
                className="block"
                style={
                  i === 2
                    ? {
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundImage:
                          "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.42) 100%)",
                        backgroundClip: "text",
                      }
                    : undefined
                }
              >
                {line}
              </span>
            </MaskReveal>
          ))}
        </h1>

        {/* Subline + CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-20 mb-20">
          <motion.p
            className="max-w-[330px] text-[16px] font-light leading-[1.85] text-white/32"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Websites mit Kundenportal, Onboarding und direktem Support — für lokale Unternehmen in Deutschland.
          </motion.p>

          <motion.div
            className="flex items-center gap-5 shrink-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/pakete"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#08080f] text-[13px] font-semibold tracking-[0.03em] hover:bg-white/90 active:scale-[0.97] transition-all duration-250"
            >
              Pakete ansehen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/#ablauf"
              className="text-[13px] text-white/28 hover:text-white/55 tracking-[0.02em] transition-colors duration-200"
            >
              Wie es läuft →
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 border-t border-white/[0.07] pt-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.9 }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} className={i > 0 ? "pl-8 border-l border-white/[0.07]" : ""}>
              <p className="text-[clamp(26px,3.2vw,40px)] font-bold text-white leading-none tracking-[-0.02em] mb-1.5">
                {s.num}
              </p>
              <p className="text-[10px] text-white/22 tracking-[0.1em] uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-36"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
