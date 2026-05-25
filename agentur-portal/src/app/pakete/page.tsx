import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import { PAKETE, ZAHLUNGSMODELLE } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import { Check, X } from "lucide-react";

export default function PaketePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="section container-wide">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pakete & Preise</h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Klare Preise, keine Überraschungen. Wähle das Paket, das zu deinem Unternehmen passt.
          </p>
        </div>

        {/* Zahlungsmodelle Info */}
        <div className="bg-muted/40 rounded-xl border border-border p-6 mb-10">
          <p className="font-semibold mb-4 text-sm">Flexible Zahlungsmodelle</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZAHLUNGSMODELLE.map((m) => (
              <div key={m.id} className="bg-background rounded-lg border border-border p-4">
                <p className="font-medium text-sm mb-1">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.beschreibung}</p>
                {"aufpreis" in m && m.aufpreis > 0 && (
                  <p className="text-xs text-amber-600 mt-1">+{m.aufpreis}% Aufpreis</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pakete Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {PAKETE.map((p, i) => (
            <div key={p.id} className={`rounded-xl border flex flex-col ${i === 1 ? "border-foreground shadow-xl" : "border-border"}`}>
              {i === 1 && (
                <div className="bg-foreground text-background text-xs font-semibold text-center py-2 rounded-t-xl tracking-wide">
                  BELIEBTESTE WAHL
                </div>
              )}
              <div className="p-7 flex flex-col flex-1 gap-5">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{p.name}</h2>
                  <p className="text-sm text-muted-foreground">{p.tagline}</p>
                </div>

                <div>
                  <p className="text-4xl font-bold">{formatCurrency(p.preis_einmalig)}</p>
                  <p className="text-sm text-muted-foreground mt-1">einmalige Zahlung</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Hosting 1. Jahr inklusive — danach auf Anfrage
                  </p>
                </div>

                <div className="bg-muted/40 rounded-lg p-3 text-sm">
                  <p className="font-medium mb-1">Lieferzeit</p>
                  <p className="text-muted-foreground">{p.lieferzeit}</p>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-sm mb-3">Enthalten</p>
                  <ul className="space-y-2">
                    {p.enthalten.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        {e}
                      </li>
                    ))}
                  </ul>

                  {p.nicht_enthalten.length > 0 && (
                    <>
                      <p className="font-semibold text-sm mt-5 mb-3 text-muted-foreground">Nicht enthalten</p>
                      <ul className="space-y-2">
                        {p.nicht_enthalten.map((e) => (
                          <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <X className="w-4 h-4 mt-0.5 shrink-0" />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-4 bg-muted rounded-lg p-3">
                    <strong>Geeignet für:</strong> {p.fuer_wen}
                  </p>
                  <Button className="w-full" variant={i === 1 ? "default" : "outline"} asChild>
                    <Link href={`/checkout?paket=${p.id}`}>
                      {p.name} wählen →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-muted/40 rounded-xl border border-border p-8">
          <h3 className="text-xl font-bold mb-2">Nicht sicher, welches Paket passt?</h3>
          <p className="text-muted-foreground mb-5">Kostenlose Beratung — ich helfe dir, die richtige Wahl zu treffen.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="default" asChild>
              <a href="https://wa.me/491234567890" target="_blank" rel="noreferrer">WhatsApp Beratung</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+491234567890">Anrufen</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
