"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { Plus, CheckCircle2, Circle, Clock, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { TaskStatus, TaskPriority } from "@/types";

type Task = { id: string; titel: string; kunde: string; prioritaet: TaskPriority; status: TaskStatus; faellig_am: string };

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  niedrig: "text-muted-foreground",
  mittel: "text-amber-600",
  hoch: "text-red-600",
};

const initialTasks: Task[] = [
  { id: "1", titel: "Logo von Da Vinci überarbeiten", kunde: "Restaurant Da Vinci", prioritaet: "hoch", status: "in_arbeit", faellig_am: "2025-06-25" },
  { id: "2", titel: "Angebot für Schmidt erstellen", kunde: "Neukunde", prioritaet: "mittel", status: "offen", faellig_am: "2025-06-26" },
  { id: "3", titel: "Rechnung für Wagner erstellen", kunde: "Bäckerei Wagner", prioritaet: "niedrig", status: "erledigt", faellig_am: "2025-06-20" },
];

export default function AufgabenPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("owner_aufgaben", initialTasks);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ titel: "", kunde: "", faellig_am: "", prioritaet: "mittel" as TaskPriority });

  function toggle(id: string) {
    setTasks((prev) => prev.map((t) =>
      t.id === id ? { ...t, status: (t.status === "erledigt" ? "offen" : "erledigt") as TaskStatus } : t
    ));
  }

  function loeschen(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function save() {
    if (!form.titel.trim()) return;
    setTasks((prev) => [{ ...form, id: Date.now().toString(), status: "offen" as TaskStatus }, ...prev]);
    setOpen(false);
    setForm({ titel: "", kunde: "", faellig_am: "", prioritaet: "mittel" });
  }

  const offen = tasks.filter((t) => t.status !== "erledigt");
  const erledigt = tasks.filter((t) => t.status === "erledigt");

  return (
    <div>
      <TopBar title="Aufgaben" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Neue Aufgabe</span></Button>} />
      <div className="p-4 sm:p-6 max-w-3xl space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Offen ({offen.length})</h3>
          <div className="space-y-2">
            {offen.map((t) => (
              <div key={t.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-foreground/30 transition-colors group">
                <button onClick={() => toggle(t.id)} className="mt-0.5 shrink-0">
                  <Circle className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{t.titel}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                    {t.kunde && <span>{t.kunde}</span>}
                    {t.faellig_am && <><span>·</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.faellig_am}</span></>}
                    <span>·</span>
                    <span className={PRIORITY_COLORS[t.prioritaet]}>{t.prioritaet.charAt(0).toUpperCase() + t.prioritaet.slice(1)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge type="task" status={t.status} />
                  <button onClick={() => loeschen(t.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {offen.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">Keine offenen Aufgaben.</p>}
          </div>
        </div>
        {erledigt.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Erledigt ({erledigt.length})</h3>
            <div className="space-y-2 opacity-60">
              {erledigt.map((t) => (
                <div key={t.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 group">
                  <button onClick={() => toggle(t.id)} className="mt-0.5 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </button>
                  <p className="text-sm line-through text-muted-foreground flex-1">{t.titel}</p>
                  <button onClick={() => loeschen(t.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader><ModalTitle>Neue Aufgabe</ModalTitle></ModalHeader>
          <div className="p-6 space-y-4">
            <Input label="Titel" required value={form.titel} onChange={(e) => setForm((f) => ({ ...f, titel: e.target.value }))} placeholder="Was muss erledigt werden?" />
            <Input label="Kunde (optional)" value={form.kunde} onChange={(e) => setForm((f) => ({ ...f, kunde: e.target.value }))} />
            <Input label="Fällig am" type="date" value={form.faellig_am} onChange={(e) => setForm((f) => ({ ...f, faellig_am: e.target.value }))} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Priorität</label>
              <div className="flex gap-2">
                {(["niedrig", "mittel", "hoch"] as TaskPriority[]).map((p) => (
                  <button key={p} onClick={() => setForm((f) => ({ ...f, prioritaet: p }))}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${form.prioritaet === p ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground/30"}`}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button disabled={!form.titel.trim()} onClick={save}>Speichern</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
