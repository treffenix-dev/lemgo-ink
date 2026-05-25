"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import { PAKETE } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import { Check, ArrowRight, MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";
import { WebsiteShowcase } from "@/components/WebsiteShowcase";

const StarField = dynamic(
  () => import("@/components/StarField").then((m) => ({ default: m.StarField })),
  { ssr: false }
);

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const heroWords = "Websites die wirklich überzeugen.".split(" ");

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#080c18" }}>
      {/* ── Sternfeld — läuft durch die gesamte Seite ── */}
      <StarField />

      <PublicNavbar />

      {/* ── Hero — dark, animiert beim Laden ── */}
      <section
        className="relative overflow-hidden flex flex-col items-center text-center gap-7 py-28 sm:py-40 px-4"
        style={{ zIndex: 2 }}
      >
        {/* orbs — größer + stärker */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 65%)", animation: "driftOrb1 14s ease-in-out infinite" }} />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)", animation: "driftOrb2 18s ease-in-out infinite" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", animation: "driftOrb1 22s ease-in-out infinite reverse" }} />

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60"
        >
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Plätze verfügbar — Jetzt starten
        </motion.div>

        {/* headline — wort für wort beim Laden */}
        <h1 className="relative text-[clamp(2.4rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight text-white max-w-3xl">
          {heroWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.09 }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.15 + heroWords.length * 0.09 + 0.1 }}
          className="relative text-base sm:text-lg text-white/55 max-w-lg leading-relaxed"
        >
          Moderne Websites mit Kundenportal, Onboarding-System und direktem Support
          — für lokale Unternehmen in Deutschland.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 + heroWords.length * 0.09 + 0.28 }}
          className="relative flex flex-wrap gap-3 justify-center"
        >
          <Button size="lg" asChild className="rounded-full px-7 bg-blue-600 hover:bg-blue-700 text-white border-0">
            <Link href="/pakete">Pakete ansehen <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-full px-7 border-white/20 text-white/80 hover:bg-white/10 hover:text-white bg-transparent">
            <Link href="/#kontakt">Kostenlos beraten lassen</Link>
          </Button>
        </motion.div>

        {/* trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 + heroWords.length * 0.09 + 0.5 }}
          className="relative flex flex-wrap gap-5 justify-center text-xs text-white/35 tracking-widest uppercase pt-2"
        >
          {["Lieferung in 5–28 Tagen", "Kundenportal inklusive", "Persönlicher Support", "Hosting inklusive (1. Jahr)"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-white/30" /> {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Website Showcase ── */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06]" style={{ zIndex: 2, position: "relative" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <Reveal>
            <p className="text-[10px] tracking-[0.48em] uppercase text-white/30 mb-4">Referenz-Projekte</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Websites die wir bauen
            </h2>
            <p className="text-white/45 max-w-md leading-relaxed mb-14">
              Restaurants, Beauty-Studios, Handwerker und mehr — jede Seite individuell gestaltet, jede mit Kundenportal.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <WebsiteShowcase />
          </Reveal>
        </div>
      </section>

      {/* ── Vorteile ── */}
      <section className="section bg-muted/40" style={{ position: "relative", zIndex: 2 }}>
        <div className="container-wide">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Warum anders als andere Agenturen?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Du siehst immer, was gerade passiert — und erreichst mich jederzeit direkt.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👁️", title: "Echtzeit-Übersicht", text: "Du siehst jederzeit den aktuellen Stand deines Projekts im Kundenportal." },
              { icon: "💬", title: "Kein E-Mail-Chaos", text: "Alles läuft über das Ticket-System. Strukturiert, nachvollziehbar, transparent." },
              { icon: "📁", title: "Dateien zentral", text: "Logo, Bilder, Texte — alles an einem Ort. Du weißt immer, was noch fehlt." },
              { icon: "📱", title: "Mobiloptimiert", text: "Deine Website funktioniert auf allen Geräten — und das Kundenportal auch." },
              { icon: "⚡", title: "Schneller Start", text: "Nach der Zahlung bist du sofort im Onboarding und kannst direkt loslegen." },
              { icon: "🔧", title: "Flexibel erweiterbar", text: "Buchungssystem, Shop oder mehrsprachig — jederzeit als Modul ergänzbar." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="bg-background rounded-xl border border-border p-6 h-full">
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Branchen ── */}
      <section className="section container-wide" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Für wen ist das?</h2>
            <p className="text-muted-foreground">Lokale Unternehmen, die online professionell wirken wollen.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 justify-center">
            {["🍕 Restaurants & Cafés", "💄 Parfümerien & Beauty", "🔧 Handwerker & Dienstleister", "🏪 Einzelhandel & Läden",
              "💪 Fitness & Wellness", "🏠 Immobilien", "🎓 Coaches & Berater", "🌿 Therapeuten & Heilpraktiker"].map((b) => (
              <span key={b} className="px-4 py-2 rounded-full border border-border bg-muted text-sm text-muted-foreground hover:border-foreground/30 transition-colors">
                {b}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Ablauf ── */}
      <section id="ablauf" className="section bg-muted/40" style={{ position: "relative", zIndex: 2 }}>
        <div className="container-narrow">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">So einfach geht&apos;s</h2>
              <p className="text-muted-foreground">Von der Bestellung bis zur fertigen Website — in 4 Schritten.</p>
            </div>
          </Reveal>
          <div className="space-y-4">
            {[
              { n: "01", title: "Paket wählen", text: "Such dir das passende Paket aus und wähle dein Zahlungsmodell." },
              { n: "02", title: "Bezahlen", text: "Sicher bezahlen per Karte, PayPal, Klarna, SEPA, Überweisung oder vor Ort." },
              { n: "03", title: "Daten eintragen", text: "Nach dem Kauf gibst du deine Informationen im Kundenportal ein — in deinem Tempo." },
              { n: "04", title: "Projekt startet", text: "Ich beginne die Arbeit, du siehst alles live im Portal und kannst jederzeit Feedback geben." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="flex gap-5 bg-background rounded-xl border border-border p-6">
                  <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pakete Preview ── */}
      <section className="section container-wide" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Einfache, faire Preise</h2>
            <p className="text-muted-foreground">Keine versteckten Kosten. Hosting im ersten Jahr inklusive.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6">
          {PAKETE.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className={`rounded-xl border p-6 flex flex-col gap-4 h-full ${i === 1 ? "border-foreground shadow-lg" : "border-border"}`}>
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
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/pakete" className="text-sm text-blue-600 hover:underline">
            Alle Details und Vergleich ansehen →
          </Link>
        </div>
      </section>

      {/* ── Vertrauen ── */}
      <section className="section bg-muted/40" style={{ position: "relative", zIndex: 2 }}>
        <div className="container-narrow">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: "🔒", title: "Sichere Zahlung", text: "Stripe, PayPal, Klarna, SEPA, Überweisung oder Bar — du wählst." },
              { icon: "📞", title: "Persönlicher Support", text: "WhatsApp, Anruf, E-Mail oder Ticket — immer erreichbar." },
              { icon: "📊", title: "Transparente Abrechnung", text: "Alle Rechnungen und Zahlungen siehst du direkt im Portal." },
              { icon: "🌐", title: "Hosting inklusive", text: "Im ersten Jahr ist Hosting mit SSL, Backup und Domain-Setup dabei." },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className="flex gap-4 bg-background rounded-xl border border-border p-5 h-full">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1">{t.title}</h3>
                    <p className="text-sm text-muted-foreground">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section container-narrow" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Häufige Fragen</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {[
            { q: "Wie schnell ist meine Website fertig?", a: "Je nach Paket: Starter 5–7 Werktage, Business 10–14, Pro 21–28. Du siehst den Fortschritt live im Kundenportal." },
            { q: "Was brauche ich zum Starten?", a: "Nichts außer deiner E-Mail-Adresse. Logo, Texte und Bilder kannst du direkt im Portal hochladen — wir begleiten dich dabei." },
            { q: "Was kostet Hosting nach dem ersten Jahr?", a: "Hosting-Verlängerung ab 19 €/Monat (Starter), 29 €/Monat (Business) oder 49 €/Monat (Pro) — inkl. SSL, Backup und Support." },
            { q: "Kann ich das Paket später wechseln?", a: "Ja. Upgrades sind jederzeit möglich. Der Preisunterschied wird fair berechnet." },
            { q: "Wie funktioniert die 50/50-Zahlung?", a: "50% zahlst du bei der Bestellung, 50% nach Fertigstellung und Abnahme — klar und fair." },
          ].map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <details className="border border-border rounded-xl p-5 group">
                <summary className="font-medium cursor-pointer flex items-center justify-between list-none">
                  {f.q}
                  <ChevronDown className="w-4 h-4 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Kontakt ── */}
      <section id="kontakt" className="section bg-foreground text-background" style={{ position: "relative", zIndex: 2 }}>
        <div className="container-narrow text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-3">Fragen? Ich helfe dir gerne.</h2>
            <p className="text-background/70 mb-8">Kostenlose Beratung — unverbindlich und persönlich.</p>
          </Reveal>
          <Reveal delay={0.1}>
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
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-background" style={{ position: "relative", zIndex: 2 }}>
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

      <style jsx global>{`
        @keyframes driftOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes driftOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.04); }
          66% { transform: translate(20px, -15px) scale(0.98); }
        }
      `}</style>
    </div>
  );
}
