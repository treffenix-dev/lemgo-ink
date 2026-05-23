"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { Plus, CheckCircle2, Circle, Clock } from "lucide-react";
import type { TaskStatus, TaskPriority } from "@/types";

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  niedrig: "text-muted-foreground",
  mittel: "text-amber-600",
  hoch: "text-red-600",
};

const mockTasks = [
  { id: "1", titel: "Logo von Da Vinci überarbeiten", kunde: "Restaurant Da Vinci", prioritaet: "hoch" as TaskPriority, status: "in_arbeit" as TaskStatus, faellig_am: "2025-06-25" },
  { id: "2", titel: "Angebot für Schmidt erstellen", kunde: "Neukunde", prioritaet: "mittel" as TaskPriority, status: "offen" as TaskStatus, faellig_am: "2025-06-26" },
  { id: "3", titel: "Rechnung für Wagner erstellen", kunde: "Bäckerei Wagner", prioritaet: "niedrig" as TaskPriority, status: "erledigt" as TaskStatus, faellig_am: "2025-06-20" },
];

export default function AufgabenPage() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);

  function toggleStatus(id: string) {
    setTasks((prev) => prev.map((t) =>
      t.id === id ? { ...t, status: t.status === "erledigt" ? "offen" as TaskStatus : "erledigt" as TaskStatus } : t
    ));
  }

  const offen = tasks.filter((t) => t.status !== "erledigt");
  const erledigt = tasks.filter((t) => t.status === "erledigt");

  return (
    <div>
      <TopBar title="Aufgaben" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Neue Aufgabe</Button>} />
      <div className="p-6 max-w-3xl space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Offen ({offen.length})</h3>
          <div className="space-y-2">
            {offen.map((t) => (
              <div key={t.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-foreground/30 transition-colors">
                <button onClick={() => toggleStatus(t.id)} className="mt-0.5 shrink-0">
                  <Circle className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
                <div className="flex-1">
                  <p className="font-medium text-sm">{t.titel}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    {t.kunde && <span>{t.kunde}</span>}
                    {t.faellig_am && <><span>·</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.faellig_am}</span></>}
                    <span>·</span>
                    <span className={PRIORITY_COLORS[t.prioritaet]}>{t.prioritaet.charAt(0).toUpperCase() + t.prioritaet.slice(1)}</span>
                  </div>
                </div>
                <StatusBadge type="task" status={t.status} />
              </div>
            ))}
          </div>
        </div>
        {erledigt.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Erledigt ({erledigt.length})</h3>
            <div className="space-y-2 opacity-60">
              {erledigt.map((t) => (
                <div key={t.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <button onClick={() => toggleStatus(t.id)} className="mt-0.5 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </button>
                  <p className="text-sm line-through text-muted-foreground">{t.titel}</p>
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
            <Input label="Titel" required />
            <Textarea label="Beschreibung" />
            <Input label="Kunde (optional)" />
            <Input label="Fällig am" type="date" />
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button>Speichern</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
