import { PublicNavbar } from "@/components/layout/PublicNavbar";

export default function WiderrufPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="container-narrow py-16">
        <h1 className="text-3xl font-bold mb-8">Widerrufsbelehrung</h1>
        <div className="space-y-6 text-sm text-muted-foreground">
          <p className="text-xs border border-border rounded-lg p-3 bg-amber-50 text-amber-800">
            ⚠️ Platzhalter — Rechtlich prüfen lassen.
          </p>
          <section>
            <h2 className="text-foreground font-semibold text-base mb-2">Widerrufsrecht</h2>
            <p>Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
            <p className="mt-2"><strong className="text-foreground">Wichtig:</strong> Bei digitalen Dienstleistungen erlischt das Widerrufsrecht bei vorzeitigem Beginn auf ausdrücklichen Wunsch.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-base mb-2">Ausübung des Widerrufsrechts</h2>
            <p>Per E-Mail an [hallo@webagentur.de] oder per Post.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-base mb-2">Kündigung von Abonnements</h2>
            <p>Monatliche Abonnements können jederzeit zum Ende des Abrechnungszeitraums gekündigt werden (7 Tage Vorlauf).</p>
          </section>
        </div>
      </div>
    </div>
  );
}
