"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reviews = [
  {
    name: "Sarah M.",
    stars: 5,
    date: "vor 2 Monaten",
    text: "Natascha hat mein Portrait-Tattoo perfekt umgesetzt. Sie hat sich wirklich Zeit genommen, alles zu besprechen, und das Ergebnis ist einfach atemberaubend. Sauberste Arbeit!",
  },
  {
    name: "Kevin B.",
    stars: 5,
    date: "vor 3 Monaten",
    text: "Endlich jemand der zuhört was man wirklich will. Die Beratung war super ausführlich, keine Hetze. Das Tattoo ist genau so geworden wie ich es mir vorgestellt hatte — danke Natascha!",
  },
  {
    name: "Laura H.",
    stars: 5,
    date: "vor 5 Monaten",
    text: "Black & Grey Realism auf höchstem Niveau. Ich war sehr nervös, aber die Atmosphäre im Studio war sofort entspannt und vertrauensvoll. Absolute Empfehlung!",
  },
  {
    name: "Marco D.",
    stars: 4,
    date: "vor 6 Monaten",
    text: "Mein Cover-Up ist sensationell geworden. Was vorher ein schlechtes altes Tattoo war, ist jetzt ein echtes Kunstwerk. Natascha weiß genau was sie tut.",
  },
  {
    name: "Jana K.",
    stars: 5,
    date: "vor 8 Monaten",
    text: "So eine tolle Künstlerin! Mein Fine-Line-Tattoo ist perfekt gesetzt, super fein und elegant. Das Studio ist sauber, professionell und das Ergebnis einfach wunderschön.",
  },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-xs ${i < stars ? "text-gold" : "text-cream/15"}`}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="bewertungen" className="py-28 bg-[#060606] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div ref={ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">Was Kunden sagen</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <h2 className="font-display text-[clamp(32px,5vw,62px)] font-bold leading-tight">
              Echte Stimmen.
              <br />
              <span className="gradient-text">Echte Ergebnisse.</span>
            </h2>

            {/* Google Rating Summary */}
            <div className="flex items-center gap-4 p-4 border border-gold/15 bg-surface/30 self-start md:self-auto">
              {/* Google G */}
              <svg width="28" height="28" viewBox="0 0 24 24" className="flex-shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-display text-2xl font-bold text-gold">4.7</span>
                  <StarRating stars={5} />
                </div>
                <p className="font-sans text-[10px] text-cream/30 tracking-[0.15em]">39 Google Bewertungen</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6 lg:-mx-16 lg:px-16">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-[300px] md:w-[340px] snap-start p-6 border border-cream/8 bg-surface/20 hover:border-gold/20 transition-colors duration-300"
            >
              {/* Top: Stars + Google badge */}
              <div className="flex items-start justify-between mb-4">
                <StarRating stars={review.stars} />
                <span className="font-sans text-[9px] tracking-[0.2em] text-cream/20 uppercase">Google</span>
              </div>

              {/* Review text */}
              <p className="font-sans text-sm text-cream/50 leading-[1.85] font-light mb-5">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-cream/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xs font-bold text-gold/70">{review.name[0]}</span>
                </div>
                <div>
                  <p className="font-sans text-xs font-medium text-cream/60">{review.name}</p>
                  <p className="font-sans text-[10px] text-cream/25">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="https://maps.google.com/?q=Lemgo+INK+NataschaLee"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-[11px] tracking-[0.22em] uppercase text-cream/30 border-b border-cream/15 pb-1 hover:text-gold hover:border-gold transition-colors duration-300"
          >
            Alle Bewertungen auf Google ansehen →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
