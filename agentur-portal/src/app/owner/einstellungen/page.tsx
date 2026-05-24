"use client";
import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EinstellungenPage() {
  const [agentur, setAgentur] = useState({
    name: "WebAgentur",
    inhaber: "Max Mustermann",
    email: "hallo@webagentur.de",
    telefon: "+49 123 456 7890",
    strasse: "Musterstraße 1",
    plz: "32657",
    ort: "Lemgo",
    ust: "DE123456789",
  });
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function upd(key: string, val: string) {
    setAgentur((a) => ({ ...a, [key]: val }));
  }

  return (
    <div>
      <TopBar title="Einstellungen" />
      <div className="p-6 max-w-2xl space-y-8">
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
          {[
            { label: "Neues Ticket", desc: "E-Mail wenn ein Kunde ein Ticket erstellt", on: true },
            { label: "Neue Bestellung", desc: "E-Mail bei neuer Checkout-Bestellung", on: true },
            { label: "Fällige Rechnung", desc: "Erinnerung 3 Tage vor Fälligkeit", on: false },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer shrink-0 transition-colors ${n.on ? "bg-foreground" : "bg-muted-foreground/30"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-background rounded-full transition-all ${n.on ? "right-0.5" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
