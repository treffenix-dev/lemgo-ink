import { PublicNavbar } from "@/components/layout/PublicNavbar";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="container-narrow py-16">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Angaben gemäß § 5 TMG</h2>
            <p>[Dein Name / Firmenname]<br />[Straße und Hausnummer]<br />[PLZ] [Ort]<br />Deutschland</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Kontakt</h2>
            <p>Telefon: [+49 XXXX XXXXXX]<br />E-Mail: [hallo@webagentur.de]</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [DE XXXXXXXXX]</p>
          </section>
          <p className="text-xs border border-border rounded-lg p-3 bg-muted/30">
            ⚠️ Platzhalter — Bitte durch echte Angaben ersetzen und rechtlich prüfen lassen.
          </p>
        </div>
      </div>
    </div>
  );
}
