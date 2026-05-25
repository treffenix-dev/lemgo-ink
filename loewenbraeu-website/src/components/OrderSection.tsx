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
    <section id="bestellen" className="py-28 px-[5%]">
      <div className="max-w-3xl mx-auto">
        <span className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-3 block">Abholung & Mitnahme</span>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-2">Online bestellen</h2>
        <p className="text-muted text-sm mb-10 max-w-md leading-loose">
          Wählen Sie Ihre Gerichte — wir bereiten alles frisch zu. Abholung nach Absprache.
        </p>

        <div className="flex flex-col gap-3">
          {ORDERABLE.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center gap-4 bg-surface2 border border-border px-5 py-4"
            >
              <div className="flex-1">
                <div className="text-[0.92rem] text-cream">{item.name}</div>
                {item.desc && <div className="text-[0.78rem] text-muted mt-0.5">{item.desc}</div>}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-display text-gold-lt text-[0.95rem]">{fmt(item.price!)}</span>
                <button
                  onClick={() => onAdd(item.name, item.price!)}
                  className="w-9 h-9 border border-border text-gold flex items-center justify-center text-xl hover:bg-gold hover:text-bg hover:border-gold transition-colors"
                  aria-label={`${item.name} in den Warenkorb`}
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
