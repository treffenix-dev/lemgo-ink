"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Discovery & Strategie",
    desc: "30-Minuten-Gespräch. Wir verstehen dein Business, deine Kunden und deine Ziele — dann definieren wir den perfekten Scope.",
    duration: "1–2 Tage",
    color: "border-accent",
    glow: "bg-accent",
  },
  {
    step: "02",
    title: "Design & Konzept",
    desc: "Figma-Prototyp mit allem: Layout, 3D-Konzept, Animationsplanung, Farbwelt. Du siehst genau was entsteht, bevor Code geschrieben wird.",
    duration: "3–5 Tage",
    color: "border-cyan",
    glow: "bg-cyan",
  },
  {
    step: "03",
    title: "3D & Development",
    desc: "Hier passiert die Magie. Mit KI-Tools entwickeln wir 5x schneller als klassische Agenturen — gleiche Qualität, halbe Zeit.",
    duration: "1–3 Wochen",
    color: "border-violet",
    glow: "bg-violet",
  },
  {
    step: "04",
    title: "Launch & Optimierung",
    desc: "Deployment auf Vercel, Performance-Optimierung bis Lighthouse 100, A/B-Testing und Tracking-Setup. Fertig zum Geldverdienen.",
    duration: "2–3 Tage",
    color: "border-emerald-400",
    glow: "bg-emerald-400",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="prozess" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm tracking-[0.3em] text-muted uppercase">
              Prozess
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Von 0 zur
            <br />
            <span className="gradient-text">fertigen Website</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-accent via-violet to-emerald-400 hidden lg:block opacity-30" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex gap-8 items-start"
              >
                {/* Step indicator */}
                <div className="relative flex-shrink-0 hidden lg:flex">
                  <div
                    className={`w-16 h-16 rounded-full border-2 ${step.color} bg-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="font-mono text-sm font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 rounded-full ${step.glow} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 rounded-2xl border border-white/8 bg-surface/30 hover:border-white/15 transition-all duration-300 group-hover:bg-surface/60">
                  <div className="flex items-start justify-between mb-3">
                    <div className="lg:hidden font-mono text-sm text-muted mb-1">
                      {step.step}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs text-muted font-mono">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 p-8 rounded-2xl border border-accent/30 bg-accent/5 text-center"
        >
          <p className="text-muted text-sm mb-2 uppercase tracking-widest">Gesamtdauer</p>
          <p className="font-display text-3xl md:text-4xl font-bold">
            <span className="gradient-text">2–4 Wochen</span> von Briefing bis Launch
          </p>
          <p className="text-muted text-sm mt-3">
            Klassische Agenturen brauchen 3–6 Monate. Wir nutzen KI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
