"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Mehrstufiges Tisch-Reservierungssystem.
 * Personen → Datum & Uhrzeit → Kontakt → Bestätigung.
 * Sendet an /api/reservierung (dort kann Supabase/E-Mail/Buchungstool angedockt werden).
 */

const PERSONEN = [1, 2, 3, 4, 5, 6];
const ZEITEN = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

type State = {
  personen: number | null;
  datum: string;
  uhrzeit: string;
  name: string;
  kontakt: string;
};

const heute = new Date().toISOString().split("T")[0];

export default function Reservation() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [s, setS] = useState<State>({ personen: null, datum: "", uhrzeit: "", name: "", kontakt: "" });

  const set = (patch: Partial<State>) => setS((p) => ({ ...p, ...patch }));

  const canNext =
    (step === 0 && s.personen) ||
    (step === 1 && s.datum && s.uhrzeit) ||
    (step === 2 && s.name.trim() && s.kontakt.trim());

  async function submit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/reservierung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-border/70 bg-surface2/60 p-7 md:p-9">
      {/* Fortschritt */}
      {status !== "done" && (
        <div className="flex items-center gap-2 mb-8">
          {["Personen", "Datum", "Kontakt"].map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1 rounded-full ${i <= step ? "bg-gold" : "bg-border"}`} />
              <div className={`mt-2 text-[0.6rem] uppercase tracking-[0.16em] ${i <= step ? "text-gold" : "text-muted"}`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="text-gold text-4xl mb-4">✓</div>
            <h3 className="font-display text-cream text-2xl mb-3">Anfrage erhalten</h3>
            <p className="text-muted leading-relaxed max-w-sm mx-auto">
              Danke, {s.name}. Wir bestätigen deinen Tisch für {s.personen}{" "}
              {s.personen === 1 ? "Person" : "Personen"} am {s.datum} um {s.uhrzeit} Uhr in Kürze
              persönlich.
            </p>
          </motion.div>
        ) : (
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
            {step === 0 && (
              <div>
                <h3 className="font-display text-gold text-2xl mb-6">Wie viele Gäste?</h3>
                <div className="grid grid-cols-3 gap-3">
                  {PERSONEN.map((n) => (
                    <button
                      key={n}
                      onClick={() => set({ personen: n })}
                      className={`py-4 rounded-md border text-lg font-display transition-colors ${
                        s.personen === n ? "border-gold bg-gold text-bg" : "border-border text-cream hover:border-gold/50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-muted text-xs">Mehr als 6 Gäste? Ruf uns gern direkt an: 01515 2495659.</p>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-display text-gold text-2xl mb-6">Wann darf es sein?</h3>
                <label className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted mb-2">Datum</label>
                <input
                  type="date"
                  min={heute}
                  value={s.datum}
                  onChange={(e) => set({ datum: e.target.value })}
                  className="w-full bg-bg border border-border rounded-md px-4 py-3 text-cream focus:border-gold outline-none [color-scheme:dark]"
                />
                <label className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted mt-6 mb-2">Uhrzeit</label>
                <div className="grid grid-cols-4 gap-2">
                  {ZEITEN.map((z) => (
                    <button
                      key={z}
                      onClick={() => set({ uhrzeit: z })}
                      className={`py-3 rounded-md border text-sm transition-colors ${
                        s.uhrzeit === z ? "border-gold bg-gold text-bg" : "border-border text-cream hover:border-gold/50"
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-gold text-2xl mb-6">Auf wen darf der Tisch laufen?</h3>
                <label className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted mb-2">Name</label>
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => set({ name: e.target.value })}
                  placeholder="Vor- und Nachname"
                  className="w-full bg-bg border border-border rounded-md px-4 py-3 text-cream focus:border-gold outline-none placeholder:text-muted/50"
                />
                <label className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted mt-6 mb-2">Telefon oder E-Mail</label>
                <input
                  type="text"
                  value={s.kontakt}
                  onChange={(e) => set({ kontakt: e.target.value })}
                  placeholder="Für die Bestätigung"
                  className="w-full bg-bg border border-border rounded-md px-4 py-3 text-cream focus:border-gold outline-none placeholder:text-muted/50"
                />
                <div className="mt-6 rounded-md border border-border/60 bg-bg/50 p-4 text-sm text-muted">
                  {s.personen} {s.personen === 1 ? "Person" : "Personen"} · {s.datum || "—"} · {s.uhrzeit || "—"} Uhr
                </div>
                {status === "error" && (
                  <p className="mt-3 text-sm text-[#DC6450]">Etwas ist schiefgelaufen — bitte erneut versuchen oder anrufen.</p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setStep((x) => Math.max(0, x - 1))}
                className={`text-[0.72rem] uppercase tracking-[0.16em] text-muted hover:text-cream transition-colors ${step === 0 ? "invisible" : ""}`}
              >
                ← Zurück
              </button>
              {step < 2 ? (
                <button
                  disabled={!canNext}
                  onClick={() => setStep((x) => x + 1)}
                  className="bg-gold text-bg px-7 py-3 text-[0.72rem] uppercase tracking-[0.18em] font-medium disabled:opacity-30 hover:bg-gold-lt transition-colors"
                >
                  Weiter →
                </button>
              ) : (
                <button
                  disabled={!canNext || status === "sending"}
                  onClick={submit}
                  className="bg-gold text-bg px-7 py-3 text-[0.72rem] uppercase tracking-[0.18em] font-medium disabled:opacity-30 hover:bg-gold-lt transition-colors"
                >
                  {status === "sending" ? "Senden…" : "Tisch anfragen"}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
