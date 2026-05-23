"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatRelative } from "@/lib/utils/format";
import { Search } from "lucide-react";
import type { TicketStatus, TicketPriority } from "@/types";

const PRIORITY_CLASS: Record<TicketPriority, string> = {
  niedrig: "text-muted-foreground",
  mittel: "text-amber-600",
  hoch: "text-orange-600",
  kritisch: "text-red-600 font-bold",
};

const mockTickets = [
  { id: "1", kunde: "Restaurant Da Vinci", titel: "Logo kann nicht hochgeladen werden", kategorie: "Upload", prioritaet: "hoch" as TicketPriority, status: "in_bearbeitung" as TicketStatus, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: "2", kunde: "Parfümerie Müller", titel: "Änderungswunsch Startseite", kategorie: "Änderungswunsch", prioritaet: "mittel" as TicketPriority, status: "offen" as TicketStatus, created_at: new Date(Date.now() - 7200000).toISOString() },
  { id: "3", kunde: "Friseur Schneider", titel: "Rechnung unklar", kategorie: "Rechnung", prioritaet: "niedrig" as TicketPriority, status: "warten_owner" as TicketStatus, created_at: new Date(Date.now() - 86400000).toISOString() },
];

const STATUS_FILTER = ["alle", "offen", "in_bearbeitung", "warten_owner", "warten_kunde", "geloest"] as const;

export default function OwnerTicketsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("alle");

  const filtered = mockTickets.filter((t) => {
    const matchSearch = t.titel.toLowerCase().includes(search.toLowerCase()) || t.kunde.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "alle" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <TopBar title="Tickets" />
      <div className="p-6 max-w-5xl space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suchen..."
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex gap-1">
            {STATUS_FILTER.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {s === "alle" ? "Alle" : <StatusBadge type="ticket" status={s as TicketStatus} />}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Ticket</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">Kunde</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Priorität</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">Erstellt</th>
                <th className="w-24 px-5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-muted/20 cursor-pointer transition-colors">
                  <td className="px-5 py-4 font-medium max-w-xs truncate">{t.titel}</td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{t.kunde}</td>
                  <td className={`px-5 py-4 text-xs font-medium ${PRIORITY_CLASS[t.prioritaet]}`}>{t.prioritaet.charAt(0).toUpperCase() + t.prioritaet.slice(1)}</td>
                  <td className="px-5 py-4"><StatusBadge type="ticket" status={t.status} /></td>
                  <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground text-xs">{formatRelative(t.created_at)}</td>
                  <td className="px-5 py-4"><Button variant="ghost" size="sm">Öffnen</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">Keine Tickets gefunden.</div>}
        </div>
      </div>
    </div>
  );
}
