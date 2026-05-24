"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { Plus } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { LeadStatus } from "@/types";

type Lead = {
  id: string; vorname: string; nachname: string; firma: string;
  email: string; telefon: string; interesse: string; budget: string;
  status: LeadStatus; quelle: string; naechste_aktion: string; notizen: string;
};

const initialLeads: Lead[] = [
  { id: "1", vorname: "Max", nachname: "Mustermann", firma: "Café Central", email: "max@cafecental.de", telefon: "0521 123456", interesse: "Business-Paket", budget: "ca. 1.500 €", status: "neu", quelle: "Website", naechste_aktion: "Heute anrufen", notizen: "" },
  { id: "2", vorname: "Anna", nachname: "Schmidt", firma: "Beauty Studio AS", email: "anna@beautystudio.de", telefon: "0171 9876543", interesse: "Starter-Paket", budget: "800 €", status: "kontaktiert", quelle: "Instagram", naechste_aktion: "Angebot senden", notizen: "" },
  { id: "3", vorname: "Klaus", nachname: "Weber", firma: "Autowerkstatt Weber", email: "k.weber@kfz-weber.de", telefon: "05231 444555", interesse: "Pro-Paket", budget: "flexibel", status: "angebot_gesendet", quelle: "Empfehlung", naechste_aktion: "Follow-up Mi.", notizen: "" },
];

const STATUS_ORDER: LeadStatus[] = ["neu", "kontaktiert", "angebot_gesendet", "gewonnen", "verloren"];

export default function LeadsPage() {
  const [leads, setLeads] = useLocalStorage<Lead[]>("owner_leads", initialLeads);
  const [open, setOpen] = useState(false);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const [form, setForm] = useState({ vorname: "", nachname: "", firma: "", email: "", telefon: "", budget: "", interesse: "", quelle: "", naechste_aktion: "", notizen: "" });

  function upd(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  function saveLead() {
    if (!form.email) return;
    const lead: Lead = { ...form, id: Date.now().toString(), status: "neu" };
    setLeads((prev) => [lead, ...prev]);
    setOpen(false);
    setForm({ vorname: "", nachname: "", firma: "", email: "", telefon: "", budget: "", interesse: "", quelle: "", naechste_aktion: "", notizen: "" });
  }

  function updateStatus(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setActiveLead((prev) => prev ? { ...prev, status } : null);
  }

  return (
    <div>
      <TopBar title="Leads" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Neuer Lead</span></Button>} />
      <div className="p-4 sm:p-6 max-w-5xl">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6 text-center">
          {STATUS_ORDER.map((s) => (
            <div key={s} className="rounded-xl border border-border bg-card p-3">
              <StatusBadge type="lead" status={s} />
              <p className="text-2xl font-bold mt-2">{leads.filter((l) => l.status === s).length}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {leads.map((lead) => (
            <button key={lead.id} onClick={() => setActiveLead(lead)}
              className="w-full text-left rounded-xl border border-border bg-card p-5 hover:border-foreground/30 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold">{lead.firma || `${lead.vorname} ${lead.nachname}`}</p>
                    <StatusBadge type="lead" status={lead.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.vorname} {lead.nachname} · {lead.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">{lead.interesse}</p>
                  {lead.budget && <p className="text-xs text-muted-foreground mt-0.5">Budget: {lead.budget}</p>}
                </div>
              </div>
              {lead.naechste_aktion && (
                <div className="mt-3 bg-muted/50 rounded-lg px-3 py-2 text-xs text-muted-foreground">
                  Nächste Aktion: <strong className="text-foreground">{lead.naechste_aktion}</strong>
                </div>
              )}
            </button>
          ))}
          {leads.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">Noch keine Leads. Füge deinen ersten Lead hinzu.</div>
          )}
        </div>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader><ModalTitle>Neuer Lead</ModalTitle></ModalHeader>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Input label="Vorname" value={form.vorname} onChange={(e) => upd("vorname", e.target.value)} />
            <Input label="Nachname" value={form.nachname} onChange={(e) => upd("nachname", e.target.value)} />
            <Input label="Firma" value={form.firma} onChange={(e) => upd("firma", e.target.value)} />
            <Input label="E-Mail" type="email" required value={form.email} onChange={(e) => upd("email", e.target.value)} />
            <Input label="Telefon" type="tel" value={form.telefon} onChange={(e) => upd("telefon", e.target.value)} />
            <Input label="Budget" placeholder="z.B. ca. 1.500 €" value={form.budget} onChange={(e) => upd("budget", e.target.value)} />
            <Input label="Interesse" placeholder="z.B. Business-Paket" className="col-span-2" value={form.interesse} onChange={(e) => upd("interesse", e.target.value)} />
            <Input label="Quelle" placeholder="z.B. Website, Instagram" value={form.quelle} onChange={(e) => upd("quelle", e.target.value)} />
            <Input label="Nächste Aktion" placeholder="z.B. Morgen anrufen" value={form.naechste_aktion} onChange={(e) => upd("naechste_aktion", e.target.value)} />
            <Textarea label="Notizen" className="col-span-2" value={form.notizen} onChange={(e) => upd("notizen", e.target.value)} />
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button disabled={!form.email} onClick={saveLead}>Lead speichern</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {activeLead && (
        <Modal open onOpenChange={() => setActiveLead(null)}>
          <ModalContent size="lg">
            <ModalHeader><ModalTitle>{activeLead.firma || `${activeLead.vorname} ${activeLead.nachname}`}</ModalTitle></ModalHeader>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Kontakt", `${activeLead.vorname} ${activeLead.nachname}`],
                  ["E-Mail", activeLead.email],
                  ["Telefon", activeLead.telefon],
                  ["Interesse", activeLead.interesse],
                  ["Budget", activeLead.budget],
                  ["Quelle", activeLead.quelle],
                ].map(([label, value]) => value ? (
                  <div key={label}>
                    <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ) : null)}
              </div>
              {activeLead.notizen && (
                <div className="bg-muted/40 rounded-lg p-3 text-sm">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Notizen</p>
                  <p>{activeLead.notizen}</p>
                </div>
              )}
              {activeLead.naechste_aktion && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                  <p className="font-medium text-amber-800">Nächste Aktion</p>
                  <p className="text-amber-700">{activeLead.naechste_aktion}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Status ändern</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_ORDER.map((s) => (
                    <button key={s} onClick={() => updateStatus(activeLead.id, s)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeLead.status === s ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground/40"}`}>
                      {s === "neu" ? "Neu" : s === "kontaktiert" ? "Kontaktiert" : s === "angebot_gesendet" ? "Angebot gesendet" : s === "gewonnen" ? "Gewonnen" : "Verloren"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                {activeLead.telefon && <Button size="sm" variant="outline" asChild><a href={`tel:${activeLead.telefon}`}>Anrufen</a></Button>}
                {activeLead.email && <Button size="sm" variant="outline" asChild><a href={`mailto:${activeLead.email}`}>E-Mail</a></Button>}
                <Button size="sm">Angebot erstellen</Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
