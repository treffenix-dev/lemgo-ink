import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { LayoutSwitcher } from "@/components/LayoutSwitcher";
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
  title: "Münchener Löwenbräu Lemgo — Balkan & Deutsche Küche seit 1970",
  description: "Hausgemachte Ćevapčići, saftige Steaks und knusprige Schnitzel. Seit über 50 Jahren in Lemgo. Mittelstraße 144 · 05261 4267",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <LayoutSwitcher />
      </body>
    </html>
  );
}
