import Link from "next/link";

export const metadata = {
  title: "Datenschutz — Lemgo INK",
};

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-[#080808] text-cream pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] uppercase text-white/30 hover:text-white transition-colors mb-12"
        >
          ← Zurück zur Startseite
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-white/30" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/35">Rechtliches</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white/90">Datenschutz&shy;erklärung</h1>
        </div>

        <div className="space-y-8 font-sans text-sm text-cream/50 leading-[1.9]">
          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">1. Datenschutz auf einen Blick</h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">2. Datenerfassung auf unserer Website</h2>
            <p className="mb-3">
              <strong className="text-white/60">Wer ist verantwortlich für die Datenerfassung?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber: Natascha Wehr, Papenstraße 56, 32657 Lemgo.
            </p>
            <p className="mb-3">
              <strong className="text-white/60">Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden erhoben, indem Sie uns diese mitteilen — z.B. durch Eingabe in das Kontaktformular. Andere Daten werden automatisch beim Besuch der Website durch IT-Systeme erfasst (z.B. Internetbrowser, Betriebssystem).
            </p>
            <p>
              <strong className="text-white/60">Wofür nutzen wir Ihre Daten?</strong><br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">3. Kontaktformular / WhatsApp</h2>
            <p>
              Wenn Sie uns über das Formular kontaktieren, werden Ihre Angaben aus dem Formular inklusive der von Ihnen angegebenen Kontaktdaten direkt als WhatsApp-Nachricht übermittelt. Dabei gelten die Datenschutzbestimmungen von WhatsApp (Meta Platforms). Die Verarbeitung erfolgt ausschließlich zur Bearbeitung Ihrer Anfrage.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">4. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA gehostet. Details entnehmen Sie der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors underline underline-offset-2">vercel.com/legal/privacy-policy</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">5. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">6. Cookies</h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies. Es werden keine Analyse- oder Marketingdienste Dritter eingesetzt.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] uppercase text-white/25 hover:text-white transition-colors"
          >
            ← Zurück zu Lemgo INK
          </Link>
        </div>
      </div>
    </main>
  );
}
