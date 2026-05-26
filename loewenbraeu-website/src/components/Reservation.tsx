"use client";
import { useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TIMES_LUNCH  = [
  "11:30","11:45","12:00","12:15","12:30","12:45",
  "13:00","13:15","13:30","13:45","14:00",
];
const TIMES_DINNER = [
  "17:00","17:15","17:30","17:45",
  "18:00","18:15","18:30","18:45",
  "19:00","19:15","19:30","19:45",
  "20:00","20:15","20:30","20:45",
  "21:00","21:15","21:30",
];
const GUESTS = [
  "1 Person","2 Personen","3 Personen","4 Personen",
  "5 Personen","6 Personen","7 Personen","8 Personen",
  "9 Personen","10 Personen","Mehr als 10 Personen",
];

const inputCls = "bg-transparent border-b border-border text-cream font-sans text-[0.88rem] px-0 py-3 outline-none focus:border-gold placeholder-muted/50 w-full transition-colors duration-200";
const selectCls = `${inputCls} appearance-none cursor-pointer`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0">
      <label className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-gold">{label}</label>
      {children}
    </div>
  );
}

export function Reservation() {
  const today = new Date().toISOString().split("T")[0];
  const [success, setSuccess] = useState(false);
  const [summary, setSummary] = useState("");
  const [guests, setGuests] = useState("");
  const bigGroup = guests === "Mehr als 10 Personen";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const name   = (f.querySelector("#rsvp-name")   as HTMLInputElement).value;
    const date   = (f.querySelector("#rsvp-date")   as HTMLInputElement).value;
    const time   = (f.querySelector("#rsvp-time")   as HTMLSelectElement).value;
    const phone  = (f.querySelector("#rsvp-phone")  as HTMLInputElement).value;
    const note   = (f.querySelector("#rsvp-note")   as HTMLInputElement).value;
    const d = new Date(date);
    const dateStr = d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
    setSummary(`${name}, Ihre Reservierung für ${guests} am ${dateStr} um ${time} Uhr ist eingegangen. Das Restaurant wird Sie unter ${phone} telefonisch bestätigen.${note ? ` Anmerkung: „${note}“` : ""}`);
    setSuccess(true);
  }

  return (
    <section id="reservierung" className="py-36 px-[5%]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        <div>
          <span className="gold-rule" />
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] text-cream mb-12">
            Tisch reservieren
          </h2>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={submit}
                className="flex flex-col gap-7"
              >
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Datum">
                    <input id="rsvp-date" type="date" min={today} required className={inputCls} />
                  </Field>
                  <Field label="Uhrzeit">
                    <select id="rsvp-time" required className={selectCls}>
                      <option value="">wählen</option>
                      <optgroup label="Mittagstisch (Mi bis So)">
                        {TIMES_LUNCH.map(t => <option key={t}>{t} Uhr</option>)}
                      </optgroup>
                      <optgroup label="Abendessen (Mi bis So)">
                        {TIMES_DINNER.map(t => <option key={t}>{t} Uhr</option>)}
                      </optgroup>
                    </select>
                  </Field>
                </div>

                <Field label="Personen">
                  <select
                    id="rsvp-guests"
                    required
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={selectCls}
                  >
                    <option value="">wählen</option>
                    {GUESTS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </Field>

                {bigGroup ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-l-2 border-gold/50 pl-5 py-2"
                  >
                    <p className="font-sans text-[0.82rem] text-cream mb-1 font-medium">
                      Für Gruppen ab 11 Personen bitte anrufen
                    </p>
                    <a
                      href="tel:+4952614267"
                      className="font-display font-light text-[1.5rem] text-gold-lt hover:text-cream transition-colors"
                    >
                      05261 4267
                    </a>
                    <p className="font-sans text-[0.68rem] text-muted mt-1">
                      Mi bis So · 11:30 bis 22:00 Uhr
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <Field label="Ihr Name">
                      <input id="rsvp-name" type="text" placeholder="Vollständiger Name" required className={inputCls} />
                    </Field>
                    <Field label="Telefon">
                      <input id="rsvp-phone" type="tel" placeholder="+49 …" required className={inputCls} />
                    </Field>
                    <Field label="Anmerkungen (optional)">
                      <input id="rsvp-note" type="text" placeholder="Geburtstag, Allergien, Kinderstuhl …" className={inputCls} />
                    </Field>
                    <button
                      type="submit"
                      className="font-sans text-[0.7rem] tracking-[0.24em] uppercase text-cream border border-cream/25 px-10 py-4 hover:border-gold-lt hover:text-gold-lt transition-all duration-300 mt-2 w-fit"
                    >
                      Verbindlich reservieren →
                    </button>
                  </>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border pt-8"
              >
                <span className="font-display text-gold-lt text-3xl block mb-4">✓</span>
                <h3 className="font-display font-light text-2xl text-cream mb-4">Reservierung eingegangen</h3>
                <p className="font-sans text-[0.8rem] text-muted leading-loose mb-4">{summary}</p>
                <p className="font-sans text-[0.72rem] text-gold/80 mb-8">
                  Eine SMS-Bestätigung wurde an das Restaurant gesendet.
                </p>
                <button
                  onClick={() => { setSuccess(false); setGuests(""); }}
                  className="font-sans text-[0.68rem] tracking-[0.22em] uppercase text-muted border-b border-muted/40 pb-px hover:text-cream hover:border-cream/40 transition-colors"
                >
                  Weitere Reservierung
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info sidebar */}
        <div className="flex flex-col gap-8 md:pt-24">
          <p className="font-sans text-[0.78rem] text-muted leading-loose border-l-2 border-gold/30 pl-5">
            Reservierungen werden innerhalb von 30 Minuten telefonisch bestätigt.
            Bei Stornierungen bitten wir um Rückmeldung bis 2 Stunden vorher.
          </p>
          {[
            { label: "Öffnungszeiten", val: "Mi bis So: 11:30 bis 14:00 und 17:00 bis 22:30\nMo und Di: Ruhetag" },
            { label: "Telefon",        val: "05261 4267" },
            { label: "Adresse",        val: "Mittelstraße 144, 32657 Lemgo" },
            { label: "Zahlung",        val: "Barzahlung vor Ort" },
          ].map((i) => (
            <div key={i.label}>
              <span className="font-sans text-[0.58rem] tracking-[0.28em] uppercase text-gold block mb-1.5">{i.label}</span>
              <span className="font-sans text-[0.82rem] text-cream/80 whitespace-pre-line">{i.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
