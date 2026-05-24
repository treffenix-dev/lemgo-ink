"use client";

import { TopBar } from "@/components/layout/TopBar";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { CreditCard } from "lucide-react";

const mockZahlungen = [
  { id: "1", beschreibung: "Business-Paket — Anzahlung 50%", betrag: 749.5, datum: "2025-06-10", methode: "Kreditkarte", status: "bezahlt" },
  { id: "2", beschreibung: "Business-Paket — Restzahlung 50%", betrag: 749.5, datum: "2025-07-15", methode: "Kreditkarte", status: "offen" },
];

const statusStyles: Record<string, string> = {
  bezahlt: "bg-green-100 text-green-700",
  offen: "bg-amber-100 text-amber-700",
  ueberfaellig: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  bezahlt: "Bezahlt",
  offen: "Offen",
  ueberfaellig: "Überfällig",
};

export default function ZahlungenPage() {
  const gesamt = mockZahlungen.reduce((s, z) => s + z.betrag, 0);
  const bezahlt = mockZahlungen.filter((z) => z.status === "bezahlt").reduce((s, z) => s + z.betrag, 0);

  return (
    <div>
      <TopBar title="Zahlungen" />
      <div className="p-6 max-w-4xl space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Gesamt", value: formatCurrency(gesamt) },
            { label: "Bezahlt", value: formatCurrency(bezahlt) },
            { label: "Ausstehend", value: formatCurrency(gesamt - bezahlt) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-5 border-b border-border font-semibold">Zahlungsverlauf</div>
          <div className="divide-y divide-border">
            {mockZahlungen.map((z) => (
              <div key={z.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{z.beschreibung}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(z.datum)} · {z.methode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-semibold text-sm">{formatCurrency(z.betrag)}</span>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusStyles[z.status] ?? "bg-muted text-muted-foreground"}`}>
                    {statusLabels[z.status] ?? z.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
