"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { Plus } from "lucide-react";
import type { LeadStatus } from "@/types";

const mockLeads = [
  { id: "1", vorname: "Max", nachname: "Mustermann", firma: "Café Central", email: "max@cafecental.de", telefon: "0521 123456", interesse: "Business-Paket", budget: "ca. 1.500 €", status: "neu" as LeadStatus, quelle: "Website", naechste_aktion: "Heute anrufen" },
  { id: "2", vorname: "Anna", nachname: "Schmidt", firma: "Beauty Studio AS", email: "anna@beautystudio.de", telefon: "0171 9876543", interesse: "Starter-Paket", budget: "800 €", status: "kontaktiert" as LeadStatus, quelle: "Instagram", naechste_aktion: "Angebot senden" },
  { id: "3", vorname: "Klaus", nachname: "Weber", firma: "Autowerkstatt Weber", email: "k.weber@kfz-weber.de", telefon: "05231 444555", interesse: "Pro-Paket", budget: "flexibel", status: "angebot_gesendet" as LeadStatus, quelle: "Empfehlung", naechste_aktion: "Follow-up Mi." },
];

export default function LeadsPage() {
  const [open, setOpen] = useState(false);
  const [activeLead, setActiveLead] = useState<typeof mockLeads[0] | null>(null);

  return (
    <div>
      <TopBar title="Leads" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Neuer Lead</Button>} />
      <div className="p-6 max-w-5xl">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6 text-center overflow-x-auto">
          {(["neu", "kontaktiert", "angebot_gesendet", "gewonnen", "verloren"] as LeadStatus[]).map((s) => (
            <div key={s} className="rounded-xl border border-border bg-card p-3">
              <StatusBadge type="lead" status={s} />
              <p className="text-2xl font-bold mt-2">{mockLeads.filter((l) => l.status === s).length}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {mockLeads.map((lead) => (
            <button key={lead.id} onClick={() => setActiveLead(lead)}
              className="w-full text-left rounded-xl border border-border bg-card p-5 hover:border-foreground/30 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold">{lead.firma}</p>
                    <StatusBadge type="lead" status={lead.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.vorname} {lead.nachname} · {lead.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">{lead.interesse}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Budget: {lead.budget}</p>
                </div>
              </div>
              {lead.naechste_aktion && (
                <div className="mt-3 bg-muted/50 rounded-lg px-3 py-2 text-xs text-muted-foreground">
                  Nächste Aktion: <strong className="text-foreground">{lead.naechste_aktion}</strong>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader><ModalTitle>Neuer Lead</ModalTitle></ModalHeader>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Input label="Vorname" required />
            <Input label="Nachname" required />
            <Input label="Firma" />
            <Input label="E-Mail" type="email" required />
            <Input label="Telefon" type="tel" />
            <Input label="Budget" placeholder="z.B. ca. 1.500 €" />
            <Input label="Interesse" placeholder="z.B. Business-Paket" className="col-span-2" />
            <Input label="Quelle" placeholder="z.B. Website, Instagram" />
            <Input label="Nächste Aktion" placeholder="z.B. Morgen anrufen" />
            <Textarea label="Notizen" className="col-span-2" />
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button>Lead speichern</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {activeLead && (
        <Modal open onOpenChange={() => setActiveLead(null)}>
          <ModalContent size="lg">
            <ModalHeader><ModalTitle>{activeLead.firma}</ModalTitle></ModalHeader>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Kontakt", `${activeLead.vorname} ${activeLead.nachname}`],
                  ["E-Mail", activeLead.email],
                  ["Telefon", activeLead.telefon],
                  ["Interesse", activeLead.interesse],
                  ["Budget", activeLead.budget],
                  ["Quelle", activeLead.quelle],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
              {activeLead.naechste_aktion && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                  <p className="font-medium text-amber-800">Nächste Aktion</p>
                  <p className="text-amber-700">{activeLead.naechste_aktion}</p>
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild><a href={`tel:${activeLead.telefon}`}>Anrufen</a></Button>
                <Button size="sm" variant="outline" asChild><a href={`mailto:${activeLead.email}`}>E-Mail</a></Button>
                <Button size="sm">Angebot erstellen</Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
