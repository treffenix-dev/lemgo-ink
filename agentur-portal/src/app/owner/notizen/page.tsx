"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, StickyNote } from "lucide-react";

interface Note {
  id: string;
  titel: string;
  inhalt: string;
  erstellt: string;
  farbe: "default" | "amber" | "blue" | "green";
}

const FARBE_MAP = {
  default: "border-border",
  amber:   "border-amber-500/40 bg-amber-500/5",
  blue:    "border-blue-500/40 bg-blue-500/5",
  green:   "border-emerald-500/40 bg-emerald-500/5",
};

function load(): Note[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("notizen") || "[]"); } catch { return []; }
}
function save(n: Note[]) { localStorage.setItem("notizen", JSON.stringify(n)); }

export default function NotizenPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [adding, setAdding] = useState(false);
  const [newTitel, setNewTitel] = useState("");
  const [newInhalt, setNewInhalt] = useState("");
  const [newFarbe, setNewFarbe] = useState<Note["farbe"]>("default");

  useEffect(() => { setNotes(load()); }, []);

  function handleAdd() {
    if (!newInhalt.trim()) return;
    const note: Note = {
      id: crypto.randomUUID(),
      titel: newTitel || "Notiz",
      inhalt: newInhalt,
      erstellt: new Date().toLocaleDateString("de-DE"),
      farbe: newFarbe,
    };
    const updated = [note, ...notes];
    setNotes(updated);
    save(updated);
    setNewTitel("");
    setNewInhalt("");
    setNewFarbe("default");
    setAdding(false);
  }

  function handleDelete(id: string) {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    save(updated);
  }

  return (
    <div>
      <TopBar
        title="Notizen"
        actions={
          <Button size="sm" variant="primary" onClick={() => setAdding(true)}>
            <Plus className="w-4 h-4" /> Notiz
          </Button>
        }
      />
      <div className="p-6 max-w-5xl space-y-5">

        {/* New Note Form */}
        {adding && (
          <div className="rounded-xl border border-blue-500/40 bg-blue-500/5 p-5 space-y-3">
            <input
              autoFocus
              value={newTitel}
              onChange={(e) => setNewTitel(e.target.value)}
              placeholder="Titel (optional)"
              className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              value={newInhalt}
              onChange={(e) => setNewInhalt(e.target.value)}
              placeholder="Notiz schreiben…"
              rows={4}
              className="w-full px-3 py-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Farbe:</span>
                {(["default", "amber", "blue", "green"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setNewFarbe(f)}
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${newFarbe === f ? "scale-125" : ""} ${
                      f === "default" ? "bg-border border-border" :
                      f === "amber"   ? "bg-amber-400 border-amber-400" :
                      f === "blue"    ? "bg-blue-400 border-blue-400" :
                                        "bg-emerald-400 border-emerald-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setAdding(false)}>Abbrechen</Button>
                <Button variant="primary" size="sm" onClick={handleAdd}>Speichern</Button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {notes.length === 0 && !adding ? (
          <div className="rounded-xl border border-border bg-card p-16 text-center">
            <StickyNote className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">Noch keine Notizen</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Halte Ideen, Todos und Infos fest.</p>
            <Button size="sm" variant="primary" onClick={() => setAdding(true)}>
              <Plus className="w-4 h-4" /> Erste Notiz
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((n) => (
              <div key={n.id} className={`rounded-xl border bg-card p-4 group ${FARBE_MAP[n.farbe]}`}>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold">{n.titel}</p>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">{n.inhalt}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-3">{n.erstellt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
