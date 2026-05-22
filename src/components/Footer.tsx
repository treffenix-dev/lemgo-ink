export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center">
              <span className="text-white text-xs font-black">3D</span>
            </div>
            <span className="font-display font-bold text-lg">STUDIO</span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm text-muted">
            {["Leistungen", "Projekte", "Prozess", "Kontakt"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted">
            © {year} STUDIO. Gebaut mit Next.js + Three.js
          </p>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-muted/50">
            Gebaut mit{" "}
            <span className="gradient-text font-medium">Claude Code</span> —
            was Agenturen für €5.000+ verkaufen, baust du jetzt selbst.
          </p>
        </div>
      </div>
    </footer>
  );
}
