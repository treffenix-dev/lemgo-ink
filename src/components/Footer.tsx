export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/8 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-3 gap-10 py-14 border-b border-cream/5">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-bold mb-3 tracking-widest">
              <span className="text-cream/85">LEMGO</span>
              <span className="text-gold"> INK</span>
            </div>
            <p className="font-sans text-xs text-cream/25 leading-[1.85] max-w-[200px]">
              Privates Tattoo Studio in Lemgo NRW. Nur nach Terminvereinbarung.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold/40 block mb-5">Navigation</span>
            <div className="flex flex-col gap-3">
              {[
                { label: "Über uns", href: "#ueberuns" },
                { label: "Stile", href: "#stile" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Kontakt", href: "#kontakt" },
              ].map((l) => (
                <a key={l.label} href={l.href} className="font-sans text-xs text-cream/30 hover:text-gold transition-colors tracking-wide">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold/40 block mb-5">Kontakt</span>
            <div className="flex flex-col gap-3">
              <a href="tel:+4915257668403" className="font-sans text-xs text-cream/30 hover:text-gold transition-colors">+49 1525 7668403</a>
              <a href="https://wa.me/4915257668403" target="_blank" rel="noreferrer" className="font-sans text-xs text-[#25D366]/60 hover:text-[#25D366] transition-colors">WhatsApp</a>
              <a href="https://instagram.com/tattooartist_nataschalee" target="_blank" rel="noreferrer" className="font-sans text-xs text-cream/30 hover:text-gold transition-colors">@tattooartist_nataschalee</a>
              <span className="font-sans text-xs text-cream/20">Papenstraße 56, 32657 Lemgo</span>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[11px] text-cream/15 tracking-wide">
            © {year} Lemgo INK · Natascha Wehr · Alle Rechte vorbehalten
          </p>
          <div className="flex gap-6">
            <span className="font-sans text-[11px] text-cream/15 tracking-wide">Impressum</span>
            <span className="font-sans text-[11px] text-cream/15 tracking-wide">Datenschutz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
