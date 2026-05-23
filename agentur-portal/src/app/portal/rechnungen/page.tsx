import { TopBar } from "@/components/layout/TopBar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";

const mockInvoices = [
  {
    id: "1",
    invoice_number: "RE-2025-0001",
    betrag: 1258.82,
    mwst: 19,
    gesamt: 1499.00,
    status: "offen" as const,
    faellig_am: "2025-06-30",
    zahlungsart: "Kreditkarte",
    created_at: "2025-06-01",
    positionen: [
      { bezeichnung: "Business-Paket — Website bis 5 Seiten", menge: 1, einzelpreis: 1258.82, gesamt: 1258.82 },
    ],
  },
];

export default function RechnungenPage() {
  return (
    <div>
      <TopBar title="Rechnungen" />
      <div className="p-6 max-w-3xl space-y-4">
        {mockInvoices.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium mb-1">Noch keine Rechnungen</p>
          </div>
        ) : (
          mockInvoices.map((inv) => (
            <div key={inv.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold">{inv.invoice_number}</p>
                    <StatusBadge type="invoice" status={inv.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Erstellt am {formatDate(inv.created_at)} · Fällig: {formatDate(inv.faellig_am)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold">{formatCurrency(inv.gesamt)}</p>
                  <p className="text-xs text-muted-foreground">inkl. {inv.mwst}% MwSt.</p>
                </div>
              </div>
              <div className="border-t border-border px-5 py-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Positionen</p>
                {inv.positionen.map((pos, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{pos.bezeichnung}</span>
                    <span className="font-medium">{formatCurrency(pos.gesamt)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-5 py-3 flex items-center justify-between bg-muted/30">
                <span className="text-sm text-muted-foreground">Zahlungsart: {inv.zahlungsart}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Download className="w-4 h-4" /> PDF</Button>
                  {inv.status === "offen" && <Button size="sm">Jetzt bezahlen</Button>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
