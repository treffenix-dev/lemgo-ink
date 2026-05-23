import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Lemgo INK — Tattoo Studio Lemgo NRW | Natascha Lee",
    template: "%s | Lemgo INK",
  },
  description:
    "Privates Tattoo Studio in Lemgo, NRW. Spezialisiert auf Black & Grey Realism, Portraits & Fine Line. 4.7★ auf Google. Nur nach Terminvereinbarung — jetzt anfragen.",
  keywords: [
    "Tattoo Lemgo",
    "Tattoo Studio NRW",
    "Black Grey Realism Tattoo",
    "Natascha Lee Tattoo",
    "Portrait Tattoo NRW",
    "Fine Line Tattoo Lemgo",
    "Piercing Lemgo",
    "Custom Tattoo Lemgo",
    "Tattoo Ostwestfalen",
  ],
  authors: [{ name: "Natascha Wehr", url: "https://instagram.com/tattooartist_nataschalee" }],
  creator: "Lemgo INK",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Lemgo INK",
    title: "Lemgo INK — Privates Tattoo Studio Lemgo NRW",
    description:
      "Black & Grey Realism, Portraits & Fine Line von Natascha Lee. Privates Studio in Lemgo — nur nach Terminvereinbarung.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemgo INK — Tattoo Studio Lemgo NRW",
    description: "Black & Grey Realism, Portraits & Fine Line von Natascha Lee. Privates Studio in Lemgo.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Lemgo INK",
  description: "Privates Tattoo Studio in Lemgo NRW. Spezialisiert auf Black & Grey Realism, Portraits und Fine Line.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Papenstraße 56",
    addressLocality: "Lemgo",
    postalCode: "32657",
    addressCountry: "DE",
    addressRegion: "Nordrhein-Westfalen",
  },
  telephone: "+4915257668403",
  url: "https://lemgoink.de",
  sameAs: ["https://instagram.com/tattooartist_nataschalee"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    description: "Nur nach Terminvereinbarung",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "39",
    bestRating: "5",
  },
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${cinzel.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-bg text-cream antialiased">{children}</body>
    </html>
  );
}
