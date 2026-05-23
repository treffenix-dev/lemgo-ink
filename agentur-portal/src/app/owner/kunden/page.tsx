"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Search, ChevronRight } from "lucide-react";

const mockKunden = [
  { id: "1", firma: "Restaurant Da Vinci", kontakt: "Marco Da Vinci", email: "marco@davinci.de", paket: "Business", status: "daten_ausfuellen" as const, zahlungsstatus: "offen" as const, letztAktiv: "Heute 14:23" },
  { id: "2", firma: "Parfümerie Müller", kontakt: "Sabine Müller", email: "info@parfuemerie-mueller.de", paket: "Pro", status: "in_arbeit" as const, zahlungsstatus: "bezahlt" as const, letztAktiv: "Heute 11:05" },
  { id: "3", firma: "Friseur Schneider", kontakt: "Peter Schneider", email: "peter@friseur-schneider.de", paket: "Starter", status: "review" as const, zahlungsstatus: "bezahlt" as const, letztAktiv: "Gestern" },
  { id: "4", firma: "Bäckerei Wagner", kontakt: "Lisa Wagner", email: "lisa@baeckerei-wagner.de", paket: "Business", status: "fertig" as const, zahlungsstatus: "bezahlt" as const, letztAktiv: "vor 3 Tagen" },
];

export default function KundenPage() {
  const [search, setSearch] = useState("");

  const filtered = mockKunden.filter((k) =>
    k.firma.toLowerCase().includes(search.toLowerCase()) ||
    k.kontakt.toLowerCase().includes(search.toLowerCase()) ||
    k.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <TopBar title="Kunden" />
      <div className="p-6 max-w-5xl space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suchen..."
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Firma</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">Paket</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Projektstatus</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">Zahlung</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">Letzte Aktivität</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((k) => (
                <tr key={k.id} className="hover:bg-muted/20 cursor-pointer transition-colors">
                  <td className="px-5 py-4"><p className="font-medium">{k.firma}</p><p className="text-xs text-muted-foreground">{k.email}</p></td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{k.paket}</td>
                  <td className="px-5 py-4"><StatusBadge type="project" status={k.status} /></td>
                  <td className="px-5 py-4 hidden lg:table-cell"><StatusBadge type="invoice" status={k.zahlungsstatus} /></td>
                  <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground text-xs">{k.letztAktiv}</td>
                  <td className="px-3 py-4"><ChevronRight className="w-4 h-4 text-muted-foreground" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">Keine Kunden gefunden.</div>}
        </div>
      </div>
    </div>
  );
}
