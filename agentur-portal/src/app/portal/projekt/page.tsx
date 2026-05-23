import { TopBar } from "@/components/layout/TopBar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Clock, AlertCircle, MessageSquare } from "lucide-react";

const mockProjekt = {
  name: "Restaurant Da Vinci — Website",
  paket: "Business",
  status: "daten_ausfuellen" as const,
  startDatum: "01.06.2025",
  geplantesFertigstellung: "15.06.2025",
  fortschritt: 30,
};

const milestones = [
  { titel: "Bestellung eingegangen", datum: "01.06.2025", done: true },
  { titel: "Onboarding & Dateneingabe", datum: "01.–05.06.2025", done: false, aktiv: true },
  { titel: "Design & Entwicklung", datum: "06.–12.06.2025", done: false },
  { titel: "Review & Feedback", datum: "13.06.2025", done: false },
  { titel: "Launch", datum: "15.06.2025", done: false },
];

export default function ProjektPage() {
  return (
    <div>
      <TopBar
        title="Mein Projekt"
        actions={
          <Button size="sm" variant="outline" asChild>
            <Link href="/portal/tickets?neu=true">
              <MessageSquare className="w-4 h-4" /> Feedback geben
            </Link>
          </Button>
        }
      />
      <div className="p-6 max-w-3xl space-y-6">
        {/* Projektkarte */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-semibold text-lg">{mockProjekt.name}</h2>
              <p className="text-sm text-muted-foreground">{mockProjekt.paket}-Paket</p>
            </div>
            <StatusBadge type="project" status={mockProjekt.status} />
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Fortschritt</span>
            <span className="font-medium">{mockProjekt.fortschritt}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-500"
              style={{ width: `${mockProjekt.fortschritt}%` }}
            />
          </div>
          <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
            <span><Clock className="w-3.5 h-3.5 inline mr-1" />Start: {mockProjekt.startDatum}</span>
            <span><CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />Fertig: {mockProjekt.geplantesFertigstellung}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-5">Projektablauf</h3>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  m.done ? "bg-green-600" : m.aktiv ? "bg-foreground" : "bg-muted border-2 border-border"
                }`}>
                  {m.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                  {m.aktiv && <AlertCircle className="w-4 h-4 text-background" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${!m.done && !m.aktiv ? "text-muted-foreground" : ""}`}>{m.titel}</p>
                  <p className="text-xs text-muted-foreground">{m.datum}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nächste Schritte */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">Dein nächster Schritt</p>
              <p className="text-sm text-amber-700">Bitte lade dein Logo und mindestens 5 Bilder hoch, damit wir mit dem Design starten können.</p>
              <Link href="/portal/aufgaben" className="inline-block mt-2 text-xs font-medium text-amber-800 underline">
                Aufgaben ansehen →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
