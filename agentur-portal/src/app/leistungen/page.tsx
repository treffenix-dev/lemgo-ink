import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import { PAKETE } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import { Check, Server, CreditCard, Percent, Calendar } from "lucide-react";

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
            <h2 className="text-2xl font-bold">Hosting</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Im ersten Jahr in jedem Paket inklusive. Ab dem zweiten Jahr wird das Hosting individuell vereinbart — je nach Anforderungen deiner Website.
          </p>
          <div className="rounded-xl border border-border bg-card p-6 max-w-xl">
            <p className="font-semibold mb-2">Was ist immer dabei:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> SSL-Zertifikat (HTTPS)</li>
              <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Tägliche Backups</li>
              <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Schnelle Ladezeiten</li>
              <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Technischer Support</li>
              <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Domain-Einrichtung inklusive</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
              Preis ab dem 2. Jahr: <strong>auf Anfrage</strong> — wird vor Projektstart gemeinsam besprochen.
            </p>
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

        {/* Flexible Zahlungsmodelle */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Flexible Zahlungsmodelle</h2>
          <p className="text-muted-foreground mb-8">Wähle das Modell, das zu dir passt — ohne versteckte Kosten.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Einmalzahlung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du zahlst den vollen Betrag nach Abnahme — kein Aufpreis, kein Risiko.
                  Ideal wenn du schnell abrechnen möchtest.
                </p>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-sm text-green-700 font-medium">
                ✓ Kein Aufpreis · Sofort fertig
              </div>
            </div>

            <div className="rounded-xl border border-foreground bg-card p-6 flex flex-col gap-4 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                BELIEBT
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Percent className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">50 / 50</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  50% bei Projektstart, 50% nach Abnahme.
                  So trägst du kein volles Risiko und wir starten sofort.
                </p>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 text-sm text-blue-700 font-medium">
                ✓ Kein Aufpreis · Geteiltes Risiko
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Ratenzahlung (3×)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Zahle in 3 gleichen Raten — monatlich nach Projektstart.
                  Kleiner Aufpreis von 10% auf den Gesamtpreis.
                </p>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 text-sm text-amber-700 font-medium">
                +10% Aufpreis · Maximale Flexibilität
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Alle Zahlungsmodelle werden vor Projektstart schriftlich vereinbart. Kein Kleingedrucktes.
          </p>
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
