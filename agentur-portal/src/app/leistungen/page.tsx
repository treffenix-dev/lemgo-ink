import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import { PAKETE, HOSTING_PAKETE } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import { Check, Server } from "lucide-react";

export default function LeistungenPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="section container-wide">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Unsere Leistungen</h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Alles aus einer Hand — von der Website über das Hosting bis zum Support.
          </p>
        </div>

        {/* Website-Pakete */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Website-Pakete</h2>
          <p className="text-muted-foreground mb-8">Einmalige Entwicklung. Hosting separat buchbar.</p>
          <div className="grid lg:grid-cols-3 gap-6">
            {PAKETE.map((p, i) => (
              <div key={p.id} className={`rounded-xl border flex flex-col ${i === 1 ? "border-foreground shadow-xl" : "border-border"}`}>
                {i === 1 && (
                  <div className="bg-foreground text-background text-xs font-semibold text-center py-2 rounded-t-xl tracking-wide">
                    BELIEBTESTE WAHL
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{formatCurrency(p.preis_einmalig)}</p>
                    <p className="text-sm text-muted-foreground">einmalig · Lieferzeit: {p.lieferzeit}</p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {p.enthalten.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> {e}
                      </li>
                    ))}
                  </ul>
                  <Button variant={i === 1 ? "default" : "outline"} asChild>
                    <Link href={`/checkout?paket=${p.id}`}>{p.name} wählen →</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hosting */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold">Hosting-Pakete</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Im ersten Jahr inklusive — danach monatlich kündbar. SSL, tägliche Backups und technischer Support inbegriffen.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {HOSTING_PAKETE.map((h) => (
              <div key={h.id} className="rounded-xl border border-border bg-card p-6">
                <p className="font-semibold mb-1">{h.label}</p>
                <p className="text-2xl font-bold mt-2 mb-1">
                  {formatCurrency(h.preis)}
                  <span className="text-sm font-normal text-muted-foreground"> / Monat</span>
                </p>
                <p className="text-sm text-muted-foreground">{h.beschreibung}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Erweiterungen (Add-ons)</h2>
          <p className="text-muted-foreground mb-8">Jederzeit ergänzbar — auch nach der Fertigstellung.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { titel: "Online-Buchungssystem", preis: 490, beschreibung: "Termine buchen, Verfügbarkeiten verwalten, automatische E-Mails." },
              { titel: "Online-Shop (bis 50 Produkte)", preis: 790, beschreibung: "Produkte verkaufen, Bestellungen verwalten, Stripe-Zahlung." },
              { titel: "Mehrsprachigkeit (DE + EN)", preis: 390, beschreibung: "Vollständige zweite Sprache — manuell oder KI-übersetzt." },
              { titel: "SEO-Volloptimierung", preis: 490, beschreibung: "Keyword-Analyse, On-Page SEO, Google Search Console Setup." },
              { titel: "Google Analytics + Tracking", preis: 190, beschreibung: "Besucheranalyse, Ziele, Events und Conversion-Tracking." },
              { titel: "Wartung & Pflege (monatlich)", preis: 99, beschreibung: "Inhalte aktualisieren, Texte ändern, Bilder tauschen — ohne Aufwand für dich." },
            ].map((a) => (
              <div key={a.titel} className="rounded-xl border border-border bg-card p-5">
                <p className="font-semibold mb-1">{a.titel}</p>
                <p className="text-xl font-bold text-blue-600">+ {formatCurrency(a.preis)}</p>
                <p className="text-sm text-muted-foreground mt-2">{a.beschreibung}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-muted/40 rounded-xl border border-border p-10">
          <h3 className="text-2xl font-bold mb-2">Nicht sicher, was du brauchst?</h3>
          <p className="text-muted-foreground mb-6">Kostenlose Beratung — ich helfe dir, das richtige Paket zu finden.</p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <a href="https://wa.me/491234567890" target="_blank" rel="noreferrer">WhatsApp Beratung</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pakete">Alle Pakete vergleichen</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
