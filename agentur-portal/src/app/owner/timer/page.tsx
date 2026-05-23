"use client";

import { useState, useEffect, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Play, Square, Clock } from "lucide-react";

const mockEintraege = [
  { id: "1", beschreibung: "Design: Restaurant Da Vinci", dauer: "2h 15m", datum: "Heute" },
  { id: "2", beschreibung: "Dev: Parfümerie Müller", dauer: "3h 40m", datum: "Heute" },
  { id: "3", beschreibung: "Meeting: Friseur Schneider", dauer: "0h 45m", datum: "Gestern" },
  { id: "4", beschreibung: "Design: Beauty Studio AS", dauer: "1h 20m", datum: "Gestern" },
];

function formatSeconds(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function TimerPage() {
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

  function toggleTimer() {
    if (laufend) {
      setLaufend(false);
    } else {
      setLaufend(true);
    }
  }

  function reset() {
    setLaufend(false);
    setSekunden(0);
  }

  return (
    <div>
      <TopBar title="Zeiterfassung" />
      <div className="p-6 max-w-2xl space-y-6">
        {/* Timer */}
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <div className="text-6xl font-mono font-bold tracking-tight mb-6">
            {formatSeconds(sekunden)}
          </div>
          <input
            value={beschreibung}
            onChange={(e) => setBeschreibung(e.target.value)}
            placeholder="Was arbeitest du gerade? (z.B. Design: Restaurant Da Vinci)"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring mb-5"
          />
          <div className="flex items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={toggleTimer}
              className="gap-2 min-w-[140px]"
            >
              {laufend ? (
                <><Square className="w-4 h-4" /> Stoppen</>
              ) : (
                <><Play className="w-4 h-4" /> Starten</>
              )}
            </Button>
            {sekunden > 0 && !laufend && (
              <Button variant="outline" size="lg" onClick={reset}>Zurücksetzen</Button>
            )}
          </div>
        </div>

        {/* Letzte Einträge */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 p-5 border-b border-border">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold">Letzte Einträge</h3>
          </div>
          <div className="divide-y divide-border">
            {mockEintraege.map((e) => (
              <div key={e.id} className="px-5 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{e.beschreibung}</p>
                  <p className="text-xs text-muted-foreground">{e.datum}</p>
                </div>
                <span className="text-sm font-mono font-medium">{e.dauer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
