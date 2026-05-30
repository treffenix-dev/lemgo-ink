"use client";

import { motion } from "framer-motion";

/**
 * Echte Google-Rezensionen (Originaltexte) im Google-Look.
 * Für LIVE / automatisch aktualisierte Reviews: Google Places API (Place Details)
 * mit API-Key + place_id anbinden — dann hier per fetch ersetzen.
 */

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Florians+Esszimmer+Lemgo";

const RATING = 4.8;
const COUNT = 46;

const REVIEWS = [
  {
    name: "Marvin Palemba",
    initial: "M",
    color: "#7E57C2",
    when: "vor 3 Monaten",
    stars: 5,
    text: "Eines der besten Restaurants in Lemgo! Tolles Ambiente, super Service und das Essen ist ein Erlebnis.",
  },
  {
    name: "Silke Maik",
    initial: "S",
    color: "#C2185B",
    when: "vor 2 Monaten",
    stars: 5,
    text: "Wir sind begeistert! Unser Mädelsabend wurde mit einer Geschmacksexplosion in diesem urigen Restaurant gekrönt. Tolles Essen!",
  },
  {
    name: "J. K.",
    initial: "J",
    color: "#00897B",
    when: "vor 5 Monaten",
    stars: 5,
    text: "Schnuckelig klein, aber feines Restaurant. Tolles und freundliches Personal — und das Essen ein echtes Geschmackserlebnis.",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} von 5 Sternen`} className="text-[#FBBC04] text-sm tracking-tight">
      {"★★★★★".slice(0, n)}
      <span className="text-border">{"★★★★★".slice(n)}</span>
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="relative z-10 border-y border-border/60 bg-surface/60 py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        {/* Kopf: Google-Rating */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3">
            <GoogleG />
            <span className="font-display text-5xl text-cream leading-none">{RATING.toString().replace(".", ",")}</span>
            <div className="text-left">
              <Stars n={5} />
              <div className="text-[0.7rem] uppercase tracking-[0.18em] text-muted mt-1">
                {COUNT} Google-Rezensionen
              </div>
            </div>
          </div>
        </motion.div>

        {/* Karten */}
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="rounded-lg border border-border/70 bg-bg/60 p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="grid place-items-center h-10 w-10 rounded-full text-cream font-medium shrink-0"
                  style={{ background: r.color }}
                >
                  {r.initial}
                </span>
                <div className="min-w-0">
                  <div className="text-cream text-sm truncate">{r.name}</div>
                  <div className="text-muted text-[0.68rem]">{r.when}</div>
                </div>
                <span className="ml-auto"><GoogleG small /></span>
              </div>
              <Stars n={r.stars} />
              <blockquote className="mt-3 text-muted text-sm leading-relaxed">{r.text}</blockquote>
            </motion.figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.72rem] uppercase tracking-[0.18em] text-gold border-b border-gold/40 pb-1 hover:text-gold-lt transition-colors"
          >
            Alle Bewertungen auf Google →
          </a>
        </div>
      </div>
    </section>
  );
}

function GoogleG({ small = false }: { small?: boolean }) {
  const s = small ? 16 : 30;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}
