"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem, cartTotal } from "@/lib/cart";

type Props = {
  items: CartItem[];
  open: boolean;
  onClose: () => void;
  onChangeQty: (name: string, delta: number) => void;
  onClear: () => void;
};

function fmt(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

function defaultPickup() {
  const d = new Date(Date.now() + 30 * 60000);
  return d.toTimeString().slice(0, 5);
}

export function Cart({ items, open, onClose, onChangeQty, onClear }: Props) {
  const [name, setName] = useState("");
  const [time, setTime] = useState(defaultPickup());
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function submit() {
    if (!name.trim()) { alert("Bitte Ihren Namen eingeben."); return; }
    setSuccess(true);
  }

  function reset() {
    setSuccess(false);
    onClear();
    onClose();
    setName("");
    setTime(defaultPickup());
  }

  const total = cartTotal(items);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40"
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-surface border-l border-border z-50 flex flex-col"
          >
            {!success ? (
              <>
                <div className="flex justify-between items-center px-7 py-6 border-b border-border">
                  <h3 className="font-display font-light text-xl text-cream">Ihre Bestellung</h3>
                  <button onClick={onClose} className="text-muted hover:text-cream transition-colors text-lg leading-none">✕</button>
                </div>

                <div className="flex-1 overflow-y-auto px-7 py-5">
                  {items.length === 0 ? (
                    <p className="font-sans text-[0.78rem] text-muted text-center py-16">Noch keine Gerichte gewählt.</p>
                  ) : (
                    <div className="divide-y divide-border">
                      {items.map((item) => (
                        <div key={item.name} className="py-5 flex gap-3 items-center">
                          <div className="flex-1">
                            <div className="font-display text-[0.95rem] text-cream">{item.name}</div>
                            <div className="font-sans text-[0.68rem] text-muted mt-0.5">{fmt(item.price)} / Stück</div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => onChangeQty(item.name, -1)} className="w-6 h-6 border border-border text-muted hover:border-gold hover:text-gold-lt flex items-center justify-center text-sm transition-colors">−</button>
                            <span className="font-sans text-[0.82rem] w-4 text-center text-cream">{item.qty}</span>
                            <button onClick={() => onChangeQty(item.name, +1)} className="w-6 h-6 border border-border text-muted hover:border-gold hover:text-gold-lt flex items-center justify-center text-sm transition-colors">+</button>
                          </div>
                          <span className="font-display text-gold-lt text-[0.95rem] shrink-0 w-16 text-right">{fmt(item.price * item.qty)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-border px-7 py-6 space-y-4">
                    <div>
                      <label className="font-sans text-[0.58rem] tracking-[0.28em] uppercase text-gold block mb-2">Abholzeit</label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-transparent border-b border-border text-cream font-sans text-sm py-2 outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[0.58rem] tracking-[0.28em] uppercase text-gold block mb-2">Ihr Name</label>
                      <input
                        type="text"
                        placeholder="Für die Abholung"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b border-border text-cream font-sans text-sm py-2 outline-none focus:border-gold placeholder-muted/50 transition-colors"
                      />
                    </div>
                    <div className="flex justify-between items-baseline pt-3">
                      <span className="font-sans text-[0.62rem] text-muted tracking-[0.16em] uppercase">Gesamt</span>
                      <span className="font-display font-light text-2xl text-gold-lt">{fmt(total)}</span>
                    </div>
                    <p className="font-sans text-[0.65rem] text-muted/60">Barzahlung bei Abholung · Mittelstraße 144</p>
                    <button
                      onClick={submit}
                      className="w-full font-sans text-[0.7rem] tracking-[0.2em] uppercase text-cream border border-cream/25 py-4 hover:border-gold-lt hover:text-gold-lt transition-all duration-300 mt-1"
                    >
                      Bestellung absenden →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <span className="font-display text-gold-lt text-4xl block mb-5">✓</span>
                <h3 className="font-display font-light text-2xl text-cream mb-4">Bestellung aufgegeben</h3>
                <p className="font-sans text-[0.78rem] text-muted leading-loose">
                  Danke, <strong className="text-cream">{name}</strong>! Ihre Bestellung über{" "}
                  <strong className="text-gold-lt">{fmt(total)}</strong> ist eingegangen.
                  Abholung gegen <strong className="text-cream">{time} Uhr</strong> — bitte Bargeld mitbringen.
                </p>
                <button onClick={reset} className="mt-8 font-sans text-[0.68rem] tracking-[0.22em] uppercase text-muted border-b border-muted/40 pb-px hover:text-cream hover:border-cream/40 transition-colors">
                  Schließen
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
