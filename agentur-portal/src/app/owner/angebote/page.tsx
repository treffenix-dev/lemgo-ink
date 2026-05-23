"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils/format";
import { Plus, Search } from "lucide-react";

const mockAngebote = [
  { id: "1", nummer: "ANG-2025-0001", kunde: "Café Central", kontakt: "Max Mustermann", betrag: 1499, status: "gesendet" as const, erstellt: "10.06.2025", gueltigBis: "24.06.2025" },
  { id: "2", nummer: "ANG-2025-0002", kunde: "Beauty Studio AS", kontakt: "Anna Schmidt", betrag: 999, status: "offen" as const, erstellt: "12.06.2025", gueltigBis: "26.06.2025" },
  { id: "3", nummer: "ANG-2025-0003", kunde: "Fitnessstudio Nord", kontakt: "Thomas Meier", betrag: 2499, status: "angenommen" as const, erstellt: "05.06.2025", gueltigBis: "19.06.2025" },
];

const statusMap = {
  offen: { label: "Offen", cls: "bg-muted text-muted-foreground" },
  gesendet: { label: "Gesendet", cls: "bg-blue-100 text-blue-700" },
  angenommen: { label: "Angenommen", cls: "bg-green-100 text-green-700" },
  abgelehnt: { label: "Abgelehnt", cls: "bg-red-100 text-red-700" },
};

export default function AngebotePage() {
  const [search, setSearch] = useState("");

  const gefiltert = mockAngebote.filter(
    (a) =>
      a.kunde.toLowerCase().includes(search.toLowerCase()) ||
      a.nummer.includes(search)
  );

  return (
    <div>
      <TopBar
        title="Angebote"
        actions={
          <Button size="sm">
            <Plus className="w-4 h-4" /> Neues Angebot
          </Button>
        }
      />
      <div className="p-6 max-w-5xl space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Angebot oder Kunde suchen…"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Liste */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {gefiltert.map((a) => {
              const s = statusMap[a.status as keyof typeof statusMap];
              return (
                <div key={a.id} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{a.nummer}</p>
                    <p className="text-xs text-muted-foreground">{a.kunde} · {a.kontakt}</p>
                  </div>
                  <div className="hidden sm:block text-xs text-muted-foreground">
                    Gültig bis {a.gueltigBis}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-semibold text-sm">{formatCurrency(a.betrag)}</span>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${s.cls}`}>{s.label}</span>
                    <Button variant="outline" size="sm">Ansehen</Button>
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
    </div>
  );
}
