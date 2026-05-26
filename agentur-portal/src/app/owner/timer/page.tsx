"use client";

import { useState, useEffect, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Trash2, Clock } from "lucide-react";

interface TimeEntry {
  id: string;
  projekt: string;
  dauer: number; // seconds
  datum: string;
}

function formatTime(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function loadEntries(): TimeEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("timer-entries") || "[]"); } catch { return []; }
}

function saveEntries(e: TimeEntry[]) {
  localStorage.setItem("timer-entries", JSON.stringify(e));
}

export default function TimerPage() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [projekt, setProjekt] = useState("");
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  function handleStop() {
    if (elapsed === 0) { setRunning(false); return; }
    const entry: TimeEntry = {
      id: crypto.randomUUID(),
      projekt: projekt || "Ohne Projekt",
      dauer: elapsed,
      datum: new Date().toLocaleDateString("de-DE"),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setRunning(false);
    setElapsed(0);
    setProjekt("");
  }

  function handleDelete(id: string) {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
  }

  const gesamtHeute = entries
    .filter((e) => e.datum === new Date().toLocaleDateString("de-DE"))
    .reduce((s, e) => s + e.dauer, 0);

  return (
    <div>
      <TopBar title="Timer" />
      <div className="p-6 max-w-2xl space-y-6">

        {/* Timer Display */}
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <div className="text-6xl font-mono font-bold tracking-widest mb-6 text-foreground">
            {formatTime(elapsed)}
          </div>
          <input
            value={projekt}
            onChange={(e) => setProjekt(e.target.value)}
            placeholder="Projektname (optional)"
            className="w-full max-w-xs h-9 px-3 rounded-md border border-border bg-muted text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring mb-6"
          />
          <div className="flex items-center justify-center gap-3">
            {!running ? (
              <Button variant="primary" size="sm" onClick={() => setRunning(true)}>
                <Play className="w-4 h-4" /> Start
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setRunning(false)}>
                <Pause className="w-4 h-4" /> Pause
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleStop} disabled={elapsed === 0}>
              <Square className="w-4 h-4" /> Speichern
            </Button>
          </div>
        </div>

        {/* Today Summary */}
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Heute insgesamt</p>
            <p className="font-semibold">{formatTime(gesamtHeute)}</p>
          </div>
        </div>

        {/* Entries */}
        {entries.length > 0 && (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border">
              <h3 className="text-sm font-semibold">Letzte Einträge</h3>
            </div>
            <div className="divide-y divide-border">
              {entries.map((e) => (
                <div key={e.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{e.projekt}</p>
                    <p className="text-xs text-muted-foreground">{e.datum}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-muted-foreground">{formatTime(e.dauer)}</span>
                    <button onClick={() => handleDelete(e.id)} className="text-muted-foreground hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
