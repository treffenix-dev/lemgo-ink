"use client";

import { useEffect, useState } from "react";

/**
 * Öffnungszeiten pro Wochentag, mit Hervorhebung des heutigen Tages
 * und Live-Status „jetzt geöffnet / geschlossen".
 * Heute/Status werden erst nach dem Mount gesetzt (keine Hydration-Mismatch).
 */

type Day = { key: number; label: string; open?: string; close?: string };

const SCHEDULE: Day[] = [
  { key: 1, label: "Montag", open: "17:00", close: "22:00" },
  { key: 2, label: "Dienstag" }, // Ruhetag
  { key: 3, label: "Mittwoch", open: "17:00", close: "22:00" },
  { key: 4, label: "Donnerstag", open: "17:00", close: "22:00" },
  { key: 5, label: "Freitag", open: "17:00", close: "22:00" },
  { key: 6, label: "Samstag", open: "12:00", close: "22:00" },
  { key: 0, label: "Sonntag", open: "12:00", close: "22:00" },
];

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export default function Hours() {
  const [today, setToday] = useState<number | null>(null);
  const [openNow, setOpenNow] = useState(false);

  useEffect(() => {
    const now = new Date();
    const d = now.getDay();
    setToday(d);
    const day = SCHEDULE.find((x) => x.key === d);
    if (day?.open && day.close) {
      const cur = now.getHours() * 60 + now.getMinutes();
      setOpenNow(cur >= toMin(day.open) && cur < toMin(day.close));
    }
  }, []);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-7">
        <h3 className="font-display text-cream text-3xl">Öffnungszeiten</h3>
        {today !== null && (
          <span
            className={`text-[0.62rem] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border ${
              openNow ? "border-gold text-gold" : "border-border text-muted"
            }`}
          >
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle ${openNow ? "bg-gold" : "bg-muted"}`} />
            {openNow ? "Jetzt geöffnet" : "Gerade geschlossen"}
          </span>
        )}
      </div>

      <ul>
        {SCHEDULE.map((d) => {
          const isToday = today === d.key;
          const closed = !d.open;
          return (
            <li
              key={d.label}
              className={`flex items-center justify-between py-3.5 border-b transition-colors ${
                isToday ? "border-gold/40" : "border-border/40"
              }`}
            >
              <span className="flex items-center gap-3">
                {isToday && <span className="w-1 h-4 bg-gold rounded-full" aria-hidden />}
                <span className={`font-display text-lg ${isToday ? "text-gold" : "text-cream"}`}>
                  {d.label}
                </span>
                {isToday && <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold/70">heute</span>}
              </span>
              <span className={`tabular-nums text-sm ${closed ? "text-muted/60 italic" : isToday ? "text-cream" : "text-muted"}`}>
                {closed ? "Ruhetag" : `${d.open} bis ${d.close} Uhr`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
