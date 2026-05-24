"use client";
import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const initNotizen = [
  { id: "1", titel: "Kundengeräsprach Da Vinci", inhalt: "Will Reservierungssystem ergänzen. Preis: ~299€. Follow-up nächste Woche.", erstellt: "Heute, 10:00", farbe: "amber" },
  { id: "2", titel: "SEO-Ideen für Parfümerie", inhalt: "Keywords: Parfüm Lemgo, Naturkosmetik NRW. Blogartikel über Düfte einplanen.", erstellt: "Gestern", farbe: "blue" },
];

const farbenMap: Record<string, string> = {
  amber: "border-amber-200 bg-amber-50",
  blue: "border-blue-200 bg-blue-50",
  green: "border-green-200 bg-green-50",
};

export default function NotizenPage() {
  const [notizen, setNotizen] = useState(initNotizen);

  function loeschen(id: string) {
    setNotizen((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div>
      <TopBar
        title="Notizen"
        actions={<Button size="sm"><Plus className="w-4 h-4" /> Neue Notiz</Button>}
      />
      <div className="p-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 gap-4">
          {notizen.map((n) => (
            <div key={n.id} className={`rounded-xl border p-5 ${farbenMap[n.farbe] ?? "border-border bg-card"}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm">{n.titel}</h3>
                <button onClick={() => loeschen(n.id)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm leading-relaxed mb-3">{n.inhalt}</p>
              <p className="text-[11px] text-muted-foreground">{n.erstellt}</p>
            </div>
          ))}
          <button className="rounded-xl border-2 border-dashed border-border hover:border-foreground/30 p-5 text-center text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center justify-center gap-2 min-h-[120px]">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Neue Notiz</span>
          </button>
        </div>
      </div>
    </div>
  );
}
