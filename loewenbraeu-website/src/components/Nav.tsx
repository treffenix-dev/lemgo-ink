"use client";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Nav({ cartCount }: { cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#speisekarte", label: "Speisekarte" },
    { href: "#bestellen",   label: "Bestellen" },
    { href: "#reservierung",label: "Reservierung" },
    { href: "#kontakt",     label: "Kontakt" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[72px] transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <a href="#" className="font-display text-[1.1rem] text-gold-lt tracking-wide">
        Münchener Löwenbräu
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-9 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-muted text-[0.75rem] tracking-[0.18em] uppercase hover:text-cream transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <a
          href="#reservierung"
          className="hidden md:inline-block bg-gold text-bg text-[0.75rem] font-medium tracking-[0.12em] uppercase px-5 py-2 hover:bg-gold-lt transition-colors"
        >
          Tisch reservieren
        </a>
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <rect width="22" height="2" fill="currentColor" />
            <rect y="7" width="22" height="2" fill="currentColor" />
            <rect y="14" width="22" height="2" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-border md:hidden flex flex-col px-[5%] py-6 gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-cream text-sm tracking-[0.18em] uppercase"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservierung"
            onClick={() => setOpen(false)}
            className="bg-gold text-bg text-[0.75rem] font-medium tracking-[0.12em] uppercase px-5 py-3 text-center mt-2"
          >
            Tisch reservieren
          </a>
        </div>
      )}
    </nav>
  );
}
