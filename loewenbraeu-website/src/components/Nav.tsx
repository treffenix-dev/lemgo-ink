"use client";
import { useState, useEffect } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#speisekarte", label: "Speisekarte" },
    { href: "#bestellen",   label: "Bestellen"   },
    { href: "#reservierung",label: "Reservierung" },
    { href: "#kontakt",     label: "Kontakt"      },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[68px] transition-all duration-500 ${
        scrolled ? "bg-bg/95 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <a href="#" className="font-display text-[1.05rem] font-light tracking-[0.28em] text-cream uppercase">
        Löwenbräu <span className="text-gold-lt">·</span> Lemgo
      </a>

      <ul className="hidden md:flex gap-10 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-sans text-[0.68rem] text-muted tracking-[0.22em] uppercase hover:text-cream transition-colors duration-200"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <a
          href="#reservierung"
          className="hidden md:inline-block text-[0.68rem] tracking-[0.22em] uppercase text-cream border-b border-gold/60 pb-px hover:border-gold-lt hover:text-gold-lt transition-colors duration-200"
        >
          Tisch reservieren
        </a>
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect width="20" height="1.5" fill="currentColor" />
            <rect y="6" width="20" height="1.5" fill="currentColor" />
            <rect y="12" width="20" height="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-border md:hidden flex flex-col px-[5%] py-8 gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-sans text-[0.72rem] text-cream tracking-[0.22em] uppercase"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservierung"
            onClick={() => setOpen(false)}
            className="font-sans text-[0.72rem] tracking-[0.22em] uppercase text-gold-lt border-b border-gold/50 pb-px w-fit mt-1"
          >
            Tisch reservieren
          </a>
        </div>
      )}
    </nav>
  );
}
