"use client";

import { useState, useEffect, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Play, Square, Clock, Save, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Eintrag = { id: string; beschreibung: string; dauer: string; sekunden: number; datum: string };

const initialEintraege: Eintrag[] = [
  { id: "1", beschreibung: "Design: Restaurant Da Vinci", dauer: "2h 15m", sekunden: 8100, datum: "Heute" },
  { id: "2", beschreibung: "Dev: Parfümerie Müller", dauer: "3h 40m", sekunden: 13200, datum: "Heute" },
  { id: "3", beschreibung: "Meeting: Friseur Schneider", dauer: "0h 45m", sekunden: 2700, datum: "Gestern" },
];

function formatSeconds(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function secsToLabel(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function TimerPage() {
  const [eintraege, setEintraege] = useLocalStorage<Eintrag[]>("owner_timer", initialEintraege);
  const [laufend, setLaufend] = useState(false);
  const [sekunden, setSekunden] = useState(0);
  const [beschreibung, setBeschreibung] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (laufend) {
      intervalRef.current = setInterval(() => setSekunden((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [laufend]);

  function toggleTimer() { setLaufend((v) => !v); }

  function reset() { setLaufend(false); setSekunden(0); }

  function saveEintrag() {
    if (sekunden === 0) return;
    const eintrag: Eintrag = {
      id: Date.now().toString(),
      beschreibung: beschreibung.trim() || "Ohne Beschreibung",
      dauer: secsToLabel(sekunden),
      sekunden,
      datum: "Heute",
    };
    setEintraege((prev) => [eintrag, ...prev]);
    setSekunden(0);
    setBeschreibung("");
    setLaufend(false);
  }

  function loeschen(id: string) {
    setEintraege((prev) => prev.filter((e) => e.id !== id));
  }

  const gesamtHeute = eintraege.filter((e) => e.datum === "Heute").reduce((s, e) => s + e.sekunden, 0);

  return (
    <div>
      <TopBar title="Zeiterfassung" />
      <div className="p-4 sm:p-6 max-w-2xl space-y-6">
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <div className={`text-6xl font-mono font-bold tracking-tight mb-6 ${laufend ? "text-foreground" : "text-muted-foreground"}`}>
            {formatSeconds(sekunden)}
          </div>
          <input value={beschreibung} onChange={(e) => setBeschreibung(e.target.value)}
            placeholder="Was arbeitest du gerade? (z.B. Design: Restaurant Da Vinci)"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring mb-5"
          />
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button size="lg" onClick={toggleTimer} className={`gap-2 min-w-[140px] ${laufend ? "bg-red-600 hover:bg-red-700" : ""}`}>
              {laufend ? <><Square className="w-4 h-4" /> Stoppen</> : <><Play className="w-4 h-4" /> Starten</>}
            </Button>
            {sekunden > 0 && !laufend && (
              <>
                <Button size="lg" onClick={saveEintrag} className="gap-2">
                  <Save className="w-4 h-4" /> Speichern
                </Button>
                <Button variant="outline" size="lg" onClick={reset}>Verwerfen</Button>
              </>
            )}
          </div>
        </div>

        {gesamtHeute > 0 && (
          <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Heute erfasst</p>
            <p className="font-bold">{secsToLabel(gesamtHeute)}</p>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 p-5 border-b border-border">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold">Letzte Einträge</h3>
          </div>
          <div className="divide-y divide-border">
            {eintraege.map((e) => (
              <div key={e.id} className="px-5 py-3.5 flex items-center justify-between group">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{e.beschreibung}</p>
                  <p className="text-xs text-muted-foreground">{e.datum}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-mono font-medium">{e.dauer}</span>
                  <button onClick={() => loeschen(e.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {eintraege.length === 0 && <div className="px-5 py-10 text-center text-sm text-muted-foreground">Noch keine Einträge.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
