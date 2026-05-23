"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Plus, Download, Search } from "lucide-react";

const mockRechnungen = [
  { id: "1", nummer: "RE-2025-0001", kunde: "Restaurant Da Vinci", gesamt: 1499, status: "offen" as const, faellig: "2025-06-30", erstellt: "2025-06-01" },
  { id: "2", nummer: "RE-2025-0002", kunde: "Parfümerie Müller", gesamt: 2499, status: "bezahlt" as const, faellig: "2025-06-15", erstellt: "2025-05-15" },
  { id: "3", nummer: "RE-2025-0003", kunde: "Friseur Schneider", gesamt: 799, status: "bezahlt" as const, faellig: "2025-05-30", erstellt: "2025-05-01" },
  { id: "4", nummer: "RE-2025-0004", kunde: "Bäckerei Wagner", gesamt: 1499, status: "ueberfaellig" as const, faellig: "2025-06-10", erstellt: "2025-05-10" },
];

export default function RechnungenOwnerPage() {
  const [search, setSearch] = useState("");
  const filtered = mockRechnungen.filter((r) =>
    r.nummer.toLowerCase().includes(search.toLowerCase()) || r.kunde.toLowerCase().includes(search.toLowerCase())
  );
  const gesamtOffen = mockRechnungen.filter((r) => r.status === "offen" || r.status === "ueberfaellig").reduce((s, r) => s + r.gesamt, 0);

  return (
    <div>
      <TopBar title="Rechnungen" actions={<Button size="sm"><Plus className="w-4 h-4" /> Neue Rechnung</Button>} />
      <div className="p-6 max-w-5xl space-y-4">
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Offen / Überfällig</p>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(gesamtOffen)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Bezahlt (Monat)</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(mockRechnungen.filter((r) => r.status === "bezahlt").reduce((s, r) => s + r.gesamt, 0))}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Gesamt Rechnungen</p>
            <p className="text-2xl font-bold">{mockRechnungen.length}</p>
          </div>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suchen..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Nummer</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">Kunde</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">Erstellt</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">Fällig</th>
                <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Betrag</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                <th className="w-24 px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4 font-medium">{r.nummer}</td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{r.kunde}</td>
                  <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground text-xs">{formatDate(r.erstellt)}</td>
                  <td className={`px-5 py-4 hidden lg:table-cell text-xs ${r.status === "ueberfaellig" ? "text-red-600 font-semibold" : "text-muted-foreground"}`}>{formatDate(r.faellig)}</td>
                  <td className="px-5 py-4 text-right font-semibold">{formatCurrency(r.gesamt)}</td>
                  <td className="px-5 py-4"><StatusBadge type="invoice" status={r.status} /></td>
                  <td className="px-5 py-4"><div className="flex justify-end"><Button variant="ghost" size="icon-sm"><Download className="w-4 h-4" /></Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
