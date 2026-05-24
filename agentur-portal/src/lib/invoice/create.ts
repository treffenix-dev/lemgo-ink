import type { Invoice } from "./types";
import { getNextInvoiceNumber, saveInvoice } from "./store";

export interface CreateInvoiceInput {
  paket: string;
  zahlungsmodell: string;
  zahlungsart: string;
  profil: {
    vorname: string;
    nachname: string;
    firma: string;
    email: string;
    strasse: string;
    plz: string;
    ort: string;
    land: string;
  };
  preis: number; // brutto gesamt
}

export function createInvoice(input: CreateInvoiceInput, zahlungszielTage = 14): Invoice {
  const { paket, zahlungsmodell, zahlungsart, profil, preis } = input;

  const id = Date.now().toString();
  const nummer = getNextInvoiceNumber();

  const netto = Math.round((preis / 1.19) * 100) / 100;
  const mwst_betrag = Math.round((preis - netto) * 100) / 100;
  const gesamt = preis;

  const heute = new Date();
  const faellig = new Date(heute);
  faellig.setDate(faellig.getDate() + zahlungszielTage);

  const paketLabel = paket.charAt(0).toUpperCase() + paket.slice(1);

  const invoice: Invoice = {
    id,
    nummer,
    status: "entwurf",
    kunde: {
      vorname: profil.vorname ?? "",
      nachname: profil.nachname ?? "",
      firma: profil.firma ?? "",
      email: profil.email ?? "",
      strasse: profil.strasse ?? "",
      plz: profil.plz ?? "",
      ort: profil.ort ?? "",
      land: profil.land ?? "Deutschland",
    },
    positionen: [
      {
        beschreibung: `${paketLabel}-Paket — Website`,
        menge: 1,
        einzelpreis: netto,
        gesamt: netto,
      },
    ],
    netto,
    mwst_satz: 19,
    mwst_betrag,
    gesamt,
    zahlungsart,
    zahlungsmodell,
    erstellt_am: heute.toISOString(),
    faellig_am: faellig.toISOString(),
    paket,
  };

  saveInvoice(invoice);
  return invoice;
}
