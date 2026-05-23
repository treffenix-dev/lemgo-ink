import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { ZAHLUNGSMODELLE, ZAHLUNGSARTEN } from "@/lib/data/pakete";

export default function ZahlungsbedingungenPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="container-narrow py-16">
        <h1 className="text-3xl font-bold mb-8">Zahlungsbedingungen</h1>
        <div className="space-y-8 text-sm text-muted-foreground">
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-4">Zahlungsmodelle</h2>
            <div className="space-y-3">
              {ZAHLUNGSMODELLE.map((m) => (
                <div key={m.id} className="rounded-lg border border-border p-4">
                  <p className="font-semibold text-foreground mb-1">{m.label}</p>
                  <p>{m.beschreibung}</p>
                  {"aufpreis" in m && m.aufpreis > 0 && (
                    <p className="text-amber-600 text-xs mt-1">Aufpreis: +{m.aufpreis}%</p>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-4">Akzeptierte Zahlungsarten</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ZAHLUNGSARTEN.map((a) => (
                <div key={a.id} className="flex items-center gap-2 rounded-lg border border-border p-3">
                  <span className="text-xl">{a.icon}</span>
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-4">Zahlungsfristen</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Einmalzahlungen: Sofort bei Bestellung</li>
              <li>50/50: 50% bei Bestellung, 50% nach Fertigstellung</li>
              <li>Raten: 3 Monatsraten, beginnend mit Bestellung</li>
              <li>Bar / Überweisung / Vor Ort: Fälligkeit 14 Tage nach Rechnungsdatum</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
