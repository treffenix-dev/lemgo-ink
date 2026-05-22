"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const flashes = [
  {
    name: "Devil Skull Rose",
    desc: "Skull + Rose Pflanzenstiel — Dark Art",
    svg: (
      <svg viewBox="0 0 100 120" fill="none" stroke="#111" strokeLinecap="round">
        <path d="M50 12 C28 12 15 30 15 50 C15 64 22 74 32 80 L32 92 L68 92 L68 80 C78 74 85 64 85 50 C85 30 72 12 50 12 Z" strokeWidth="2"/>
        <ellipse cx="38" cy="50" rx="10" ry="11" strokeWidth="1.5" fill="#111" fillOpacity="0.12"/>
        <ellipse cx="62" cy="50" rx="10" ry="11" strokeWidth="1.5" fill="#111" fillOpacity="0.12"/>
        <path d="M46 66 Q50 70 54 66" strokeWidth="1.5"/>
        <path d="M34 92 L34 100 M42 92 L42 104 M50 92 L50 105 M58 92 L58 104 M66 92 L66 100" strokeWidth="1.5"/>
        <path d="M34 100 L66 100" strokeWidth="1.5"/>
        {/* Horns */}
        <path d="M32 16 L25 5 L38 14" strokeWidth="1.8"/>
        <path d="M68 16 L75 5 L62 14" strokeWidth="1.8"/>
        {/* Rose stem below */}
        <line x1="50" y1="105" x2="50" y2="118" strokeWidth="1.5"/>
        <path d="M50 112 Q42 108 40 114" strokeWidth="1.2"/>
        <path d="M50 112 Q58 108 60 114" strokeWidth="1.2"/>
        <circle cx="50" cy="8" r="5" strokeWidth="1.2"/>
        <path d="M44 8 Q50 3 56 8 Q50 11 44 8" strokeWidth="1" fill="#111" fillOpacity="0.15"/>
      </svg>
    ),
  },
  {
    name: "Spider Skull",
    desc: "Spider-Skull Hybrid — Gothic",
    svg: (
      <svg viewBox="0 0 100 120" fill="none" stroke="#111" strokeLinecap="round">
        {/* Skull */}
        <path d="M50 18 C32 18 20 34 20 52 C20 64 27 73 37 78 L37 90 L63 90 L63 78 C73 73 80 64 80 52 C80 34 68 18 50 18 Z" strokeWidth="2"/>
        <ellipse cx="38" cy="52" rx="9" ry="10" strokeWidth="1.5" fill="#111" fillOpacity="0.15"/>
        <ellipse cx="62" cy="52" rx="9" ry="10" strokeWidth="1.5" fill="#111" fillOpacity="0.15"/>
        <path d="M46 68 Q50 72 54 68" strokeWidth="1.5"/>
        <path d="M37 90 L37 98 M44 90 L44 102 M50 90 L50 103 M56 90 L56 102 M63 90 L63 98" strokeWidth="1.5"/>
        <path d="M35 98 L65 98" strokeWidth="1.5"/>
        {/* Spider legs */}
        <path d="M20 50 L5 40 M20 58 L3 55 M20 66 L8 72" strokeWidth="1.5"/>
        <path d="M80 50 L95 40 M80 58 L97 55 M80 66 L92 72" strokeWidth="1.5"/>
        {/* Web */}
        <path d="M50 18 Q35 8 25 15" strokeWidth="1"/>
        <path d="M50 18 Q65 8 75 15" strokeWidth="1"/>
        <path d="M25 15 L75 15" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: "Mystische Hand",
    desc: "Moon Hand — Celestial",
    svg: (
      <svg viewBox="0 0 100 120" fill="none" stroke="#111" strokeLinecap="round">
        {/* Hand */}
        <path d="M35 115 L35 85 Q30 78 30 68 L30 48 Q30 43 35 43 L35 35 Q35 30 40 30 L40 24 Q40 19 45 19 L45 16 Q45 11 50 11 L52 11 Q57 11 57 16 L57 60 L59 42 Q59 37 64 37 Q69 37 69 42 L69 60 L69 48 Q69 43 74 43 Q79 43 79 48 L79 65 L79 58 Q79 53 84 53 Q89 53 89 58 L89 82 L89 98 L65 115 Z" strokeWidth="1.8"/>
        {/* Moon above */}
        <path d="M50 8 C41 11 36 20 40 28 C40 20 47 14 56 15 C52 11 50 8 50 8 Z" strokeWidth="1.5" fill="#111" fillOpacity="0.2"/>
        {/* Stars */}
        <circle cx="28" cy="20" r="1.5" fill="#111" stroke="none"/>
        <circle cx="75" cy="12" r="1.5" fill="#111" stroke="none"/>
        <path d="M65 22 L66.5 18 L68 22 L64 20 L68 20 Z" fill="#111" strokeWidth="0.5"/>
        {/* Wrist decoration */}
        <path d="M40 100 Q50 96 60 100" strokeWidth="1.2"/>
        <path d="M43 106 Q50 103 57 106" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: "Cherry Skulls",
    desc: "Dark Quirky — Signature Style",
    svg: (
      <svg viewBox="0 0 100 120" fill="none" stroke="#111" strokeLinecap="round">
        {/* Left skull (cherry shape) */}
        <path d="M32 68 C18 68 10 58 10 48 C10 38 18 30 30 30 C38 30 44 35 47 42 C50 38 57 34 64 34 C76 34 84 42 84 52 C84 62 76 70 64 70 C56 70 50 65 50 65 C50 65 45 68 32 68 Z" strokeWidth="2"/>
        {/* Left skull details */}
        <ellipse cx="26" cy="50" rx="6" ry="7" strokeWidth="1.2" fill="#111" fillOpacity="0.15"/>
        <ellipse cx="38" cy="50" rx="6" ry="7" strokeWidth="1.2" fill="#111" fillOpacity="0.15"/>
        <path d="M28 62 L28 68 M32 62 L32 70 M36 62 L36 70 M40 62 L40 68" strokeWidth="1.2"/>
        {/* Right skull details */}
        <ellipse cx="60" cy="52" rx="6" ry="7" strokeWidth="1.2" fill="#111" fillOpacity="0.15"/>
        <ellipse cx="72" cy="52" rx="6" ry="7" strokeWidth="1.2" fill="#111" fillOpacity="0.15"/>
        <path d="M58 64 L58 70 M63 64 L63 72 M68 64 L68 72 M73 64 L73 70" strokeWidth="1.2"/>
        <path d="M56 70 L80 70" strokeWidth="1.2"/>
        {/* Cherry stems */}
        <path d="M38 30 Q42 12 50 8" strokeWidth="1.8"/>
        <path d="M60 34 Q60 14 50 8" strokeWidth="1.8"/>
        <circle cx="50" cy="7" r="4" strokeWidth="1.5" fill="#111" fillOpacity="0.1"/>
        {/* Leaf */}
        <path d="M44 18 Q38 12 38 20" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    name: "Dobermann",
    desc: "Neo Traditional — Bold & Cool",
    svg: (
      <svg viewBox="0 0 100 120" fill="none" stroke="#111" strokeLinecap="round">
        {/* Dog head */}
        <path d="M25 45 C25 25 38 12 50 12 C62 12 75 25 75 45 C75 60 68 70 58 74 L58 88 L42 88 L42 74 C32 70 25 60 25 45 Z" strokeWidth="2"/>
        {/* Ears (cropped dobermann ears) */}
        <path d="M33 22 L28 8 L42 18" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M67 22 L72 8 L58 18" strokeWidth="1.8" strokeLinejoin="round"/>
        {/* Eyes */}
        <ellipse cx="40" cy="45" rx="7" ry="6" strokeWidth="1.5" fill="#111" fillOpacity="0.18"/>
        <ellipse cx="60" cy="45" rx="7" ry="6" strokeWidth="1.5" fill="#111" fillOpacity="0.18"/>
        {/* Muzzle */}
        <path d="M38 60 Q50 68 62 60" strokeWidth="1.5"/>
        <path d="M46 68 Q50 72 54 68" strokeWidth="1.5"/>
        {/* Collar */}
        <path d="M42 88 Q50 92 58 88" strokeWidth="2"/>
        <path d="M42 88 L42 96 Q50 100 58 96 L58 88" strokeWidth="1.5"/>
        {/* Collar tag */}
        <circle cx="50" cy="100" r="5" strokeWidth="1.5"/>
        {/* Smoke from mouth */}
        <path d="M50 72 Q44 80 46 88" strokeWidth="1" opacity="0.6"/>
        <path d="M46 88 Q40 94 44 100" strokeWidth="1" opacity="0.4"/>
        {/* Collar studs */}
        <circle cx="44" cy="92" r="1.5" fill="#111" stroke="none"/>
        <circle cx="50" cy="93" r="1.5" fill="#111" stroke="none"/>
        <circle cx="56" cy="92" r="1.5" fill="#111" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "Luna Moth Moon",
    desc: "Mystisch & Celestial — Schmetterling",
    svg: (
      <svg viewBox="0 0 100 120" fill="none" stroke="#111" strokeLinecap="round">
        {/* Upper wings */}
        <path d="M50 55 C44 48 28 40 18 28 C14 18 22 10 32 14 C42 18 48 40 50 55 Z" strokeWidth="1.8" fill="#111" fillOpacity="0.08"/>
        <path d="M50 55 C56 48 72 40 82 28 C86 18 78 10 68 14 C58 18 52 40 50 55 Z" strokeWidth="1.8" fill="#111" fillOpacity="0.08"/>
        {/* Lower wings */}
        <path d="M50 55 C45 62 32 68 24 80 C20 90 28 96 36 90 C44 84 48 68 50 55 Z" strokeWidth="1.8" fill="#111" fillOpacity="0.06"/>
        <path d="M50 55 C55 62 68 68 76 80 C80 90 72 96 64 90 C56 84 52 68 50 55 Z" strokeWidth="1.8" fill="#111" fillOpacity="0.06"/>
        {/* Body */}
        <ellipse cx="50" cy="58" rx="3" ry="14" strokeWidth="1.5" fill="#111" fillOpacity="0.2"/>
        {/* Crescent moon on upper wing */}
        <path d="M30 28 C24 31 22 38 26 43 C26 37 31 32 38 33 C34 31 30 28 30 28 Z" strokeWidth="1.2" fill="#111" fillOpacity="0.2"/>
        {/* Eye pattern on wing */}
        <circle cx="68" cy="30" r="5" strokeWidth="1.2"/>
        <circle cx="68" cy="30" r="2" fill="#111" fillOpacity="0.3" stroke="none"/>
        {/* Antenna */}
        <path d="M48 41 Q42 28 38 20" strokeWidth="1.2"/>
        <circle cx="38" cy="20" r="2" strokeWidth="1.2"/>
        <path d="M52 41 Q58 28 62 20" strokeWidth="1.2"/>
        <circle cx="62" cy="20" r="2" strokeWidth="1.2"/>
        {/* Stars */}
        <circle cx="14" cy="48" r="1.5" fill="#111" stroke="none"/>
        <circle cx="86" cy="48" r="1.5" fill="#111" stroke="none"/>
        <circle cx="50" cy="10" r="1.5" fill="#111" stroke="none"/>
        {/* Wing tails */}
        <path d="M38 90 Q32 105 36 114" strokeWidth="1.2"/>
        <path d="M62 90 Q68 105 64 114" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

export default function FlashDesigns() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div ref={ref} className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[#111]" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#555]">Direkt buchbar</span>
            <div className="w-8 h-px bg-[#111]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(28px,5vw,56px)] font-bold leading-tight text-[#111] mb-4"
          >
            ✦ WANNA DOs ✦
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm text-[#555] max-w-md mx-auto leading-[1.8]"
          >
            Diese Motive sind sofort buchbar — keine lange Planungsphase. Einfach anfragen, Termin ausmachen, stechen lassen.
          </motion.p>
        </div>

        {/* Flash grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {flashes.map((flash, i) => (
            <motion.div
              key={flash.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white border border-[#e0dbd2] hover:border-[#c9a227] transition-all duration-400 overflow-hidden"
            >
              {/* BUCHBAR badge */}
              <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-[#c9a227] text-black font-sans text-[8px] tracking-[0.2em] uppercase font-bold">
                BUCHBAR
              </div>

              {/* SVG container */}
              <div className="aspect-square p-6 pt-10 flex items-center justify-center">
                <div className="w-full h-full">
                  {flash.svg}
                </div>
              </div>

              {/* Info */}
              <div className="px-4 pb-4 border-t border-[#e0dbd2]">
                <p className="font-display text-sm font-bold text-[#111] mt-3 mb-1">{flash.name}</p>
                <p className="font-sans text-[10px] text-[#888] leading-relaxed">{flash.desc}</p>
                <a
                  href="#kontakt"
                  className="inline-block mt-3 font-sans text-[10px] tracking-[0.2em] uppercase text-[#c9a227] border-b border-[#c9a227]/30 hover:border-[#c9a227] pb-0.5 transition-colors duration-300"
                >
                  Anfragen →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://instagram.com/tattooartist_nataschalee"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs text-[#555] hover:text-[#111] transition-colors tracking-[0.15em] uppercase border-b border-[#ccc] hover:border-[#111] pb-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @tattooartist_nataschalee — Mehr Designs auf Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
