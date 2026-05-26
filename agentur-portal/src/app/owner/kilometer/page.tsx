"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MapPin } from "lucide-react";

interface Fahrt {
  id: string;
  zweck: string;
  von: string;
  nach: string;
  km: number;
  datum: string;
}

const KM_PAUSCHALE = 0.30;

function fmt(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function load(): Fahrt[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("kilometer") || "[]"); } catch { return []; }
}
function save(e: Fahrt[]) { localStorage.setItem("kilometer", JSON.stringify(e)); }

export default function KilometerPage() {
  const [fahrten, setFahrten] = useState<Fahrt[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ zweck: "", von: "", nach: "", km: "", datum: new Date().toISOString().split("T")[0] });

  useEffect(() => { setFahrten(load()); }, []);

  function handleAdd() {
    if (!form.km) return;
    const f: Fahrt = { id: crypto.randomUUID(), zweck: form.zweck || "Kundenbesuch", von: form.von, nach: form.nach, km: parseFloat(form.km), datum: form.datum };
    const updated = [f, ...fahrten];
    setFahrten(updated);
    save(updated);
    setForm({ zweck: "", von: "", nach: "", km: "", datum: new Date().toISOString().split("T")[0] });
    setAdding(false);
  }

  function handleDelete(id: string) {
    const updated = fahrten.filter((f) => f.id !== id);
    setFahrten(updated);
    save(updated);
  }

  const kmJahr = fahrten.filter((f) => f.datum.startsWith(new Date().getFullYear().toString())).reduce((s, f) => s + f.km, 0);
  const absetzbar = kmJahr * KM_PAUSCHALE;

  return (
    <div>
      <TopBar
        title="Kilometer"
        actions={<Button size="sm" variant="primary" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> Fahrt</Button>}
      />
      <div className="p-4 md:p-6 max-w-3xl space-y-5">

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">km dieses Jahr</p>
            <p className="text-2xl font-bold">{kmJahr.toFixed(0)} km</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Absetzbar (0,30 €/km)</p>
            <p className="text-2xl font-bold text-amber-400">{fmt(absetzbar)}</p>
          </div>
        </div>

        {adding && (
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">Neue Fahrt</h3>
            <input value={form.zweck} onChange={(e) => setForm((p) => ({ ...p, zweck: e.target.value }))} placeholder="Zweck z.B. Kundentermin Restaurant Da Vinci" className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <div className="grid grid-cols-2 gap-3">
              <input value={form.von} onChange={(e) => setForm((p) => ({ ...p, von: e.target.value }))} placeholder="Von (Ort)" className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input value={form.nach} onChange={(e) => setForm((p) => ({ ...p, nach: e.target.value }))} placeholder="Nach (Ort)" className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" step="0.1" value={form.km} onChange={(e) => setForm((p) => ({ ...p, km: e.target.value }))} placeholder="Kilometer" className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input type="date" value={form.datum} onChange={(e) => setForm((p) => ({ ...p, datum: e.target.value }))} className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setAdding(false)}>Abbrechen</Button>
              <Button variant="primary" size="sm" onClick={handleAdd}>Speichern</Button>
            </div>
          </div>
        )}

        {fahrten.length === 0 && !adding ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">Keine Fahrten erfasst</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Erfasse berufliche Fahrten (0,30 €/km steuerlich absetzbar).</p>
            <Button size="sm" variant="primary" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> Erste Fahrt</Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-border bg-muted/20">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Datum</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Zweck / Strecke</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">km</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pauschale</th>
                <th className="w-10 px-3" />
              </tr></thead>
              <tbody className="divide-y divide-border">
                {fahrten.map((f) => (
                  <tr key={f.id} className="hover:bg-muted/20">
                    <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(f.datum).toLocaleDateString("de-DE")}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{f.zweck}</p>
                      {(f.von || f.nach) && <p className="text-xs text-muted-foreground">{f.von}{f.von && f.nach ? " → " : ""}{f.nach}</p>}
                    </td>
                    <td className="px-5 py-3 text-right font-medium">{f.km} km</td>
                    <td className="px-5 py-3 text-right font-semibold text-amber-400">{fmt(f.km * KM_PAUSCHALE)}</td>
                    <td className="px-3 py-3">
                      <button onClick={() => handleDelete(f.id)} className="text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">Kilometerpauschale 2025/2026: 0,30 €/km für berufliche Fahrten mit Privat-PKW.</p>
      </div>
    </div>
  );
}
