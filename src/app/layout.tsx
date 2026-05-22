import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Lemgo INK by NataschaLee | Privates Tattoo Studio Lemgo",
  description:
    "Privates Tattoo Studio in Lemgo NRW. Black & Grey Realism, Portraits, Fine Line & Piercing. 4.7★ auf Google. Jetzt Termin anfragen.",
  keywords: "Tattoo Lemgo, Tattoo Studio NRW, Black Grey Realism, NataschaLee, Piercing Lemgo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="font-sans bg-bg text-cream antialiased">{children}</body>
    </html>
  );
}
