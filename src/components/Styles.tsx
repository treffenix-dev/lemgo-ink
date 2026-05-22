"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const styles = [
  {
    num: "01",
    name: "Dark Art & Gothic",
    desc: "Skulls, Dark Entities, dunkle Charaktere — kraftvoll, theatralisch und unverwechselbar. Natascha liebt das Dunkle.",
    keywords: ["Skulls", "Dark Art", "Gothic"],
    imgLabel: "Dark Art · Gothic",
  },
  {
    num: "02",
    name: "Black & Grey Realism",
    desc: "Tiefe Schattierungen, fotorealistische Qualität — Wolf, Portraits, Tiere. Jede Linie sitzt mit Absicht.",
    keywords: ["Wolf", "Portrait", "Realism"],
    imgLabel: "Black & Grey Realism",
  },
  {
    num: "03",
    name: "Mystisch & Celestial",
    desc: "Mondphasen, mystische Hände, Schmetterlinge, Sterne — spirituell, feminin und voller Symbolik.",
    keywords: ["Moon", "Mystisch", "Celestial"],
    imgLabel: "Mystisch · Celestial",
  },
  {
    num: "04",
    name: "Neo Traditional",
    desc: "Kräftige Konturen, Rosen, Dolche, klassische Motive mit modernem Twist — bold und zeitlos schön.",
    keywords: ["Rosen", "Bold Lines", "Klassisch"],
    imgLabel: "Neo Traditional",
  },
  {
    num: "05",
    name: "Sentimental & Portrait",
    desc: "Mutter & Kind, Familienportraits, Liebe in Tinte — Motive die ewig tragen und tief bedeuten.",
    keywords: ["Familie", "Liebe", "Portrait"],
    imgLabel: "Sentimental · Portrait",
  },
  {
    num: "06",
    name: "Cover-Up & Piercing",
    desc: "Altes Tattoo überarbeiten oder komplett verwandeln — plus professionelles Piercing mit höchster Hygiene.",
    keywords: ["Cover-Up", "Piercing", "Neustart"],
    imgLabel: "Cover-Up · Piercing",
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
      className="group relative p-7 border border-white/5 hover:border-white/15 bg-[#0d0d0d] transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04)_0%,transparent_70%)] transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

      <div className="aspect-[4/3] overflow-hidden relative mb-6 -mx-7 -mt-7">
        <div className="absolute inset-0 bg-[#141414]" />
        <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-100 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_65%)]" : "opacity-0"}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-px bg-white/15 mx-auto mb-3" />
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-cream/20">{style.imgLabel}</span>
            <div className="w-8 h-px bg-white/15 mx-auto mt-3" />
          </div>
        </div>
        <span className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.2em] text-cream/15">{style.num}</span>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-xl font-bold group-hover:text-white transition-colors duration-300">
            {style.name}
          </h3>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-7 h-7 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors flex-shrink-0 ml-3"
          >
            <span className="text-white/40 text-xs leading-none">+</span>
          </motion.div>
        </div>

        <p className="font-sans text-sm text-cream/35 leading-[1.8] mb-5 font-light">{style.desc}</p>

        <div className="flex flex-wrap gap-2">
          {style.keywords.map((kw) => (
            <span key={kw} className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/25 px-2.5 py-1 border border-white/6 group-hover:border-white/15 transition-colors">
              {kw}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* Full-width custom design card — users describe their own idea */
function CustomDesignCard({ index }: { index: number }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const MAX = 320;

  const handleSend = () => {
    if (text.trim()) {
      const msg = `Hallo Natascha! Ich habe eine eigene Tattoo-Idee:\n\n"${text}"\n\nKannst du mir dazu mehr sagen?`;
      window.open(`https://wa.me/4915257668403?text=${encodeURIComponent(msg)}`, "_blank");
      setSent(true);
    } else {
      scrollTo("kontakt");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="md:col-span-2 lg:col-span-3 group relative border border-white/8 hover:border-white/18 bg-[#0d0d0d] transition-all duration-500 overflow-hidden"
    >
      {/* Subtle top glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.035)_0%,transparent_60%)] pointer-events-none" />

      <div className="flex flex-col md:flex-row">
        {/* Left — info column */}
        <div className="p-8 md:p-10 md:w-2/5 flex flex-col justify-between border-b border-white/6 md:border-b-0 md:border-r md:border-white/6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-cream/20">07</span>
              <div className="w-4 h-px bg-white/15" />
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/25">Custom Design</span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Deine eigene
              <br />
              <span className="text-white/50">Idee.</span>
            </h3>

            <p className="font-sans text-sm text-cream/35 leading-[1.9] font-light mb-6">
              Kein Stil passt genau? Kein Problem — beschreibe einfach deine Idee. Motiv, Bedeutung, Körperstelle, Größe. Natascha entwickelt mit dir gemeinsam das perfekte, einzigartige Tattoo.
            </p>

            <div className="flex flex-wrap gap-2">
              {["100% Individuell", "Kostenlose Beratung", "Dein Motiv"].map((kw) => (
                <span key={kw} className="font-sans text-[9px] tracking-[0.18em] uppercase text-cream/22 px-3 py-1.5 border border-white/6 group-hover:border-white/14 transition-colors rounded-full">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/6">
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-cream/20">
              Direkt per WhatsApp
            </span>
          </div>
        </div>

        {/* Right — textarea + send */}
        <div className="p-8 md:p-10 flex-1 flex flex-col">
          <label className="font-sans text-[9px] tracking-[0.28em] uppercase text-cream/25 mb-4 block">
            Beschreibe dein Tattoo
          </label>

          <div className="relative flex-1 mb-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX))}
              placeholder="Z.B. Realistischer Wolf auf dem Unterarm, schwarz-grau, mittelgross, bedeutet mir Staerke und Familie. - erzaehl einfach was dir vorschwebt..."
              className="w-full h-full min-h-[160px] bg-[#0a0a0a] border border-white/8 focus:border-white/25 outline-none rounded-sm font-sans text-sm text-white/70 placeholder:text-white/18 resize-none leading-relaxed p-5 transition-colors duration-300 focus:bg-[#0c0c0c]"
              rows={6}
            />
            {/* Character counter */}
            <span className={`absolute bottom-3.5 right-4 font-sans text-[9px] transition-colors duration-300 ${text.length > MAX * 0.85 ? "text-white/40" : "text-white/15"}`}>
              {text.length}/{MAX}
            </span>
          </div>

          <button
            onClick={handleSend}
            className="flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-white text-black font-sans font-bold text-[11px] tracking-[0.22em] uppercase hover:bg-white/90 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] self-start"
          >
            {sent ? (
              <>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">✓</span>
                Gesendet
              </>
            ) : text.trim() ? (
              <>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">→</span>
                An Natascha schicken
              </>
            ) : (
              <>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">→</span>
                Kontakt aufnehmen
              </>
            )}
          </button>

          <p className="mt-4 font-sans text-[9px] text-cream/18 leading-relaxed">
            Du wirst direkt zu WhatsApp weitergeleitet. Deine Idee wird vorab übermittelt — so kann Natascha sich vorbereiten.
          </p>
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
            <div className="w-8 h-px bg-white/30" />
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/4">
          {styles.map((style, i) => (
            <StyleCard key={style.num} style={style} index={i} />
          ))}
          <CustomDesignCard index={6} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => scrollTo("kontakt")}
            className="font-sans text-[11px] tracking-[0.22em] uppercase text-cream/30 border-b border-cream/15 pb-1 hover:text-white hover:border-white/50 transition-colors duration-300"
          >
            Kostenlose Beratung anfragen →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
