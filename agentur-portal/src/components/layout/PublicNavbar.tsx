"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Ablauf", href: "/#ablauf" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

export function PublicNavbar({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);

  if (dark) {
    return (
      <header className="sticky top-0 z-50 border-b border-white/[0.07] backdrop-blur-md"
        style={{ background: "rgba(7,7,13,0.85)" }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#07070d] text-sm font-bold">W</span>
            </div>
            <span className="font-semibold text-white">WebAgentur</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-3 py-2 text-sm text-white/45 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              Kundenportal
            </Link>
            <Link
              href="/pakete"
              className="px-4 py-2 bg-white text-[#07070d] text-sm font-semibold rounded-full hover:bg-white/90 active:scale-[0.97] transition-all duration-250"
            >
              Paket wählen →
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/[0.07] px-4 py-4 flex flex-col gap-1"
            style={{ background: "rgba(7,7,13,0.95)" }}>
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 px-3 text-sm text-white/55 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/[0.07]">
              <Link
                href="/login"
                className="py-2.5 px-3 text-sm text-white/55 hover:text-white text-center border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                Kundenportal
              </Link>
              <Link
                href="/pakete"
                className="py-2.5 px-3 bg-white text-[#07070d] text-sm font-semibold rounded-lg text-center hover:bg-white/90"
              >
                Paket wählen →
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Light variant (default — for /pakete, /leistungen, /checkout etc.)
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background text-sm font-bold">W</span>
          </div>
          <span className="font-semibold text-foreground">WebAgentur</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Kundenportal
          </Link>
          <Link
            href="/pakete"
            className="px-4 py-2 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-foreground/90 active:scale-[0.97] transition-all duration-250"
          >
            Paket wählen →
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
            <Link href="/login" className="py-2.5 px-3 text-sm text-center border border-border rounded-lg hover:bg-muted transition-colors">
              Kundenportal
            </Link>
            <Link href="/pakete" className="py-2.5 px-3 bg-foreground text-background text-sm font-semibold rounded-lg text-center">
              Paket wählen →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
