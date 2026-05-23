import { PublicNavbar } from "@/components/layout/PublicNavbar";

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="container-narrow py-16">
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>
        <div className="space-y-6 text-sm text-muted-foreground">
          <p className="text-xs border border-border rounded-lg p-3 bg-amber-50 text-amber-800">
            ⚠️ Platzhalter — muss an die tatsächlich verwendeten Dienste angepasst werden.
          </p>
          {[
            { title: "1. Verantwortliche Stelle", content: "[Dein Name / Firma], [Adresse]. E-Mail: [hallo@webagentur.de]" },
            { title: "2. Erhobene Daten", content: "Wir erheben: Name, Firma, E-Mail, Telefon, Adresse, Zahlungsdaten (Stripe), Projektdaten und Kommunikationsverläufe. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO." },
            { title: "3. Verwendungszweck", content: "Die Daten werden verwendet für Vertragsabwicklung, Kommunikation, Rechnungsstellung und Leistungserbringung." },
            { title: "4. Weitergabe an Dritte", content: "Daten werden nur weitergegeben, soweit nötig (Stripe, Supabase). Diese Dienste sind DSGVO-konform." },
            { title: "5. Speicherdauer", content: "Daten werden so lange gespeichert wie nötig oder gesetzlich vorgeschrieben (i.d.R. 10 Jahre)." },
            { title: "6. Ihre Rechte", content: "Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Kontakt: [hallo@webagentur.de]" },
            { title: "7. Cookies", content: "Nur notwendige Cookies für Authentifizierung. Keine Marketing-Cookies." },
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
