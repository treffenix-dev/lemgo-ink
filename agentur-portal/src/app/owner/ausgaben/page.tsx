"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format";
import { Plus } from "lucide-react";

const mockAusgaben = [
  { id: "1", titel: "Adobe Creative Cloud", kategorie: "Software", betrag: 59.99, datum: "01.06.2025", notiz: "Jahresabo anteilig" },
  { id: "2", titel: "Vercel Pro Plan", kategorie: "Hosting", betrag: 20.00, datum: "05.06.2025", notiz: "" },
  { id: "3", titel: "Büromaterial", kategorie: "Büro", betrag: 34.50, datum: "08.06.2025", notiz: "Drucker-Toner" },
  { id: "4", titel: "Figma Seat", kategorie: "Software", betrag: 15.00, datum: "10.06.2025", notiz: "" },
  { id: "5", titel: "Fahrtkosten Kundentermin", kategorie: "Fahrtkosten", betrag: 22.40, datum: "12.06.2025", notiz: "Restaurant Da Vinci" },
];

const kategorien = ["Alle", "Software", "Hosting", "Büro", "Fahrtkosten", "Marketing"];

export default function AusgabenPage() {
  const [filter, setFilter] = useState("Alle");

  const gefiltert = filter === "Alle" ? mockAusgaben : mockAusgaben.filter((a) => a.kategorie === filter);
  const summe = gefiltert.reduce((s, a) => s + a.betrag, 0);

  return (
    <div>
      <TopBar
        title="Ausgaben"
        actions={
          <Button size="sm">
            <Plus className="w-4 h-4" /> Ausgabe erfassen
          </Button>
        }
      />
      <div className="p-6 max-w-3xl space-y-4">
        {/* Summe */}
        <div className="rounded-xl border border-border bg-card p-5 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Gesamt ({filter})</p>
          <p className="text-2xl font-bold">{formatCurrency(summe)}</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {kategorien.map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                filter === k
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* Liste */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {gefiltert.map((a) => (
              <div key={a.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{a.titel}</p>
                  <p className="text-xs text-muted-foreground">{a.kategorie} · {a.datum}{a.notiz ? ` · ${a.notiz}` : ""}</p>
                </div>
                <p className="font-semibold text-sm shrink-0">{formatCurrency(a.betrag)}</p>
              </div>
            ))}
            {gefiltert.length === 0 && (
              <div className="px-5 py-10 text-center text-sm text-muted-foreground">Keine Ausgaben in dieser Kategorie.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
