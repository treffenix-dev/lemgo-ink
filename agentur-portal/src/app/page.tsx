import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import { PAKETE } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import { Check, ArrowRight, MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Vorteile ── */}
      <section className="section bg-muted/40">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Warum anders als andere Agenturen?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Du siehst immer, was gerade passiert — und erreichst mich jederzeit direkt.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👁️", title: "Echtzeit-Übersicht", text: "Du siehst jederzeit den aktuellen Stand deines Projekts im Kundenportal." },
              { icon: "💬", title: "Kein E-Mail-Chaos", text: "Alles läuft über das Ticket-System. Strukturiert, nachvollziehbar, transparent." },
              { icon: "📁", title: "Dateien zentral", text: "Logo, Bilder, Texte — alles an einem Ort. Du weißt immer, was noch fehlt." },
              { icon: "📱", title: "Mobiloptimiert", text: "Deine Website funktioniert auf allen Geräten — und das Kundenportal auch." },
              { icon: "⚡", title: "Schneller Start", text: "Nach der Zahlung bist du sofort im Onboarding und kannst direkt loslegen." },
              { icon: "🔧", title: "Flexibel erweiterbar", text: "Buchungssystem, Shop oder mehrsprachig — jederzeit als Modul ergänzbar." },
            ].map((v) => (
              <div key={v.title} className="bg-background rounded-xl border border-border p-6">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Branchen ── */}
      <section className="section container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Für wen ist das?</h2>
          <p className="text-muted-foreground">Lokale Unternehmen, die online professionell wirken wollen.</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {["🍕 Restaurants & Cafés", "💄 Parfümerien & Beauty", "🔧 Handwerker & Dienstleister", "🏪 Einzelhandel & Läden",
            "💪 Fitness & Wellness", "🏠 Immobilien", "🎓 Coaches & Berater", "🌿 Therapeuten & Heilpraktiker"].map((b) => (
            <span key={b} className="px-4 py-2 rounded-full border border-border bg-muted text-sm text-muted-foreground hover:border-foreground/30 transition-colors">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ── Ablauf ── */}
      <section id="ablauf" className="section bg-muted/40">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">So einfach geht&apos;s</h2>
            <p className="text-muted-foreground">Von der Bestellung bis zur fertigen Website — in 4 Schritten.</p>
          </div>
          <div className="space-y-4">
            {[
              { n: "01", title: "Paket wählen", text: "Such dir das passende Paket aus und wähle dein Zahlungsmodell." },
              { n: "02", title: "Bezahlen", text: "Sicher bezahlen per Karte, PayPal, Klarna, SEPA, Überweisung oder vor Ort." },
              { n: "03", title: "Daten eintragen", text: "Nach dem Kauf gibst du deine Informationen im Kundenportal ein — in deinem Tempo." },
              { n: "04", title: "Projekt startet", text: "Ich beginne die Arbeit, du siehst alles live im Portal und kannst jederzeit Feedback geben." },
            ].map((s) => (
              <div key={s.n} className="flex gap-5 bg-background rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pakete Preview ── */}
      <section className="section container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Einfache, faire Preise</h2>
          <p className="text-muted-foreground">Keine versteckten Kosten. Alles klar kommuniziert.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {PAKETE.map((p, i) => (
            <div key={p.id} className={`rounded-xl border p-6 flex flex-col gap-4 ${i === 1 ? "border-foreground shadow-lg" : "border-border"}`}>
              {i === 1 && <span className="text-xs font-semibold text-center bg-foreground text-background rounded-full px-3 py-1 self-start">Beliebteste Wahl</span>}
              <div>
                <p className="font-bold text-xl">{p.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
              </div>
              <p className="text-3xl font-bold">
                {formatCurrency(p.preis_einmalig)}
                <span className="text-base font-normal text-muted-foreground"> einmalig</span>
              </p>
              <ul className="space-y-2 flex-1">
                {p.enthalten.slice(0, 5).map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
              <Button variant={i === 1 ? "default" : "outline"} asChild>
                <Link href={`/checkout?paket=${p.id}`}>Jetzt wählen</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/pakete" className="text-sm text-blue-600 hover:underline">
            Alle Details und Vergleich ansehen →
          </Link>
        </div>
      </section>

      {/* ── Vertrauen ── */}
      <section className="section bg-muted/40">
        <div className="container-narrow">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: "🔒", title: "Sichere Zahlung", text: "Stripe, PayPal, Klarna, SEPA, Überweisung oder Bar — du wählst." },
              { icon: "📞", title: "Persönlicher Support", text: "WhatsApp, Anruf, E-Mail oder Ticket — immer erreichbar." },
              { icon: "📊", title: "Transparente Abrechnung", text: "Alle Rechnungen und Zahlungen siehst du direkt im Portal." },
              { icon: "🔄", title: "Modulare Erweiterung", text: "Buchung, Shop, SEO — alles jederzeit ergänzbar ohne Neustart." },
            ].map((t) => (
              <div key={t.title} className="flex gap-4 bg-background rounded-xl border border-border p-5">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section container-narrow">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Häufige Fragen</h2>
        </div>
        <div className="space-y-3">
          {[
            { q: "Wie schnell ist meine Website fertig?", a: "Je nach Paket: Starter 5–7 Werktage, Business 10–14, Pro 21–28. Du siehst den Fortschritt live im Kundenportal." },
            { q: "Was brauche ich zum Starten?", a: "Nichts außer deiner E-Mail-Adresse. Logo, Texte und Bilder kannst du direkt im Portal hochladen — wir begleiten dich dabei." },
            { q: "Kann ich das Paket später wechseln?", a: "Ja. Upgrades sind jederzeit möglich. Der Preisunterschied wird fair berechnet." },
            { q: "Wie funktioniert die 50/50-Zahlung?", a: "50% zahlst du bei der Bestellung, 50% nach Fertigstellung und Abnahme — klar und fair." },
            { q: "Gibt es eine Kündigungsfrist beim Abo?", a: "Das Abo ist monatlich kündbar. Du erhältst immer eine Erinnerung 14 Tage vor dem nächsten Billing-Datum." },
          ].map((f) => (
            <details key={f.q} className="border border-border rounded-xl p-5 group">
              <summary className="font-medium cursor-pointer flex items-center justify-between list-none">
                {f.q}
                <ChevronDown className="w-4 h-4 shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Kontakt ── */}
      <section id="kontakt" className="section bg-foreground text-background">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold mb-3">Fragen? Ich helfe dir gerne.</h2>
          <p className="text-background/70 mb-8">Kostenlose Beratung — unverbindlich und persönlich.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/491234567890" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#22c35e] transition-colors">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <a href="tel:+491234567890"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background/10 text-background font-medium hover:bg-background/20 transition-colors">
              <Phone className="w-5 h-5" /> Anrufen
            </a>
            <a href="mailto:hallo@webagentur.de"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background/10 text-background font-medium hover:bg-background/20 transition-colors">
              <Mail className="w-5 h-5" /> E-Mail
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-background">
        <div className="container-wide py-10">
          <div className="grid sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-foreground rounded-md flex items-center justify-center">
                  <span className="text-background text-xs font-bold">W</span>
                </div>
                <span className="font-semibold">WebAgentur</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professionelle Websites für lokale Unternehmen in Deutschland.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Leistungen</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/pakete" className="hover:text-foreground">Pakete & Preise</Link></li>
                <li><Link href="/leistungen" className="hover:text-foreground">Alle Leistungen</Link></li>
                <li><Link href="/#ablauf" className="hover:text-foreground">Ablauf</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Konto</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/login" className="hover:text-foreground">Anmelden</Link></li>
                <li><Link href="/portal" className="hover:text-foreground">Kundenportal</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Rechtliches</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/impressum" className="hover:text-foreground">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-foreground">Datenschutz</Link></li>
                <li><Link href="/agb" className="hover:text-foreground">AGB</Link></li>
                <li><Link href="/widerruf" className="hover:text-foreground">Widerruf</Link></li>
                <li><Link href="/zahlungsbedingungen" className="hover:text-foreground">Zahlungsbedingungen</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} WebAgentur · Alle Rechte vorbehalten
          </div>
        </div>
      </footer>
    </div>
  );
}
