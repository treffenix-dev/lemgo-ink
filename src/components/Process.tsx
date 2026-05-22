"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Anfrage",
    desc: "Schreib uns per WhatsApp, Instagram oder über das Kontaktformular. Beschreib deine Idee — Motiv, Stil, Größe, Platzierung.",
    duration: "Heute",
    color: "border-gold",
    dot: "bg-gold",
  },
  {
    num: "02",
    title: "Beratung",
    desc: "Wir sprechen dein Motiv durch — kostenlos und unverbindlich. Natascha teilt ehrliche Einschätzungen und Ideen.",
    duration: "1–2 Tage",
    color: "border-gold/60",
    dot: "bg-gold/60",
  },
  {
    num: "03",
    title: "Deine Sitzung",
    desc: "Im Studio erwartet dich eine entspannte, private Atmosphäre. Natascha arbeitet mit höchster Präzision und nimmt sich die Zeit, die dein Tattoo verdient.",
    duration: "Nach Absprache",
    color: "border-gold/40",
    dot: "bg-gold/40",
  },
  {
    num: "04",
    title: "Nachsorge",
    desc: "Nach der Sitzung bekommst du genaue Pflegeanweisungen. Bei Fragen ist Natascha immer erreichbar — auch nach dem Termin.",
    duration: "1–4 Wochen",
    color: "border-gold/25",
    dot: "bg-gold/25",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-[#060606] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,162,39,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">So läuft es ab</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(32px,5vw,62px)] font-bold leading-tight"
          >
            Von der Idee
            <br />
            <span className="gradient-text">zu deiner Haut.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-gold/40 via-gold/15 to-transparent hidden lg:block" />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 items-start group"
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex flex-col items-center flex-shrink-0 pt-5">
                  <div className={`w-[14px] h-[14px] rounded-full ${step.dot} group-hover:scale-125 transition-transform duration-300`} />
                </div>

                {/* Content */}
                <div className="flex-1 p-7 border border-gold/8 hover:border-gold/20 bg-surface/20 transition-all duration-400 group-hover:bg-surface/40">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-sans text-[10px] tracking-[0.25em] text-cream/20">{step.num}</span>
                    <span className="font-sans text-[10px] tracking-[0.18em] text-gold/50 border border-gold/15 px-3 py-1">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-3 group-hover:text-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-cream/35 leading-[1.85] font-light">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-12 p-8 border border-gold/20 bg-gold/3 text-center"
        >
          <p className="font-sans text-xs text-cream/30 tracking-[0.2em] uppercase mb-2">Erstgespräch</p>
          <p className="font-display text-2xl md:text-3xl font-bold">
            <span className="gradient-text">Kostenlos & unverbindlich</span>
          </p>
          <p className="font-sans text-sm text-cream/30 mt-3 font-light">Natascha nimmt sich Zeit für deine Ideen — schreib einfach an.</p>
        </motion.div>
      </div>
    </section>
  );
}
