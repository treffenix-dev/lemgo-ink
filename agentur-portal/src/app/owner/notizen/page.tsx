"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Notiz = { id: string; titel: string; inhalt: string; erstellt: string; farbe: string };

const FARBEN = [
  { value: "amber", label: "Gelb", cls: "border-amber-200 bg-amber-50" },
  { value: "blue", label: "Blau", cls: "border-blue-200 bg-blue-50" },
  { value: "green", label: "Grün", cls: "border-green-200 bg-green-50" },
  { value: "default", label: "Standard", cls: "border-border bg-card" },
];

const initialNotizen: Notiz[] = [
  { id: "1", titel: "Kundengespräch Da Vinci", inhalt: "Will Reservierungssystem ergänzen. Preis: ~299€. Follow-up nächste Woche.", erstellt: "Heute, 10:00", farbe: "amber" },
  { id: "2", titel: "SEO-Ideen für Parfümerie", inhalt: "Keywords: Parfüm Lemgo, Naturkosmetik NRW. Blogartikel über Düfte einplanen.", erstellt: "Gestern", farbe: "blue" },
];

export default function NotizenPage() {
  const [notizen, setNotizen] = useLocalStorage<Notiz[]>("owner_notizen", initialNotizen);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ titel: "", inhalt: "", farbe: "default" });

  function loeschen(id: string) {
    setNotizen((prev) => prev.filter((n) => n.id !== id));
  }

  function save() {
    if (!form.titel.trim() || !form.inhalt.trim()) return;
    const now = new Date();
    const erstellt = `${now.toLocaleDateString("de-DE")}, ${now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}`;
    setNotizen((prev) => [{ ...form, id: Date.now().toString(), erstellt }, ...prev]);
    setOpen(false);
    setForm({ titel: "", inhalt: "", farbe: "default" });
  }

  const farbeMap = Object.fromEntries(FARBEN.map((f) => [f.value, f.cls]));

  return (
    <div>
      <TopBar title="Notizen" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Neue Notiz</span></Button>} />
      <div className="p-4 sm:p-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 gap-4">
          {notizen.map((n) => (
            <div key={n.id} className={`rounded-xl border p-5 ${farbeMap[n.farbe] ?? "border-border bg-card"}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm">{n.titel}</h3>
                <button onClick={() => loeschen(n.id)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm leading-relaxed mb-3">{n.inhalt}</p>
              <p className="text-[11px] text-muted-foreground">{n.erstellt}</p>
            </div>
          ))}
          <button onClick={() => setOpen(true)}
            className="rounded-xl border-2 border-dashed border-border hover:border-foreground/30 p-5 text-center text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center justify-center gap-2 min-h-[120px]">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Neue Notiz</span>
          </button>
        </div>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader><ModalTitle>Neue Notiz</ModalTitle></ModalHeader>
          <div className="p-6 space-y-4">
            <Input label="Titel" required value={form.titel} onChange={(e) => setForm((f) => ({ ...f, titel: e.target.value }))} placeholder="Thema der Notiz" />
            <Textarea label="Inhalt" required value={form.inhalt} onChange={(e) => setForm((f) => ({ ...f, inhalt: e.target.value }))} placeholder="Deine Notiz..." className="min-h-[120px]" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Farbe</label>
              <div className="flex gap-2">
                {FARBEN.map((f) => (
                  <button key={f.value} onClick={() => setForm((s) => ({ ...s, farbe: f.value }))}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border-2 transition-colors ${form.farbe === f.value ? "border-foreground" : "border-border"} ${f.cls}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button disabled={!form.titel.trim() || !form.inhalt.trim()} onClick={save}>Speichern</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
