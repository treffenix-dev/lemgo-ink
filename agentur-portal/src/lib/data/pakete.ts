import type { Paket } from "@/types";

export const PAKETE: Paket[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Dein professioneller Online-Auftritt — schnell und klar.",
    preis_einmalig: 1990,
    fuer_wen: "Perfekt für Einzelunternehmer, kleine Geschäfte und Dienstleister, die schnell online gehen möchten.",
    lieferzeit: "5–7 Werktage",
    enthalten: [
      "1-seitige Landing Page",
      "Mobiloptimiert & schnell geladen",
      "Kontaktformular",
      "Google Maps Integration",
      "3 Monate Betreuung",
      "Hosting-Paket inklusive (1. Jahr)",
      "Kundenportal-Zugang",
    ],
    nicht_enthalten: [
      "Online-Shop",
      "Buchungssystem",
      "Mehrsprachigkeit",
      "SEO-Paket",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Mehr Seiten, mehr Funktionen, mehr Wirkung.",
    preis_einmalig: 3490,
    fuer_wen: "Ideal für Restaurants, Parfümerien, Dienstleister und lokale Geschäfte mit mehreren Seiten.",
    lieferzeit: "10–14 Werktage",
    enthalten: [
      "Bis zu 5 Seiten",
      "Mobiloptimiert & schnell geladen",
      "Kontaktformular & WhatsApp-Button",
      "Google Maps + Öffnungszeiten",
      "Galerie / Portfolio",
      "Speisekarte / Preisliste (PDF-Upload)",
      "6 Monate Betreuung",
      "Hosting-Paket inklusive (1. Jahr)",
      "SEO-Grundoptimierung",
      "Kundenportal-Zugang",
    ],
    nicht_enthalten: [
      "Online-Shop",
      "Buchungssystem (buchbar als Modul +490 €)",
      "Mehrsprachigkeit",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Die komplette Lösung — alles aus einer Hand.",
    preis_einmalig: 5990,
    fuer_wen: "Für Unternehmen, die eine vollständige digitale Präsenz mit Buchung, Shop oder komplexen Funktionen brauchen.",
    lieferzeit: "21–28 Werktage",
    enthalten: [
      "Bis zu 10 Seiten",
      "Mobiloptimiert & schnell geladen",
      "Alle Business-Features",
      "Online-Buchungssystem",
      "Online-Bestellung / Shop (bis 50 Produkte)",
      "Mehrsprachig (DE + EN)",
      "12 Monate Betreuung",
      "Hosting-Paket inklusive (1. Jahr)",
      "SEO-Volloptimierung + Google Analytics",
      "Prioritäts-Support",
      "Kundenportal-Zugang",
    ],
    nicht_enthalten: [],
  },
];

export const HOSTING_PAKETE = [
  { id: "hosting_s", label: "Hosting Starter", preis: 19, beschreibung: "Für Landing Pages — bis 10 GB, SSL, tägliches Backup" },
  { id: "hosting_m", label: "Hosting Business", preis: 29, beschreibung: "Für Business-Seiten — bis 25 GB, SSL, tägliches Backup" },
  { id: "hosting_l", label: "Hosting Pro", preis: 49, beschreibung: "Für Pro-Projekte — unbegrenzt, SSL, Priorität-Server, tägliches Backup" },
] as const;

export const ZAHLUNGSMODELLE = [
  {
    id: "einmalig",
    label: "Einmalzahlung",
    beschreibung: "Einmalige Zahlung beim Kauf. Günstigster Gesamtpreis.",
    rabatt: 0,
  },
  {
    id: "halbhalb",
    label: "50/50",
    beschreibung: "50% jetzt, 50% nach Fertigstellung und Abnahme.",
    rabatt: 0,
  },
  {
    id: "raten",
    label: "Ratenzahlung (3×)",
    beschreibung: "3 gleiche Monatsraten. Einfach und planbar. +10% Aufpreis.",
    aufpreis: 10,
  },
] as const;

export const ZAHLUNGSARTEN = [
  { id: "karte", label: "Kreditkarte / EC-Karte", icon: "💳" },
  { id: "paypal", label: "PayPal", icon: "🅿️" },
  { id: "klarna", label: "Klarna (Später zahlen)", icon: "🌸" },
  { id: "sepa", label: "SEPA-Lastschrift", icon: "🏦" },
  { id: "giro", label: "Girokonto / Überweisung", icon: "🏛️" },
  { id: "bar", label: "Bar zahlen", icon: "💶" },
  { id: "vor_ort", label: "Zahlung vor Ort", icon: "📍" },
] as const;
