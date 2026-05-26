export default function Impressum() {
  return (
    <main className="min-h-screen bg-bg px-[5%] py-28">
      <div className="max-w-2xl mx-auto">
        <a
          href="/"
          className="font-sans text-[0.68rem] tracking-[0.22em] uppercase text-muted hover:text-cream transition-colors mb-12 inline-block"
        >
          ← Zurück zur Website
        </a>

        <h1 className="font-display font-light text-[clamp(2rem,5vw,3.5rem)] leading-[1.0] text-cream mb-12">
          Impressum
        </h1>

        <div className="font-sans text-[0.88rem] text-muted leading-loose space-y-8">

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="text-cream/80">
              Münchener Löwenbräu<br />
              Danko Bradaric<br />
              Mittelstraße 144<br />
              32657 Lemgo<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              Kontakt
            </h2>
            <p className="text-cream/80">
              Telefon: 05261 4267
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              Umsatzsteuer
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
              <span className="text-cream/60 italic">Steuernummer wird nachgetragen</span>
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              EU-Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
              Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              Urheberrecht
            </h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
