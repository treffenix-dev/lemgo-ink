"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Plus, Download, Search, FileText, Send, Clock } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Invoice } from "@/lib/invoice/types";

// Legacy mock type for backward compatibility with localStorage
type MockRechnung = {
  id: string;
  nummer: string;
  kunde: string;
  email: string;
  gesamt: number;
  netto: number;
  mwst: number;
  status: string;
  faellig: string;
  erstellt: string;
  positionen: { beschreibung: string; menge: number; einzelpreis: number }[];
};

function toMockRechnung(inv: Invoice): MockRechnung {
  return {
    id: inv.id,
    nummer: inv.nummer,
    kunde: inv.kunde.firma || `${inv.kunde.vorname} ${inv.kunde.nachname}`.trim(),
    email: inv.kunde.email,
    gesamt: inv.gesamt,
    netto: inv.netto,
    mwst: inv.mwst_betrag,
    status: inv.status,
    faellig: inv.faellig_am,
    erstellt: inv.erstellt_am,
    positionen: inv.positionen.map((p) => ({
      beschreibung: p.beschreibung,
      menge: p.menge,
      einzelpreis: p.einzelpreis,
    })),
  };
}

const mockRechnungen: MockRechnung[] = [
  { id: "1", nummer: "RE-2025-0001", kunde: "Restaurant Da Vinci", email: "marco@davinci.de", gesamt: 1499, netto: 1260, mwst: 239, status: "offen", faellig: "2025-06-30", erstellt: "2025-06-01", positionen: [{ beschreibung: "Business-Paket – Einmalzahlung", menge: 1, einzelpreis: 1260 }] },
  { id: "2", nummer: "RE-2025-0002", kunde: "Parfümerie Müller", email: "info@parfuemerie-mueller.de", gesamt: 2499, netto: 2100, mwst: 399, status: "bezahlt", faellig: "2025-06-15", erstellt: "2025-05-15", positionen: [{ beschreibung: "Pro-Paket – Einmalzahlung", menge: 1, einzelpreis: 2100 }] },
  { id: "3", nummer: "RE-2025-0003", kunde: "Friseur Schneider", email: "peter@friseur-schneider.de", gesamt: 799, netto: 671, mwst: 128, status: "bezahlt", faellig: "2025-05-30", erstellt: "2025-05-01", positionen: [{ beschreibung: "Starter-Paket – Einmalzahlung", menge: 1, einzelpreis: 671 }] },
  { id: "4", nummer: "RE-2025-0004", kunde: "Bäckerei Wagner", email: "lisa@baeckerei-wagner.de", gesamt: 1499, netto: 1260, mwst: 239, status: "ueberfaellig", faellig: "2025-06-10", erstellt: "2025-05-10", positionen: [{ beschreibung: "Business-Paket – Einmalzahlung", menge: 1, einzelpreis: 1260 }] },
];

// Track which IDs are from the API (not mock) — needed for PDF/send actions
const apiIds = new Set<string>();

export default function RechnungenOwnerPage() {
  const [storedRechnungen, setStoredRechnungen] = useLocalStorage<MockRechnung[]>("owner_rechnungen", mockRechnungen);
  const [rechnungen, setRechnungen] = useState<MockRechnung[]>(storedRechnungen);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MockRechnung | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sendResult, setSendResult] = useState<{ success: boolean; error?: string } | null>(null);

  // Fetch from API on mount and merge with localStorage
  useEffect(() => {
    async function fetchApiInvoices() {
      try {
        const res = await fetch("/api/invoices");
        if (!res.ok) return;
        const apiInvoices: Invoice[] = await res.json();
        if (apiInvoices.length === 0) return;

        const mapped = apiInvoices.map(toMockRechnung);
        mapped.forEach((m) => apiIds.add(m.id));

        setRechnungen((prev) => {
          // Merge: API invoices override/replace if same ID, prepend new ones
          const prevWithoutApi = prev.filter((r) => !apiIds.has(r.id));
          return [...mapped, ...prevWithoutApi];
        });
      } catch {
        // Silently ignore — API may not be running
      }
    }
    fetchApiInvoices();
  }, []);

  const filtered = rechnungen.filter((r) =>
    r.nummer.toLowerCase().includes(search.toLowerCase()) ||
    r.kunde.toLowerCase().includes(search.toLowerCase())
  );

  const gesamtOffen = rechnungen
    .filter((r) => r.status === "offen" || r.status === "ueberfaellig")
    .reduce((s, r) => s + r.gesamt, 0);
  const gesamtBezahlt = rechnungen
    .filter((r) => r.status === "bezahlt")
    .reduce((s, r) => s + r.gesamt, 0);
  const entwurfCount = rechnungen.filter((r) => r.status === "entwurf").length;

  async function handleSendEmail(id: string) {
    setSendingId(id);
    setSendResult(null);
    try {
      const res = await fetch(`/api/invoices/${id}/send`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSendResult({ success: true });
        // Update local state
        setRechnungen((prev) =>
          prev.map((r) => r.id === id ? { ...r, status: "offen" } : r)
        );
        if (selected?.id === id) {
          setSelected((s) => s ? { ...s, status: "offen" } : s);
        }
      } else {
        setSendResult({ success: false, error: data.error ?? "Unbekannter Fehler" });
      }
    } catch (err) {
      setSendResult({ success: false, error: "Netzwerkfehler" });
    } finally {
      setSendingId(null);
    }
  }

  function handleDownloadPDF(id: string) {
    window.open(`/api/invoices/${id}/pdf`, "_blank");
  }

  return (
    <div>
      <TopBar
        title="Rechnungen"
        actions={
          <div className="flex items-center gap-2">
            {entwurfCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-medium">
                <Clock className="w-3.5 h-3.5" />
                {entwurfCount} Entwurf{entwurfCount > 1 ? "e" : ""} zum Senden
              </span>
            )}
            <Button size="sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Neue Rechnung</span>
            </Button>
          </div>
        }
      />
      <div className="p-4 sm:p-6 max-w-5xl space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Offen / Überfällig</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-600">{formatCurrency(gesamtOffen)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Bezahlt (Monat)</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">{formatCurrency(gesamtBezahlt)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Gesamt</p>
            <p className="text-xl sm:text-2xl font-bold">{rechnungen.length}</p>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Nummer</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">Kunde</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">Fällig</th>
                <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Betrag</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => { setSelected(r); setSendResult(null); }}
                  className={`hover:bg-muted/20 cursor-pointer transition-colors ${r.status === "entwurf" ? "bg-amber-50/30" : ""}`}
                >
                  <td className="px-5 py-4 font-medium">
                    <div className="flex items-center gap-2">
                      {r.nummer}
                      {r.status === "entwurf" && (
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{r.kunde}</td>
                  <td className={`px-5 py-4 hidden lg:table-cell text-xs ${r.status === "ueberfaellig" ? "text-red-600 font-semibold" : "text-muted-foreground"}`}>
                    {formatDate(r.faellig)}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold">{formatCurrency(r.gesamt)}</td>
                  <td className="px-5 py-4"><StatusBadge type="invoice" status={r.status} /></td>
                  <td className="px-3 py-4 text-right">
                    {apiIds.has(r.id) ? (
                      <Download className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Download className="w-4 h-4 text-muted-foreground opacity-30" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selected} onOpenChange={() => { setSelected(null); setSendResult(null); }}>
        <ModalContent>
          {selected && (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <ModalTitle>{selected.nummer}</ModalTitle>
                  <StatusBadge type="invoice" status={selected.status} />
                </div>
              </ModalHeader>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-muted-foreground mb-0.5">Kunde</p><p className="font-medium">{selected.kunde}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-0.5">E-Mail</p><p className="font-medium break-all">{selected.email}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-0.5">Erstellt</p><p className="font-medium">{formatDate(selected.erstellt)}</p></div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Fällig</p>
                    <p className={`font-medium ${selected.status === "ueberfaellig" ? "text-red-600" : ""}`}>
                      {formatDate(selected.faellig)}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border overflow-hidden text-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Position</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Betrag</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.positionen.map((p, i) => (
                        <tr key={i} className="border-b border-border">
                          <td className="px-4 py-3">{p.beschreibung}</td>
                          <td className="px-4 py-3 text-right">{formatCurrency(p.einzelpreis)}</td>
                        </tr>
                      ))}
                      <tr className="border-b border-border bg-muted/20">
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">Netto</td>
                        <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">{formatCurrency(selected.netto)}</td>
                      </tr>
                      <tr className="border-b border-border bg-muted/20">
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">MwSt. 19%</td>
                        <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">{formatCurrency(selected.mwst)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold">Gesamt</td>
                        <td className="px-4 py-3 text-right font-bold">{formatCurrency(selected.gesamt)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Send result feedback */}
                {sendResult && (
                  <div className={`rounded-lg px-4 py-3 text-sm ${sendResult.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {sendResult.success
                      ? "E-Mail wurde erfolgreich gesendet."
                      : `Fehler: ${sendResult.error}`}
                  </div>
                )}
              </div>
              <ModalFooter>
                <Button variant="outline" onClick={() => { setSelected(null); setSendResult(null); }}>
                  Schließen
                </Button>
                {apiIds.has(selected.id) && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadPDF(selected.id)}
                    >
                      <Download className="w-4 h-4" />
                      PDF herunterladen
                    </Button>
                    <Button
                      onClick={() => handleSendEmail(selected.id)}
                      disabled={sendingId === selected.id}
                    >
                      <Send className="w-4 h-4" />
                      {sendingId === selected.id ? "Wird gesendet…" : "Per E-Mail senden"}
                    </Button>
                  </>
                )}
                {!apiIds.has(selected.id) && (
                  <Button>
                    <Download className="w-4 h-4" />
                    PDF herunterladen
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
