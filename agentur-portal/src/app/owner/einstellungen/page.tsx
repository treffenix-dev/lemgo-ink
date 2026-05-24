"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Agentur = { name: string; inhaber: string; email: string; telefon: string; strasse: string; plz: string; ort: string; ust: string };
type Notif = { neuesTicket: boolean; neueBestellung: boolean; faelligeRechnung: boolean };
type InvoiceSettings = { auto_senden: boolean; zahlungsziel_tage: number; absender_email: string };

const initialAgentur: Agentur = {
  name: "WebAgentur", inhaber: "Max Mustermann", email: "hallo@webagentur.de",
  telefon: "+49 123 456 7890", strasse: "Musterstraße 1", plz: "32657", ort: "Lemgo", ust: "DE123456789",
};

const initialNotif: Notif = { neuesTicket: true, neueBestellung: true, faelligeRechnung: false };
const initialInvoiceSettings: InvoiceSettings = { auto_senden: false, zahlungsziel_tage: 14, absender_email: "" };

export default function EinstellungenPage() {
  const [agentur, setAgentur] = useLocalStorage<Agentur>("owner_einstellungen", initialAgentur);
  const [notif, setNotif] = useLocalStorage<Notif>("owner_notif", initialNotif);
  const [invoiceSettings, setInvoiceSettings] = useLocalStorage<InvoiceSettings>("owner_invoice_settings", initialInvoiceSettings);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function upd(key: keyof Agentur, val: string) {
    setAgentur((a) => ({ ...a, [key]: val }));
  }

  function toggleNotif(key: keyof Notif) {
    setNotif((n) => ({ ...n, [key]: !n[key] }));
  }

  const notifItems: { key: keyof Notif; label: string; desc: string }[] = [
    { key: "neuesTicket", label: "Neues Ticket", desc: "E-Mail wenn ein Kunde ein Ticket erstellt" },
    { key: "neueBestellung", label: "Neue Bestellung", desc: "E-Mail bei neuer Checkout-Bestellung" },
    { key: "faelligeRechnung", label: "Fällige Rechnung", desc: "Erinnerung 3 Tage vor Fälligkeit" },
  ];

  return (
    <div>
      <TopBar title="Einstellungen" />
      <div className="p-4 sm:p-6 max-w-2xl space-y-8">
        <form onSubmit={handleSave}>
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <h3 className="font-semibold">Agentur-Daten</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Agenturname" value={agentur.name} onChange={(e) => upd("name", e.target.value)} />
              <Input label="Inhaber" value={agentur.inhaber} onChange={(e) => upd("inhaber", e.target.value)} />
              <Input label="E-Mail" type="email" value={agentur.email} onChange={(e) => upd("email", e.target.value)} />
              <Input label="Telefon" value={agentur.telefon} onChange={(e) => upd("telefon", e.target.value)} />
              <div className="sm:col-span-2">
                <Input label="Straße" value={agentur.strasse} onChange={(e) => upd("strasse", e.target.value)} />
              </div>
              <Input label="PLZ" value={agentur.plz} onChange={(e) => upd("plz", e.target.value)} />
              <Input label="Ort" value={agentur.ort} onChange={(e) => upd("ort", e.target.value)} />
              <div className="sm:col-span-2">
                <Input label="USt-IdNr." value={agentur.ust} onChange={(e) => upd("ust", e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">{saved ? "✓ Gespeichert" : "Speichern"}</Button>
              {saved && <span className="text-sm text-green-600">Änderungen wurden gespeichert.</span>}
            </div>
          </div>
        </form>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-semibold">Benachrichtigungen</h3>
          {notifItems.map((n) => (
            <div key={n.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <button onClick={() => toggleNotif(n.key)}
                className={`w-10 h-5 rounded-full relative shrink-0 transition-colors ${notif[n.key] ? "bg-foreground" : "bg-muted-foreground/30"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-background rounded-full transition-all ${notif[n.key] ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Rechnungseinstellungen */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div>
            <h3 className="font-semibold">Rechnungseinstellungen</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              E-Mail-Versand erfordert <code className="bg-muted px-1 rounded text-xs">RESEND_API_KEY</code> in den Umgebungsvariablen.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Rechnung automatisch per E-Mail senden</p>
              <p className="text-xs text-muted-foreground">Bei neuer Bestellung sofort verschicken (sonst: manuell im Rechnungs-Dashboard)</p>
            </div>
            <button
              type="button"
              onClick={() => setInvoiceSettings((s) => ({ ...s, auto_senden: !s.auto_senden }))}
              className={`w-10 h-5 rounded-full relative shrink-0 transition-colors ${invoiceSettings.auto_senden ? "bg-foreground" : "bg-muted-foreground/30"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-background rounded-full transition-all ${invoiceSettings.auto_senden ? "right-0.5" : "left-0.5"}`} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Zahlungsziel (Tage)"
              type="number"
              min="1"
              value={invoiceSettings.zahlungsziel_tage}
              onChange={(e) => setInvoiceSettings((s) => ({ ...s, zahlungsziel_tage: parseInt(e.target.value) || 14 }))}
            />
            <Input
              label="Absender-E-Mail (Resend)"
              type="email"
              placeholder="rechnungen@webagentur.de"
              value={invoiceSettings.absender_email}
              onChange={(e) => setInvoiceSettings((s) => ({ ...s, absender_email: e.target.value }))}
            />
          </div>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h3 className="font-semibold text-red-800 mb-2">Gefährliche Zone</h3>
          <p className="text-sm text-red-600 mb-4">Alle gespeicherten Daten (Leads, Aufgaben, Notizen, etc.) zurücksetzen.</p>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100"
            onClick={() => { if (confirm("Wirklich alle Daten zurücksetzen?")) { localStorage.clear(); window.location.reload(); } }}>
            Alle Daten zurücksetzen
          </Button>
        </div>
      </div>
    </div>
  );
}
