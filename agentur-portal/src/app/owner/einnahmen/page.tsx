"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, TrendingUp } from "lucide-react";

interface Einnahme {
  id: string;
  beschreibung: string;
  betrag: number;
  kategorie: string;
  datum: string;
}

function fmt(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function load(): Einnahme[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("einnahmen") || "[]"); } catch { return []; }
}
function save(e: Einnahme[]) { localStorage.setItem("einnahmen", JSON.stringify(e)); }

const KATEGORIEN = ["Webdesign", "Wartung", "Beratung", "SEO", "Sonstiges"];

export default function EinnahmenPage() {
  const [einnahmen, setEinnahmen] = useState<Einnahme[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ beschreibung: "", betrag: "", kategorie: "Webdesign", datum: new Date().toISOString().split("T")[0] });

  useEffect(() => { setEinnahmen(load()); }, []);

  function handleAdd() {
    if (!form.beschreibung || !form.betrag) return;
    const e: Einnahme = { id: crypto.randomUUID(), beschreibung: form.beschreibung, betrag: parseFloat(form.betrag), kategorie: form.kategorie, datum: form.datum };
    const updated = [e, ...einnahmen];
    setEinnahmen(updated);
    save(updated);
    setForm({ beschreibung: "", betrag: "", kategorie: "Webdesign", datum: new Date().toISOString().split("T")[0] });
    setAdding(false);
  }

  function handleDelete(id: string) {
    const updated = einnahmen.filter((e) => e.id !== id);
    setEinnahmen(updated);
    save(updated);
  }

  const gesamtJahr = einnahmen.filter((e) => e.datum.startsWith(new Date().getFullYear().toString())).reduce((s, e) => s + e.betrag, 0);
  const gesamt = einnahmen.reduce((s, e) => s + e.betrag, 0);

  return (
    <div>
      <TopBar
        title="Einnahmen"
        actions={<Button size="sm" variant="primary" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> Einnahme</Button>}
      />
      <div className="p-6 max-w-3xl space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Dieses Jahr</p>
            <p className="text-2xl font-bold text-emerald-400">{fmt(gesamtJahr)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Gesamt</p>
            <p className="text-2xl font-bold">{fmt(gesamt)}</p>
          </div>
        </div>

        {/* Form */}
        {adding && (
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">Neue Einnahme</h3>
            <input value={form.beschreibung} onChange={(e) => setForm((p) => ({ ...p, beschreibung: e.target.value }))} placeholder="Beschreibung z.B. Website Restaurant Da Vinci" className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <div className="grid grid-cols-3 gap-3">
              <input type="number" step="0.01" value={form.betrag} onChange={(e) => setForm((p) => ({ ...p, betrag: e.target.value }))} placeholder="1499.00" className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <select value={form.kategorie} onChange={(e) => setForm((p) => ({ ...p, kategorie: e.target.value }))} className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {KATEGORIEN.map((k) => <option key={k}>{k}</option>)}
              </select>
              <input type="date" value={form.datum} onChange={(e) => setForm((p) => ({ ...p, datum: e.target.value }))} className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setAdding(false)}>Abbrechen</Button>
              <Button variant="primary" size="sm" onClick={handleAdd}>Speichern</Button>
            </div>
          </div>
        )}

        {/* List */}
        {einnahmen.length === 0 && !adding ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">Keine Einnahmen erfasst</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Erfasse deine Einnahmen für die EÜR.</p>
            <Button size="sm" variant="primary" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> Erste Einnahme</Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/20">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Datum</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Beschreibung</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Kategorie</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Betrag</th>
                <th className="w-10 px-3" />
              </tr></thead>
              <tbody className="divide-y divide-border">
                {einnahmen.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/20">
                    <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(e.datum).toLocaleDateString("de-DE")}</td>
                    <td className="px-5 py-3 font-medium">{e.beschreibung}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground hidden md:table-cell">{e.kategorie}</td>
                    <td className="px-5 py-3 text-right font-semibold text-emerald-400">{fmt(e.betrag)}</td>
                    <td className="px-3 py-3">
                      <button onClick={() => handleDelete(e.id)} className="text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-muted-foreground">Für die EÜR: Einnahmen ohne Umsatzsteuer (§19 UStG Kleinunternehmer).</p>
      </div>
    </div>
  );
}
