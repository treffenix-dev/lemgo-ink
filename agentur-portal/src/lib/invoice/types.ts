export type InvoiceStatus = "entwurf" | "offen" | "bezahlt" | "storniert";

export interface InvoicePosition {
  beschreibung: string;
  menge: number;
  einzelpreis: number; // netto
  gesamt: number;      // netto
}

export interface Invoice {
  id: string;
  nummer: string;          // RE-2025-0001
  status: InvoiceStatus;
  kunde: {
    vorname: string;
    nachname: string;
    firma: string;
    email: string;
    strasse: string;
    plz: string;
    ort: string;
    land: string;
  };
  positionen: InvoicePosition[];
  netto: number;
  mwst_satz: number;   // 19
  mwst_betrag: number;
  gesamt: number;
  zahlungsart: string;
  zahlungsmodell: string;
  erstellt_am: string;   // ISO date
  faellig_am: string;    // ISO date (erstellt + zahlungsziel_tage)
  gesendet_am?: string;
  paket: string;
}
