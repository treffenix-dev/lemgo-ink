"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Save, CheckCircle2 } from "lucide-react";

const inputCls = "w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1";

const DEFAULT: Record<string, string> = {
  name:         "Nick Wittmann",
  zusatz:       "Digital Services & Webdesign",
  strasse:      "",
  ort:          "",
  steuernummer: "",
  telefon:      "",
  email:        "",
  iban:         "",
  bic:          "",
  bank:         "",
};

function load(): Record<string, string> {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const stored = JSON.parse(localStorage.getItem("einstellungen") || "{}");
    return { ...DEFAULT, ...stored };
  } catch { return DEFAULT; }
}

export default function EinstellungenPage() {
  const [form, setForm] = useState<Record<string, string>>(DEFAULT);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(load()); }, []);

  function handleSave() {
    localStorage.setItem("einstellungen", JSON.stringify(form));
    // also update invoice default absender
    localStorage.setItem("invoice-absender", JSON.stringify({
      absenderName:         form.name,
      absenderZusatz:       form.zusatz,
      absenderStrasse:      form.strasse,
      absenderOrt:          form.ort,
      absenderSteuernummer: form.steuernummer,
      absenderTelefon:      form.telefon,
      absenderEmail:        form.email,
      absenderIBAN:         form.iban,
      absenderBIC:          form.bic,
      absenderBank:         form.bank,
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function set(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  return (
    <div>
      <TopBar
        title="Einstellungen"
        actions={
          <Button size="sm" variant="primary" onClick={handleSave} disabled={saved}>
            {saved ? <><CheckCircle2 className="w-3.5 h-3.5" /> Gespeichert</> : <><Save className="w-3.5 h-3.5" /> Speichern</>}
          </Button>
        }
      />
      <div className="p-6 max-w-2xl space-y-5">

        {/* Business Data */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h3 className="text-sm font-semibold">Meine Geschäftsdaten</h3>
          <p className="text-xs text-muted-foreground -mt-2">Diese Daten werden automatisch in alle Rechnungen eingetragen.</p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Name</label>
              <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Titel / Zusatz</label>
              <input className={inputCls} value={form.zusatz} onChange={(e) => set("zusatz", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Straße & Nr.</label>
              <input className={inputCls} value={form.strasse} onChange={(e) => set("strasse", e.target.value)} placeholder="Musterstraße 1" />
            </div>
            <div>
              <label className={labelCls}>PLZ & Ort</label>
              <input className={inputCls} value={form.ort} onChange={(e) => set("ort", e.target.value)} placeholder="32657 Lemgo" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Steuernummer</label>
            <input className={inputCls} value={form.steuernummer} onChange={(e) => set("steuernummer", e.target.value)} placeholder="322/5765/4321" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Telefon</label>
              <input className={inputCls} value={form.telefon} onChange={(e) => set("telefon", e.target.value)} placeholder="+49 5261 …" />
            </div>
            <div>
              <label className={labelCls}>E-Mail</label>
              <input className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="nick@…" />
            </div>
          </div>
        </div>

        {/* Bank */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h3 className="text-sm font-semibold">Bankverbindung</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>IBAN</label>
              <input className={inputCls} value={form.iban} onChange={(e) => set("iban", e.target.value)} placeholder="DE12 3456 7890 1234 5678 90" />
            </div>
            <div>
              <label className={labelCls}>BIC</label>
              <input className={inputCls} value={form.bic} onChange={(e) => set("bic", e.target.value)} placeholder="SSKMDEMMXXX" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Bank</label>
            <input className={inputCls} value={form.bank} onChange={(e) => set("bank", e.target.value)} placeholder="Sparkasse Lemgo" />
          </div>
        </div>

        {/* Tax Info */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs text-amber-300 font-medium mb-1">§ 19 UStG — Kleinunternehmer</p>
          <p className="text-xs text-muted-foreground">
            Als Kleinunternehmer bis 25.000 € Jahresumsatz keine USt. Alle Rechnungen automatisch ohne Umsatzsteuer.
            Steuernummer aktuell halten — erscheint auf jeder Rechnung (Pflichtangabe).
          </p>
        </div>
      </div>
    </div>
  );
}
