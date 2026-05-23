"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    q: "Was kostet ein Tattoo bei Lemgo INK?",
    a: "Der Stundensatz beträgt 120–150 €, abhängig von Komplexität und Motiv. Kleine Tattoos ab ca. 80 €. Die Erstberatung ist immer kostenlos — wir erstellen dir gerne ein individuelles Angebot nach deinen Vorstellungen.",
  },
  {
    q: "Schmerzt das Tätowieren?",
    a: "Ein leichtes Brennen oder Kratzen ist normal — der Schmerz ist sehr gut aushaltbar und hängt stark von der Körperstelle ab. Rippen, Unterschenkel und Ellenbogen sind empfindlicher. Natascha arbeitet besonders einfühlsam und macht bei Bedarf Pausen.",
  },
  {
    q: "Wie läuft die Terminanfrage ab?",
    a: "Schreib uns einfach über WhatsApp oder das Kontaktformular mit deiner Idee und gewünschter Körperstelle. Natascha meldet sich innerhalb von 24 h. Nach einem kurzen Beratungsgespräch und Anzahlung wird dein Termin fixiert.",
  },
  {
    q: "Kann ich ein eigenes Motiv mitbringen?",
    a: "Ja, absolut! Custom Design ist Nataschas Kernkompetenz. Du kannst Referenzbilder, Skizzen oder eine Beschreibung mitbringen. Sie entwickelt daraus ein einzigartiges Motiv, das perfekt zu dir passt — kein Copy-Paste fremder Motive.",
  },
  {
    q: "Wie bereite ich mich auf mein Tattoo vor?",
    a: "Schlaf gut, iss vorher eine vollwertige Mahlzeit und trinke ausreichend Wasser. Feuchte die Haut die Tage vorher ein. Trage lockere Kleidung, die die Stelle gut freilegt. Kein Alkohol 24 h vorher — das verdünnt das Blut.",
  },
  {
    q: "Wie lange dauert die Heilung?",
    a: "Die obere Hautschicht heilt in 2–3 Wochen. Die tieferen Schichten brauchen bis zu 3 Monate. Natascha gibt dir nach dem Termin einen detaillierten Pflegeplan mit. Ein kostenloses Nachstech-Termin ist bei Bedarf inbegriffen.",
  },
  {
    q: "Macht ihr auch Piercings?",
    a: "Ja! Natascha bietet professionelles Piercing mit hochwertigen Titanschmuckstücken an. Auch hier gilt: Termin vorab vereinbaren. Alle gängigen Körperstellen werden auf Anfrage berücksichtigt.",
  },
];

function FAQItem({
  item,
  index,
}: {
  item: (typeof faqs)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-white/6"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="font-sans text-sm md:text-[15px] text-white/70 group-hover:text-white transition-colors duration-300 leading-snug">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border border-white/15 flex items-center justify-center text-white/40 group-hover:border-white/30 group-hover:text-white/70 transition-colors duration-300 text-xs"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-cream/40 leading-[1.85] pb-6 max-w-2xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" ref={ref} className="py-28 bg-[#060606] border-t border-white/4">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-white/30" />
              <span className="section-label">FAQ</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white/90 leading-tight mb-6">
              Deine
              <br />
              Fragen.
            </h2>
            <p className="font-sans text-sm text-cream/35 leading-[1.85] max-w-[240px]">
              Alles, was du vor deinem ersten Termin wissen möchtest.
            </p>
            <div className="mt-10">
              <a
                href="https://wa.me/4915257668403"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-[#25D366]/70 hover:text-[#25D366] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]/60" />
                Weitere Fragen? WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <div className="divide-y divide-white/6">
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
