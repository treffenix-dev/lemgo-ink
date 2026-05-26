export type InvoicePosition = {
  id: string;
  beschreibung: string;
  detail: string;
  menge: string;
  preis: number;
};

export type Invoice = {
  id: string;
  nummer: string;
  datum: string;
  leistungsdatum: string;
  zahlungszielTage: number;

  // Absender (du)
  absenderName: string;
  absenderZusatz: string;
  absenderStrasse: string;
  absenderOrt: string;
  absenderSteuernummer: string;
  absenderIBAN: string;
  absenderBIC: string;
  absenderBank: string;
  absenderTelefon: string;
  absenderEmail: string;

  // Empfänger (Kunde)
  empfaengerFirma: string;
  empfaengerAnsprechpartner: string;
  empfaengerStrasse: string;
  empfaengerOrt: string;

  positionen: InvoicePosition[];
  notiz: string;
  status: "entwurf" | "offen" | "bezahlt" | "ueberfaellig";
};

export const DEFAULT_ABSENDER = {
  absenderName: "Nick Wittmann",
  absenderZusatz: "DIGITAL SERVICES & WEBDESIGN",
  absenderStrasse: "Musterstraße 12",
  absenderOrt: "32657 Lemgo",
  absenderSteuernummer: "313/XXXX/XXXX",
  absenderIBAN: "DE89 4805 0161 XXXX XXXX XX",
  absenderBIC: "XXXXXXXXXX",
  absenderBank: "Sparkasse Lemgo",
  absenderTelefon: "",
  absenderEmail: "",
};

export function newPosition(): InvoicePosition {
  return { id: crypto.randomUUID(), beschreibung: "", detail: "", menge: "1 Stk.", preis: 0 };
}

export function nextRechnungsnummer(existing: Invoice[]): string {
  const year = new Date().getFullYear();
  const nums = existing
    .map((i) => {
      const m = i.nummer.match(/RE-\d{4}-(\d+)/);
      return m ? parseInt(m[1]) : 0;
    });
  const next = (nums.length > 0 ? Math.max(...nums) : 0) + 1;
  return `RE-${year}-${String(next).padStart(4, "0")}`;
}

export function invoiceTotal(positionen: InvoicePosition[]): number {
  return positionen.reduce((s, p) => s + p.preis, 0);
}

const STORAGE_KEY = "nw_rechnungen";

export function loadInvoices(): Invoice[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveInvoice(inv: Invoice): void {
  const all = loadInvoices();
  const idx = all.findIndex((i) => i.id === inv.id);
  if (idx >= 0) all[idx] = inv;
  else all.unshift(inv);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function deleteInvoice(id: string): void {
  const all = loadInvoices().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
