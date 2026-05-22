"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const works = [
  {
    title: "TechVenture SaaS",
    category: "3D Landing Page",
    desc: "Immersive Product-Demo mit interaktivem 3D-Modell, 340% mehr Demo-Anfragen",
    gradient: "from-accent via-blue-500 to-cyan",
    tags: ["Three.js", "Next.js", "Framer"],
    result: "+340% Conversions",
  },
  {
    title: "LuxProperty AG",
    category: "Premium Real Estate",
    desc: "Virtuelle 3D-Hausbesichtigung direkt im Browser, €12M Immobilien verkauft",
    gradient: "from-violet to-pink-500",
    tags: ["WebGL", "GSAP", "React"],
    result: "€12M Verkauft",
  },
  {
    title: "FinFlow App",
    category: "Fintech Dashboard",
    desc: "Motion-Design-schweres Dashboard mit Echtzeit-Daten-Visualisierungen",
    gradient: "from-emerald-400 to-cyan",
    tags: ["D3.js", "Framer Motion", "TypeScript"],
    result: "4.9★ App Store",
  },
  {
    title: "ArtStudio Berlin",
    category: "Creative Agency",
    desc: "Award-winning Portfolio mit Scroll-Hijacking und 3D-Galerie",
    gradient: "from-yellow-400 to-orange-500",
    tags: ["Three.js", "GSAP ScrollTrigger"],
    result: "Awwwards Nominee",
  },
  {
    title: "MedTech GmbH",
    category: "B2B Product Site",
    desc: "Komplexes 3D-Produktmodell interaktiv erklärt — 5x mehr Leads",
    gradient: "from-rose-400 to-accent",
    tags: ["R3F", "Blender → Web"],
    result: "+500% Leads",
  },
  {
    title: "NightClub Identity",
    category: "Event & Nightlife",
    desc: "Psychedelische 3D-Experience mit Musik-reaktiven Shader-Effekten",
    gradient: "from-cyan to-violet",
    tags: ["WebAudio API", "GLSL Shader"],
    result: "Viral: 2M Views",
  },
];

function WorkCard({
  work,
  index,
}: {
  work: (typeof works)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
        isLarge ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Visual */}
      <div
        className={`relative h-64 md:h-80 bg-gradient-to-br ${work.gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/30 group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/30 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 group-hover:scale-75 transition-transform duration-500" />
        </div>

        <div className="relative z-10 text-center px-8">
          <p className="text-white/60 text-xs tracking-widest uppercase mb-2">
            {work.category}
          </p>
          <h3 className="font-display text-2xl font-bold text-white">
            {work.title}
          </h3>
        </div>

        {/* Result badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white">
          {work.result}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
          >
            <span className="text-black font-bold text-lg">→</span>
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 bg-surface/80 backdrop-blur-sm border border-white/5 border-t-0">
        <p className="text-sm text-muted mb-3 leading-relaxed">{work.desc}</p>
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted px-2 py-1 rounded bg-white/5 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Works() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projekte" className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
      <div ref={ref} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-violet" />
            <span className="text-sm tracking-[0.3em] text-muted uppercase">
              Projekte
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Ausgewählte
            <br />
            <span className="gradient-text">Arbeiten</span>
          </motion.h2>
        </div>

        <motion.a
          href="#kontakt"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="self-start md:self-auto px-6 py-3 rounded-full border border-white/15 hover:border-accent/50 text-sm font-medium transition-all duration-300 text-muted hover:text-white whitespace-nowrap"
        >
          Alle Projekte →
        </motion.a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work, i) => (
          <WorkCard key={work.title} work={work} index={i} />
        ))}
      </div>
    </section>
  );
}
