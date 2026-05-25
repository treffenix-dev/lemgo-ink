"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MENU } from "@/lib/menu";

function fmt(price?: number) {
  if (price === undefined) return "auf Anfrage";
  return price.toFixed(2).replace(".", ",") + " €";
}

export function MenuSection() {
  const [active, setActive] = useState("balkan");
  const category = MENU.find((c) => c.id === active) ?? MENU[0];

  return (
    <section id="speisekarte" className="py-36 px-[5%]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="gold-rule" />
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] text-cream mb-3">
            Speisekarte
          </h2>
          <p className="font-sans text-[0.8rem] text-muted leading-loose max-w-sm">
            Täglich frisch zubereitet · Großzügige Portionen · Faire Preise
          </p>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-16">

          {/* Category sidebar */}
          <div className="flex md:flex-col gap-2 flex-wrap">
            {MENU.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`text-left font-sans text-[0.68rem] tracking-[0.18em] uppercase transition-colors duration-200 py-2 border-l-2 pl-3 ${
                  active === c.id
                    ? "border-gold text-cream"
                    : "border-transparent text-muted hover:text-cream hover:border-border"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Items — editorial menu style */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display font-light text-[1.6rem] text-cream mb-8 pb-4 border-b border-border">
              {category.label}
            </h3>

            <div className="flex flex-col gap-5">
              {category.items.map((item) => (
                <div key={item.name}>
                  <div className="flex items-baseline gap-0">
                    <span className="font-display text-[1.05rem] text-cream">{item.name}</span>
                    <span className="menu-dots" />
                    <span className={`font-display text-[1.05rem] shrink-0 ${item.price ? "text-gold-lt" : "text-muted text-[0.8rem] italic font-sans"}`}>
                      {fmt(item.price)}
                    </span>
                  </div>
                  {item.desc && (
                    <p className="font-sans text-[0.72rem] text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                  )}
                </div>
              ))}
            </div>

            <p className="font-sans text-[0.65rem] text-muted/60 mt-10 tracking-[0.12em]">
              Alle Gerichte auch zum Mitnehmen · Nur Barzahlung
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
