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
    <section id="speisekarte" className="py-28 px-[5%] bg-surface">
      <div className="max-w-5xl mx-auto">
        <span className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-3 block">Unsere Küche</span>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-2">Speisekarte</h2>
        <p className="text-muted text-sm mb-10 max-w-md leading-loose">
          Frisch zubereitet, großzügige Portionen, faire Preise. Alle Gerichte auch zum Mitnehmen.
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {MENU.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`text-[0.72rem] tracking-[0.16em] uppercase px-4 py-2 border transition-colors ${
                active === c.id
                  ? "bg-gold text-bg border-gold"
                  : "border-border text-muted hover:border-gold/50 hover:text-cream"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="divide-y divide-border border border-border"
        >
          {category.items.map((item) => (
            <div key={item.name} className="flex justify-between items-start gap-4 p-5 bg-surface2">
              <div className="flex-1">
                <div className="text-[0.92rem] text-cream">{item.name}</div>
                {item.desc && (
                  <div className="text-[0.78rem] text-muted mt-0.5">{item.desc}</div>
                )}
              </div>
              <span className={`font-display text-[0.95rem] shrink-0 ${item.price ? "text-gold-lt" : "text-muted text-[0.75rem] italic"}`}>
                {fmt(item.price)}
              </span>
            </div>
          ))}
        </motion.div>

        <p className="mt-5 text-[0.75rem] text-muted">
          Alle Gerichte auch zum Mitnehmen · Nur Barzahlung · Tischreservierung empfohlen
        </p>
      </div>
    </section>
  );
}
