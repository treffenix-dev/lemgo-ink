"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ── Mini website mockups ─────────────────────────────────────────────

function RestaurantMockup() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0e0804", fontFamily: "sans-serif" }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-[9px] font-bold text-[#e8a44a] tracking-widest">BELLA VISTA</span>
        <div className="flex gap-3">
          {["Speisekarte","Reservierung","Über uns"].map(n=>(
            <span key={n} className="text-[7px] text-white/50">{n}</span>
          ))}
        </div>
      </div>
      {/* Hero */}
      <div className="relative flex-1 flex items-center px-5" style={{ background: "linear-gradient(135deg,#1a0d04 0%,#2d1507 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 70% 50%, #e8622a 0%, transparent 60%)"
        }} />
        <div>
          <p className="text-[7px] tracking-[0.3em] text-[#e8a44a]/60 mb-1.5">RISTORANTE ITALIANO</p>
          <p className="text-[22px] font-bold text-white leading-none mb-2">Authentisch.<br/>Leidenschaftlich.</p>
          <p className="text-[7px] text-white/45 mb-3 max-w-[120px] leading-relaxed">Frische Zutaten, traditionelle Rezepte, moderne Atmosphäre.</p>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-[#e8622a] text-white text-[7px] font-semibold rounded-full">Reservieren</span>
            <span className="px-3 py-1.5 border border-white/20 text-white/60 text-[7px] rounded-full">Speisekarte</span>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 border-t border-white/10">
        {[["15+","Jahre"],["4.9★","Google"],["200+","Gerichte"]].map(([n,l])=>(
          <div key={l} className="px-3 py-2 text-center border-r border-white/[0.07] last:border-0">
            <p className="text-[10px] font-bold text-[#e8a44a]">{n}</p>
            <p className="text-[6px] text-white/35">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeautyMockup() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0d0710", fontFamily: "sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08]">
        <span className="text-[9px] font-bold text-[#d4a0c0] tracking-widest">ROSA BEAUTY</span>
        <div className="flex gap-3">
          {["Services","Galerie","Buchen"].map(n=>(
            <span key={n} className="text-[7px] text-white/45">{n}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-1">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-5" style={{ background: "linear-gradient(160deg,#0d0710 0%,#1a0d1a 100%)" }}>
          <p className="text-[7px] tracking-[0.32em] text-[#d4a0c0]/60 mb-2">BEAUTY STUDIO · BERLIN</p>
          <p className="text-[20px] font-bold text-white leading-[1.1] mb-2">Deine<br/>Schönheit.<br/>Unser Handwerk.</p>
          <p className="text-[7px] text-white/40 leading-relaxed mb-3">Haare, Make-up und Wellness — für den besonderen Moment.</p>
          <span className="self-start px-4 py-1.5 bg-[#c4558a] text-white text-[7px] font-semibold rounded-full">Termin buchen</span>
        </div>
        {/* Right visual */}
        <div className="w-[90px] relative overflow-hidden" style={{ background: "linear-gradient(180deg,#2a0d20 0%,#1a0615 100%)" }}>
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: "radial-gradient(circle at 50% 40%, #c4558a 0%, transparent 55%)"
          }} />
          <div className="absolute bottom-3 left-2 right-2">
            {["Haare","Make-up","Nägel","Wimpern"].map((s,i)=>(
              <div key={s} className="flex items-center gap-1.5 mb-1">
                <div className="w-1 h-1 rounded-full bg-[#d4a0c0]/60" />
                <span className="text-[6px] text-white/50">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FitnessMockup() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#050d08", fontFamily: "sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08]">
        <span className="text-[9px] font-bold text-[#22c55e] tracking-widest">IRON STUDIO</span>
        <div className="flex gap-3">
          {["Kurse","Mitgliedschaft","Team"].map(n=>(
            <span key={n} className="text-[7px] text-white/45">{n}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 relative flex items-center" style={{ background: "linear-gradient(160deg,#050d08 0%,#071409 100%)" }}>
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: "radial-gradient(ellipse at 80% 50%, #16a34a 0%, transparent 55%)"
        }} />
        {/* Big number */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[60px] font-black text-[#22c55e]/10 leading-none select-none">
          FIT
        </div>
        <div className="px-5">
          <p className="text-[7px] tracking-[0.35em] text-[#22c55e]/60 mb-1.5">PREMIUM FITNESS · HAMBURG</p>
          <p className="text-[22px] font-black text-white leading-[0.95] mb-2.5 uppercase">STÄRKER<br/>WERDEN.</p>
          <p className="text-[7px] text-white/40 mb-3 max-w-[110px] leading-relaxed">Professionelles Equipment, erfahrene Trainer, messbare Ergebnisse.</p>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-[#16a34a] text-white text-[7px] font-bold rounded">Probe-Training</span>
            <span className="px-3 py-1.5 border border-[#22c55e]/20 text-[#22c55e]/70 text-[7px] rounded">Preise →</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-white/[0.07]">
        {[["500+","Mitglieder"],["24/7","Geöffnet"],["12","Trainer"]].map(([n,l])=>(
          <div key={l} className="py-2 text-center border-r border-white/[0.07] last:border-0">
            <p className="text-[10px] font-bold text-[#22c55e]">{n}</p>
            <p className="text-[6px] text-white/30">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HandwerkerMockup() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#05080f", fontFamily: "sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08]">
        <span className="text-[9px] font-bold text-[#60a5fa] tracking-widest">MEISTER BAU</span>
        <div className="flex gap-3">
          {["Leistungen","Projekte","Kontakt"].map(n=>(
            <span key={n} className="text-[7px] text-white/45">{n}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center px-5" style={{ background: "linear-gradient(135deg,#05080f 0%,#0a0f1e 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, #1d4ed8 0%, transparent 50%)"
        }} />
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-4 h-4 bg-[#2563eb] rounded flex items-center justify-center">
              <span className="text-white text-[6px] font-bold">✓</span>
            </div>
            <p className="text-[7px] text-[#60a5fa]/70 tracking-[0.2em]">MEISTERBETRIEB SEIT 1998</p>
          </div>
          <p className="text-[20px] font-bold text-white leading-[1.1] mb-2">Qualität<br/>die hält.</p>
          <div className="space-y-1 mb-3">
            {["Sanitär & Heizung","Elektroinstallation","Renovierung & Umbau"].map(s=>(
              <div key={s} className="flex items-center gap-1.5">
                <span className="text-[#60a5fa] text-[7px]">→</span>
                <span className="text-[7px] text-white/55">{s}</span>
              </div>
            ))}
          </div>
          <span className="inline-block px-3 py-1.5 bg-[#1d4ed8] text-white text-[7px] font-semibold rounded">Kostenlos anfragen</span>
        </div>
      </div>
    </div>
  );
}

function ImmobilienMockup() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0b0906", fontFamily: "sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08]">
        <span className="text-[9px] font-bold text-[#d4a76a] tracking-widest">PRIME ESTATE</span>
        <div className="flex gap-3">
          {["Kaufen","Mieten","Bewerten"].map(n=>(
            <span key={n} className="text-[7px] text-white/45">{n}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden" style={{ background: "linear-gradient(160deg,#0b0906 0%,#1a1208 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(ellipse at 100% 0%, #a16207 0%, transparent 55%)"
        }} />
        {/* Property cards */}
        <div className="absolute top-4 right-3 w-[80px] space-y-2">
          {[["Penthouse","€ 2.4M"],["Loft","€ 890k"],["Villa","€ 1.8M"]].map(([t,p])=>(
            <div key={t} className="rounded border border-[#d4a76a]/15 bg-[#1a1208]/80 p-1.5">
              <div className="w-full h-6 rounded mb-1" style={{background:"linear-gradient(135deg,#2a1e0a,#1a1208)"}} />
              <p className="text-[6px] text-white/70 font-medium">{t}</p>
              <p className="text-[6px] text-[#d4a76a]">{p}</p>
            </div>
          ))}
        </div>
        <div className="px-5 pt-5">
          <p className="text-[7px] tracking-[0.28em] text-[#d4a76a]/55 mb-1.5">PREMIUM IMMOBILIEN</p>
          <p className="text-[20px] font-bold text-white leading-[1.05] mb-2">Ihr Traumhaus<br/>wartet.</p>
          <p className="text-[7px] text-white/40 mb-3 max-w-[100px] leading-relaxed">Exklusive Objekte in besten Lagen.</p>
          <span className="inline-block px-3 py-1.5 bg-[#92400e] text-[#fcd34d] text-[7px] font-semibold rounded">Beratung buchen</span>
        </div>
      </div>
    </div>
  );
}

// ── Showcase data ────────────────────────────────────────────────────

const SITES = [
  { label: "Restaurant Bella Vista", cat: "Restaurant & Gastronomie", component: RestaurantMockup },
  { label: "Rosa Beauty Studio",     cat: "Beauty & Wellness",        component: BeautyMockup },
  { label: "Iron Fitness Studio",    cat: "Fitness & Sport",          component: FitnessMockup },
  { label: "Meister Bau GmbH",       cat: "Handwerk & Dienstleister", component: HandwerkerMockup },
  { label: "Prime Estate",           cat: "Immobilien",               component: ImmobilienMockup },
];

// ── Card flip variants (klappt rechts runter) ────────────────────────
const variants = {
  enter: {
    rotateX: -22,
    y: -28,
    opacity: 0,
    scale: 0.97,
  },
  center: {
    rotateX: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    rotateX: 28,
    y: 36,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45] },
  },
};

export function WebsiteShowcase() {
  const [index, setIndex] = useState(0);
  const current = SITES[index];
  const Component = current.component;

  // Auto-rotate every 3.5 s
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SITES.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

      {/* Browser frame */}
      <div className="relative shrink-0" style={{ perspective: "1000px" }}>
        {/* Glow behind frame */}
        <div
          className="absolute inset-[-20px] rounded-3xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(100,130,255,0.12) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Browser chrome */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: 320,
            height: 230,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#111118",
            boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {/* Chrome bar */}
          <div
            className="flex items-center gap-2 px-3"
            style={{ height: 28, background: "#18181f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <div
              className="flex-1 mx-2 rounded text-[7px] text-white/25 flex items-center px-2"
              style={{ height: 15, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              webagentur.de/{current.label.toLowerCase().replace(/\s+/g, "-")}
            </div>
          </div>

          {/* Website content — animated */}
          <div className="relative overflow-hidden" style={{ height: 202 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                style={{ transformOrigin: "center bottom" }}
              >
                <Component />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Reflection */}
        <div
          className="mx-4 h-8 rounded-b-2xl opacity-30"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* Right: text + indicators */}
      <div className="flex-1 max-w-xs">
        <p className="text-[10px] tracking-[0.46em] uppercase text-white/30 mb-5">
          Referenz-Projekte
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] text-white/35 mb-1">{current.cat}</p>
            <h3 className="text-2xl font-bold text-white mb-3">{current.label}</h3>
            <p className="text-sm text-white/45 leading-relaxed">
              Maßgeschneidert für die Branche — mit Kundenportal, Onboarding und persönlichem Support von Tag 1.
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-7">
          {SITES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="transition-all duration-300"
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === index ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-px bg-white/[0.08] overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-white/30 rounded-full"
            key={index}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
