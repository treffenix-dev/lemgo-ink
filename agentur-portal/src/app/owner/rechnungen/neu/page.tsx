"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Printer, Save, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InvoicePreview } from "@/components/rechnung/InvoicePreview";
import {
  Invoice, InvoicePosition,
  DEFAULT_ABSENDER, newPosition, nextRechnungsnummer,
  loadInvoices, saveInvoice,
} from "@/lib/invoice";

const inputCls = "w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={labelCls}>{label}</label>{children}</div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function today() { return new Date().toISOString().split("T")[0]; }

export default function NeueRechnungPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [inv, setInv] = useState<Invoice>(() => ({
    id: crypto.randomUUID(),
    nummer: "",
    datum: today(),
    leistungsdatum: today(),
    zahlungszielTage: 14,
    ...DEFAULT_ABSENDER,
    empfaengerFirma: "",
    empfaengerAnsprechpartner: "",
    empfaengerStrasse: "",
    empfaengerOrt: "",
    positionen: [newPosition()],
    notiz: "",
    status: "entwurf",
  }));

  useEffect(() => {
    const all = loadInvoices();
    setInv((prev) => ({ ...prev, nummer: nextRechnungsnummer(all) }));
  }, []);

  function set<K extends keyof Invoice>(key: K, value: Invoice[K]) {
    setInv((prev) => ({ ...prev, [key]: value }));
  }

  function setPos(id: string, key: keyof InvoicePosition, value: string | number) {
    setInv((prev) => ({
      ...prev,
      positionen: prev.positionen.map((p) => p.id === id ? { ...p, [key]: value } : p),
    }));
  }

  function addPos() {
    setInv((prev) => ({ ...prev, positionen: [...prev.positionen, newPosition()] }));
  }

  function removePos(id: string) {
    setInv((prev) => ({ ...prev, positionen: prev.positionen.filter((p) => p.id !== id) }));
  }

  function handleSave(status: Invoice["status"] = "offen") {
    saveInvoice({ ...inv, status });
    setSaved(true);
    setTimeout(() => router.push("/owner/rechnungen"), 800);
  }

  function handlePrint() {
    saveInvoice({ ...inv, status: inv.status === "entwurf" ? "offen" : inv.status });
    window.print();
  }

  return (
    <>
      {/* Print CSS — hides everything except the invoice */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #invoice-print-area { display: block !important; }
          #invoice-print-area * { display: revert !important; }
        }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* LEFT — Form */}
        <div className="w-[420px] shrink-0 border-r border-border flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-sm font-semibold">Neue Rechnung</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-3.5 h-3.5" /> PDF
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleSave("offen")} disabled={saved}>
                <Save className="w-3.5 h-3.5" /> {saved ? "Gespeichert ✓" : "Speichern"}
              </Button>
            </div>
          </div>

          {/* Scrollable form */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">

            {/* Rechnungsdetails */}
            <Section title="Rechnungsdetails">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Rechnungsnummer">
                  <input className={inputCls} value={inv.nummer} onChange={(e) => set("nummer", e.target.value)} />
                </Field>
                <Field label="Zahlungsziel (Tage)">
                  <input className={inputCls} type="number" value={inv.zahlungszielTage} onChange={(e) => set("zahlungszielTage", Number(e.target.value))} />
                </Field>
                <Field label="Rechnungsdatum">
                  <input className={inputCls} type="date" value={inv.datum} onChange={(e) => set("datum", e.target.value)} />
                </Field>
                <Field label="Leistungsdatum">
                  <input className={inputCls} type="date" value={inv.leistungsdatum} onChange={(e) => set("leistungsdatum", e.target.value)} />
                </Field>
              </div>
            </Section>

            {/* Empfänger */}
            <Section title="Kunde / Empfänger">
              <Field label="Firmenname">
                <input className={inputCls} placeholder="Restaurant Da Vinci GmbH" value={inv.empfaengerFirma} onChange={(e) => set("empfaengerFirma", e.target.value)} />
              </Field>
              <Field label="Ansprechpartner">
                <input className={inputCls} placeholder="Max Mustermann" value={inv.empfaengerAnsprechpartner} onChange={(e) => set("empfaengerAnsprechpartner", e.target.value)} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Straße & Hausnummer">
                  <input className={inputCls} placeholder="Hauptstraße 1" value={inv.empfaengerStrasse} onChange={(e) => set("empfaengerStrasse", e.target.value)} />
                </Field>
                <Field label="PLZ & Ort">
                  <input className={inputCls} placeholder="32657 Lemgo" value={inv.empfaengerOrt} onChange={(e) => set("empfaengerOrt", e.target.value)} />
                </Field>
              </div>
            </Section>

            {/* Positionen */}
            <Section title="Positionen">
              <div className="space-y-4">
                {inv.positionen.map((pos, i) => (
                  <div key={pos.id} className="rounded-lg border border-border bg-muted/20 p-3 space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-muted-foreground">Position {i + 1}</span>
                      {inv.positionen.length > 1 && (
                        <button onClick={() => removePos(pos.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <Field label="Titel">
                      <input className={inputCls} placeholder="z.B. Erstellung einer Firmen-Website" value={pos.beschreibung} onChange={(e) => setPos(pos.id, "beschreibung", e.target.value)} />
                    </Field>
                    <Field label="Beschreibung (optional)">
                      <textarea
                        className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        rows={2}
                        placeholder="Konzeption, Design, Entwicklung…"
                        value={pos.detail}
                        onChange={(e) => setPos(pos.id, "detail", e.target.value)}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Menge">
                        <input className={inputCls} placeholder="1 Stk." value={pos.menge} onChange={(e) => setPos(pos.id, "menge", e.target.value)} />
                      </Field>
                      <Field label="Betrag (€)">
                        <input className={inputCls} type="number" step="0.01" placeholder="1200.00" value={pos.preis || ""} onChange={(e) => setPos(pos.id, "preis", parseFloat(e.target.value) || 0)} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={addPos}
                className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 font-medium mt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Position hinzufügen
              </button>
            </Section>

            {/* Absender */}
            <Section title="Deine Daten (Absender)">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Dein Name">
                  <input className={inputCls} value={inv.absenderName} onChange={(e) => set("absenderName", e.target.value)} />
                </Field>
                <Field label="Zusatz / Titel">
                  <input className={inputCls} value={inv.absenderZusatz} onChange={(e) => set("absenderZusatz", e.target.value)} />
                </Field>
                <Field label="Straße">
                  <input className={inputCls} value={inv.absenderStrasse} onChange={(e) => set("absenderStrasse", e.target.value)} />
                </Field>
                <Field label="PLZ & Ort">
                  <input className={inputCls} value={inv.absenderOrt} onChange={(e) => set("absenderOrt", e.target.value)} />
                </Field>
              </div>
              <Field label="Steuernummer">
                <input className={inputCls} value={inv.absenderSteuernummer} onChange={(e) => set("absenderSteuernummer", e.target.value)} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Telefon">
                  <input className={inputCls} placeholder="+49 5261 …" value={inv.absenderTelefon} onChange={(e) => set("absenderTelefon", e.target.value)} />
                </Field>
                <Field label="E-Mail">
                  <input className={inputCls} placeholder="nick@…" value={inv.absenderEmail} onChange={(e) => set("absenderEmail", e.target.value)} />
                </Field>
                <Field label="IBAN">
                  <input className={inputCls} value={inv.absenderIBAN} onChange={(e) => set("absenderIBAN", e.target.value)} />
                </Field>
                <Field label="BIC">
                  <input className={inputCls} value={inv.absenderBIC} onChange={(e) => set("absenderBIC", e.target.value)} />
                </Field>
              </div>
              <Field label="Bank">
                <input className={inputCls} value={inv.absenderBank} onChange={(e) => set("absenderBank", e.target.value)} />
              </Field>
            </Section>

            {/* Notiz */}
            <Section title="Interne Notiz (erscheint nicht auf der Rechnung)">
              <textarea
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={2}
                placeholder="z.B. Projekt Löwenbräu Lemgo — Abnahme am 26.05."
                value={inv.notiz}
                onChange={(e) => set("notiz", e.target.value)}
              />
            </Section>

            <div className="pb-6" />
          </div>
        </div>

        {/* RIGHT — Live Preview */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div className="max-w-[700px] mx-auto">
            <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-wide">Vorschau · wird automatisch aktualisiert</p>
            <InvoicePreview invoice={inv} mode="screen" />
          </div>
        </div>
      </div>
    </>
  );
}
