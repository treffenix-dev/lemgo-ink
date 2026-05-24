import type { Metadata } from "next";
import "./globals.css";
import { ScrollReset } from "@/components/ScrollReset";

export const metadata: Metadata = {
  title: "WebAgentur — Professionelle Websites für lokale Unternehmen",
  description: "Moderne Websites für Restaurants, Geschäfte und Dienstleister in Deutschland. Transparent, schnell, persönlich.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="antialiased">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
