"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAKETE, ZAHLUNGSMODELLE, ZAHLUNGSARTEN } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import type { PaketType, ZahlungsModell, Zahlungsart } from "@/types";
import { Check, Loader2, MapPin, AlertCircle } from "lucide-react";

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

type AddressStatus = "idle" | "checking" | "ok" | "warn";

function CheckoutForm() {
  const params = useSearchParams();
  const router = useRouter();

  const paketId = (params.get("paket") as PaketType) || "starter";
  const paket = PAKETE.find((p) => p.id === paketId) || PAKETE[0];

  const [zahlungsmodell, setZahlungsmodell] = useState<ZahlungsModell>("einmalig");
  const [zahlungsart, setZahlungsart] = useState<Zahlungsart>("karte");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [agb, setAgb] = useState(false);
  const [datenschutz, setDatenschutz] = useState(false);
  const [widerruf, setWiderruf] = useState(false);
  const [zahlungsInfo, setZahlungsInfo] = useState(false);
  const [addrStatus, setAddrStatus] = useState<AddressStatus>("idle");

  const [form, setForm] = useState({
    vorname: "", nachname: "", firma: "", email: "", telefon: "",
    strasse: "", plz: "", ort: "", land: "Deutschland", branche: "",
    passwort: "", passwort2: "",
  });

  function updateForm(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    if (["strasse", "plz", "ort"].includes(key)) setAddrStatus("idle");
  }

  function goStep(n: 1 | 2 | 3) {
    setStep(n);
    scrollTop();
  }

  const validateAddress = useCallback(async () => {
    if (!form.strasse || !form.plz || !form.ort) return;
    setAddrStatus("checking");
    try {
      const q = encodeURIComponent(`${form.strasse}, ${form.plz} ${form.ort}, Deutschland`);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${q}&countrycodes=de&limit=1`,
        { headers: { "Accept-Language": "de" } }
      );
      const data = await res.json();
      setAddrStatus(data.length > 0 ? "ok" : "warn");
    } catch {
      setAddrStatus("idle");
    }
  }, [form.strasse, form.plz, form.ort]);

  const zmInfo = ZAHLUNGSMODELLE.find((m) => m.id === zahlungsmodell);
  const aufpreis = "aufpreis" in (zmInfo ?? {}) ? (zmInfo as { aufpreis: number }).aufpreis ?? 0 : 0;
  const preis = paket.preis_einmalig * (1 + aufpreis / 100);
  const mwst = preis * 0.19;
  const netto = preis - mwst;

  const canPay = agb && datenschutz && widerruf && zahlungsInfo;

  async function handleSubmit() {
    if (!canPay) return;
    setLoading(true);
    setApiError("");

    const payload = { paket: paket.id, zahlungsmodell, zahlungsart, profil: form, preis };

    try {
      if (["karte", "paypal", "klarna", "sepa"].includes(zahlungsart)) {
        const res = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const { url } = await res.json();
        if (url) window.location.href = url;
        else setApiError("Stripe-Fehler. Bitte kontaktiere uns direkt.");
      } else {
        const res = await fetch("/api/checkout/manual", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.customerId) router.push("/checkout/bestaetigung?typ=manuell");
        else setApiError(data.error || "Ein Fehler ist aufgetreten. Bitte kontaktiere uns direkt.");
      }
    } catch {
      setApiError("Verbindungsfehler. Bitte prüfe deine Internetverbindung.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur h-14 flex items-center px-6">
        <Link href="/pakete" className="text-sm text-muted-foreground hover:text-foreground">
          ← Zurück zu den Paketen
        </Link>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <span className={step >= 1 ? "text-foreground font-medium" : ""}>1. Paket</span>
          <span>→</span>
          <span className={step >= 2 ? "text-foreground font-medium" : ""}>2. Daten</span>
          <span>→</span>
          <span className={step >= 3 ? "text-foreground font-medium" : ""}>3. Zahlung</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Paket bestätigen</h1>
              <div className="rounded-xl border border-foreground bg-foreground/5 p-5 mb-6">
                <p className="font-semibold text-lg">{paket.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{paket.tagline}</p>
                <ul className="mt-4 space-y-1.5">
                  {paket.enthalten.map((e) => (
                    <li key={e} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 shrink-0" /> {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <p className="font-semibold mb-3">Zahlungsmodell wählen</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {ZAHLUNGSMODELLE.map((m) => (
                    <button key={m.id} onClick={() => setZahlungsmodell(m.id as ZahlungsModell)}
                      className={`text-left p-4 rounded-xl border transition-colors ${
                        zahlungsmodell === m.id ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/30"
                      }`}>
                      <p className="font-medium text-sm">{m.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.beschreibung}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="font-semibold mb-3">Zahlungsart</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ZAHLUNGSARTEN.map((a) => (
                    <button key={a.id} onClick={() => setZahlungsart(a.id as Zahlungsart)}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                        zahlungsart === a.id ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/30"
                      }`}>
                      <span className="text-xl">{a.icon}</span>
                      <span className="text-sm font-medium">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={() => goStep(2)}>Weiter zu deinen Daten →</Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Deine Daten</h1>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Vorname" required value={form.vorname} onChange={(e) => updateForm("vorname", e.target.value)} />
                <Input label="Nachname" required value={form.nachname} onChange={(e) => updateForm("nachname", e.target.value)} />
                <Input label="Firmenname" required value={form.firma} onChange={(e) => updateForm("firma", e.target.value)} />
                <Input label="Branche" required value={form.branche} onChange={(e) => updateForm("branche", e.target.value)} placeholder="z.B. Restaurant" />
                <div className="sm:col-span-2"><Input label="E-Mail" type="email" required value={form.email} onChange={(e) => updateForm("email", e.target.value)} /></div>
                <div className="sm:col-span-2"><Input label="Telefon" type="tel" required value={form.telefon} onChange={(e) => updateForm("telefon", e.target.value)} /></div>
                <div className="sm:col-span-2 border-t border-border pt-4 mt-1"><p className="font-semibold mb-3">Rechnungsadresse</p></div>
                <div className="sm:col-span-2"><Input label="Straße & Hausnummer" required value={form.strasse} onChange={(e) => updateForm("strasse", e.target.value)} onBlur={validateAddress} /></div>
                <Input label="PLZ" required value={form.plz} onChange={(e) => updateForm("plz", e.target.value)} onBlur={validateAddress} />
                <Input label="Ort" required value={form.ort} onChange={(e) => updateForm("ort", e.target.value)} onBlur={validateAddress} />
                <div className="sm:col-span-2"><Input label="Land" required value={form.land} onChange={(e) => updateForm("land", e.target.value)} /></div>
                {addrStatus === "checking" && <div className="sm:col-span-2 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Adresse wird geprüft…</div>}
                {addrStatus === "ok" && <div className="sm:col-span-2 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2"><MapPin className="w-4 h-4 shrink-0" /> Adresse gefunden ✓</div>}
                {addrStatus === "warn" && <div className="sm:col-span-2 flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>Adresse konnte nicht verifiziert werden. Bitte prüfe deine Eingabe — du kannst trotzdem fortfahren.</span></div>}
                <div className="sm:col-span-2 border-t border-border pt-4 mt-1"><p className="font-semibold mb-3">Passwort für dein Konto</p></div>
                <Input label="Passwort" type="password" required value={form.passwort} onChange={(e) => updateForm("passwort", e.target.value)} placeholder="Mindestens 8 Zeichen" />
                <Input label="Passwort wiederholen" type="password" required value={form.passwort2} onChange={(e) => updateForm("passwort2", e.target.value)} />
                {form.passwort2 && form.passwort !== form.passwort2 && <div className="sm:col-span-2 text-sm text-red-600">Passwörter stimmen nicht überein.</div>}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => goStep(1)}>← Zurück</Button>
                <Button className="flex-1" onClick={() => goStep(3)}
                  disabled={!form.vorname || !form.nachname || !form.email || !form.strasse || !form.plz || !form.ort || !form.passwort || form.passwort !== form.passwort2}>
                  Weiter zur Zahlung →
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Bestätigung & Zahlung</h1>
              <div className="bg-muted/40 rounded-xl border border-border p-5 mb-6 space-y-3">
                <Summary label="Paket" value={paket.name} />
                <Summary label="Zahlungsmodell" value={ZAHLUNGSMODELLE.find((m) => m.id === zahlungsmodell)?.label ?? ""} />
                <Summary label="Zahlungsart" value={ZAHLUNGSARTEN.find((a) => a.id === zahlungsart)?.label ?? ""} />
                <Summary label="Kunde" value={`${form.vorname} ${form.nachname}`} />
                <Summary label="Firma" value={form.firma} />
                <Summary label="E-Mail" value={form.email} />
                <Summary label="Adresse" value={`${form.strasse}, ${form.plz} ${form.ort}`} />
              </div>
              <div className="space-y-3 mb-6">
                <Checkbox checked={agb} onChange={setAgb} label={<>Ich akzeptiere die <Link href="/agb" className="underline" target="_blank">AGB</Link>.</>} />
                <Checkbox checked={datenschutz} onChange={setDatenschutz} label={<>Ich habe die <Link href="/datenschutz" className="underline" target="_blank">Datenschutzerklärung</Link> gelesen.</>} />
                <Checkbox checked={widerruf} onChange={setWiderruf} label={<>Ich habe die <Link href="/widerruf" className="underline" target="_blank">Widerrufsbelehrung</Link> zur Kenntnis genommen.</>} />
                <Checkbox checked={zahlungsInfo} onChange={setZahlungsInfo} label={`Ich bestätige die Zahlungsart "${ZAHLUNGSARTEN.find((a) => a.id === zahlungsart)?.label}".`} />
              </div>
              {apiError && <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700"><AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {apiError}</div>}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => goStep(2)}>← Zurück</Button>
                <Button className="flex-1" size="lg" disabled={!canPay || loading} onClick={handleSubmit}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Wird verarbeitet…</> : `Jetzt kaufen – ${formatCurrency(preis)}`}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">Durch den Kauf wird ein Kundenkonto erstellt und du wirst direkt ins Onboarding weitergeleitet.</p>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-20 h-fit">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="font-semibold mb-4">Bestellübersicht</p>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Paket</span><span className="font-medium">{paket.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Netto</span><span>{formatCurrency(netto)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">MwSt. 19%</span><span>{formatCurrency(mwst)}</span></div>
              {aufpreis > 0 && <div className="flex justify-between text-amber-600"><span>Ratenaufpreis</span><span>+{aufpreis}%</span></div>}
              <div className="border-t border-border pt-2 flex justify-between font-bold text-base"><span>Gesamt</span><span>{formatCurrency(preis)}</span></div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800">✓ Sicher bezahlen — inkl. Kundenportal-Zugang nach Zahlung</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
          checked ? "bg-foreground border-foreground" : "border-border hover:border-foreground/50"
        }`}>
        {checked && <Check className="w-3 h-3 text-background" />}
      </div>
      <span className="text-sm leading-relaxed">{label}</span>
    </label>
  );
}

export default function CheckoutPage() {
  return <Suspense><CheckoutForm /></Suspense>;
}
