"use client";

import { TopBar } from "@/components/layout/TopBar";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { TrendingUp } from "lucide-react";

const mockEinnahmen = [
  { id: "1", beschreibung: "Restaurant Da Vinci — Business Paket", betrag: 1499, datum: "2025-06-10", kategorie: "Website-Projekt" },
  { id: "2", beschreibung: "Parfümerie Müller — Pro Paket", betrag: 2499, datum: "2025-06-05", kategorie: "Website-Projekt" },
  { id: "3", beschreibung: "Friseur Schneider — Starter Paket", betrag: 799, datum: "2025-05-28", kategorie: "Website-Projekt" },
  { id: "4", beschreibung: "Beauty Studio — Monatliche Betreuung", betrag: 49, datum: "2025-06-01", kategorie: "Abo" },
];

export default function EinnahmenPage() {
  const gesamt = mockEinnahmen.reduce((s, e) => s + e.betrag, 0);
  const projekte = mockEinnahmen.filter((e) => e.kategorie === "Website-Projekt").reduce((s, e) => s + e.betrag, 0);
  const abos = mockEinnahmen.filter((e) => e.kategorie === "Abo").reduce((s, e) => s + e.betrag, 0);

  return (
    <div>
      <TopBar title="Einnahmen" />
      <div className="p-6 max-w-5xl space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Gesamt (Monat)", value: formatCurrency(gesamt) },
            { label: "Website-Projekte", value: formatCurrency(projekte) },
            { label: "Abos & Betreuung", value: formatCurrency(abos) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-border">
            <TrendingUp className="w-4 h-4" />
            <h3 className="font-semibold">Einnahmen-Übersicht</h3>
          </div>
          <div className="divide-y divide-border">
            {mockEinnahmen.map((e) => (
              <div key={e.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{e.beschreibung}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(e.datum)} · {e.kategorie}</p>
                </div>
                <span className="font-bold text-green-700">+{formatCurrency(e.betrag)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
