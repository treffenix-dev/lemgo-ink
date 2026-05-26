"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FileEdit } from "lucide-react";

interface Angebot {
  id: string;
  nummer: string;
  kunde: string;
  beschreibung: string;
  betrag: number;
  datum: string;
  status: "entwurf" | "versendet" | "angenommen" | "abgelehnt";
}

function fmt(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

const STATUS_MAP = {
  entwurf:    { label: "Entwurf",    cls: "bg-muted text-muted-foreground" },
  versendet:  { label: "Versendet",  cls: "bg-blue-500/10 text-blue-400" },
  angenommen: { label: "Angenommen", cls: "bg-emerald-500/10 text-emerald-400" },
  abgelehnt:  { label: "Abgelehnt", cls: "bg-red-500/10 text-red-400" },
};

function load(): Angebot[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("angebote") || "[]"); } catch { return []; }
}
function save(a: Angebot[]) { localStorage.setItem("angebote", JSON.stringify(a)); }

function nextNummer(existing: Angebot[]): string {
  const year = new Date().getFullYear();
  const n = existing.filter((a) => a.nummer.includes(String(year))).length + 1;
  return `AN-${year}-${String(n).padStart(4, "0")}`;
}

export default function AngebotePage() {
  const [angebote, setAngebote] = useState<Angebot[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ kunde: "", beschreibung: "", betrag: "" });

  useEffect(() => { setAngebote(load()); }, []);

  function handleAdd() {
    if (!form.kunde) return;
    const all = load();
    const a: Angebot = {
      id: crypto.randomUUID(),
      nummer: nextNummer(all),
      kunde: form.kunde,
      beschreibung: form.beschreibung,
      betrag: parseFloat(form.betrag) || 0,
      datum: new Date().toISOString().split("T")[0],
      status: "entwurf",
    };
    const updated = [a, ...all];
    setAngebote(updated);
    save(updated);
    setForm({ kunde: "", beschreibung: "", betrag: "" });
    setAdding(false);
  }

  function toggleStatus(id: string) {
    const order: Angebot["status"][] = ["entwurf", "versendet", "angenommen", "abgelehnt"];
    const updated = angebote.map((a) => {
      if (a.id !== id) return a;
      const idx = order.indexOf(a.status);
      return { ...a, status: order[(idx + 1) % order.length] };
    });
    setAngebote(updated);
    save(updated);
  }

  function handleDelete(id: string) {
    const updated = angebote.filter((a) => a.id !== id);
    setAngebote(updated);
    save(updated);
  }

  const angenommen = angebote.filter((a) => a.status === "angenommen").reduce((s, a) => s + a.betrag, 0);

  return (
    <div>
      <TopBar
        title="Angebote"
        actions={<Button size="sm" variant="primary" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> Angebot</Button>}
      />
      <div className="p-4 md:p-6 max-w-4xl space-y-5">

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Gesamt</p>
            <p className="text-2xl font-bold">{angebote.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Angenommen</p>
            <p className="text-2xl font-bold text-emerald-400">{angebote.filter((a) => a.status === "angenommen").length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Wert Angenommen</p>
            <p className="text-2xl font-bold">{fmt(angenommen)}</p>
          </div>
        </div>

        {adding && (
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">Neues Angebot</h3>
            <input value={form.kunde} onChange={(e) => setForm((p) => ({ ...p, kunde: e.target.value }))} placeholder="Kundenname / Firma" className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <textarea value={form.beschreibung} onChange={(e) => setForm((p) => ({ ...p, beschreibung: e.target.value }))} placeholder="Leistungsbeschreibung…" rows={3} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            <input type="number" step="0.01" value={form.betrag} onChange={(e) => setForm((p) => ({ ...p, betrag: e.target.value }))} placeholder="Betrag (€)" className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setAdding(false)}>Abbrechen</Button>
              <Button variant="primary" size="sm" onClick={handleAdd}>Speichern</Button>
            </div>
          </div>
        )}

        {angebote.length === 0 && !adding ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <FileEdit className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">Noch keine Angebote</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Erstelle Angebote für Interessenten und verfolge deren Status.</p>
            <Button size="sm" variant="primary" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> Erstes Angebot</Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-border bg-muted/20">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nummer</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Kunde</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Datum</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Betrag</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="w-10 px-3" />
              </tr></thead>
              <tbody className="divide-y divide-border">
                {angebote.map((a) => {
                  const st = STATUS_MAP[a.status];
                  return (
                    <tr key={a.id} className="hover:bg-muted/20">
                      <td className="px-5 py-3 font-mono text-xs font-medium">{a.nummer}</td>
                      <td className="px-5 py-3">
                        <p className="font-medium">{a.kunde}</p>
                        {a.beschreibung && <p className="text-xs text-muted-foreground truncate max-w-[200px]">{a.beschreibung}</p>}
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground hidden md:table-cell">{new Date(a.datum).toLocaleDateString("de-DE")}</td>
                      <td className="px-5 py-3 text-right font-semibold">{a.betrag > 0 ? fmt(a.betrag) : "—"}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => toggleStatus(a.id)} className={`px-2 py-0.5 rounded-full text-xs font-medium ${st.cls}`} title="Klicken zum Weiterschalten">{st.label}</button>
                      </td>
                      <td className="px-3 py-3">
                        <button onClick={() => handleDelete(a.id)} className="text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
