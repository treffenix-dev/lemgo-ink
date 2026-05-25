"use client";
import { motion } from "framer-motion";

const FOOD_IMG = "https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-24 pb-20 overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${FOOD_IMG})`,
          filter: "brightness(0.15) saturate(0.5)",
          transform: "scale(1.04)",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg/80" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-8"
        >
          Mittelstraße 144 · Lemgo · Seit über 50 Jahren
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[1.0] font-bold mb-7"
        >
          Balkan & Deutsche
          <br />
          <em className="text-gold-lt not-italic">Küche mit Seele</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-muted text-base max-w-md leading-loose mb-10"
        >
          Hausgemachte Ćevapčići, saftige Steaks und knusprige Schnitzel —
          serviert in gemütlicher Atmosphäre seit über einem halben Jahrhundert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="tel:+4952614267"
            className="bg-gold text-bg text-[0.8rem] font-medium tracking-[0.14em] uppercase px-8 py-4 hover:bg-gold-lt transition-colors"
          >
            Tisch reservieren →
          </a>
          <a
            href="#bestellen"
            className="text-muted text-[0.8rem] tracking-[0.14em] uppercase py-4 hover:text-cream transition-colors"
          >
            Online bestellen ↓
          </a>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-10 mt-16 pt-10 border-t border-border/60"
        >
          {[
            { num: "4,8 ★", label: "Google Bewertung" },
            { num: "347",   label: "Kundenbewertungen" },
            { num: "50+",   label: "Jahre Erfahrung" },
          ].map((b) => (
            <div key={b.label} className="text-center">
              <span className="font-display text-[2rem] text-gold-lt block">{b.num}</span>
              <span className="text-[0.68rem] text-muted tracking-[0.18em] uppercase">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
