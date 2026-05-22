import Link from "next/link";

export const metadata = {
  title: "Impressum — Lemgo INK",
};

export default function Impressum() {
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
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white/90">Impressum</h1>
        </div>

        <div className="space-y-8 font-sans text-sm text-cream/50 leading-[1.9]">
          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">Angaben gemäß § 5 TMG</h2>
            <p>Natascha Wehr<br />Lemgo INK<br />Papenstraße 56<br />32657 Lemgo</p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">Kontakt</h2>
            <p>
              Telefon: <a href="tel:+4915257668403" className="text-white/60 hover:text-white transition-colors">+49 1525 7668403</a><br />
              Instagram: <a href="https://instagram.com/tattooartist_nataschalee" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">@tattooartist_nataschalee</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              Kleinunternehmer gemäß § 19 UStG — keine Umsatzsteuer ausweisbar.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)</h2>
            <p>Natascha Wehr<br />Papenstraße 56<br />32657 Lemgo</p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">Haftungsausschluss</h2>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-white/70 mb-3 tracking-wide">Urheberrecht</h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors.
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
