"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Über uns",    target: "ueberuns"    },
  { label: "Wanna DOs",   target: "wanna-dos"   },
  { label: "Stile",       target: "stile"        },
  { label: "Portfolio",   target: "portfolio"    },
  { label: "Ablauf",      target: "ablauf"       },
  { label: "Bewertungen", target: "bewertungen"  },
  { label: "FAQ",         target: "faq"          },
  { label: "Kontakt",     target: "kontakt"      },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── FLOATING NAVBAR ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto"
      >
        <div className={`
          mx-auto flex items-center justify-between md:justify-start gap-6
          px-5 md:px-7 h-12
          transition-all duration-500
          ${scrolled
            ? "bg-black/92 backdrop-blur-2xl border border-gold/15 shadow-[0_4px_40px_rgba(0,0,0,0.8)]"
            : "bg-black/60 backdrop-blur-xl border border-white/6"
          }
        `}>

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            {/* SVG mark */}
            <svg width="18" height="22" viewBox="0 0 24 28" fill="none">
              <path d="M12 1 C9.5 1.8 8 4 9 6.2 C9.8 4.2 11.5 3 13.2 3.2 C12.2 2 12 1 12 1 Z" fill="rgba(212,175,55,0.85)"/>
              <path d="M10.5 3.5 L10.5 9 L12 6.5 L13.5 9 L13.5 3.5 Z" fill="rgba(212,175,55,0.75)"/>
              <rect x="7.5" y="9" width="9" height="1.8" fill="rgba(212,175,55,0.55)"/>
              <rect x="8.5" y="10.8" width="7" height="7" fill="rgba(212,175,55,0.42)"/>
              <path d="M10.5 12 Q12 11 13.5 12 L13.5 16.5 L10.5 16.5 Z" fill="#000" fillOpacity="0.75"/>
              <path d="M6.5 14 L8.5 12 L8.5 17.8 Z" fill="rgba(212,175,55,0.22)"/>
              <path d="M17.5 14 L15.5 12 L15.5 17.8 Z" fill="rgba(212,175,55,0.22)"/>
              <rect x="5" y="17.8" width="14" height="2.2" fill="rgba(212,175,55,0.32)"/>
              <rect x="6.5" y="20" width="11" height="1.5" fill="rgba(212,175,55,0.18)"/>
              <rect x="8"   y="21.5" width="8" height="1.5" fill="rgba(212,175,55,0.12)"/>
            </svg>
            <span className="font-display text-sm tracking-[0.2em]">
              <span className="text-cream/75 group-hover:text-cream transition-colors">LEMGO</span>
              <span className="text-gold"> INK</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-5">
            <div className="w-px h-4 bg-gold/15" />
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="font-sans text-[9px] tracking-[0.18em] uppercase text-cream/35
                  hover:text-gold transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <div className="w-px h-4 bg-gold/15" />
            <button
              onClick={() => scrollTo("kontakt")}
              className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.18em] uppercase
                text-black bg-gold hover:bg-gold-light active:scale-[0.97]
                transition-all duration-300 px-4 py-1.5 font-semibold"
            >
              Termin
              <span className="w-4 h-4 bg-black/15 flex items-center justify-center text-[9px]">→</span>
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-7 h-7 ml-auto"
            aria-label="Menü"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block w-5 h-[1.5px] bg-gold/70 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-gold/70"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block w-5 h-[1.5px] bg-gold/70 origin-center"
            />
          </button>
        </div>
      </motion.div>

      {/* ── MOBILE FULLSCREEN OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/97 backdrop-blur-3xl flex flex-col items-center justify-center gap-6"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.055, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => { scrollTo(link.target); setMenuOpen(false); }}
                className="font-display text-[clamp(36px,8vw,52px)] text-cream/50
                  hover:text-gold transition-colors tracking-widest uppercase"
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => { scrollTo("kontakt"); setMenuOpen(false); }}
              className="mt-6 flex items-center gap-2 px-8 py-4
                bg-gold text-black font-sans font-bold text-[11px] tracking-[0.22em] uppercase
                active:scale-[0.97] transition-all"
            >
              Termin anfragen
              <span className="w-5 h-5 bg-black/15 flex items-center justify-center text-[10px]">→</span>
            </motion.button>

            <div className="flex gap-6 mt-4">
              <a href="https://wa.me/4915257668403" target="_blank" rel="noreferrer"
                className="font-sans text-xs text-[#25D366]/70 tracking-[0.15em] uppercase">
                WhatsApp
              </a>
              <a href="https://instagram.com/tattooartist_nataschalee" target="_blank" rel="noreferrer"
                className="font-sans text-xs text-cream/25 tracking-[0.15em] uppercase hover:text-gold transition-colors">
                Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
