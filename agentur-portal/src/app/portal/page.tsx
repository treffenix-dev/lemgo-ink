import { TopBar } from "@/components/layout/TopBar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  MessageSquare, FileText, Upload,
  AlertCircle, CheckCircle2, Clock, ArrowRight,
} from "lucide-react";

const mockProject = {
  name: "Restaurant Da Vinci — Website",
  paket: "Business",
  status: "daten_ausfuellen" as const,
  fehlend: ["Logo hochladen", "Speisekarte fehlt", "Öffnungszeiten eintragen"],
  naechsteSchritte: "Bitte lade dein Logo und die Speisekarte hoch, damit wir loslegen können.",
};

const mockTasks = [
  { id: "1", titel: "Logo hochladen", status: "offen" as const, pflicht: true },
  { id: "2", titel: "Bilder hochladen (min. 5)", status: "offen" as const, pflicht: true },
  { id: "3", titel: "Firmendaten prüfen", status: "erledigt" as const, pflicht: true },
  { id: "4", titel: "Social Media Links ergänzen", status: "offen" as const, pflicht: false },
];

const mockTickets = [
  { id: "1", titel: "Logo kann nicht hochgeladen werden", status: "in_bearbeitung" as const, erstellt: "Heute, 10:23" },
  { id: "2", titel: "Frage zu Öffnungszeiten", status: "geloest" as const, erstellt: "Gestern" },
];

const mockInvoices = [
  { id: "1", nummer: "RE-2025-0001", betrag: "1.499,00 €", status: "offen" as const, faellig: "30.06.2025" },
];

export default function PortalDashboard() {
  const offeneAufgaben = mockTasks.filter((t) => t.status !== "erledigt").length;
  const erledigteAufgaben = mockTasks.filter((t) => t.status === "erledigt").length;

  return (
    <div>
      <TopBar title="Mein Dashboard" />

      <div className="p-6 space-y-6 max-w-5xl">

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-semibold text-lg">{mockProject.name}</h2>
                <StatusBadge type="project" status={mockProject.status} />
              </div>
              <p className="text-sm text-muted-foreground">{mockProject.paket}-Paket</p>
            </div>
            <Button size="sm" asChild>
              <Link href="/portal/projekt">Projekt ansehen <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>

          {mockProject.fehlend.length > 0 && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800 mb-1">
                    {mockProject.fehlend.length} Dinge fehlen noch
                  </p>
                  <ul className="space-y-0.5">
                    {mockProject.fehlend.map((f) => (
                      <li key={f} className="text-xs text-amber-700">• {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-4 bg-muted rounded-lg p-3">
            <strong>Nächster Schritt:</strong> {mockProject.naechsteSchritte}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Offene Aufgaben" value={offeneAufgaben} icon={Clock} color="amber" />
          <StatCard label="Erledigt" value={erledigteAufgaben} icon={CheckCircle2} color="green" />
          <StatCard label="Offene Tickets" value={mockTickets.filter(t => t.status !== "geloest").length} icon={MessageSquare} color="blue" />
          <StatCard label="Offene Rechnungen" value={mockInvoices.filter(i => i.status === "offen").length} icon={FileText} color="red" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Datei hochladen", href: "/portal/dateien", icon: Upload, desc: "Logo, Bilder, Texte" },
            { label: "Ticket erstellen", href: "/portal/tickets", icon: MessageSquare, desc: "Frage oder Problem" },
            { label: "Rechnung ansehen", href: "/portal/rechnungen", icon: FileText, desc: "Zahlungsstatus" },
            { label: "Support", href: "/portal/support", icon: MessageSquare, desc: "WhatsApp, Anruf, Mail" },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="rounded-xl border border-border bg-card p-5 hover:border-foreground/30 hover:shadow-sm transition-all group"
            >
              <a.icon className="w-5 h-5 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              <p className="font-medium text-sm">{a.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Meine Aufgaben</h3>
              <Link href="/portal/aufgaben" className="text-xs text-muted-foreground hover:text-foreground">
                Alle ansehen →
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {mockTasks.map((t) => (
                <li key={t.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                    t.status === "erledigt" ? "bg-green-600 border-green-600" : "border-border"
                  }`}>
                    {t.status === "erledigt" && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm flex-1 ${t.status === "erledigt" ? "line-through text-muted-foreground" : ""}`}>
                    {t.titel}
                  </span>
                  {t.pflicht && t.status !== "erledigt" && (
                    <span className="text-xs text-red-500 font-medium">Pflicht</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Letzte Tickets</h3>
              <Link href="/portal/tickets" className="text-xs text-muted-foreground hover:text-foreground">
                Alle ansehen →
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {mockTickets.map((t) => (
                <li key={t.id} className="px-5 py-3.5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{t.titel}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.erstellt}</p>
                  </div>
                  <StatusBadge type="ticket" status={t.status} />
                </li>
              ))}
            </ul>
            <div className="p-5 pt-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/portal/tickets?neu=true">+ Neues Ticket</Link>
              </Button>
            </div>
          </div>
        </div>

        {mockInvoices.length > 0 && (
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Rechnungen</h3>
              <Link href="/portal/rechnungen" className="text-xs text-muted-foreground hover:text-foreground">Alle ansehen →</Link>
            </div>
            <div className="divide-y divide-border">
              {mockInvoices.map((inv) => (
                <div key={inv.id} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{inv.nummer}</p>
                    <p className="text-xs text-muted-foreground">Fällig: {inv.faellig}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{inv.betrag}</span>
                    <StatusBadge type="invoice" status={inv.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
