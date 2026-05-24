"use client";
import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const initFahrten = [
  { id: "1", datum: "24.06.2025", von: "Lemgo", nach: "Bielefeld", zweck: "Kundengeräsprach — Café Central", km: 42, satz: 0.30 },
  { id: "2", datum: "20.06.2025", von: "Lemgo", nach: "Detmold", zweck: "Fotoshooting — Parfümerie Müller", km: 18, satz: 0.30 },
  { id: "3", datum: "15.06.2025", von: "Lemgo", nach: "Herford", zweck: "Onboarding — Friseur Schneider", km: 26, satz: 0.30 },
];

export default function KilometerPage() {
  const [fahrten] = useState(initFahrten);
  const gesamtKm = fahrten.reduce((s, f) => s + f.km, 0);
  const gesamtAbzug = fahrten.reduce((s, f) => s + f.km * f.satz, 0);

  return (
    <div>
      <TopBar
        title="Kilometer-Nachweis"
        actions={<Button size="sm"><Plus className="w-4 h-4" /> Fahrt eintragen</Button>}
      />
      <div className="p-6 max-w-4xl space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Gesamtkilometer", value: `${gesamtKm} km` },
            { label: "Steuerabzug (0,30 €/km)", value: `${gesamtAbzug.toFixed(2)} €` },
            { label: "Fahrten gesamt", value: String(fahrten.length) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-5 border-b border-border font-semibold">Fahrtennachweis</div>
          <div className="divide-y divide-border">
            {fahrten.map((f) => (
              <div key={f.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{f.zweck}</p>
                  <p className="text-xs text-muted-foreground">{f.datum} · {f.von} → {f.nach}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">{f.km} km</p>
                  <p className="text-xs text-muted-foreground">{(f.km * f.satz).toFixed(2)} € abzugsfähig</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
