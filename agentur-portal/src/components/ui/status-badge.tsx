import { cn } from "@/lib/utils/cn";
import type { ProjectStatus, TicketStatus, InvoiceStatus, LeadStatus, TaskStatus } from "@/types";

const PROJECT_STATUS_MAP: Record<ProjectStatus, { label: string; className: string }> = {
  nicht_gestartet: { label: "Nicht gestartet", className: "bg-gray-100 text-gray-700" },
  daten_ausfuellen: { label: "Daten ausfüllen", className: "bg-blue-100 text-blue-700" },
  warten_upload: { label: "Upload ausstehend", className: "bg-amber-100 text-amber-700" },
  in_arbeit: { label: "In Arbeit", className: "bg-purple-100 text-purple-700" },
  review: { label: "Review", className: "bg-indigo-100 text-indigo-700" },
  aenderungen_noetig: { label: "Änderungen nötig", className: "bg-orange-100 text-orange-700" },
  fertig: { label: "Fertig", className: "bg-green-100 text-green-700" },
  archiviert: { label: "Archiviert", className: "bg-gray-100 text-gray-500" },
};

const TICKET_STATUS_MAP: Record<TicketStatus, { label: string; className: string }> = {
  offen: { label: "Offen", className: "bg-blue-100 text-blue-700" },
  in_bearbeitung: { label: "In Bearbeitung", className: "bg-purple-100 text-purple-700" },
  warten_kunde: { label: "Wartet auf Kunde", className: "bg-amber-100 text-amber-700" },
  warten_owner: { label: "Wartet auf Antwort", className: "bg-orange-100 text-orange-700" },
  geloest: { label: "Gelöst", className: "bg-green-100 text-green-700" },
  archiviert: { label: "Archiviert", className: "bg-gray-100 text-gray-500" },
};

const INVOICE_STATUS_MAP: Record<string, { label: string; className: string }> = {
  entwurf: { label: "Entwurf", className: "bg-gray-100 text-gray-600" },
  offen: { label: "Offen", className: "bg-amber-100 text-amber-700" },
  bezahlt: { label: "Bezahlt", className: "bg-green-100 text-green-700" },
  storniert: { label: "Storniert", className: "bg-red-100 text-red-700" },
  ueberfaellig: { label: "Überfällig", className: "bg-red-100 text-red-800 font-semibold" },
};

const LEAD_STATUS_MAP: Record<LeadStatus, { label: string; className: string }> = {
  neu: { label: "Neu", className: "bg-blue-100 text-blue-700" },
  kontaktiert: { label: "Kontaktiert", className: "bg-purple-100 text-purple-700" },
  angebot_gesendet: { label: "Angebot gesendet", className: "bg-amber-100 text-amber-700" },
  gewonnen: { label: "Gewonnen", className: "bg-green-100 text-green-700" },
  verloren: { label: "Verloren", className: "bg-red-100 text-red-700" },
};

const TASK_STATUS_MAP: Record<TaskStatus, { label: string; className: string }> = {
  offen: { label: "Offen", className: "bg-gray-100 text-gray-700" },
  in_arbeit: { label: "In Arbeit", className: "bg-blue-100 text-blue-700" },
  erledigt: { label: "Erledigt", className: "bg-green-100 text-green-700" },
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
    case "ticket": map = TICKET_STATUS_MAP; break;
    case "invoice": map = INVOICE_STATUS_MAP; break;
    case "lead": map = LEAD_STATUS_MAP; break;
    case "task": map = TASK_STATUS_MAP; break;
  }

  const config = map[status] ?? { label: status, className: "bg-gray-100 text-gray-700" };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.className, className)}>
      {config.label}
    </span>
  );
}
