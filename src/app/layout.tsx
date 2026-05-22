import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "STUDIO — Premium 3D Web Erlebnisse",
  description:
    "Wir bauen digitale Erlebnisse mit modernsten 3D-Animationen. Was Agenturen für €5.000+ verkaufen, baust du jetzt selbst.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans bg-bg text-white antialiased">{children}</body>
    </html>
  );
}
