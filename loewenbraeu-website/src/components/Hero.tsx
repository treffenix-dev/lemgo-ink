"use client";
import { motion } from "framer-motion";

const FOOD_IMG = "https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-[5%] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center hero-bg-filter"
        style={{
          backgroundImage: `url(${FOOD_IMG})`,
          transform: "scale(1.05)",
        }}
      />
      {/* Gradient: fade out at bottom */}
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="block w-8 h-px bg-gold/60" />
          <span className="font-sans text-[0.62rem] tracking-[0.4em] uppercase text-gold">
            Seit über 50 Jahren · Lemgo
          </span>
          <span className="block w-8 h-px bg-gold/60" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.92] text-cream mb-6"
        >
          Münchener
          <br />
          <span className="text-gold-lt italic">Löwenbräu</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display font-light text-[1.1rem] tracking-[0.18em] text-muted uppercase mb-14"
        >
          Balkan & Deutsche Küche
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-8 justify-center items-center"
        >
          <a
            href="#reservierung"
            className="font-sans text-[0.7rem] tracking-[0.26em] uppercase text-cream border border-cream/30 px-10 py-4 hover:border-gold-lt hover:text-gold-lt transition-all duration-300"
          >
            Tisch reservieren
          </a>
          <a
            href="#speisekarte"
            className="font-sans text-[0.7rem] tracking-[0.26em] uppercase text-muted hover:text-cream transition-colors duration-200"
          >
            Speisekarte ansehen →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="flex gap-12 mt-24 pt-10 border-t border-border/50"
        >
          {[
            { num: "4,8",  label: "Google Bewertung" },
            { num: "347",  label: "Rezensionen"      },
            { num: "50+",  label: "Jahre Erfahrung"  },
          ].map((b) => (
            <div key={b.label} className="text-center">
              <span className="font-display font-light text-[2.2rem] text-gold-lt block leading-none mb-1">{b.num}</span>
              <span className="font-sans text-[0.6rem] text-muted tracking-[0.2em] uppercase">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
