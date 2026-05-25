export type MenuItem = {
  name: string;
  desc?: string;
  price?: number; // undefined = "Preis auf Anfrage"
  orderable?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "vorspeisen",
    label: "Vorspeisen & Suppen",
    items: [
      { name: "Tagessuppe", desc: "Hausgemacht, täglich frisch" },
      { name: "Schafskäse gegrillt", desc: "Mit Oliven, Tomaten und Fladenbrot" },
      { name: "Ajvar-Brot", desc: "Geröstetes Brot mit hausgemachtem Ajvar" },
    ],
  },
  {
    id: "balkan",
    label: "Balkan Spezialitäten",
    items: [
      { name: "Ćevapčići (10 Stück)", desc: "Mit Ajvar, Zwiebeln und Fladenbrot", price: 12.90, orderable: true },
      { name: "Mixed Grill Platte", desc: "Ćevapčići, Pljeskavica, Fleischspieß", price: 18.90, orderable: true },
      { name: "Pljeskavica", desc: "Hausgemachter Balkan-Burger mit Ajvar", price: 13.50, orderable: true },
      { name: "Balkan-Teller für 2", desc: "Auswahl der Spezialitäten mit Beilagen", price: 32.00, orderable: true },
      { name: "Fleischspieß", desc: "Mariniertes Hackfleisch am Spieß" },
    ],
  },
  {
    id: "steaks",
    label: "Steaks & Grill",
    items: [
      { name: "Rumpsteak (250 g)", desc: "Mit Kräuterbutter, Pommes & Salat", price: 22.90, orderable: true },
      { name: "T-Bone Steak (400 g)", desc: "Auf dem Holzkohlegrill, Beilagen nach Wahl", price: 28.90, orderable: true },
      { name: "Grillspieß vom Hähnchen", desc: "Mariniert, mit Reis und Salat", price: 14.90, orderable: true },
      { name: "Entrecôte (300 g)", desc: "Mit Pfeffersauce und Beilagen nach Wahl" },
    ],
  },
  {
    id: "schnitzel",
    label: "Schnitzel & Klassiker",
    items: [
      { name: "Wiener Schnitzel", desc: "Vom Kalb, Pommes & Preiselbeeren", price: 16.90, orderable: true },
      { name: "Jägerschnitzel", desc: "Mit Pilzrahmsauce und Kartoffeln", price: 15.90, orderable: true },
      { name: "Zigeunerschnitzel", desc: "Mit Paprika-Tomaten-Sauce, Pommes", price: 15.90, orderable: true },
      { name: "Kinderschnitzel", desc: "Kleines Schnitzel mit Pommes", price: 8.50, orderable: true },
      { name: "Cordon Bleu", desc: "Mit Schinken und Käse gefüllt, Pommes" },
    ],
  },
  {
    id: "salate",
    label: "Salate",
    items: [
      { name: "Gemischter Salat", desc: "Frische Saison-Salate mit Hausdressing" },
      { name: "Griechischer Salat", desc: "Mit Schafskäse, Oliven und Tomaten" },
      { name: "Bauernsalat", desc: "Mit Gurken, Zwiebeln, Paprika und Feta" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Palatschinken", desc: "Gefüllte Pfannkuchen nach Art des Hauses" },
      { name: "Eis-Dessert", desc: "Gemischtes Eis mit Sahne" },
      { name: "Hausgemachter Kuchen", desc: "Tageskuchen, bitte erfragen" },
    ],
  },
  {
    id: "getraenke",
    label: "Getränke",
    items: [
      { name: "Löwenbräu Märzen (0,5 l)", desc: "Frisch vom Fass" },
      { name: "Löwenbräu Märzen (0,3 l)", desc: "Frisch vom Fass" },
      { name: "Hauswein (0,2 l)", desc: "Rot oder Weiß" },
      { name: "Alkoholfreie Getränke", desc: "Cola, Fanta, Wasser, Saft" },
      { name: "Kaffee & Heißgetränke", desc: "Espresso, Cappuccino, Tee" },
    ],
  },
];

export const ORDERABLE = MENU.flatMap((c) =>
  c.items.filter((i) => i.orderable && i.price !== undefined)
);
