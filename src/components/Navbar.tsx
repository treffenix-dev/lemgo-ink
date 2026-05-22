"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Über uns", target: "ueberuns" },
  { label: "Stile", target: "stile" },
  { label: "Portfolio", target: "portfolio" },
  { label: "Kontakt", target: "kontakt" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

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
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group">
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path d="M12 1 L12 4" stroke="#c9a227" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M10 4 L10 8 L12 6 L14 8 L14 4 Z" fill="#c9a227" fillOpacity="0.9"/>
            <rect x="9" y="8" width="6" height="3" fill="#c9a227" fillOpacity="0.85"/>
            <path d="M7 11 L17 11 L17 14 L7 14 Z" fill="#c9a227" fillOpacity="0.7"/>
            <rect x="5" y="14" width="14" height="12" rx="0.5" fill="#c9a227" fillOpacity="0.55"/>
            <rect x="10.5" y="18" width="3" height="5" rx="0.5" fill="#080808"/>
            <rect x="7" y="16" width="2.5" height="3" rx="0.5" fill="#080808" fillOpacity="0.6"/>
            <rect x="14.5" y="16" width="2.5" height="3" rx="0.5" fill="#080808" fillOpacity="0.6"/>
          </svg>
          <span className="font-display text-xl md:text-2xl font-bold tracking-widest">
            <span className="text-cream/90 group-hover:text-cream transition-colors">LEMGO</span>
            <span className="text-gold"> INK</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="font-sans text-[11px] tracking-[0.22em] uppercase text-cream/40 hover:text-cream transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("kontakt")}
            className="font-sans text-[11px] tracking-[0.22em] uppercase px-6 py-3 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 font-medium"
          >
            Termin anfragen
          </button>
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
            <button
              key={link.label}
              onClick={() => { scrollTo(link.target); setMenuOpen(false); }}
              className="font-sans text-sm tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors py-1 text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { scrollTo("kontakt"); setMenuOpen(false); }}
            className="mt-2 px-6 py-4 bg-gold text-black font-sans text-xs tracking-[0.22em] uppercase font-bold text-center hover:bg-gold/85 transition-colors"
          >
            Termin anfragen
          </button>
          <div className="flex gap-6 pt-2">
            <a href="https://wa.me/4915257668403" target="_blank" rel="noreferrer" className="font-sans text-xs text-[#25D366] tracking-[0.15em] uppercase">WhatsApp</a>
            <a href="https://instagram.com/tattooartist_nataschalee" target="_blank" rel="noreferrer" className="font-sans text-xs text-cream/30 tracking-[0.15em] uppercase hover:text-gold transition-colors">Instagram</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
