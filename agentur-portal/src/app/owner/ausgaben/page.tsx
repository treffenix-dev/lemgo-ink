"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Receipt, Download } from "lucide-react";

interface Ausgabe {
  id: string;
  beschreibung: string;
  betrag: number;
  kategorie: string;
  datum: string;
  steuerlich: boolean;
}

function fmt(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function load(): Ausgabe[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("ausgaben") || "[]"); } catch { return []; }
}
function save(e: Ausgabe[]) { localStorage.setItem("ausgaben", JSON.stringify(e)); }

const PRESET_KATEGORIEN = ["Software/Tools", "Hardware", "Büro", "Werbung", "Weiterbildung", "Telefon/Internet", "Fahrten", "Sonstiges"];

function exportCSV(ausgaben: Ausgabe[]) {
  const rows = [
    ["Datum", "Beschreibung", "Kategorie", "Betrag (€)", "Steuerlich"],
    ...ausgaben.map((e) => [
      new Date(e.datum).toLocaleDateString("de-DE"),
      e.beschreibung,
      e.kategorie,
      e.betrag.toFixed(2).replace(".", ","),
      e.steuerlich ? "Ja" : "Nein",
    ]),
  ];
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(";")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ausgaben-${new Date().getFullYear()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AusgabenPage() {
  const [ausgaben, setAusgaben] = useState<Ausgabe[]>([]);
  const [adding, setAdding] = useState(false);
  const [customKategorie, setCustomKategorie] = useState("");
  const [form, setForm] = useState({ beschreibung: "", betrag: "", kategorie: "Software/Tools", datum: new Date().toISOString().split("T")[0], steuerlich: true });

  useEffect(() => { setAusgaben(load()); }, []);

  function handleAdd() {
    if (!form.beschreibung || !form.betrag) return;
    const kat = customKategorie.trim() || form.kategorie;
    const e: Ausgabe = { id: crypto.randomUUID(), beschreibung: form.beschreibung, betrag: parseFloat(form.betrag), kategorie: kat, datum: form.datum, steuerlich: form.steuerlich };
    const updated = [e, ...ausgaben];
    setAusgaben(updated);
    save(updated);
    setForm({ beschreibung: "", betrag: "", kategorie: "Software/Tools", datum: new Date().toISOString().split("T")[0], steuerlich: true });
    setCustomKategorie("");
    setAdding(false);
  }

  function handleDelete(id: string) {
    const updated = ausgaben.filter((e) => e.id !== id);
    setAusgaben(updated);
    save(updated);
  }

  const gesamtJahr = ausgaben.filter((e) => e.datum.startsWith(new Date().getFullYear().toString())).reduce((s, e) => s + e.betrag, 0);
  const steuerlichJahr = ausgaben.filter((e) => e.datum.startsWith(new Date().getFullYear().toString()) && e.steuerlich).reduce((s, e) => s + e.betrag, 0);

  return (
    <div>
      <TopBar
        title="Ausgaben"
        actions={
          <div className="flex gap-2">
            {ausgaben.length > 0 && (
              <Button size="sm" variant="outline" onClick={() => exportCSV(ausgaben)}>
                <Download className="w-4 h-4" /><span className="hidden sm:inline ml-1">CSV</span>
              </Button>
            )}
            <Button size="sm" variant="primary" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> Ausgabe</Button>
          </div>
        }
      />
      <div className="p-4 md:p-6 max-w-3xl space-y-5">

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Ausgaben dieses Jahr</p>
            <p className="text-2xl font-bold text-red-400">{fmt(gesamtJahr)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Steuerlich absetzbar</p>
            <p className="text-2xl font-bold text-amber-400">{fmt(steuerlichJahr)}</p>
          </div>
        </div>

        {adding && (
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">Neue Ausgabe</h3>
            <input value={form.beschreibung} onChange={(e) => setForm((p) => ({ ...p, beschreibung: e.target.value }))} placeholder="z.B. Adobe Creative Cloud, Vercel Pro" className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <div className="grid grid-cols-3 gap-3">
              <input type="number" step="0.01" value={form.betrag} onChange={(e) => setForm((p) => ({ ...p, betrag: e.target.value }))} placeholder="54.99" className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <div className="space-y-1.5">
                <select value={form.kategorie} onChange={(e) => setForm((p) => ({ ...p, kategorie: e.target.value }))} className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  {PRESET_KATEGORIEN.map((k) => <option key={k}>{k}</option>)}
                  <option value="__custom">Eigene eingeben…</option>
                </select>
                {form.kategorie === "__custom" && (
                  <input
                    value={customKategorie}
                    onChange={(e) => setCustomKategorie(e.target.value)}
                    placeholder="Eigene Kategorie"
                    className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                )}
              </div>
              <input type="date" value={form.datum} onChange={(e) => setForm((p) => ({ ...p, datum: e.target.value }))} className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={form.steuerlich} onChange={(e) => setForm((p) => ({ ...p, steuerlich: e.target.checked }))} className="rounded" />
              <span>Steuerlich absetzbar</span>
            </label>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => { setAdding(false); setCustomKategorie(""); }}>Abbrechen</Button>
              <Button variant="primary" size="sm" onClick={handleAdd}>Speichern</Button>
            </div>
          </div>
        )}

        {ausgaben.length === 0 && !adding ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <Receipt className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">Keine Ausgaben erfasst</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Erfasse Ausgaben für Steuererklärung und Gewinnberechnung.</p>
            <Button size="sm" variant="primary" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> Erste Ausgabe</Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-border bg-muted/20">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Datum</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Beschreibung</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Kategorie</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Betrag</th>
                <th className="w-10 px-3" />
              </tr></thead>
              <tbody className="divide-y divide-border">
                {ausgaben.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/20">
                    <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(e.datum).toLocaleDateString("de-DE")}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{e.beschreibung}</p>
                      {e.steuerlich && <span className="text-[10px] text-amber-400">Absetzbar</span>}
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground hidden md:table-cell">{e.kategorie}</td>
                    <td className="px-5 py-3 text-right font-semibold text-red-400">{fmt(e.betrag)}</td>
                    <td className="px-3 py-3">
                      <button onClick={() => handleDelete(e.id)} className="text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
