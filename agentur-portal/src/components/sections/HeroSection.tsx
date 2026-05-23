"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HEADLINE_WORDS = ["Websites", "die", "wirklich", "überzeugen."];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const eyebrowY  = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);
  const sublineY  = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const ctaY      = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.85], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [3.5, 0]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#06060A]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: orb1Y }}
          className="hero-orb-1 absolute w-[800px] h-[800px] rounded-full bg-indigo-950/70 blur-[160px] -top-40 -left-40"
        />
        <motion.div
          style={{ y: orb2Y }}
          className="hero-orb-2 absolute w-[600px] h-[600px] rounded-full bg-violet-950/50 blur-[140px] bottom-0 right-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-32">

        <motion.div
          style={{ y: eyebrowY, opacity: contentOpacity }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="block w-6 h-px bg-white/20" />
          <span className="text-[11px] tracking-[0.42em] uppercase text-white/35 font-medium">
            Professionelles Webdesign
          </span>
        </motion.div>

        <motion.div style={{ y: headlineY, opacity: contentOpacity }}>
          <div style={{ perspective: "1200px" }}>
            <motion.div style={{ rotateX }}>
              <h1 className="text-[clamp(52px,8.5vw,124px)] font-bold leading-[0.88] tracking-[-0.03em] text-white mb-8">
                {HEADLINE_WORDS.map((word, i) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-[0.22em] last:mr-0"
                    initial={{ opacity: 0, y: 44 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.22 + i * 0.09,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          style={{ y: sublineY, opacity: contentOpacity }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-[18px] text-white/45 font-light max-w-[400px] leading-[1.75] mb-11"
        >
          Moderne Websites mit Kundenportal, Onboarding-System und direktem Support — für lokale Unternehmen in Deutschland.
        </motion.p>

        <motion.div
          style={{ y: ctaY, opacity: contentOpacity }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 mb-24"
        >
          <Link
            href="/pakete"
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#06060A] text-[13px] font-bold tracking-[0.06em] rounded-full hover:bg-white/90 transition-all duration-300 active:scale-[0.97]"
          >
            Pakete ansehen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
          <Link
            href="/#ablauf"
            className="text-[13px] text-white/35 hover:text-white/60 tracking-[0.04em] transition-colors duration-200"
          >
            Wie es funktioniert →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 1.1 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {["Lieferung in 5–28 Tagen", "Kundenportal inklusive", "Persönlicher Support"].map((t, i) => (
            <span key={t} className="flex items-center gap-2.5 text-[11px] text-white/20 tracking-[0.07em] uppercase">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-white/15 flex-shrink-0" />}
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
