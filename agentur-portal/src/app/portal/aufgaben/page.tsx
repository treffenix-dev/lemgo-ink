"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CheckCircle2, Circle } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Aufgabe = { id: string; titel: string; beschreibung: string; status: "offen" | "erledigt"; pflicht: boolean };

const initialAufgaben: Aufgabe[] = [
  { id: "1", titel: "Logo hochladen", beschreibung: "Lade dein Logo im Format PNG oder SVG hoch.", status: "offen", pflicht: true },
  { id: "2", titel: "Bilder hochladen (min. 5)", beschreibung: "Lade mindestens 5 hochwertige Bilder deines Unternehmens hoch.", status: "offen", pflicht: true },
  { id: "3", titel: "Firmendaten prüfen", beschreibung: "Überprüfe Name, Adresse, Telefon und Öffnungszeiten.", status: "erledigt", pflicht: true },
  { id: "4", titel: "Über-uns Text schreiben", beschreibung: "Beschreibe dein Unternehmen in 2–3 Sätzen.", status: "offen", pflicht: true },
  { id: "5", titel: "Social Media Links ergänzen", beschreibung: "Instagram, Facebook oder andere Profile hinzufügen.", status: "offen", pflicht: false },
  { id: "6", titel: "Gewünschte Farben angeben", beschreibung: "Hast du Markenfarben? Teile sie uns mit.", status: "offen", pflicht: false },
];

export default function AufgabenPage() {
  const [aufgaben, setAufgaben] = useLocalStorage<Aufgabe[]>("portal_aufgaben", initialAufgaben);

  function toggle(id: string) {
    setAufgaben((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: a.status === "erledigt" ? "offen" : "erledigt" } : a) as Aufgabe[]
    );
  }

  const erledigt = aufgaben.filter((a) => a.status === "erledigt").length;
  const gesamt = aufgaben.length;

  return (
    <div>
      <TopBar title="Meine Aufgaben" />
      <div className="p-4 sm:p-6 max-w-2xl">
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">{erledigt} von {gesamt} erledigt</p>
            <p className="text-sm text-muted-foreground">{Math.round((erledigt / gesamt) * 100)}%</p>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-foreground transition-all duration-500" style={{ width: `${(erledigt / gesamt) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-3">
          {aufgaben.map((a) => (
            <button key={a.id} onClick={() => toggle(a.id)}
              className="w-full text-left rounded-xl border border-border bg-card p-4 flex items-start gap-4 hover:border-foreground/20 transition-colors">
              <div className="mt-0.5 shrink-0">
                {a.status === "erledigt" ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Circle className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-medium ${a.status === "erledigt" ? "line-through text-muted-foreground" : ""}`}>{a.titel}</p>
                  {a.pflicht && a.status !== "erledigt" && (
                    <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wide">Pflicht</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{a.beschreibung}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
