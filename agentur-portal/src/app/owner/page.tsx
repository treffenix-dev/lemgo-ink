"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { loadInvoices, invoiceTotal } from "@/lib/invoice";
import {
  Euro, Users, FileText,
  Plus, ArrowRight, Zap, Target,
  Timer, FileEdit, CheckSquare,
} from "lucide-react";

const mockProjects = [
  { id: "1", firma: "Restaurant Da Vinci",  paket: "Business", status: "review" as const,      fortschritt: 80 },
  { id: "2", firma: "Parfümerie Müller",    paket: "Pro",       status: "in_arbeit" as const,   fortschritt: 55 },
  { id: "3", firma: "Friseur Schneider",    paket: "Starter",   status: "daten_ausfuellen" as const, fortschritt: 20 },
  { id: "4", firma: "Bäckerei Wagner",      paket: "Business",  status: "fertig" as const,           fortschritt: 100 },
];

const mockActivity = [
  { zeit: "14:23", text: "Ticket #12 erstellt", sub: "Restaurant Da Vinci", color: "amber" },
  { zeit: "12:05", text: "Neuer Lead hinzugefügt", sub: "Café Central", color: "blue" },
  { zeit: "10:30", text: "Rechnung RE-2026-0003 bezahlt", sub: "+1.499 €", color: "green" },
  { zeit: "09:15", text: "Projekt abgenommen", sub: "Bäckerei Wagner", color: "green" },
  { zeit: "Gestern", text: "Angebot verschickt", sub: "Beauty Studio AS", color: "purple" },
];

const ACTIVITY_DOT: Record<string, string> = {
  amber:  "bg-amber-400",
  blue:   "bg-blue-400",
  green:  "bg-emerald-400",
  purple: "bg-purple-400",
};

const MONTH_BARS = [
  { m: "Jan", v: 40 }, { m: "Feb", v: 60 }, { m: "Mär", v: 35 },
  { m: "Apr", v: 75 }, { m: "Mai", v: 55 }, { m: "Jun", v: 87 },
];

function fmt(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export default function OwnerDashboard() {
  const [invoices, setInvoices] = useState<ReturnType<typeof loadInvoices>>([]);

  useEffect(() => {
    setInvoices(loadInvoices());
  }, []);

  const offeneRechnungen = invoices.filter((r) => r.status === "offen" || r.status === "ueberfaellig");
  const offeneSumme = offeneRechnungen.reduce((s, r) => s + invoiceTotal(r.positionen), 0);
  const monatsSumme = invoices
    .filter((r) => r.status === "bezahlt")
    .reduce((s, r) => s + invoiceTotal(r.positionen), 0);

  return (
    <div>
      <TopBar
        title="Kommandozentrale"
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href="/owner/leads"><Plus className="w-4 h-4" /> Lead</Link>
            </Button>
            <Button size="sm" variant="primary" asChild>
              <Link href="/owner/rechnungen/neu"><Plus className="w-4 h-4" /> Rechnung</Link>
            </Button>
          </div>
        }
      />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-7xl">

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Umsatz (Bezahlt)</p>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Euro className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <p className="text-2xl font-bold">{monatsSumme > 0 ? fmt(monatsSumme) : "–"}</p>
            <p className="text-xs text-muted-foreground mt-1">{invoices.filter(r => r.status === "bezahlt").length} bezahlte Rechnungen</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Offene Forderungen</p>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <p className="text-2xl font-bold">{offeneRechnungen.length > 0 ? fmt(offeneSumme) : "–"}</p>
            <p className="text-xs text-muted-foreground mt-1">{offeneRechnungen.length} {offeneRechnungen.length === 1 ? "Rechnung" : "Rechnungen"} ausstehend</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Aktive Kunden</p>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground mt-1">7 laufende Projekte</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Neue Leads</p>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground mt-1">Diese Woche</p>
          </div>
        </div>

        {/* Revenue Chart + Activity */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Mini Bar Chart */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold">Umsatz-Verlauf</h3>
                <p className="text-xs text-muted-foreground">Letzte 6 Monate (Mock-Daten)</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs text-muted-foreground">Einnahmen</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-28">
              {MONTH_BARS.map((b) => (
                <div key={b.m} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-md bg-blue-500/20 hover:bg-blue-500/40 transition-colors relative group"
                    style={{ height: `${b.v}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t-md bg-blue-400"
                      style={{ height: "3px" }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{b.m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Aktivität</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              {mockActivity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${ACTIVITY_DOT[a.color]}`} />
                    {i < mockActivity.length - 1 && <div className="w-px flex-1 bg-border min-h-3" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-xs font-medium leading-tight">{a.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.sub} · {a.zeit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects + Open Invoices */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Active Projects */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Aktive Projekte</h3>
              <Link href="/owner/kunden" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Alle <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {mockProjects.map((p) => (
                <div key={p.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{p.firma}</p>
                      <p className="text-xs text-muted-foreground">{p.paket}</p>
                    </div>
                    <StatusBadge type="project" status={p.status} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-border">
                      <div
                        className="h-1 rounded-full bg-blue-400 transition-all"
                        style={{ width: `${p.fortschritt}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{p.fortschritt}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Invoices from localStorage */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold">Offene Rechnungen</h3>
              <Link href="/owner/rechnungen" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Alle <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {offeneRechnungen.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-xs text-muted-foreground">Keine offenen Rechnungen</p>
                <Button variant="outline" size="sm" className="mt-3" asChild>
                  <Link href="/owner/rechnungen/neu"><Plus className="w-3.5 h-3.5" /> Neue Rechnung</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {offeneRechnungen.slice(0, 5).map((r) => {
                  const total = invoiceTotal(r.positionen);
                  const faellig = (() => {
                    const d = new Date(r.datum);
                    d.setDate(d.getDate() + r.zahlungszielTage);
                    return d.toLocaleDateString("de-DE");
                  })();
                  return (
                    <div key={r.id} className="px-5 py-3.5 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium font-mono">{r.nummer}</p>
                        <p className="text-xs text-muted-foreground">{r.empfaengerFirma || "Kein Empfänger"} · Fällig {faellig}</p>
                      </div>
                      <p className="font-semibold text-amber-400">{fmt(total)}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Schnellzugriff</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: "Rechnung",  href: "/owner/rechnungen/neu", icon: FileText,    color: "text-blue-400",   bg: "bg-blue-500/10" },
              { label: "Angebot",   href: "/owner/angebote",       icon: FileEdit,    color: "text-purple-400", bg: "bg-purple-500/10" },
              { label: "Lead",      href: "/owner/leads",          icon: Users,       color: "text-emerald-400",bg: "bg-emerald-500/10" },
              { label: "Aufgabe",   href: "/owner/aufgaben",       icon: CheckSquare, color: "text-amber-400",  bg: "bg-amber-500/10" },
              { label: "Ausgabe",   href: "/owner/ausgaben",       icon: Euro,        color: "text-red-400",    bg: "bg-red-500/10" },
              { label: "Timer",     href: "/owner/timer",          icon: Timer,       color: "text-cyan-400",   bg: "bg-cyan-500/10" },
            ].map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.label}
                  href={q.href}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center hover:border-blue-500/40 hover:bg-card/80 transition-all group"
                >
                  <div className={`w-9 h-9 rounded-lg ${q.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-4 h-4 ${q.color}`} />
                  </div>
                  <span className="text-xs font-medium">{q.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
