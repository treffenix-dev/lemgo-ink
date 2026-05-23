// ── User & Auth ──────────────────────────────────────────────
export type UserRole = "visitor" | "customer" | "owner";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface CustomerProfile {
  id: string;
  user_id: string;
  vorname: string;
  nachname: string;
  firma: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: string;
  ort: string;
  land: string;
  branche: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  logo_vorhanden: boolean;
  texte_vorhanden: boolean;
  bilder_vorhanden: boolean;
  speisekarte_vorhanden: boolean;
  buchung_gewuenscht: boolean;
  bestellung_gewuenscht: boolean;
  notizen?: string;
  created_at: string;
  updated_at: string;
}

// ── Project ───────────────────────────────────────────────────
export type ProjectStatus =
  | "nicht_gestartet"
  | "daten_ausfuellen"
  | "warten_upload"
  | "in_arbeit"
  | "review"
  | "aenderungen_noetig"
  | "fertig"
  | "archiviert";

export interface Project {
  id: string;
  customer_id: string;
  name: string;
  paket: PaketType;
  status: ProjectStatus;
  beschreibung?: string;
  notizen?: string;
  start_datum?: string;
  fertig_datum?: string;
  created_at: string;
  updated_at: string;
  customer?: CustomerProfile;
}

// ── Pakete ────────────────────────────────────────────────────
export type PaketType = "starter" | "business" | "pro";

export interface Paket {
  id: PaketType;
  name: string;
  tagline: string;
  preis_einmalig: number;
  preis_monatlich?: number;
  fuer_wen: string;
  lieferzeit: string;
  enthalten: string[];
  nicht_enthalten: string[];
}

// ── Payment ───────────────────────────────────────────────────
export type ZahlungsModell = "einmalig" | "halbhalb" | "raten" | "abo";
export type Zahlungsart =
  | "karte"
  | "paypal"
  | "klarna"
  | "sepa"
  | "bar"
  | "giro"
  | "vor_ort";

export type InvoiceStatus = "offen" | "bezahlt" | "storniert" | "ueberfaellig";

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  project_id?: string;
  betrag: number;
  mwst: number;
  gesamt: number;
  status: InvoiceStatus;
  faellig_am?: string;
  bezahlt_am?: string;
  zahlungsart?: Zahlungsart;
  positionen: InvoicePosition[];
  notizen?: string;
  stripe_invoice_id?: string;
  created_at: string;
  updated_at: string;
  customer?: CustomerProfile;
}

export interface InvoicePosition {
  bezeichnung: string;
  menge: number;
  einzelpreis: number;
  gesamt: number;
}

// ── Ticket ────────────────────────────────────────────────────
export type TicketStatus =
  | "offen"
  | "in_bearbeitung"
  | "warten_kunde"
  | "warten_owner"
  | "geloest"
  | "archiviert";

export type TicketPriority = "niedrig" | "mittel" | "hoch" | "kritisch";

export type TicketCategory =
  | "allgemein"
  | "logo_fehlt"
  | "texte_fehlen"
  | "bilder_fehlen"
  | "upload_problem"
  | "speisekarte_fehlt"
  | "aenderungswunsch"
  | "rechnung"
  | "zahlung"
  | "storno"
  | "rueckerstattung"
  | "bug"
  | "sonstiges";

export interface Ticket {
  id: string;
  customer_id: string;
  project_id?: string;
  titel: string;
  kategorie: TicketCategory;
  beschreibung: string;
  prioritaet: TicketPriority;
  status: TicketStatus;
  antworten: TicketAntwort[];
  anhaenge?: string[];
  created_at: string;
  updated_at: string;
  customer?: CustomerProfile;
}

export interface TicketAntwort {
  id: string;
  ticket_id: string;
  user_id: string;
  text: string;
  anhaenge?: string[];
  created_at: string;
}

// ── Lead ──────────────────────────────────────────────────────
export type LeadStatus =
  | "neu"
  | "kontaktiert"
  | "angebot_gesendet"
  | "gewonnen"
  | "verloren";

export interface Lead {
  id: string;
  vorname: string;
  nachname: string;
  firma?: string;
  email: string;
  telefon?: string;
  quelle: string;
  interesse: string;
  budget?: string;
  status: LeadStatus;
  naechste_aktion?: string;
  notizen?: string;
  created_at: string;
  updated_at: string;
}

export type OfferStatus = "entwurf" | "gesendet" | "angenommen" | "abgelehnt";

export interface Offer {
  id: string;
  angebots_number: string;
  customer_id?: string;
  lead_id?: string;
  positionen: InvoicePosition[];
  rabatt?: number;
  mwst: number;
  gesamt: number;
  status: OfferStatus;
  gueltig_bis?: string;
  notizen?: string;
  created_at: string;
  updated_at: string;
}

// ── Task ──────────────────────────────────────────────────────
export type TaskStatus = "offen" | "in_arbeit" | "erledigt";
export type TaskPriority = "niedrig" | "mittel" | "hoch";

export interface Task {
  id: string;
  customer_id?: string;
  project_id?: string;
  titel: string;
  beschreibung?: string;
  prioritaet: TaskPriority;
  status: TaskStatus;
  faellig_am?: string;
  zeitaufwand?: number;
  created_at: string;
  updated_at: string;
}

// ── Document & File ───────────────────────────────────────────
export type DocumentType =
  | "logo"
  | "bild"
  | "text"
  | "pdf"
  | "speisekarte"
  | "vertrag"
  | "rechnung"
  | "beleg"
  | "sonstiges";

export interface Document {
  id: string;
  customer_id: string;
  project_id?: string;
  typ: DocumentType;
  name: string;
  url: string;
  version: number;
  groesse?: number;
  notizen?: string;
  created_at: string;
}

export interface Expense {
  id: string;
  betrag: number;
  datum: string;
  kategorie: string;
  beleg_url?: string;
  steuerlich_relevant: boolean;
  notiz?: string;
  created_at: string;
}

export interface KilometerEntry {
  id: string;
  datum: string;
  start: string;
  ziel: string;
  zweck: string;
  kilometer: number;
  betrag: number;
  created_at: string;
}

export interface TimerEntry {
  id: string;
  customer_id?: string;
  task_id?: string;
  start: string;
  ende?: string;
  dauer?: number;
  notiz?: string;
  created_at: string;
}

export type NotificationType =
  | "zahlung_erfolgreich"
  | "konto_erstellt"
  | "daten_fehlen"
  | "upload_fehlt"
  | "ticket_beantwortet"
  | "freigabe_benoetigt"
  | "rechnung_erstellt"
  | "rechnung_bezahlt"
  | "abo_faellig"
  | "storno"
  | "rueckerstattung";

export interface Notification {
  id: string;
  user_id: string;
  typ: NotificationType;
  titel: string;
  text: string;
  gelesen: boolean;
  link?: string;
  created_at: string;
}

export interface OnboardingStep {
  id: string;
  label: string;
  beschreibung: string;
  erledigt: boolean;
  pflicht: boolean;
}

export interface CheckoutData {
  paket: PaketType;
  zahlungsmodell: ZahlungsModell;
  zahlungsart: Zahlungsart;
  profil: Partial<CustomerProfile>;
  agb: boolean;
  datenschutz: boolean;
  widerruf: boolean;
}
