import { TopBar } from "@/components/layout/TopBar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import {
  Euro, Users, FolderKanban, MessageSquare, FileText,
  TrendingUp, Clock, Plus, ArrowRight,
} from "lucide-react";

const stats = {
  umsatzHeute: 1499,
  umsatzMonat: 8743,
  offeneRechnungen: 3,
  offeneTickets: 5,
  neueLeads: 2,
  aktiveKunden: 12,
  laufendeProjekte: 7,
};

const recentTickets = [
  { id: "1", kunde: "Restaurant Da Vinci", titel: "Logo Upload Problem", status: "in_bearbeitung" as const, prioritaet: "hoch" },
  { id: "2", kunde: "Parfümerie Müller", titel: "Änderungswunsch Startseite", status: "offen" as const, prioritaet: "mittel" },
  { id: "3", kunde: "Friseur Schneider", titel: "Rechnung unklar", status: "warten_owner" as const, prioritaet: "niedrig" },
];

const recentCustomers = [
  { id: "1", firma: "Restaurant Da Vinci", paket: "Business", status: "daten_ausfuellen" as const, letztAktiv: "Heute, 14:23" },
  { id: "2", firma: "Parfümerie Müller", paket: "Pro", status: "in_arbeit" as const, letztAktiv: "Heute, 11:05" },
  { id: "3", firma: "Friseur Schneider", paket: "Starter", status: "review" as const, letztAktiv: "Gestern" },
];

const recentLeads = [
  { id: "1", name: "Max Mustermann", firma: "Café Central", interesse: "Business-Paket", status: "neu" as const },
  { id: "2", name: "Anna Schmidt", firma: "Beauty Studio AS", interesse: "Starter-Paket", status: "kontaktiert" as const },
];

const offeneRechnungen = [
  { id: "1", kunde: "Restaurant Da Vinci", nummer: "RE-2025-0001", gesamt: 1499, faellig: "2025-06-30", status: "offen" as const },
  { id: "2", kunde: "Parfümerie Müller", nummer: "RE-2025-0002", gesamt: 2499, faellig: "2025-07-15", status: "offen" as const },
];

const naechsteAufgaben = [
  { id: "1", titel: "Logo von Da Vinci überarbeiten", kunde: "Restaurant Da Vinci", faellig: "Heute" },
  { id: "2", titel: "Angebot für Schmidt erstellen", kunde: "Neukunde", faellig: "Morgen" },
  { id: "3", titel: "Review: Parfümerie Seite", kunde: "Parfümerie Müller", faellig: "Fr, 27.06." },
];

export default function OwnerDashboard() {
  return (
    <div>
      <TopBar
        title="Command Center"
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href="/owner/leads?neu=true"><Plus className="w-4 h-4" /> Lead</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/owner/rechnungen?neu=true"><Plus className="w-4 h-4" /> Rechnung</Link>
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6 max-w-7xl">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <StatCard label="Umsatz heute" value={formatCurrency(stats.umsatzHeute)} icon={Euro} color="green" />
          <StatCard label="Umsatz Monat" value={formatCurrency(stats.umsatzMonat)} icon={TrendingUp} color="green" trend="up" trendValue="+12% vs. Vormonat" />
          <StatCard label="Off. Rechnungen" value={stats.offeneRechnungen} icon={FileText} color="amber" />
          <StatCard label="Off. Tickets" value={stats.offeneTickets} icon={MessageSquare} color="red" />
          <StatCard label="Neue Leads" value={stats.neueLeads} icon={Users} color="blue" />
          <StatCard label="Aktive Kunden" value={stats.aktiveKunden} icon={Users} color="default" />
          <StatCard label="Lauf. Projekte" value={stats.laufendeProjekte} icon={FolderKanban} color="default" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Offene Tickets</h3>
              <Link href="/owner/tickets" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Alle <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentTickets.map((t) => (
                <div key={t.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium leading-tight">{t.titel}</p>
                    <StatusBadge type="ticket" status={t.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{t.kunde}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Aktive Kunden</h3>
              <Link href="/owner/kunden" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Alle <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentCustomers.map((c) => (
                <div key={c.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium">{c.firma}</p>
                    <StatusBadge type="project" status={c.status} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{c.paket}</span>
                    <span>·</span>
                    <span>{c.letztAktiv}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Aufgaben</h3>
              <Link href="/owner/aufgaben" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Alle <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {naechsteAufgaben.map((a) => (
                <div key={a.id} className="px-5 py-3.5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded border-2 border-border mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{a.titel}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{a.faellig}</span>
                      <span>·</span>
                      <span>{a.kunde}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Offene Rechnungen</h3>
              <Link href="/owner/rechnungen" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Alle <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {offeneRechnungen.map((r) => (
                <div key={r.id} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{r.nummer}</p>
                    <p className="text-xs text-muted-foreground">{r.kunde} · Fällig {formatDate(r.faellig)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{formatCurrency(r.gesamt)}</span>
                    <StatusBadge type="invoice" status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Neue Leads</h3>
              <Link href="/owner/leads" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Alle <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentLeads.map((l) => (
                <div key={l.id} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.firma} · {l.interesse}</p>
                  </div>
                  <StatusBadge type="lead" status={l.status} />
                </div>
              ))}
            </div>
            <div className="p-5 pt-3 border-t border-border">
              <Button variant="outline" size="sm" asChild>
                <Link href="/owner/leads?neu=true"><Plus className="w-4 h-4" /> Lead hinzufügen</Link>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Schnellzugriff</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { label: "Neue Rechnung", href: "/owner/rechnungen?neu=true", icon: "📄" },
              { label: "Neues Angebot", href: "/owner/angebote?neu=true", icon: "📋" },
              { label: "Neuer Lead", href: "/owner/leads?neu=true", icon: "👤" },
              { label: "Aufgabe erstellen", href: "/owner/aufgaben?neu=true", icon: "✅" },
              { label: "Ausgabe erfassen", href: "/owner/ausgaben?neu=true", icon: "💶" },
              { label: "Timer starten", href: "/owner/timer", icon: "⏱️" },
            ].map((q) => (
              <Link
                key={q.label}
                href={q.href}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center hover:border-foreground/30 hover:shadow-sm transition-all"
              >
                <span className="text-2xl">{q.icon}</span>
                <span className="text-xs font-medium leading-tight">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
