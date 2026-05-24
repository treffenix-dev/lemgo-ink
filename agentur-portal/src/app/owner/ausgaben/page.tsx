"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { formatCurrency } from "@/lib/utils/format";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Ausgabe = { id: string; titel: string; kategorie: string; betrag: number; datum: string; notiz: string };

const initialAusgaben: Ausgabe[] = [
  { id: "1", titel: "Adobe Creative Cloud", kategorie: "Software", betrag: 59.99, datum: "2025-06-01", notiz: "Jahresabo anteilig" },
  { id: "2", titel: "Vercel Pro Plan", kategorie: "Hosting", betrag: 20.00, datum: "2025-06-05", notiz: "" },
  { id: "3", titel: "Büromaterial", kategorie: "Büro", betrag: 34.50, datum: "2025-06-08", notiz: "Drucker-Toner" },
  { id: "4", titel: "Figma Seat", kategorie: "Software", betrag: 15.00, datum: "2025-06-10", notiz: "" },
  { id: "5", titel: "Fahrtkosten Kundentermin", kategorie: "Fahrtkosten", betrag: 22.40, datum: "2025-06-12", notiz: "Restaurant Da Vinci" },
];

const KATEGORIEN = ["Alle", "Software", "Hosting", "Büro", "Fahrtkosten", "Marketing"];

export default function AusgabenPage() {
  const [ausgaben, setAusgaben] = useLocalStorage<Ausgabe[]>("owner_ausgaben", initialAusgaben);
  const [filter, setFilter] = useState("Alle");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ titel: "", kategorie: "Software", betrag: "", datum: new Date().toISOString().split("T")[0], notiz: "" });

  const gefiltert = filter === "Alle" ? ausgaben : ausgaben.filter((a) => a.kategorie === filter);
  const summe = gefiltert.reduce((s, a) => s + a.betrag, 0);

  function save() {
    if (!form.titel.trim() || !form.betrag) return;
    setAusgaben((prev) => [{ ...form, id: Date.now().toString(), betrag: parseFloat(form.betrag) }, ...prev]);
    setOpen(false);
    setForm({ titel: "", kategorie: "Software", betrag: "", datum: new Date().toISOString().split("T")[0], notiz: "" });
  }

  function loeschen(id: string) {
    setAusgaben((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div>
      <TopBar title="Ausgaben" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Ausgabe erfassen</span></Button>} />
      <div className="p-4 sm:p-6 max-w-3xl space-y-4">
        <div className="rounded-xl border border-border bg-card p-5 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Gesamt ({filter})</p>
          <p className="text-2xl font-bold">{formatCurrency(summe)}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {KATEGORIEN.map((k) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter === k ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground/30"}`}>
              {k}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {gefiltert.map((a) => (
              <div key={a.id} className="px-5 py-4 flex items-center justify-between gap-4 group">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{a.titel}</p>
                  <p className="text-xs text-muted-foreground">{a.kategorie} · {a.datum}{a.notiz ? ` · ${a.notiz}` : ""}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <p className="font-semibold text-sm">{formatCurrency(a.betrag)}</p>
                  <button onClick={() => loeschen(a.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {gefiltert.length === 0 && (
              <div className="px-5 py-10 text-center text-sm text-muted-foreground">Keine Ausgaben in dieser Kategorie.</div>
            )}
          </div>
        </div>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader><ModalTitle>Ausgabe erfassen</ModalTitle></ModalHeader>
          <div className="p-6 space-y-4">
            <Input label="Bezeichnung" required value={form.titel} onChange={(e) => setForm((f) => ({ ...f, titel: e.target.value }))} placeholder="z.B. Adobe Creative Cloud" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Kategorie</label>
              <select value={form.kategorie} onChange={(e) => setForm((f) => ({ ...f, kategorie: e.target.value }))}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {["Software", "Hosting", "Büro", "Fahrtkosten", "Marketing", "Sonstiges"].map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Betrag (€)" type="number" step="0.01" required value={form.betrag} onChange={(e) => setForm((f) => ({ ...f, betrag: e.target.value }))} placeholder="0.00" />
              <Input label="Datum" type="date" value={form.datum} onChange={(e) => setForm((f) => ({ ...f, datum: e.target.value }))} />
            </div>
            <Input label="Notiz (optional)" value={form.notiz} onChange={(e) => setForm((f) => ({ ...f, notiz: e.target.value }))} placeholder="z.B. Kundenprojekt XY" />
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button disabled={!form.titel.trim() || !form.betrag} onClick={save}>Speichern</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
