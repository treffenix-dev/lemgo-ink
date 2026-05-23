import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lemgo INK — Tattoo Studio Lemgo NRW | Natascha Lee",
    template: "%s | Lemgo INK",
  },
  description:
    "Privates Tattoo Studio in Lemgo, NRW. Spezialisiert auf Black & Grey Realism, Portraits & Fine Line. 4.7★ auf Google. Nur nach Terminvereinbarung.",
  keywords: [
    "Tattoo Lemgo", "Tattoo Studio NRW", "Black Grey Realism",
    "Natascha Lee Tattoo", "Portrait Tattoo NRW", "Fine Line Tattoo Lemgo",
    "Piercing Lemgo", "Custom Tattoo Lemgo", "Tattoo Ostwestfalen",
  ],
  authors: [{ name: "Natascha Wehr" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Lemgo INK",
    title: "Lemgo INK — Privates Tattoo Studio Lemgo NRW",
    description: "Black & Grey Realism, Portraits & Fine Line. Nur nach Terminvereinbarung.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemgo INK — Tattoo Studio Lemgo NRW",
    description: "Black & Grey Realism, Portraits & Fine Line von Natascha Lee.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Lemgo INK",
  description: "Privates Tattoo Studio in Lemgo NRW. Black & Grey Realism, Portraits und Fine Line.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Papenstraße 56",
    addressLocality: "Lemgo",
    postalCode: "32657",
    addressCountry: "DE",
  },
  telephone: "+4915257668403",
  sameAs: ["https://instagram.com/tattooartist_nataschalee"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "39",
    bestRating: "5",
  },
  priceRange: "€€",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
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
