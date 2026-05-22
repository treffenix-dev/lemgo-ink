"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Über uns", href: "#ueberuns" },
  { label: "Stile", href: "#stile" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-xl border-b border-gold/8 shadow-[0_4px_40px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path d="M11 2C11 2 7 6.5 7 10.5C7 12.985 8.79 15 11 15C13.21 15 15 12.985 15 10.5C15 6.5 11 2 11 2Z" fill="#c9a227" fillOpacity="0.85"/>
            <path d="M11 15V20" stroke="#c9a227" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5"/>
            <circle cx="11" cy="10.5" r="2" fill="#080808"/>
          </svg>
          <span className="font-display text-xl md:text-2xl font-bold tracking-widest">
            <span className="text-cream/90 group-hover:text-cream transition-colors">LEMGO</span>
            <span className="text-gold"> INK</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-[11px] tracking-[0.22em] uppercase text-cream/40 hover:text-cream transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#kontakt"
            className="font-sans text-[11px] tracking-[0.22em] uppercase px-6 py-3 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 font-medium"
          >
            Termin anfragen
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menü"
        >
          <span className={`block w-6 h-0.5 bg-cream/70 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-cream/70 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-cream/70 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-bg/98 backdrop-blur-xl border-b border-gold/10 px-6 py-8 flex flex-col gap-6"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-6 py-4 bg-gold text-black font-sans text-xs tracking-[0.22em] uppercase font-bold text-center hover:bg-gold/85 transition-colors"
          >
            Termin anfragen
          </a>
          <div className="flex gap-6 pt-2">
            <a href="https://wa.me/4915257668403" target="_blank" rel="noreferrer" className="font-sans text-xs text-[#25D366] tracking-[0.15em] uppercase">WhatsApp</a>
            <a href="https://instagram.com/tattooartist_nataschalee" target="_blank" rel="noreferrer" className="font-sans text-xs text-cream/30 tracking-[0.15em] uppercase hover:text-gold transition-colors">Instagram</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
