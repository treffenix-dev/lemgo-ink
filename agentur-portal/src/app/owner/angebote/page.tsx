"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { formatCurrency } from "@/lib/utils/format";
import { Plus, Search, FileText, Download, Send } from "lucide-react";

const mockAngebote = [
  { id: "1", nummer: "ANG-2025-0001", kunde: "Café Central", kontakt: "Max Mustermann", email: "max@cafecental.de", betrag: 1499, netto: 1260, mwst: 239, status: "gesendet" as const, erstellt: "10.06.2025", gueltigBis: "24.06.2025", leistungen: ["Business-Paket Website", "SEO-Grundoptimierung", "Einrichtung Google Business"] },
  { id: "2", nummer: "ANG-2025-0002", kunde: "Beauty Studio AS", kontakt: "Anna Schmidt", email: "anna@beautystudio.de", betrag: 999, netto: 840, mwst: 159, status: "offen" as const, erstellt: "12.06.2025", gueltigBis: "26.06.2025", leistungen: ["Starter-Paket Website", "Online-Buchungssystem"] },
  { id: "3", nummer: "ANG-2025-0003", kunde: "Fitnessstudio Nord", kontakt: "Thomas Meier", email: "t.meier@fitnessnord.de", betrag: 2499, netto: 2100, mwst: 399, status: "angenommen" as const, erstellt: "05.06.2025", gueltigBis: "19.06.2025", leistungen: ["Pro-Paket Website", "Online-Shop Integration", "Mehrsprachigkeit DE/EN"] },
];

type Angebot = typeof mockAngebote[0];

const statusMap = {
  offen: { label: "Offen", cls: "bg-muted text-muted-foreground" },
  gesendet: { label: "Gesendet", cls: "bg-blue-100 text-blue-700" },
  angenommen: { label: "Angenommen", cls: "bg-green-100 text-green-700" },
  abgelehnt: { label: "Abgelehnt", cls: "bg-red-100 text-red-700" },
};

export default function AngebotePage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Angebot | null>(null);

  const gefiltert = mockAngebote.filter(
    (a) => a.kunde.toLowerCase().includes(search.toLowerCase()) || a.nummer.includes(search)
  );

  return (
    <div>
      <TopBar title="Angebote" actions={<Button size="sm"><Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Neues Angebot</span></Button>} />
      <div className="p-4 sm:p-6 max-w-5xl space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Angebot oder Kunde suchen…"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {gefiltert.map((a) => {
              const s = statusMap[a.status as keyof typeof statusMap];
              return (
                <div key={a.id} onClick={() => setSelected(a)} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/20 cursor-pointer transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.nummer}</p>
                    <p className="text-xs text-muted-foreground">{a.kunde} · {a.kontakt}</p>
                  </div>
                  <div className="hidden sm:block text-xs text-muted-foreground shrink-0">
                    Gültig bis {a.gueltigBis}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-semibold text-sm">{formatCurrency(a.betrag)}</span>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${s.cls}`}>{s.label}</span>
                  </div>
                </div>
              );
            })}
            {gefiltert.length === 0 && (
              <div className="px-5 py-10 text-center text-sm text-muted-foreground">Keine Angebote gefunden.</div>
            )}
          </div>
        </div>
      </div>

      <Modal open={!!selected} onOpenChange={() => setSelected(null)}>
        <ModalContent>
          {selected && (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <ModalTitle>{selected.nummer}</ModalTitle>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusMap[selected.status].cls}`}>
                    {statusMap[selected.status].label}
                  </span>
                </div>
              </ModalHeader>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-muted-foreground mb-0.5">Kunde</p><p className="font-medium">{selected.kunde}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-0.5">Ansprechpartner</p><p className="font-medium">{selected.kontakt}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-0.5">Erstellt</p><p className="font-medium">{selected.erstellt}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-0.5">Gültig bis</p><p className="font-medium">{selected.gueltigBis}</p></div>
                </div>

                <div className="rounded-lg border border-border overflow-hidden text-sm">
                  <table className="w-full">
                    <thead><tr className="bg-muted/30 border-b border-border">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Leistung</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Pauschal</th>
                    </tr></thead>
                    <tbody>
                      {selected.leistungen.map((l, i) => (
                        <tr key={i} className="border-b border-border">
                          <td className="px-4 py-3">{l}</td>
                          <td className="px-4 py-3 text-right text-muted-foreground">—</td>
                        </tr>
                      ))}
                      <tr className="border-b border-border bg-muted/20">
                        <td className="px-4 py-2 text-xs text-muted-foreground">Netto</td>
                        <td className="px-4 py-2 text-right text-xs text-muted-foreground">{formatCurrency(selected.netto)}</td>
                      </tr>
                      <tr className="border-b border-border bg-muted/20">
                        <td className="px-4 py-2 text-xs text-muted-foreground">MwSt. 19%</td>
                        <td className="px-4 py-2 text-right text-xs text-muted-foreground">{formatCurrency(selected.mwst)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold">Gesamt</td>
                        <td className="px-4 py-3 text-right font-bold">{formatCurrency(selected.betrag)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <ModalFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>Schließen</Button>
                <Button variant="outline"><Download className="w-4 h-4" /> PDF</Button>
                <Button asChild><a href={`mailto:${selected.email}`}><Send className="w-4 h-4" /> Per Mail senden</a></Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
