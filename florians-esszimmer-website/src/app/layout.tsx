import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// TODO: Nach dem Deploy auf die echte Domain ändern (z. B. https://florians-esszimmer.de)
const SITE_URL = "https://florians-esszimmer-lemgo.vercel.app";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Florian's Esszimmer · Restaurant in Lemgo, saisonal & regional";
const description =
  "Kleines, feines Restaurant in der Lemgoer Altstadt (Mittelstraße 100). Saisonale, regionale Küche bei Kerzenlicht, begleitet von Spirituosen der Gutshof Brennerei Begatal. 4,8★. Reservierung: 01515 2495659.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Florian's Esszimmer Lemgo",
  },
  description,
  keywords: [
    "Restaurant Lemgo",
    "essen gehen Lemgo",
    "Restaurant Lippe",
    "saisonale Küche OWL",
    "regionales Restaurant Lemgo",
    "Candle-Light-Dinner Lemgo",
    "Florian's Esszimmer",
    "Mittelstraße 100 Lemgo",
    "Gutshof Brennerei Begatal",
    "Fine Dining Ostwestfalen",
  ],
  authors: [{ name: "Florian's Esszimmer" }],
  creator: "Florian's Esszimmer",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "Florian's Esszimmer",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#0B0907",
};

// Strukturierte Daten (Restaurant-Schema) für Google Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Florian's Esszimmer",
  description,
  url: SITE_URL,
  telephone: "+4915152495659",
  email: "florians-esszimmer@web.de",
  servesCuisine: ["Regional", "Saisonal", "Deutsch"],
  priceRange: "€€",
  acceptsReservations: "True",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mittelstraße 100",
    addressLocality: "Lemgo",
    postalCode: "32657",
    addressRegion: "NRW",
    addressCountry: "DE",
  },
  // TODO: Koordinaten bei Bedarf exakt setzen (Näherung Lemgo Altstadt)
  geo: { "@type": "GeoCoordinates", latitude: 52.0277, longitude: 8.9006 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "17:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Thursday", "Friday"], opens: "17:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "12:00", closes: "22:00" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "46",
    bestRating: "5",
  },
  sameAs: ["https://www.instagram.com/florians_esszimmer_/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-bg text-cream">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
