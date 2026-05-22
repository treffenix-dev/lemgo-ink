"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    number: "01",
    title: "3D Web Experiences",
    desc: "Immersive 3D-Welten direkt im Browser — kein Plugin, keine App. Three.js, WebGL und React Three Fiber für unvergessliche erste Eindrücke.",
    tags: ["Three.js", "WebGL", "R3F"],
    color: "from-accent to-cyan",
    glow: "rgba(79,70,229,0.2)",
  },
  {
    number: "02",
    title: "Motion Design & Animation",
    desc: "Flüssige Animationen, die Nutzer führen und begeistern. Scroll-getriggerte Effekte, Mikrointeraktionen und cineastische Transitions.",
    tags: ["Framer Motion", "GSAP", "CSS"],
    color: "from-cyan to-violet",
    glow: "rgba(6,182,212,0.2)",
  },
  {
    number: "03",
    title: "Premium UI/UX Design",
    desc: "Interfaces, die konvertieren. Von der Konzeption bis zum Pixel-perfekten Design mit modernster Typografie und durchdachter Nutzererfahrung.",
    tags: ["Figma", "Tailwind", "Design Systems"],
    color: "from-violet to-pink-500",
    glow: "rgba(139,92,246,0.2)",
  },
  {
    number: "04",
    title: "Performance & SEO",
    desc: "Blitzschnelle Ladezeiten, perfekte Core Web Vitals, und technische SEO — damit Google deine Seite liebt und Nutzer sie nicht verlassen.",
    tags: ["Next.js", "Vercel", "Lighthouse 100"],
    color: "from-emerald-400 to-cyan",
    glow: "rgba(52,211,153,0.2)",
  },
  {
    number: "05",
    title: "KI-gestützte Entwicklung",
    desc: "Mit Claude Code, Cursor und MCP-Servern entwickeln wir 5x schneller. Was früher Wochen dauerte, liefern wir in Tagen.",
    tags: ["Claude Code", "Cursor", "AI Agents"],
    color: "from-yellow-400 to-orange-500",
    glow: "rgba(251,191,36,0.2)",
  },
  {
    number: "06",
    title: "Conversion Optimierung",
    desc: "Schönheit ist gut, Umsatz ist besser. Wir bauen Websites, die nicht nur beeindrucken, sondern aktiv Leads und Käufer generieren.",
    tags: ["A/B Testing", "Analytics", "CRO"],
    color: "from-rose-400 to-accent",
    glow: "rgba(244,63,94,0.2)",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative p-8 rounded-2xl border border-white/8 bg-surface/50 backdrop-blur-sm hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
      style={
        {
          "--glow": service.glow,
        } as React.CSSProperties
      }
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow} 0%, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-xs font-mono text-muted">{service.number}</span>
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">✦</span>
          </div>
        </div>

        <h3 className="font-display text-xl font-bold mb-3 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-6">{service.desc}</p>

        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs text-muted group-hover:border-white/15 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leistungen" className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
      <div ref={ref} className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-2 h-2 rounded-full bg-cyan" />
          <span className="text-sm tracking-[0.3em] text-muted uppercase">
            Leistungen
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Was wir für dich
          <br />
          <span className="gradient-text">erschaffen</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <ServiceCard key={service.number} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
