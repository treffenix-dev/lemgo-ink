"use client";
import { useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TIMES_LUNCH  = ["11:30","12:00","12:30","13:00","13:30","14:00"];
const TIMES_DINNER = ["17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"];
const GUESTS = ["1 Person","2 Personen","3 Personen","4 Personen","5 Personen","6 Personen","7–10 Personen","Mehr als 10"];

type Field = { label: string; id: string };
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.65rem] tracking-[0.3em] uppercase text-gold">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "bg-bg border border-border text-cream px-4 py-3 text-sm outline-none focus:border-gold placeholder-muted w-full font-sans";
const selectCls = `${inputCls} appearance-none cursor-pointer`;

export function Reservation() {
  const today = new Date().toISOString().split("T")[0];
  const [success, setSuccess] = useState(false);
  const [summary, setSummary] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const name   = (f.querySelector("#rsvp-name")  as HTMLInputElement).value;
    const date   = (f.querySelector("#rsvp-date")  as HTMLInputElement).value;
    const time   = (f.querySelector("#rsvp-time")  as HTMLSelectElement).value;
    const guests = (f.querySelector("#rsvp-guests") as HTMLSelectElement).value;
    const phone  = (f.querySelector("#rsvp-phone") as HTMLInputElement).value;
    const note   = (f.querySelector("#rsvp-note")  as HTMLInputElement).value;
    const d = new Date(date);
    const dateStr = d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
    setSummary(`${name}, wir haben Ihre Anfrage für ${guests} am ${dateStr} um ${time} Uhr erhalten. Wir bestätigen Ihren Tisch unter ${phone} innerhalb von 30 Minuten.${note ? ` Anmerkung: „${note}"` : ""}`);
    setSuccess(true);
  }

  return (
    <section id="reservierung" className="py-28 px-[5%] bg-surface2 border-y border-gold/10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-3 block">Online Reservierung</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-8">Tisch reservieren</h2>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Datum">
                    <input id="rsvp-date" type="date" min={today} required className={inputCls} />
                  </Field>
                  <Field label="Uhrzeit">
                    <select id="rsvp-time" required className={selectCls}>
                      <option value="">— wählen —</option>
                      <optgroup label="Mittagstisch (Mi–So)">
                        {TIMES_LUNCH.map(t => <option key={t}>{t} Uhr</option>)}
                      </optgroup>
                      <optgroup label="Abendessen (Mi–So)">
                        {TIMES_DINNER.map(t => <option key={t}>{t} Uhr</option>)}
                      </optgroup>
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Personen">
                    <select id="rsvp-guests" required className={selectCls}>
                      <option value="">— wählen —</option>
                      {GUESTS.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </Field>
                  <Field label="Ihr Name">
                    <input id="rsvp-name" type="text" placeholder="Vollständiger Name" required className={inputCls} />
                  </Field>
                </div>
                <Field label="Telefon">
                  <input id="rsvp-phone" type="tel" placeholder="+49 …" required className={inputCls} />
                </Field>
                <Field label="Anmerkungen (optional)">
                  <input id="rsvp-note" type="text" placeholder="z.B. Geburtstag, Allergien, Kinderstuhl …" className={inputCls} />
                </Field>
                <button type="submit" className="w-full bg-gold text-bg text-[0.82rem] font-medium tracking-[0.14em] uppercase py-4 hover:bg-gold-lt transition-colors mt-2">
                  Tisch verbindlich reservieren →
                </button>
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-bg border border-gold/20 p-8 text-center">
                <div className="text-3xl mb-4">✓</div>
                <h3 className="font-display text-xl mb-3">Reservierung eingegangen!</h3>
                <p className="text-muted text-sm leading-loose">{summary}</p>
                <button onClick={() => setSuccess(false)} className="mt-6 bg-gold text-bg px-8 py-3 text-sm font-medium tracking-[0.12em] uppercase hover:bg-gold-lt transition-colors">
                  Weitere Reservierung
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6 pt-2">
          <p className="text-muted text-sm leading-loose">
            Reservierungen werden innerhalb von 30 Minuten telefonisch bestätigt. Bei Stornierungen bitten wir um Rückmeldung bis spätestens 2 Stunden vorher.
          </p>
          {[
            { label: "Öffnungszeiten", val: "Mi – So: 11:30–14:00 & 17:00–22:30\nMo + Di: Ruhetag" },
            { label: "Telefon",        val: "05261 4267" },
            { label: "Adresse",        val: "Mittelstraße 144\n32657 Lemgo" },
            { label: "Zahlung",        val: "Nur Barzahlung vor Ort" },
          ].map((i) => (
            <div key={i.label} className="border-l-2 border-gold/30 pl-4">
              <div className="text-[0.65rem] tracking-[0.28em] uppercase text-gold mb-1">{i.label}</div>
              <div className="text-[0.88rem] text-cream whitespace-pre-line">{i.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
