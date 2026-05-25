import { TopBar } from "@/components/layout/TopBar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import {
  Euro, Users, FolderKanban, MessageSquare, FileText,
  TrendingUp, Clock, Plus, ArrowRight, Server, Globe,
  Wrench, ExternalLink, TrendingDown,
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

        {/* ── AGENTUR-RESSOURCEN ────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">Agentur-Ressourcen</h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Nur für dich sichtbar</span>
          </div>
          <p className="text-xs text-muted-foreground mb-5">Alle Anbieter & Tools die du als Web-Agentur brauchst — mit deinen Kosten und empfohlenen Verkaufspreisen.</p>

          {/* Hosting Anbieter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-semibold">Hosting-Anbieter</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  name: "All-Inkl.com",
                  typ: "Shared Hosting / Reseller",
                  du_zahlst: "4–8 €/Monat",
                  du_nimmst: "19–29 €/Monat",
                  marge: "~11–21 €",
                  highlight: true,
                  empfehlung: "Beste Wahl für den Start",
                  details: "Deutsches Unternehmen. Reseller-Pakete ab ~10€/Monat — mehrere Kunden auf einer Lizenz. SSL inklusive, tägliche Backups, sehr guter Support.",
                  url: "all-inkl.com",
                },
                {
                  name: "Hetzner",
                  typ: "VPS / Cloud Server",
                  du_zahlst: "4–8 €/Monat",
                  du_nimmst: "19–49 €/Monat",
                  marge: "~15–41 €",
                  highlight: false,
                  empfehlung: "Mehr Kontrolle, höhere Marge",
                  details: "Deutsches Rechenzentrum. VPS ab ~4€/Monat, du richtest deinen eigenen Server ein. Braucht etwas technisches Know-how (cPanel oder Plesk installieren).",
                  url: "hetzner.com",
                },
                {
                  name: "Netcup",
                  typ: "VPS / Webhosting",
                  du_zahlst: "3–6 €/Monat",
                  du_nimmst: "15–25 €/Monat",
                  marge: "~9–19 €",
                  highlight: false,
                  empfehlung: "Günstigste Option",
                  details: "Deutsches Unternehmen, günstiger als die meisten. Gut für Starter-Kunden. Webhosting-Pakete sehr preiswert, kann einzelne Pakete pro Kunde buchen.",
                  url: "netcup.de",
                },
              ].map((h) => (
                <div key={h.name} className={`rounded-xl border p-5 ${h.highlight ? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20" : "border-border bg-card"}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm">{h.name}</p>
                    {h.highlight && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full shrink-0">Empfohlen</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{h.typ}</p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground mb-0.5">Du zahlst</p>
                      <p className="text-xs font-bold text-red-600">{h.du_zahlst}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground mb-0.5">Du nimmst</p>
                      <p className="text-xs font-bold text-green-600">{h.du_nimmst}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground mb-0.5">Marge</p>
                      <p className="text-xs font-bold">{h.marge}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{h.details}</p>
                  <p className="text-xs text-blue-600 font-medium">→ {h.url}</p>
                  <p className="text-xs text-muted-foreground mt-1 italic">{h.empfehlung}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Domain-Anbieter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-purple-600" />
              <p className="text-sm font-semibold">Domain-Anbieter</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  name: "INWX",
                  du_zahlst: "~5–8 €/Jahr (.de)",
                  du_nimmst: "15–25 €/Jahr",
                  note: "Beliebtester Registrar unter Agenturen in DE. API verfügbar.",
                  url: "inwx.de",
                  highlight: true,
                },
                {
                  name: "Namecheap",
                  du_zahlst: "~1–3 €/Jahr (.de)",
                  du_nimmst: "10–20 €/Jahr",
                  note: "Sehr günstig, international. Kein DE-Sitz aber zuverlässig.",
                  url: "namecheap.com",
                  highlight: false,
                },
                {
                  name: "Porkbun",
                  du_zahlst: "~1–2 €/Jahr (.de)",
                  du_nimmst: "10–20 €/Jahr",
                  note: "Günstigste Option, US-Anbieter. Gute Oberfläche.",
                  url: "porkbun.com",
                  highlight: false,
                },
                {
                  name: "All-Inkl (Domain)",
                  du_zahlst: "~6–9 €/Jahr (.de)",
                  du_nimmst: "15–25 €/Jahr",
                  note: "Direkt beim Hoster buchen — weniger Verwaltung.",
                  url: "all-inkl.com",
                  highlight: false,
                },
              ].map((d) => (
                <div key={d.name} className={`rounded-xl border p-4 ${d.highlight ? "border-purple-200 bg-purple-50/50 dark:border-purple-900 dark:bg-purple-950/20" : "border-border bg-card"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm">{d.name}</p>
                    {d.highlight && <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">Top</span>}
                  </div>
                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Du zahlst:</span>
                      <span className="font-medium text-red-600">{d.du_zahlst}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Du nimmst:</span>
                      <span className="font-medium text-green-600">{d.du_nimmst}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{d.note}</p>
                  <p className="text-xs text-blue-600 font-medium">→ {d.url}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-amber-600" />
              <p className="text-sm font-semibold">Tools & Software</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  kategorie: "Design",
                  icon: "🎨",
                  tools: [
                    { name: "Figma", preis: "Kostenlos / 14€/Monat", wofuer: "Wireframes, Mockups, Prototypen" },
                    { name: "Unsplash / Pexels", preis: "Kostenlos", wofuer: "Hochwertige Stockfotos für Websites" },
                    { name: "Canva Pro", preis: "~13€/Monat", wofuer: "Schnelle Social Media / Banner Grafiken" },
                  ],
                },
                {
                  kategorie: "Entwicklung",
                  icon: "💻",
                  tools: [
                    { name: "Vercel", preis: "Kostenlos (Hobby) / 20$/Monat", wofuer: "Next.js Hosting — schnellste Option" },
                    { name: "GitHub", preis: "Kostenlos", wofuer: "Code-Verwaltung, Backups, Zusammenarbeit" },
                    { name: "VS Code", preis: "Kostenlos", wofuer: "Code-Editor — Standard in der Branche" },
                  ],
                },
                {
                  kategorie: "Business",
                  icon: "📊",
                  tools: [
                    { name: "Stripe", preis: "1,5% + 0,25€ pro Transaktion", wofuer: "Zahlungsabwicklung für deine Kunden" },
                    { name: "Resend", preis: "Kostenlos bis 3.000 Mails/Monat", wofuer: "Rechnungen und System-Mails versenden" },
                    { name: "Notion / Trello", preis: "Kostenlos", wofuer: "Projekte organisieren, Aufgaben planen" },
                  ],
                },
              ].map((kat) => (
                <div key={kat.kategorie} className="rounded-xl border border-border bg-card p-5">
                  <p className="font-semibold text-sm mb-3">{kat.icon} {kat.kategorie}</p>
                  <div className="space-y-3">
                    {kat.tools.map((t) => (
                      <div key={t.name} className="border-l-2 border-border pl-3">
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-green-600 font-medium">{t.preis}</p>
                        <p className="text-xs text-muted-foreground">{t.wofuer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kalkulation */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20 p-5">
            <p className="font-semibold text-sm mb-3">📊 Monats-Kalkulation (Beispiel bei 10 Kunden)</p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-2 font-medium uppercase tracking-wide">Deine Kosten</p>
                <div className="space-y-1">
                  {[
                    ["All-Inkl Reseller", "~10 €/Monat"],
                    ["10 Domains (INWX)", "~5–8 €/Monat"],
                    ["Stripe Gebühren", "variabel"],
                    ["Tools gesamt", "~30 €/Monat"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium text-red-600">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs font-bold pt-1 border-t border-border">
                    <span>Gesamt Kosten</span>
                    <span className="text-red-600">~50 €/Monat</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-2 font-medium uppercase tracking-wide">Deine Einnahmen</p>
                <div className="space-y-1">
                  {[
                    ["10 × Hosting (19€)", "190 €/Monat"],
                    ["10 × Domain (15€/12)", "~13 €/Monat"],
                    ["Wartung (optional)", "variabel"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium text-green-600">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs font-bold pt-1 border-t border-border">
                    <span>Gesamt Einnahmen</span>
                    <span className="text-green-600">~203 €/Monat</span>
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 flex flex-col justify-center items-center text-center border border-border">
                <p className="text-xs text-muted-foreground mb-1">Passiver Gewinn</p>
                <p className="text-3xl font-bold text-green-600">~153 €</p>
                <p className="text-xs text-muted-foreground">pro Monat / 10 Kunden</p>
                <p className="text-xs text-muted-foreground mt-2">Bei 30 Kunden: <strong>~460 €/Monat</strong></p>
              </div>
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
