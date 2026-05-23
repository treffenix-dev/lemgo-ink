"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reviews = [
  {
    name: "Sarah M.",
    stars: 5,
    date: "vor 2 Monaten",
    style: "Portrait Realism",
    text: "Natascha hat mein Portrait-Tattoo perfekt umgesetzt. Sie hat sich wirklich Zeit genommen, alles zu besprechen — das Ergebnis ist einfach atemberaubend.",
  },
  {
    name: "Kevin B.",
    stars: 5,
    date: "vor 3 Monaten",
    style: "Custom Design",
    text: "Endlich jemand der zuhört was man wirklich will. Keine Hetze, keine Kompromisse. Das Tattoo ist genau so geworden wie ich es mir vorgestellt hatte.",
  },
  {
    name: "Laura H.",
    stars: 5,
    date: "vor 5 Monaten",
    style: "Black & Grey",
    text: "Black & Grey Realism auf höchstem Niveau. Die Atmosphäre im Studio war sofort entspannt und vertrauensvoll. Absolute Empfehlung an jeden!",
  },
  {
    name: "Marco D.",
    stars: 5,
    date: "vor 6 Monaten",
    style: "Cover-Up",
    text: "Mein Cover-Up ist sensationell geworden. Was vorher ein schlechtes altes Tattoo war, ist jetzt ein echtes Kunstwerk. Natascha weiß genau was sie tut.",
  },
  {
    name: "Jana K.",
    stars: 5,
    date: "vor 8 Monaten",
    style: "Fine Line",
    text: "So eine tolle Künstlerin! Mein Fine-Line-Tattoo ist perfekt gesetzt, super fein und elegant. Das Studio ist sauber und professionell.",
  },
  {
    name: "Thomas R.",
    stars: 5,
    date: "vor 9 Monaten",
    style: "Neo Traditional",
    text: "Von der ersten Nachricht bis zur Fertigstellung ein reibungsloser Prozess. Natascha erklärt jeden Schritt, das Ergebnis übertrifft alle Erwartungen.",
  },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] lg:w-[380px] p-8 border border-cream/8 bg-surface/30 hover:border-gold/25 transition-all duration-500 group">
      {/* Top */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex gap-0.5">
          {[...Array(review.stars)].map((_, i) => (
            <span key={i} className="text-gold text-xs">★</span>
          ))}
        </div>
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/20 border border-cream/8 px-2 py-1">
          {review.style}
        </span>
      </div>

      {/* Quote */}
      <p className="font-sans text-[14px] text-cream/50 leading-[1.9] font-light mb-6 group-hover:text-cream/65 transition-colors duration-500">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3 pt-5 border-t border-cream/5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/25 to-gold/8 border border-gold/20 flex items-center justify-center flex-shrink-0">
          <span className="font-display text-sm text-gold/70">{review.name[0]}</span>
        </div>
        <div>
          <p className="font-sans text-xs font-medium text-cream/65">{review.name}</p>
          <p className="font-sans text-[10px] text-cream/25">{review.date}</p>
        </div>
        {/* Google mark */}
        <div className="ml-auto">
          <svg width="16" height="16" viewBox="0 0 24 24" opacity="0.35">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const doubled = [...reviews, ...reviews];

  return (
    <section id="bewertungen" className="py-28 lg:py-36 bg-[#060606] overflow-hidden">
      {/* Header */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-10 h-px bg-gold/40" />
          <span className="section-label">Was Kunden sagen</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 1.0, ease: [0.16, 1, 0.36, 1] }}
            className="font-display leading-[0.88] tracking-wide"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            <span className="block text-ivory/82">ECHTE STIMMEN.</span>
            <span className="block gold-text">ECHTE KUNST.</span>
          </motion.h2>

          {/* Google badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 px-6 py-4 border border-gold/18 bg-surface/20 self-start md:self-auto flex-shrink-0"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl text-gold leading-none">4.7</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-gold text-xs">★</span>)}
                </div>
              </div>
              <p className="font-sans text-[10px] text-cream/30 tracking-[0.18em] mt-0.5">39 Google Bewertungen</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Auto-scroll marquee Row 1 */}
      <div className="flex gap-5 animate-marquee mb-5" style={{ width: "max-content" }}>
        {doubled.map((review, i) => (
          <ReviewCard key={`r1-${i}`} review={review} />
        ))}
      </div>

      {/* Auto-scroll marquee Row 2 (reverse) */}
      <div className="flex gap-5 animate-marquee-reverse" style={{ width: "max-content" }}>
        {[...doubled].reverse().map((review, i) => (
          <ReviewCard key={`r2-${i}`} review={review} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="text-center mt-14"
      >
        <a
          href="https://maps.google.com/?q=Lemgo+INK+NataschaLee"
          target="_blank"
          rel="noreferrer"
          className="font-sans text-[10px] tracking-[0.28em] uppercase text-cream/28
            border-b border-cream/12 pb-1 hover:text-gold hover:border-gold/50
            transition-all duration-400"
        >
          Alle 39 Bewertungen auf Google →
        </a>
      </motion.div>
    </section>
  );
}
