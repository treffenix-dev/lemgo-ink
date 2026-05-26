"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, StickyNote, Pencil } from "lucide-react";

interface Note {
  id: string;
  titel: string;
  inhalt: string;
  erstellt: string;
  farbe: string; // hex color string, e.g. "#f59e0b"
}

const PRESET_FARBEN = [
  { label: "Standard",  hex: "" },
  { label: "Gelb",      hex: "#f59e0b" },
  { label: "Blau",      hex: "#3b82f6" },
  { label: "Grün",      hex: "#10b981" },
  { label: "Rot",       hex: "#ef4444" },
  { label: "Lila",      hex: "#8b5cf6" },
  { label: "Pink",      hex: "#ec4899" },
];

function cardStyle(hex: string): React.CSSProperties {
  if (!hex) return {};
  return { borderColor: hex + "66", backgroundColor: hex + "11" };
}

function dotStyle(hex: string): React.CSSProperties {
  if (!hex) return { background: "hsl(var(--border))" };
  return { background: hex };
}

function load(): Note[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("notizen") || "[]"); } catch { return []; }
}
function save(n: Note[]) { localStorage.setItem("notizen", JSON.stringify(n)); }

const EMPTY = { titel: "", inhalt: "", farbe: "" };

export default function NotizenPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [customHex, setCustomHex] = useState("#ffffff");

  useEffect(() => { setNotes(load()); }, []);

  function openCreate() {
    setEditId(null);
    setForm(EMPTY);
    setCustomHex("#ffffff");
    setOpen(true);
  }

  function openEdit(n: Note) {
    setEditId(n.id);
    setForm({ titel: n.titel, inhalt: n.inhalt, farbe: n.farbe });
    setCustomHex(n.farbe || "#ffffff");
    setOpen(true);
  }

  function handleSave() {
    if (!form.inhalt.trim()) return;
    const note: Note = {
      id: editId ?? crypto.randomUUID(),
      titel: form.titel || "Notiz",
      inhalt: form.inhalt,
      erstellt: new Date().toLocaleDateString("de-DE"),
      farbe: form.farbe,
    };
    const updated = editId
      ? notes.map((n) => n.id === editId ? note : n)
      : [note, ...notes];
    setNotes(updated);
    save(updated);
    setOpen(false);
    setEditId(null);
    setForm(EMPTY);
  }

  function handleDelete(id: string) {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    save(updated);
  }

  function setFarbe(hex: string) {
    setForm((f) => ({ ...f, farbe: hex }));
  }

  return (
    <div>
      <TopBar
        title="Notizen"
        actions={
          <Button size="sm" variant="primary" onClick={openCreate}>
            <Plus className="w-4 h-4" /> Notiz
          </Button>
        }
      />
      <div className="p-6 max-w-5xl space-y-5">

        {/* Form */}
        {open && (
          <div className="rounded-xl border border-blue-500/40 bg-blue-500/5 p-5 space-y-3">
            <input
              autoFocus
              value={form.titel}
              onChange={(e) => setForm((f) => ({ ...f, titel: e.target.value }))}
              placeholder="Titel (optional)"
              className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              value={form.inhalt}
              onChange={(e) => setForm((f) => ({ ...f, inhalt: e.target.value }))}
              placeholder="Notiz schreiben…"
              rows={4}
              className="w-full px-3 py-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Farbe:</span>
                {PRESET_FARBEN.map((f) => (
                  <button
                    key={f.hex}
                    title={f.label}
                    onClick={() => setFarbe(f.hex)}
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${form.farbe === f.hex ? "scale-125 border-foreground" : "border-transparent"}`}
                    style={dotStyle(f.hex)}
                  />
                ))}
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <span className="text-xs text-muted-foreground">Eigene:</span>
                  <input
                    type="color"
                    value={customHex}
                    onChange={(e) => { setCustomHex(e.target.value); setFarbe(e.target.value); }}
                    className="w-6 h-6 rounded cursor-pointer border border-border bg-transparent p-0"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setOpen(false); setEditId(null); setForm(EMPTY); }}>Abbrechen</Button>
                <Button variant="primary" size="sm" onClick={handleSave}>{editId ? "Speichern" : "Erstellen"}</Button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {notes.length === 0 && !open ? (
          <div className="rounded-xl border border-border bg-card p-16 text-center">
            <StickyNote className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">Noch keine Notizen</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Halte Ideen, Todos und Infos fest.</p>
            <Button size="sm" variant="primary" onClick={openCreate}>
              <Plus className="w-4 h-4" /> Erste Notiz
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((n) => (
              <div key={n.id}
                className="rounded-xl border bg-card p-4 group transition-colors"
                style={cardStyle(n.farbe)}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold">{n.titel}</p>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => openEdit(n)} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(n.id)} className="text-muted-foreground hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">{n.inhalt}</p>
                {n.farbe && (
                  <div className="w-3 h-3 rounded-full mt-3" style={{ background: n.farbe }} />
                )}
                <p className="text-[10px] text-muted-foreground/60 mt-1">{n.erstellt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
