import { PublicNavbar } from "@/components/layout/PublicNavbar";

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="container-narrow py-16">
        <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <div className="space-y-6 text-sm text-muted-foreground">
          <p className="text-xs border border-border rounded-lg p-3 bg-amber-50 text-amber-800">
            ⚠️ Dies sind Platzhalter-AGB. Bitte durch einen Rechtsanwalt prüfen und auf dein Unternehmen anpassen lassen.
          </p>
          {[
            { title: "§ 1 Geltungsbereich", content: "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen [Dein Name/Firma] und dem Kunden. Abweichende Bedingungen des Auftraggebers finden keine Anwendung." },
            { title: "§ 2 Leistungsgegenstand", content: "Der Auftragnehmer erbringt Webdesign- und Webentwicklungsleistungen gemäß der gewählten Pakete. Der genaue Leistungsumfang ergibt sich aus der Leistungsbeschreibung zum jeweiligen Paket." },
            { title: "§ 3 Vertragsschluss", content: "Der Vertrag kommt durch die Bestellung des Kunden über das Online-Bestellsystem und die anschließende Zahlungsbestätigung zustande." },
            { title: "§ 4 Preise und Zahlung", content: "Alle Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer. Rechnungen sind innerhalb von 14 Tagen nach Erhalt zu begleichen." },
            { title: "§ 5 Mitwirkungspflichten", content: "Der Auftraggeber stellt alle notwendigen Inhalte (Texte, Bilder, Logo etc.) rechtzeitig zur Verfügung. Verzögerungen durch fehlende Inhalte gehen nicht zu Lasten des Auftragnehmers." },
            { title: "§ 6 Gewährleistung und Haftung", content: "Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt." },
            { title: "§ 7 Urheberrecht", content: "Mit vollständiger Zahlung erhält der Auftraggeber ein einfaches Nutzungsrecht an der erstellten Website. Das Urheberrecht verbleibt beim Auftragnehmer." },
            { title: "§ 8 Datenschutz", content: "Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung und der DSGVO." },
            { title: "§ 9 Schlussbestimmungen", content: "Es gilt deutsches Recht. Gerichtsstand ist [Dein Ort], soweit gesetzlich zulässig." },
          ].map((s) => (
            <section key={s.title}>
              <h2 className="text-foreground font-semibold text-base mb-2">{s.title}</h2>
              <p>{s.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
