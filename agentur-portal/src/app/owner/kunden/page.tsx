"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal";
import { Search, ChevronRight, Mail, Phone, Package, Clock } from "lucide-react";

const mockKunden = [
  { id: "1", firma: "Restaurant Da Vinci", kontakt: "Marco Da Vinci", email: "marco@davinci.de", telefon: "0521 123456", paket: "Business", status: "daten_ausfuellen" as const, zahlungsstatus: "offen" as const, letztAktiv: "Heute 14:23", notizen: "Wartet auf Logo-Upload und Speisekarte." },
  { id: "2", firma: "Parfümerie Müller", kontakt: "Sabine Müller", email: "info@parfuemerie-mueller.de", telefon: "05231 998877", paket: "Pro", status: "in_arbeit" as const, zahlungsstatus: "bezahlt" as const, letztAktiv: "Heute 11:05", notizen: "Design läuft, Feedbackrunde diese Woche." },
  { id: "3", firma: "Friseur Schneider", kontakt: "Peter Schneider", email: "peter@friseur-schneider.de", telefon: "0152 33445566", paket: "Starter", status: "review" as const, zahlungsstatus: "bezahlt" as const, letztAktiv: "Gestern", notizen: "Seite liegt zur Abnahme vor." },
  { id: "4", firma: "Bäckerei Wagner", kontakt: "Lisa Wagner", email: "lisa@baeckerei-wagner.de", telefon: "05232 112233", paket: "Business", status: "fertig" as const, zahlungsstatus: "bezahlt" as const, letztAktiv: "vor 3 Tagen", notizen: "Projekt abgeschlossen, läuft live." },
];

type Kunde = typeof mockKunden[0];

export default function KundenPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Kunde | null>(null);

  const filtered = mockKunden.filter((k) =>
    k.firma.toLowerCase().includes(search.toLowerCase()) ||
    k.kontakt.toLowerCase().includes(search.toLowerCase()) ||
    k.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <TopBar title="Kunden" />
      <div className="p-4 sm:p-6 max-w-5xl space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suchen..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Firma</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">Paket</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Projektstatus</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">Zahlung</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((k) => (
                <tr key={k.id} onClick={() => setSelected(k)} className="hover:bg-muted/20 cursor-pointer transition-colors">
                  <td className="px-5 py-4"><p className="font-medium">{k.firma}</p><p className="text-xs text-muted-foreground">{k.email}</p></td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{k.paket}</td>
                  <td className="px-5 py-4"><StatusBadge type="project" status={k.status} /></td>
                  <td className="px-5 py-4 hidden lg:table-cell"><StatusBadge type="invoice" status={k.zahlungsstatus} /></td>
                  <td className="px-3 py-4"><ChevronRight className="w-4 h-4 text-muted-foreground" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">Keine Kunden gefunden.</div>}
        </div>
      </div>

      <Modal open={!!selected} onOpenChange={() => setSelected(null)}>
        <ModalContent>
          {selected && (
            <>
              <ModalHeader>
                <ModalTitle>{selected.firma}</ModalTitle>
              </ModalHeader>
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge type="project" status={selected.status} />
                  <StatusBadge type="invoice" status={selected.zahlungsstatus} />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Package className="w-4 h-4 mt-0.5 shrink-0" />
                    <div><p className="text-xs uppercase tracking-wide mb-0.5">Paket</p><p className="text-foreground font-medium">{selected.paket}</p></div>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                    <div><p className="text-xs uppercase tracking-wide mb-0.5">Letzte Aktivität</p><p className="text-foreground">{selected.letztAktiv}</p></div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                  <p className="text-sm font-medium">{selected.kontakt}</p>
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-4 h-4" />{selected.email}
                  </a>
                  <a href={`tel:${selected.telefon}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-4 h-4" />{selected.telefon}
                  </a>
                </div>

                {selected.notizen && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-800 mb-1">Notiz</p>
                    <p className="text-sm text-amber-700">{selected.notizen}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <Button className="flex-1" asChild>
                    <a href={`mailto:${selected.email}`}><Mail className="w-4 h-4" /> E-Mail schreiben</a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={`tel:${selected.telefon}`}><Phone className="w-4 h-4" /> Anrufen</a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
