"use client";

import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { PAKETE } from "@/lib/data/pakete";
import { formatCurrency } from "@/lib/utils/format";
import { HeroSection } from "@/components/sections/HeroSection";
import { WaveMeshWrapper } from "@/components/WaveMeshWrapper";
import { WebsiteShowcase } from "@/components/WebsiteShowcase";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { ArrowRight, Check, ChevronDown, MessageCircle, Phone, Mail } from "lucide-react";

const StarFieldWrapper = dynamic(
  () => import("@/components/StarField").then((m) => ({ default: m.StarField })),
  { ssr: false }
);

// ── Reveal wrapper (early trigger so no big scroll needed) ──────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── 3D tilt card — responds to mouse position ───────────────────────
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;
    const y = ((e.clientY - top) / height - 0.5) * -14;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    el.style.transition = "transform 0.1s ease";
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

// ── Dark glass card base ─────────────────────────────────────────────
const CARD =
  "rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6";

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#07070d" }}>
      {/* Three.js wave mesh + star field — fixed, behind everything */}
      <WaveMeshWrapper />
      <StarFieldWrapper />

      {/* All content sits above the mesh (z-index > 0) */}
      <div className="relative" style={{ zIndex: 10 }}>
        <PublicNavbar dark />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Website Showcase ─────────────────────────────────────── */}
        <section className="py-28 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <Reveal className="mb-14">
              <p className="text-[10px] tracking-[0.48em] uppercase text-white/30 mb-4">Referenzen</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Websites die wir gebaut haben
              </h2>
              <p className="text-white/45 mt-3 max-w-md">
                Restaurants, Beauty-Studios, Handwerker und mehr — jede Seite individuell, jede mit Kundenportal.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <WebsiteShowcase />
            </Reveal>
          </div>
        </section>

        {/* ── Vorteile ─────────────────────────────────────────────── */}
        <section className="py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <Reveal className="text-center mb-14">
              <p className="text-[10px] tracking-[0.48em] uppercase text-white/35 mb-4">
                Warum wir
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Anders als andere Agenturen
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "👁️", title: "Echtzeit-Übersicht", text: "Du siehst jederzeit den Stand deines Projekts live im Kundenportal." },
                { icon: "💬", title: "Kein E-Mail-Chaos", text: "Alles läuft über das Ticket-System. Strukturiert, transparent, nachvollziehbar." },
                { icon: "📁", title: "Dateien zentral", text: "Logo, Bilder, Texte — alles an einem Ort. Du weißt immer was fehlt." },
                { icon: "📱", title: "Mobiloptimiert", text: "Deine Website und das Kundenportal funktionieren auf allen Geräten." },
                { icon: "⚡", title: "Schneller Start", text: "Nach der Zahlung startest du sofort mit dem Onboarding." },
                { icon: "🔧", title: "Flexibel erweiterbar", text: "Buchung, Shop, Mehrsprachig — jederzeit als Modul ergänzbar." },
              ].map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <TiltCard className={CARD + " h-full"}>
                    <div className="text-3xl mb-4">{v.icon}</div>
                    <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{v.text}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Branchen ─────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <Reveal className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">Für wen ist das?</h2>
              <p className="text-white/45">Lokale Unternehmen, die online professionell wirken wollen.</p>
            </Reveal>
            <Reveal>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  "🍕 Restaurants & Cafés",
                  "💄 Parfümerien & Beauty",
                  "🔧 Handwerker & Dienstleister",
                  "🏪 Einzelhandel & Läden",
                  "💪 Fitness & Wellness",
                  "🏠 Immobilien",
                  "🎓 Coaches & Berater",
                  "🌿 Therapeuten & Heilpraktiker",
                ].map((b) => (
                  <span
                    key={b}
                    className="px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-sm text-white/55 hover:border-white/25 hover:text-white/80 transition-all duration-300 cursor-default"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Ablauf ───────────────────────────────────────────────── */}
        <section id="ablauf" className="py-28 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <Reveal className="text-center mb-14">
              <p className="text-[10px] tracking-[0.48em] uppercase text-white/35 mb-4">Ablauf</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                So einfach geht&apos;s
              </h2>
              <p className="text-white/45 mt-3">Von der Bestellung bis zur fertigen Website — in 4 Schritten.</p>
            </Reveal>

            <div className="space-y-4">
              {[
                { n: "01", title: "Paket wählen", text: "Such dir das passende Paket aus und wähle dein Zahlungsmodell." },
                { n: "02", title: "Bezahlen", text: "Sicher per Karte, PayPal, Klarna, SEPA, Überweisung oder vor Ort." },
                { n: "03", title: "Daten eintragen", text: "Deine Infos gibst du im Kundenportal ein — in deinem Tempo." },
                { n: "04", title: "Projekt startet", text: "Ich beginne die Arbeit, du siehst alles live und kannst Feedback geben." },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 0.07}>
                  <TiltCard
                    className={
                      CARD + " flex gap-5 items-start hover:border-white/15 transition-colors duration-300"
                    }
                  >
                    <div className="w-10 h-10 rounded-full border border-white/15 text-white/60 flex items-center justify-center text-xs font-bold shrink-0">
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                      <p className="text-sm text-white/50">{s.text}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pakete Preview ───────────────────────────────────────── */}
        <section className="py-28 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <Reveal className="text-center mb-14">
              <p className="text-[10px] tracking-[0.48em] uppercase text-white/35 mb-4">Preise</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Einfache, faire Preise</h2>
              <p className="text-white/45 mt-3">Keine versteckten Kosten. Alles klar kommuniziert.</p>
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-6">
              {PAKETE.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <TiltCard
                    className={[
                      "rounded-2xl border p-6 flex flex-col gap-5 h-full",
                      i === 1
                        ? "border-white/25 bg-white/[0.06]"
                        : "border-white/[0.08] bg-white/[0.03]",
                    ].join(" ")}
                  >
                    {i === 1 && (
                      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/60 border border-white/15 rounded-full px-3 py-1 self-start">
                        Beliebteste Wahl
                      </span>
                    )}
                    <div>
                      <p className="font-bold text-xl text-white">{p.name}</p>
                      <p className="text-sm text-white/45 mt-1">{p.tagline}</p>
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(p.preis_einmalig)}
                      <span className="text-base font-normal text-white/40"> einmalig</span>
                    </p>
                    <ul className="space-y-2 flex-1">
                      {p.enthalten.slice(0, 5).map((e) => (
                        <li key={e} className="flex items-start gap-2 text-sm text-white/65">
                          <Check className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
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
                          : "border border-white/15 text-white/70 hover:border-white/30 hover:text-white",
                      ].join(" ")}
                    >
                      Jetzt wählen
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </TiltCard>
                </Reveal>
              ))}
            </div>

            <Reveal className="text-center mt-8">
              <Link
                href="/pakete"
                className="text-sm text-white/35 hover:text-white/65 transition-colors duration-200"
              >
                Alle Details und Vergleich ansehen →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Vertrauen ────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: "🔒", title: "Sichere Zahlung", text: "Stripe, PayPal, Klarna, SEPA, Überweisung oder Bar — du wählst." },
                { icon: "📞", title: "Persönlicher Support", text: "WhatsApp, Anruf, E-Mail oder Ticket — immer erreichbar." },
                { icon: "📊", title: "Transparente Abrechnung", text: "Alle Rechnungen und Zahlungen siehst du direkt im Portal." },
                { icon: "🔄", title: "Modulare Erweiterung", text: "Buchung, Shop, SEO — alles jederzeit ergänzbar." },
              ].map((t, i) => (
                <Reveal key={t.title} delay={i * 0.06}>
                  <TiltCard className={CARD + " flex gap-4"}>
                    <span className="text-2xl">{t.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{t.title}</h3>
                      <p className="text-sm text-white/50">{t.text}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section id="faq" className="py-28 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 sm:px-10">
            <Reveal className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Häufige Fragen</h2>
            </Reveal>
            <div className="space-y-3">
              {[
                { q: "Wie schnell ist meine Website fertig?", a: "Je nach Paket: Starter 5–7 Werktage, Business 10–14, Pro 21–28. Du siehst den Fortschritt live im Kundenportal." },
                { q: "Was brauche ich zum Starten?", a: "Nichts außer deiner E-Mail-Adresse. Logo, Texte und Bilder kannst du direkt im Portal hochladen." },
                { q: "Kann ich das Paket später wechseln?", a: "Ja. Upgrades sind jederzeit möglich. Der Preisunterschied wird fair berechnet." },
                { q: "Wie funktioniert die 50/50-Zahlung?", a: "50% zahlst du bei der Bestellung, 50% nach Fertigstellung und Abnahme — klar und fair." },
                { q: "Was kostet das Hosting nach dem ersten Jahr?", a: "Je nach Paket 19, 29 oder 49 €/Monat — monatlich kündbar, immer transparent." },
              ].map((f, i) => (
                <Reveal key={f.q} delay={i * 0.04}>
                  <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                    <summary className="font-medium text-white cursor-pointer flex items-center justify-between list-none">
                      {f.q}
                      <ChevronDown className="w-4 h-4 text-white/40 shrink-0 group-open:rotate-180 transition-transform duration-300" />
                    </summary>
                    <p className="text-sm text-white/55 mt-3 leading-relaxed">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Kontakt CTA ──────────────────────────────────────────── */}
        <section id="kontakt" className="py-28 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Fragen? Ich helfe dir gerne.
              </h2>
              <p className="text-white/45 mb-10">Kostenlose Beratung — unverbindlich und persönlich.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://wa.me/491234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#22c35e] active:scale-[0.97] transition-all duration-250"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href="tel:+491234567890"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm font-semibold hover:border-white/30 hover:text-white transition-all duration-250"
                >
                  <Phone className="w-4 h-4" /> Anrufen
                </a>
                <a
                  href="mailto:hallo@webagentur.de"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm font-semibold hover:border-white/30 hover:text-white transition-all duration-250"
                >
                  <Mail className="w-4 h-4" /> E-Mail
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <footer className="border-t border-white/[0.06] py-12">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="grid sm:grid-cols-4 gap-8 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
                    <span className="text-[#07070d] text-xs font-bold">W</span>
                  </div>
                  <span className="font-semibold text-white">WebAgentur</span>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">
                  Professionelle Websites für lokale Unternehmen in Deutschland.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm text-white/70 mb-3">Leistungen</p>
                <ul className="space-y-2 text-sm text-white/35">
                  <li><Link href="/pakete" className="hover:text-white/70 transition-colors">Pakete & Preise</Link></li>
                  <li><Link href="/leistungen" className="hover:text-white/70 transition-colors">Alle Leistungen</Link></li>
                  <li><Link href="/#ablauf" className="hover:text-white/70 transition-colors">Ablauf</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm text-white/70 mb-3">Konto</p>
                <ul className="space-y-2 text-sm text-white/35">
                  <li><Link href="/login" className="hover:text-white/70 transition-colors">Anmelden</Link></li>
                  <li><Link href="/portal" className="hover:text-white/70 transition-colors">Kundenportal</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm text-white/70 mb-3">Rechtliches</p>
                <ul className="space-y-2 text-sm text-white/35">
                  <li><Link href="/impressum" className="hover:text-white/70 transition-colors">Impressum</Link></li>
                  <li><Link href="/datenschutz" className="hover:text-white/70 transition-colors">Datenschutz</Link></li>
                  <li><Link href="/agb" className="hover:text-white/70 transition-colors">AGB</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/[0.06] pt-6 text-xs text-white/20">
              © {new Date().getFullYear()} WebAgentur · Alle Rechte vorbehalten
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
