"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Printer, Trash2, Search, FileText, X, Pencil } from "lucide-react";
import { Invoice, loadInvoices, saveInvoice, deleteInvoice, invoiceTotal } from "@/lib/invoice";
import { InvoicePreview } from "@/components/rechnung/InvoicePreview";

function fmt(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}
function fmtDate(s: string) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("de-DE");
}

const STATUS_LABELS: Record<Invoice["status"], { label: string; cls: string }> = {
  entwurf:     { label: "Entwurf",     cls: "bg-muted text-muted-foreground" },
  offen:       { label: "Offen",       cls: "bg-amber-500/10 text-amber-400" },
  bezahlt:     { label: "Bezahlt",     cls: "bg-emerald-500/10 text-emerald-400" },
  ueberfaellig:{ label: "Überfällig",  cls: "bg-red-500/10 text-red-400" },
};

function PrintModal({ inv, onClose }: { inv: Invoice; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 py-8">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-print-area, #invoice-print-area * { visibility: visible; }
          #invoice-print-area { position: fixed; top: 0; left: 0; width: 100%; }
        }
      `}</style>
      <div className="print:hidden fixed top-4 right-4 flex gap-2 z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <Printer className="w-4 h-4" /> Als PDF drucken
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full max-w-2xl">
        <InvoicePreview invoice={inv} mode="screen" />
      </div>
    </div>
  );
}

export default function RechnungenOwnerPage() {
  const router = useRouter();
  const [rechnungen, setRechnungen] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [printInv, setPrintInv] = useState<Invoice | null>(null);

  useEffect(() => {
    setRechnungen(loadInvoices());
  }, []);

  const filtered = rechnungen.filter((r) =>
    r.nummer.toLowerCase().includes(search.toLowerCase()) ||
    r.empfaengerFirma.toLowerCase().includes(search.toLowerCase())
  );

  const gesamtOffen = rechnungen
    .filter((r) => r.status === "offen" || r.status === "ueberfaellig")
    .reduce((s, r) => s + invoiceTotal(r.positionen), 0);

  const gesamtBezahlt = rechnungen
    .filter((r) => r.status === "bezahlt")
    .reduce((s, r) => s + invoiceTotal(r.positionen), 0);

  function toggleBezahlt(inv: Invoice) {
    const updated = { ...inv, status: inv.status === "bezahlt" ? "offen" as const : "bezahlt" as const };
    saveInvoice(updated);
    setRechnungen(loadInvoices());
  }

  function handleDelete(id: string) {
    if (!confirm("Rechnung wirklich löschen?")) return;
    deleteInvoice(id);
    setRechnungen(loadInvoices());
  }

  return (
    <div>
      <TopBar
        title="Rechnungen"
        actions={
          <Button size="sm" variant="primary" onClick={() => router.push("/owner/rechnungen/neu")}>
            <Plus className="w-4 h-4" /> Neue Rechnung
          </Button>
        }
      />

      <div className="p-4 md:p-6 max-w-5xl space-y-5">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Offen / Überfällig</p>
            <p className="text-2xl font-bold text-amber-600">{fmt(gesamtOffen)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Bezahlt</p>
            <p className="text-2xl font-bold text-green-600">{fmt(gesamtBezahlt)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Gesamt</p>
            <p className="text-2xl font-bold">{rechnungen.length} Rechnungen</p>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nummer oder Kunde suchen…"
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-16 text-center">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">Noch keine Rechnungen</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Erstelle deine erste Rechnung für einen Kunden.</p>
            <Button size="sm" variant="primary" onClick={() => router.push("/owner/rechnungen/neu")}>
              <Plus className="w-4 h-4" /> Erste Rechnung erstellen
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nummer</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Kunde</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Datum</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Fällig</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Betrag</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="w-28 px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((r) => {
                  const faellig = (() => {
                    const d = new Date(r.datum);
                    d.setDate(d.getDate() + r.zahlungszielTage);
                    return d.toISOString().split("T")[0];
                  })();
                  const st = STATUS_LABELS[r.status];
                  return (
                    <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-4 font-medium font-mono text-xs">{r.nummer}</td>
                      <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{r.empfaengerFirma || "—"}</td>
                      <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground text-xs">{fmtDate(r.datum)}</td>
                      <td className="px-5 py-4 hidden lg:table-cell text-xs text-muted-foreground">{fmtDate(faellig)}</td>
                      <td className="px-5 py-4 text-right font-semibold">{fmt(invoiceTotal(r.positionen))}</td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleBezahlt(r)}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${st.cls}`}
                          title="Klicken zum Umschalten"
                        >
                          {st.label}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            title="PDF drucken"
                            onClick={() => setPrintInv(r)}
                          >
                            <Printer className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            title="Bearbeiten"
                            onClick={() => router.push(`/owner/rechnungen/neu?id=${r.id}`)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            title="Löschen"
                            onClick={() => handleDelete(r.id)}
                            className="hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          <strong>§ 19 UStG — Kleinunternehmerregelung:</strong> Alle Rechnungen werden ohne Umsatzsteuer ausgestellt.
          Gültig solange der Jahresumsatz unter 25.000 € bleibt. Steuernummer immer aktuell halten.
        </div>
      </div>

      {printInv && <PrintModal inv={printInv} onClose={() => setPrintInv(null)} />}
    </div>
  );
}
