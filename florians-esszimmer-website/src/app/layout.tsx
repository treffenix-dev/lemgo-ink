import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Florian's Esszimmer · Lemgo — Saisonale, regionale Küche bei Kerzenlicht",
  description:
    "Kleines, feines Restaurant in der Lemgoer Mittelstraße. Saisonal, regional, ehrlich — begleitet von Spirituosen der Gutshof Brennerei Begatal. 4,8★. Reservierung: 01515 2495659.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-bg text-cream">{children}</body>
    </html>
  );
}
