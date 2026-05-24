import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { PAKETE } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import { Check, X, ArrowRight } from "lucide-react";

const CARD = "rounded-2xl border border-white/[0.09] bg-white/[0.03] p-8 flex flex-col";

export default function LeistungenPage() {
  return (
    <div className="min-h-screen" style={{ background: "#07070d" }}>
      <PublicNavbar dark />

      {/* Header */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.48em] uppercase text-white/30 mb-4">Leistungen</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Alle Leistungen</h1>
        <p className="text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
          Von der einfachen Landing Page bis zur vollständigen digitalen Präsenz — alles aus einer Hand.
        </p>
      </section>

      {/* Pakete */}
      <section className="pb-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-20">
          <div className="grid lg:grid-cols-3 gap-7">
            {PAKETE.map((p, i) => (
              <div
                key={p.id}
                className={[
                  CARD,
                  i === 1 ? "border-white/20 bg-white/[0.06]" : "",
                ].join(" ")}
              >
                {i === 1 && (
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/60 border border-white/15 rounded-full px-3 py-1 self-start mb-5">
                    Beliebteste Wahl
                  </span>
                )}
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-white mb-1">{p.name}</h2>
                  <p className="text-white/45 text-sm">{p.tagline}</p>
                </div>
                <div className="mb-5">
                  <p className="text-4xl font-bold text-white">{formatCurrency(p.preis_einmalig)}</p>
                  <p className="text-sm text-white/35 mt-1">Hosting ab 19 €/Monat nach dem 1. Jahr</p>
                  <p className="text-xs text-white/25 mt-0.5">Lieferzeit: {p.lieferzeit}</p>
                </div>
                <p className="text-sm text-white/40 mb-5 leading-relaxed">{p.fuer_wen}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.enthalten.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-sm text-white/65">
                      <Check className="w-4 h-4 text-white/35 mt-0.5 shrink-0" />
                      {e}
                    </li>
                  ))}
                  {p.nicht_enthalten.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-sm text-white/25">
                      <X className="w-4 h-4 text-white/15 mt-0.5 shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?paket=${p.id}`}
                  className={[
                    "group flex items-center justify-center gap-2 rounded-full py-3 text-[13px] font-semibold tracking-[0.03em] transition-all duration-300",
                    i === 1
                      ? "bg-white text-[#07070d] hover:bg-white/90"
                      : "border border-white/15 text-white/65 hover:border-white/30 hover:text-white",
                  ].join(" ")}
                >
                  Jetzt wählen
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Optionale Erweiterungen</h2>
            <p className="text-white/40">Jederzeit als Modul ergänzbar — ohne Neustart des Projekts.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "📅", name: "Online-Buchungssystem", preis: "299 €", text: "Lass Kunden direkt Termine buchen — automatische Bestätigung inklusive." },
              { icon: "🛍️", name: "Online-Shop", preis: "499 €", text: "Produkte verkaufen, Lagerbestand verwalten, Zahlungen empfangen." },
              { icon: "🌍", name: "Mehrsprachigkeit", preis: "199 €", text: "Deine Website in Deutsch + Englisch (weitere Sprachen auf Anfrage)." },
              { icon: "📈", name: "SEO-Vollpaket", preis: "349 €", text: "Keywordrecherche, On-Page-Optimierung, Google Search Console Anbindung." },
              { icon: "📸", name: "Profifoto-Shooting", preis: "auf Anfrage", text: "Professionelle Fotos deines Geschäfts, Teams und Produkte vor Ort." },
              { icon: "💬", name: "Live-Chat Integration", preis: "149 €", text: "WhatsApp-Button, Tawk.to oder eigene Chat-Lösung direkt eingebunden." },
            ].map((a) => (
              <div key={a.name} className={CARD + " hover:border-white/15 transition-colors duration-300"}>
                <div className="text-3xl mb-4">{a.icon}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{a.name}</h3>
                  <span className="text-sm font-bold text-white/70">{a.preis}</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Bereit loszulegen?</h2>
          <p className="text-white/40 mb-8">Wähle dein Paket und starte direkt — oder lass dich kostenlos beraten.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/pakete"
              className="px-6 py-3 bg-white text-[#07070d] text-sm font-semibold rounded-full hover:bg-white/90 active:scale-[0.97] transition-all duration-250"
            >
              Paket wählen
            </Link>
            <Link
              href="/#kontakt"
              className="px-6 py-3 border border-white/15 text-white/65 text-sm font-semibold rounded-full hover:border-white/30 hover:text-white transition-all duration-250"
            >
              Kostenlos beraten
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-white/20">
          © {new Date().getFullYear()} WebAgentur ·{" "}
          <Link href="/impressum" className="hover:text-white/50 transition-colors">Impressum</Link>
          {" "}·{" "}
          <Link href="/datenschutz" className="hover:text-white/50 transition-colors">Datenschutz</Link>
        </div>
      </footer>
    </div>
  );
}
