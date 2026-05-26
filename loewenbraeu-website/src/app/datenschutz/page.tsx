export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>

        <div className="font-sans text-[0.88rem] text-muted leading-loose space-y-8">

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              2. Verantwortlicher
            </h2>
            <p className="text-cream/80">
              Münchener Löwenbräu<br />
              Danko Bradaric<br />
              Mittelstraße 144<br />
              32657 Lemgo<br />
              Telefon: 05261 4267
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              3. Datenerfassung auf dieser Website
            </h2>
            <p className="mb-4">
              <strong className="text-cream/80">Reservierungsformular:</strong> Wenn Sie über das
              Reservierungsformular eine Tischreservierung anfragen, werden die eingegebenen Daten
              (Name, Telefonnummer, Datum, Uhrzeit, Personenzahl, optionale Anmerkungen) ausschließlich
              zur Bearbeitung Ihrer Reservierungsanfrage verwendet. Diese Daten werden nicht an Dritte
              weitergegeben und nicht länger gespeichert als für die Bearbeitung notwendig.
            </p>
            <p>
              <strong className="text-cream/80">Server-Log-Dateien:</strong> Der Hosting-Anbieter
              dieser Website erhebt automatisch Informationen in sogenannten Server-Log-Dateien
              (IP-Adresse, Datum und Uhrzeit des Abrufs, Name der abgerufenen Datei). Diese Daten
              werden nicht mit anderen Datenquellen zusammengeführt.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              4. Cookies und Tracking
            </h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies, keine Analyse-Tools (wie Google Analytics)
              und keine sozialen Netzwerk-Plugins. Es werden ausschließlich technisch notwendige
              Funktionen verwendet.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              5. Hosting
            </h2>
            <p>
              Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco,
              California 94104, USA gehostet. Wenn Sie diese Website besuchen, werden Ihre
              personenbezogenen Daten auf den Servern von Vercel verarbeitet. Weitere Informationen
              finden Sie in der Datenschutzerklärung von Vercel.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              6. Ihre Rechte
            </h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
              Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter
              der im Impressum angegebenen Adresse an uns wenden.
            </p>
            <p className="mt-4">
              Außerdem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              Zuständige Aufsichtsbehörde in NRW:<br />
              <span className="text-cream/70">
                Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />
                Kavalleriestraße 2–4, 40213 Düsseldorf
              </span>
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              7. Google Maps
            </h2>
            <p>
              Diese Website enthält einen Link zu Google Maps (maps.google.com). Wenn Sie auf diesen
              Link klicken, verlassen Sie diese Website und begeben sich zu Google. Es gelten dann
              die Datenschutzbestimmungen von Google. Wir haben keinen Einfluss auf die
              Datenverarbeitung durch Google.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
