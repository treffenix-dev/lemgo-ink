"use client";
import { ORDERABLE } from "@/lib/menu";

type Props = {
  onAdd: (name: string, price: number) => void;
};

function fmt(price: number) {
  return price.toFixed(2).replace(".", ",") + " €";
}

export function OrderSection({ onAdd }: Props) {
  return (
    <section id="bestellen" className="py-36 px-[5%] bg-surface">
      <div className="max-w-3xl mx-auto">
        <span className="gold-rule" />
        <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] text-cream mb-3">
          Online bestellen
        </h2>
        <p className="font-sans text-[0.8rem] text-muted mb-3 max-w-sm leading-loose">
          Abholung an der Kasse · Mittelstraße 144
        </p>
        <p className="font-display font-light text-[1.4rem] text-cream tracking-[0.08em] mb-14">
          Barzahlung vor Ort
        </p>

        <div className="flex flex-col divide-y divide-border">
          {ORDERABLE.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center gap-6 py-5"
            >
              <div className="flex-1">
                <div className="font-display text-[1.05rem] text-cream">{item.name}</div>
                {item.desc && (
                  <div className="font-sans text-[0.72rem] text-muted mt-0.5">{item.desc}</div>
                )}
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <span className="font-display text-[1.1rem] text-gold-lt">{fmt(item.price!)}</span>
                <button
                  onClick={() => onAdd(item.name, item.price!)}
                  className="w-8 h-8 border border-border/80 text-muted flex items-center justify-center text-lg hover:border-gold hover:text-gold-lt transition-all duration-200"
                  aria-label={`${item.name} hinzufügen`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
