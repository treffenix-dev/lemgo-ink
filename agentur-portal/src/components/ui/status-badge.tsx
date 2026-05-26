import { cn } from "@/lib/utils/cn";
import type { ProjectStatus, TicketStatus, InvoiceStatus, LeadStatus, TaskStatus } from "@/types";

const PROJECT_STATUS_MAP: Record<ProjectStatus, { label: string; className: string }> = {
  nicht_gestartet:   { label: "Nicht gestartet",  className: "bg-muted text-muted-foreground" },
  daten_ausfuellen:  { label: "Daten ausfüllen",  className: "bg-blue-500/10 text-blue-400" },
  warten_upload:     { label: "Upload ausstehend", className: "bg-amber-500/10 text-amber-400" },
  in_arbeit:         { label: "In Arbeit",         className: "bg-purple-500/10 text-purple-400" },
  review:            { label: "Review",            className: "bg-indigo-500/10 text-indigo-400" },
  aenderungen_noetig:{ label: "Änderungen nötig",  className: "bg-orange-500/10 text-orange-400" },
  fertig:            { label: "Fertig",            className: "bg-emerald-500/10 text-emerald-400" },
  archiviert:        { label: "Archiviert",        className: "bg-muted text-muted-foreground" },
};

const TICKET_STATUS_MAP: Record<TicketStatus, { label: string; className: string }> = {
  offen:         { label: "Offen",            className: "bg-blue-500/10 text-blue-400" },
  in_bearbeitung:{ label: "In Bearbeitung",   className: "bg-purple-500/10 text-purple-400" },
  warten_kunde:  { label: "Wartet auf Kunde", className: "bg-amber-500/10 text-amber-400" },
  warten_owner:  { label: "Wartet auf Antwort",className: "bg-orange-500/10 text-orange-400" },
  geloest:       { label: "Gelöst",           className: "bg-emerald-500/10 text-emerald-400" },
  archiviert:    { label: "Archiviert",       className: "bg-muted text-muted-foreground" },
};

const INVOICE_STATUS_MAP: Record<InvoiceStatus, { label: string; className: string }> = {
  offen:        { label: "Offen",     className: "bg-amber-500/10 text-amber-400" },
  bezahlt:      { label: "Bezahlt",   className: "bg-emerald-500/10 text-emerald-400" },
  storniert:    { label: "Storniert", className: "bg-red-500/10 text-red-400" },
  ueberfaellig: { label: "Überfällig",className: "bg-red-500/10 text-red-400 font-semibold" },
};

const LEAD_STATUS_MAP: Record<LeadStatus, { label: string; className: string }> = {
  neu:             { label: "Neu",            className: "bg-blue-500/10 text-blue-400" },
  kontaktiert:     { label: "Kontaktiert",    className: "bg-purple-500/10 text-purple-400" },
  angebot_gesendet:{ label: "Angebot gesendet",className: "bg-amber-500/10 text-amber-400" },
  gewonnen:        { label: "Gewonnen",       className: "bg-emerald-500/10 text-emerald-400" },
  verloren:        { label: "Verloren",       className: "bg-red-500/10 text-red-400" },
};

const TASK_STATUS_MAP: Record<TaskStatus, { label: string; className: string }> = {
  offen:    { label: "Offen",    className: "bg-muted text-muted-foreground" },
  in_arbeit:{ label: "In Arbeit",className: "bg-blue-500/10 text-blue-400" },
  erledigt: { label: "Erledigt", className: "bg-emerald-500/10 text-emerald-400" },
};

interface StatusBadgeProps {
  type: "project" | "ticket" | "invoice" | "lead" | "task";
  status: string;
  className?: string;
}

export function StatusBadge({ type, status, className }: StatusBadgeProps) {
  let map: Record<string, { label: string; className: string }>;

  switch (type) {
    case "project": map = PROJECT_STATUS_MAP; break;
    case "ticket":  map = TICKET_STATUS_MAP;  break;
    case "invoice": map = INVOICE_STATUS_MAP; break;
    case "lead":    map = LEAD_STATUS_MAP;    break;
    case "task":    map = TASK_STATUS_MAP;    break;
  }

  const config = map[status] ?? { label: status, className: "bg-muted text-muted-foreground" };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.className, className)}>
      {config.label}
    </span>
  );
}
