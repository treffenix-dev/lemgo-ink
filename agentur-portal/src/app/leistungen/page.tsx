import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import { PAKETE } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import { Check, X, ArrowRight } from "lucide-react";

export default function LeistungenPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <section className="section container-narrow text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Alle Leistungen</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Von der einfachen Landing Page bis zur vollständigen digitalen Präsenz — alles aus einer Hand.
        </p>
      </section>

      <section className="section bg-muted/40">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {PAKETE.map((p, i) => (
              <div key={p.id} className={`bg-background rounded-2xl border p-8 flex flex-col ${i === 1 ? "border-foreground shadow-xl" : "border-border"}`}>
                {i === 1 && (
                  <span className="text-xs font-semibold bg-foreground text-background rounded-full px-3 py-1 self-start mb-4">Beliebteste Wahl</span>
                )}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-1">{p.name}</h2>
                  <p className="text-muted-foreground text-sm">{p.tagline}</p>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold">{formatCurrency(p.preis_einmalig)}</p>
                  {p.preis_monatlich && (
                    <p className="text-sm text-muted-foreground mt-1">oder ab {formatCurrency(p.preis_monatlich)}/Monat</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">Lieferzeit: {p.lieferzeit}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.fuer_wen}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.enthalten.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      {e}
                    </li>
                  ))}
                  {p.nicht_enthalten.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
                <Button variant={i === 1 ? "default" : "outline"} asChild>
                  <Link href={`/checkout?paket=${p.id}`}>Jetzt wählen <ArrowRight className="w-4 h-4" /></Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Optionale Erweiterungen</h2>
          <p className="text-muted-foreground">Jederzeit als Modul ergänzbar — ohne Neustart des Projekts.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "📅", name: "Online-Buchungssystem", preis: "299 €", text: "Lass Kunden direkt Termine buchen — automatische Bestätigung inklusive." },
            { icon: "🛍️", name: "Online-Shop", preis: "499 €", text: "Produkte verkaufen, Lagerbestand verwalten, Zahlungen empfangen." },
            { icon: "🌍", name: "Mehrsprachigkeit", preis: "199 €", text: "Deine Website in Deutsch + Englisch (weitere Sprachen auf Anfrage)." },
            { icon: "📈", name: "SEO-Vollpaket", preis: "349 €", text: "Keywordrecherche, On-Page-Optimierung, Google Search Console Anbindung." },
            { icon: "📸", name: "Profifoto-Shooting", preis: "auf Anfrage", text: "Professionelle Fotos deines Geschäfts, Teams und Produkte vor Ort." },
            { icon: "💬", name: "Live-Chat Integration", preis: "149 €", text: "WhatsApp-Button, Tawk.to oder eigene Chat-Lösung direkt eingebunden." },
          ].map((a) => (
            <div key={a.name} className="rounded-xl border border-border bg-card p-6">
              <div className="text-3xl mb-3">{a.icon}</div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{a.name}</h3>
                <span className="text-sm font-bold">{a.preis}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-foreground text-background">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold mb-3">Bereit loszulegen?</h2>
          <p className="text-background/70 mb-8">Wähle dein Paket und starte direkt — oder lass dich kostenlos beraten.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/pakete">Paket wählen</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#kontakt">Kostenlos beraten</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-8">
        <div className="container-wide text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebAgentur ·{" "}
          <Link href="/impressum" className="hover:text-foreground">Impressum</Link>
          {" "}·{" "}
          <Link href="/datenschutz" className="hover:text-foreground">Datenschutz</Link>
        </div>
      </footer>
    </div>
  );
}
