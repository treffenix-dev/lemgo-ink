"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, X, Printer, Copy, Check } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Position = { bezeichnung: string; menge: number; einzelpreis: number; gesamt: number };
type Invoice = {
  id: string;
  invoice_number: string;
  betrag: number;
  mwst: number;
  gesamt: number;
  status: "offen" | "bezahlt" | "ueberfaellig";
  faellig_am: string;
  zahlungsart: string;
  created_at: string;
  positionen: Position[];
};

const initialInvoices: Invoice[] = [
  {
    id: "1",
    invoice_number: "RE-2025-0001",
    betrag: 1258.82,
    mwst: 19,
    gesamt: 1499.00,
    status: "offen",
    faellig_am: "2025-06-30",
    zahlungsart: "Kreditkarte",
    created_at: "2025-06-01",
    positionen: [
      { bezeichnung: "Business-Paket — Website bis 5 Seiten", menge: 1, einzelpreis: 1258.82, gesamt: 1258.82 },
    ],
  },
];

function InvoicePrintView({ inv, onClose }: { inv: Invoice; onClose: () => void }) {
  const netto = inv.betrag;
  const mwstBetrag = inv.gesamt - netto;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 py-8">
      <div className="print:hidden fixed top-4 right-4 flex gap-2 z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <Printer className="w-4 h-4" /> Als PDF speichern
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div
        id="invoice-print"
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl print:shadow-none print:rounded-none print:max-w-none"
        style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#111" }}
      >
        <div style={{ padding: "40px 48px 24px", borderBottom: "2px solid #111", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <div style={{ width: 32, height: 32, background: "#111", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>W</span>
              </div>
              <span style={{ fontWeight: "bold", fontSize: 18 }}>WebAgentur</span>
            </div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
              <div>Musterstraße 1 · 33602 Bielefeld</div>
              <div>info@webagentur.de · www.webagentur.de</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>RECHNUNG</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8 }}>
              <div><strong>Rechnungsnr.:</strong> {inv.invoice_number}</div>
              <div><strong>Datum:</strong> {formatDate(inv.created_at)}</div>
              <div><strong>Fällig am:</strong> {formatDate(inv.faellig_am)}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "24px 48px", borderBottom: "1px solid #e5e5e5" }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Rechnungsempfänger</div>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>
            <div style={{ fontWeight: "bold" }}>Restaurant Da Vinci</div>
            <div>Marco Da Vinci</div>
            <div>Musterweg 5</div>
            <div>33602 Bielefeld</div>
          </div>
        </div>

        <div style={{ padding: "24px 48px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #111" }}>
                <th style={{ textAlign: "left", paddingBottom: 8, fontWeight: "bold" }}>Beschreibung</th>
                <th style={{ textAlign: "center", paddingBottom: 8, width: 60, fontWeight: "bold" }}>Menge</th>
                <th style={{ textAlign: "right", paddingBottom: 8, width: 120, fontWeight: "bold" }}>Einzelpreis</th>
                <th style={{ textAlign: "right", paddingBottom: 8, width: 120, fontWeight: "bold" }}>Gesamt</th>
              </tr>
            </thead>
            <tbody>
              {inv.positionen.map((pos, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ paddingTop: 10, paddingBottom: 10 }}>{pos.bezeichnung}</td>
                  <td style={{ textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>{pos.menge}</td>
                  <td style={{ textAlign: "right", paddingTop: 10, paddingBottom: 10 }}>{formatCurrency(pos.einzelpreis)}</td>
                  <td style={{ textAlign: "right", paddingTop: 10, paddingBottom: 10 }}>{formatCurrency(pos.gesamt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: "0 48px 24px", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: 280, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e5e5e5" }}>
              <span style={{ color: "#555" }}>Nettobetrag</span>
              <span>{formatCurrency(netto)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e5e5e5" }}>
              <span style={{ color: "#555" }}>MwSt. {inv.mwst}%</span>
              <span>{formatCurrency(mwstBetrag)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontWeight: "bold", fontSize: 16 }}>
              <span>Gesamtbetrag</span>
              <span>{formatCurrency(inv.gesamt)}</span>
            </div>
          </div>
        </div>

        <div style={{ margin: "0 48px 32px", background: "#f8f8f8", borderRadius: 8, padding: "16px 20px", fontSize: 12, color: "#555" }}>
          <div style={{ fontWeight: "bold", color: "#111", marginBottom: 6, fontSize: 13 }}>Zahlungsinformationen</div>
          <div style={{ lineHeight: 1.8 }}>
            <div><strong>Zahlungsart:</strong> {inv.zahlungsart}</div>
            <div><strong>Zahlungsziel:</strong> {formatDate(inv.faellig_am)}</div>
            <div><strong>IBAN:</strong> DE12 3456 7890 1234 5678 90 · <strong>BIC:</strong> DEUTDEDB</div>
            <div><strong>Verwendungszweck:</strong> {inv.invoice_number}</div>
          </div>
        </div>

        <div style={{ padding: "16px 48px", borderTop: "1px solid #e5e5e5", fontSize: 11, color: "#888", textAlign: "center" }}>
          WebAgentur · Musterstraße 1 · 33602 Bielefeld · info@webagentur.de · Steuernummer auf Anfrage
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-print, #invoice-print * { visibility: visible; }
          #invoice-print { position: fixed; top: 0; left: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}

function PaymentModal({ inv, onClose }: { inv: Invoice; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  function loadIBAN(): string {
    try {
      const s = JSON.parse(localStorage.getItem("einstellungen") || "{}");
      return s.iban || "DE89 4805 0161 XXXX XXXX XX";
    } catch { return "DE89 4805 0161 XXXX XXXX XX"; }
  }

  const iban = loadIBAN();

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Jetzt bezahlen</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-muted/40 rounded-xl p-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rechnung</span>
            <span className="font-medium">{inv.invoice_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Betrag</span>
            <span className="font-bold text-lg">{formatCurrency(inv.gesamt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fällig am</span>
            <span>{formatDate(inv.faellig_am)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Banküberweisung</p>
          {[
            { label: "IBAN", value: iban },
            { label: "Verwendungszweck", value: inv.invoice_number },
            { label: "Betrag", value: formatCurrency(inv.gesamt) },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-2.5">
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium font-mono">{value}</p>
              </div>
              <button onClick={() => copy(value)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Bitte gib den Verwendungszweck exakt so an, damit wir deine Zahlung zuordnen können.
        </p>
        <Button className="w-full" onClick={onClose}>Verstanden</Button>
      </div>
    </div>
  );
}

export default function RechnungenPage() {
  const [invoices] = useLocalStorage<Invoice[]>("portal_rechnungen", initialInvoices);
  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);
  const [payInvoice, setPayInvoice] = useState<Invoice | null>(null);

  return (
    <div>
      <TopBar title="Rechnungen" />
      <div className="p-4 sm:p-6 max-w-3xl space-y-4">
        {invoices.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium mb-1">Noch keine Rechnungen</p>
          </div>
        ) : (
          invoices.map((inv) => (
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
                  <div key={i} className="flex justify-between text-sm py-0.5">
                    <span>{pos.bezeichnung}</span>
                    <span className="font-medium">{formatCurrency(pos.gesamt)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-5 py-3 flex items-center justify-between bg-muted/30">
                <span className="text-sm text-muted-foreground">Zahlungsart: {inv.zahlungsart}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setViewInvoice(inv)}>
                    <Download className="w-4 h-4" /> PDF ansehen
                  </Button>
                  {inv.status === "offen" && (
                    <Button size="sm" onClick={() => setPayInvoice(inv)}>Jetzt bezahlen</Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {viewInvoice && (
        <InvoicePrintView inv={viewInvoice} onClose={() => setViewInvoice(null)} />
      )}
      {payInvoice && (
        <PaymentModal inv={payInvoice} onClose={() => setPayInvoice(null)} />
      )}
    </div>
  );
}
