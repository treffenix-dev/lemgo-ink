"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating pill navbar */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto"
      >
        <div className={`
          mx-auto flex items-center justify-between md:justify-start gap-8
          px-5 md:px-6 h-12 md:h-11
          rounded-full border transition-all duration-500
          ${scrolled
            ? "bg-[#080808]/90 backdrop-blur-2xl border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.6)]"
            : "bg-[#0a0a0a]/70 backdrop-blur-xl border-white/6"
          }
        `}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <svg width="18" height="22" viewBox="0 0 24 28" fill="none">
              {/* Crescent moon — the Lemgo INK Halbmond */}
              <path d="M12 1 C9.5 1.8 8 4 9 6.2 C9.8 4.2 11.5 3 13.2 3.2 C12.2 2 12 1 12 1 Z" fill="rgba(255,255,255,0.8)" stroke="none"/>
              {/* Gothic spire */}
              <path d="M10.5 3.5 L10.5 9 L12 6.5 L13.5 9 L13.5 3.5 Z" fill="rgba(255,255,255,0.75)"/>
              {/* Roof eave */}
              <rect x="7.5" y="9" width="9" height="1.8" fill="rgba(255,255,255,0.6)"/>
              {/* Tower body */}
              <rect x="8.5" y="10.8" width="7" height="7" fill="rgba(255,255,255,0.45)"/>
              {/* Gothic arched window */}
              <path d="M10.5 12 Q12 11 13.5 12 L13.5 16.5 L10.5 16.5 Z" fill="#080808" fillOpacity="0.75"/>
              {/* Buttress wings */}
              <path d="M6.5 14 L8.5 12 L8.5 17.8 Z" fill="rgba(255,255,255,0.25)"/>
              <path d="M17.5 14 L15.5 12 L15.5 17.8 Z" fill="rgba(255,255,255,0.25)"/>
              {/* Base platform */}
              <rect x="5" y="17.8" width="14" height="2.2" fill="rgba(255,255,255,0.35)"/>
              {/* Steps */}
              <rect x="6.5" y="20" width="11" height="1.5" fill="rgba(255,255,255,0.2)"/>
              <rect x="8" y="21.5" width="8" height="1.5" fill="rgba(255,255,255,0.15)"/>
            </svg>
            <span className="font-display text-sm font-bold tracking-widest">
              <span className="text-white/80 group-hover:text-white transition-colors">LEMGO</span>
              <span className="text-white"> INK</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            <div className="w-px h-4 bg-white/8" />
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="font-sans text-[11px] tracking-[0.18em] uppercase text-white/40 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA pill */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <div className="w-px h-4 bg-white/8" />
            <button
              onClick={() => scrollTo("kontakt")}
              className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.18em] uppercase text-black bg-white hover:bg-white/90 active:scale-[0.98] transition-all duration-300 rounded-full px-4 py-1.5 font-semibold"
            >
              Termin
              <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[9px] leading-none group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-7 h-7 ml-auto"
            aria-label="Menü"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block w-5 h-[1.5px] bg-white/70 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-white/70"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block w-5 h-[1.5px] bg-white/70 origin-center"
            />
          </button>
        </div>
      </motion.div>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#080808]/96 backdrop-blur-3xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => { scrollTo(link.target); setMenuOpen(false); }}
                className="font-display text-3xl font-bold text-white/60 hover:text-white transition-colors tracking-widest uppercase"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.28, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => { scrollTo("kontakt"); setMenuOpen(false); }}
              className="mt-4 flex items-center gap-2 px-8 py-4 bg-white text-black font-sans font-bold text-xs tracking-[0.22em] uppercase rounded-full active:scale-[0.98] transition-all"
            >
              Termin anfragen
              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">→</span>
            </motion.button>
            <div className="flex gap-6 mt-4">
              <a href="https://wa.me/4915257668403" target="_blank" rel="noreferrer" className="font-sans text-xs text-[#25D366]/70 tracking-[0.15em] uppercase">WhatsApp</a>
              <a href="https://instagram.com/tattooartist_nataschalee" target="_blank" rel="noreferrer" className="font-sans text-xs text-white/25 tracking-[0.15em] uppercase hover:text-white transition-colors">Instagram</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
