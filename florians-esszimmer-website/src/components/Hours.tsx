"use client";

import { useEffect, useState } from "react";

type Day = { key: number; label: string; open?: string; close?: string };

const SCHEDULE: Day[] = [
  { key: 1, label: "Montag", open: "17:00", close: "22:00" },
  { key: 2, label: "Dienstag" },
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display uppercase text-ink text-3xl md:text-4xl">Öffnungszeiten</h3>
        {today !== null && (
          <span
            className={`label px-3 py-1.5 border-2 ${
              openNow ? "border-red text-red" : "border-ink/40 text-muted"
            }`}
          >
            {openNow ? "● Jetzt geöffnet" : "● Geschlossen"}
          </span>
        )}
      </div>

      <ul className="border-t-2 border-ink">
        {SCHEDULE.map((d) => {
          const isToday = today === d.key;
          const closed = !d.open;
          return (
            <li
              key={d.label}
              className={`flex items-center justify-between py-3.5 border-b border-line ${isToday ? "bg-red text-paper px-3 -mx-3" : ""}`}
            >
              <span className="flex items-center gap-3">
                <span className={`font-display uppercase text-xl ${isToday ? "text-paper" : "text-ink"}`}>
                  {d.label}
                </span>
                {isToday && <span className="label text-paper/80">heute</span>}
              </span>
              <span className={`tabular-nums text-sm ${isToday ? "text-paper" : closed ? "text-muted italic" : "text-ink"}`}>
                {closed ? "Ruhetag" : `${d.open} bis ${d.close} Uhr`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
