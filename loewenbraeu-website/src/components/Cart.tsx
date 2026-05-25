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
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-surface border-l border-border z-50 flex flex-col"
          >
            {!success ? (
              <>
                <div className="flex justify-between items-center px-6 py-5 border-b border-border">
                  <h3 className="font-display text-xl">Ihre Bestellung</h3>
                  <button onClick={onClose} className="text-muted hover:text-cream text-2xl leading-none">✕</button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <p className="text-muted text-sm text-center py-12">Noch keine Gerichte gewählt.</p>
                  ) : (
                    <div className="divide-y divide-border">
                      {items.map((item) => (
                        <div key={item.name} className="py-4 flex gap-3 items-start">
                          <div className="flex-1">
                            <div className="text-sm text-cream">{item.name}</div>
                            <div className="text-xs text-muted mt-0.5">{fmt(item.price)} / Stück</div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => onChangeQty(item.name, -1)} className="w-7 h-7 border border-border text-cream hover:border-gold hover:text-gold flex items-center justify-center text-base">−</button>
                            <span className="text-sm w-5 text-center">{item.qty}</span>
                            <button onClick={() => onChangeQty(item.name, +1)} className="w-7 h-7 border border-border text-cream hover:border-gold hover:text-gold flex items-center justify-center text-base">+</button>
                          </div>
                          <span className="font-display text-gold-lt text-sm shrink-0 w-16 text-right">{fmt(item.price * item.qty)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-border px-6 py-5 space-y-4">
                    <div>
                      <label className="text-[0.65rem] tracking-[0.28em] uppercase text-gold block mb-1.5">Abholzeit</label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-bg border border-border text-cream px-3 py-2.5 text-sm outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="text-[0.65rem] tracking-[0.28em] uppercase text-gold block mb-1.5">Ihr Name</label>
                      <input
                        type="text"
                        placeholder="Für die Abholung"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-bg border border-border text-cream px-3 py-2.5 text-sm outline-none focus:border-gold placeholder-muted"
                      />
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-[0.72rem] text-muted tracking-[0.12em] uppercase">Gesamt</span>
                      <span className="font-display text-2xl text-gold-lt">{fmt(total)}</span>
                    </div>
                    <p className="text-[0.7rem] text-muted">Barzahlung bei Abholung · Mittelstraße 144, Lemgo</p>
                    <button
                      onClick={submit}
                      className="w-full bg-gold text-bg text-[0.82rem] font-medium tracking-[0.12em] uppercase py-4 hover:bg-gold-lt transition-colors"
                    >
                      Bestellung absenden →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="font-display text-2xl mb-3">Bestellung aufgegeben!</h3>
                <p className="text-muted text-sm leading-loose">
                  Danke, <strong className="text-cream">{name}</strong>! Ihre Bestellung über{" "}
                  <strong className="text-gold-lt">{fmt(total)}</strong> ist eingegangen.
                  Abholung gegen <strong className="text-cream">{time} Uhr</strong> — bitte Bargeld mitbringen.
                </p>
                <button onClick={reset} className="mt-8 bg-gold text-bg px-8 py-3 text-sm font-medium tracking-[0.12em] uppercase hover:bg-gold-lt transition-colors">
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
