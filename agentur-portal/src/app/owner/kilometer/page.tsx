"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Fahrt = { id: string; datum: string; von: string; nach: string; zweck: string; km: number; satz: number };

const initialFahrten: Fahrt[] = [
  { id: "1", datum: "2025-06-24", von: "Lemgo", nach: "Bielefeld", zweck: "Kundengespräch — Café Central", km: 42, satz: 0.30 },
  { id: "2", datum: "2025-06-20", von: "Lemgo", nach: "Detmold", zweck: "Fotoshooting — Parfümerie Müller", km: 18, satz: 0.30 },
  { id: "3", datum: "2025-06-15", von: "Lemgo", nach: "Herford", zweck: "Onboarding — Friseur Schneider", km: 26, satz: 0.30 },
];

export default function KilometerPage() {
  const [fahrten, setFahrten] = useLocalStorage<Fahrt[]>("owner_kilometer", initialFahrten);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ datum: new Date().toISOString().split("T")[0], von: "", nach: "", zweck: "", km: "" });

  const gesamtKm = fahrten.reduce((s, f) => s + f.km, 0);
  const gesamtAbzug = fahrten.reduce((s, f) => s + f.km * f.satz, 0);

  function save() {
    if (!form.zweck.trim() || !form.km) return;
    setFahrten((prev) => [{ ...form, id: Date.now().toString(), km: parseFloat(form.km), satz: 0.30 }, ...prev]);
    setOpen(false);
    setForm({ datum: new Date().toISOString().split("T")[0], von: "", nach: "", zweck: "", km: "" });
  }

  function loeschen(id: string) {
    setFahrten((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div>
      <TopBar title="Kilometer-Nachweis" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Fahrt eintragen</span></Button>} />
      <div className="p-4 sm:p-6 max-w-4xl space-y-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Gesamtkilometer", value: `${gesamtKm} km` },
            { label: "Steuerabzug (0,30 €/km)", value: `${gesamtAbzug.toFixed(2)} €` },
            { label: "Fahrten gesamt", value: String(fahrten.length) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-lg sm:text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-5 border-b border-border font-semibold">Fahrtennachweis</div>
          <div className="divide-y divide-border">
            {fahrten.map((f) => (
              <div key={f.id} className="px-5 py-4 flex items-center justify-between gap-4 group">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{f.zweck}</p>
                  <p className="text-xs text-muted-foreground">{f.datum} {f.von && f.nach ? `· ${f.von} → ${f.nach}` : ""}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{f.km} km</p>
                    <p className="text-xs text-muted-foreground">{(f.km * f.satz).toFixed(2)} € abzugsfähig</p>
                  </div>
                  <button onClick={() => loeschen(f.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {fahrten.length === 0 && <div className="px-5 py-10 text-center text-sm text-muted-foreground">Noch keine Fahrten eingetragen.</div>}
          </div>
        </div>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader><ModalTitle>Fahrt eintragen</ModalTitle></ModalHeader>
          <div className="p-6 space-y-4">
            <Input label="Zweck" required value={form.zweck} onChange={(e) => setForm((f) => ({ ...f, zweck: e.target.value }))} placeholder="z.B. Kundengespräch — Café Central" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Von" value={form.von} onChange={(e) => setForm((f) => ({ ...f, von: e.target.value }))} placeholder="Abfahrtsort" />
              <Input label="Nach" value={form.nach} onChange={(e) => setForm((f) => ({ ...f, nach: e.target.value }))} placeholder="Zielort" />
              <Input label="Kilometer" type="number" required value={form.km} onChange={(e) => setForm((f) => ({ ...f, km: e.target.value }))} placeholder="0" />
              <Input label="Datum" type="date" value={form.datum} onChange={(e) => setForm((f) => ({ ...f, datum: e.target.value }))} />
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button disabled={!form.zweck.trim() || !form.km} onClick={save}>Eintragen</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
