"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const hours = [
  { day: "Dienstag",    time: "12:00 – 18:00" },
  { day: "Mittwoch",    time: "12:00 – 18:00" },
  { day: "Donnerstag",  time: "12:00 – 18:00" },
  { day: "Freitag",     time: "14:00 – 20:00" },
  { day: "Samstag",     time: "11:00 – 15:00" },
  { day: "Sonntag",     time: "Geschlossen"   },
  { day: "Montag",      time: "Geschlossen"   },
];

const tattooStyles = [
  "Black & Grey", "Realism", "Fine Line",
  "Old School", "Japanese", "Cover-Up",
  "Piercing", "Custom Design",
];

/* Floating label input ───────────────────────────────────────────────── */
function FloatInput({
  label, type = "text", required = false, value, onChange, placeholder,
}: {
  label: string; type?: string; required?: boolean;
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || !!value;

  return (
    <div className="relative group">
      <label
        className="absolute left-4 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none z-10"
        style={{
          top:       active ? "8px"  : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontSize:  active ? "9px"  : "11px",
          color:     focused ? "rgba(212,175,55,0.8)" : "rgba(245,245,245,0.3)",
        }}
      >
        {label}{required && " *"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={active ? (placeholder || "") : ""}
        className="w-full bg-white/[0.04] border-b border-white/12 focus:border-gold/50
          text-cream font-sans text-sm px-4 pb-3 pt-6 outline-none transition-colors
          placeholder:text-cream/15 group-hover:bg-white/[0.06]"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold"
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

function FloatTextarea({
  label, required = false, value, onChange, rows = 4, placeholder,
}: {
  label: string; required?: boolean; value: string;
  onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || !!value;

  return (
    <div className="relative group">
      <label
        className="absolute left-4 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none z-10"
        style={{
          top:      active ? "10px" : "18px",
          fontSize: active ? "9px"  : "11px",
          color:    focused ? "rgba(212,175,55,0.8)" : "rgba(245,245,245,0.3)",
        }}
      >
        {label}{required && " *"}
      </label>
      <textarea
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={active ? (placeholder || "") : ""}
        className="w-full bg-white/[0.04] border border-white/8 focus:border-gold/35
          text-cream font-sans text-sm px-4 pb-4 pt-7 outline-none
          transition-colors resize-none placeholder:text-cream/15 group-hover:bg-white/[0.06]"
      />
    </div>
  );
}

/* Magnetic button ─────────────────────────────────────────────────────── */
function MagneticButton({ children, type = "button", onClick }: {
  children: React.ReactNode; type?: "button" | "submit"; onClick?: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn  = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x    = (e.clientX - rect.left - rect.width  / 2) * 0.25;
    const y    = (e.clientY - rect.top  - rect.height / 2) * 0.25;
    btn.style.transform  = `translate(${x}px, ${y}px)`;
    btn.style.transition = "transform 0.1s ease-out";
  };
  const onLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform  = "translate(0,0)";
      btnRef.current.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
    }
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="w-full flex items-center justify-center gap-2.5 py-4
        bg-gold text-black font-sans font-bold text-[11px] tracking-[0.22em] uppercase
        hover:bg-gold-light active:scale-[0.97] transition-colors duration-300
        shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]"
      data-cursor="SENDEN"
    >
      {children}
    </button>
  );
}

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "", email: "", phone: "", style: "", placement: "", size: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hallo Natascha!\n\nTerminanfrage von ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone || "—"}\nStil: ${form.style || "—"}\nPlatzierung: ${form.placement || "—"}\nGröße: ${form.size || "—"}\n\nMotiv:\n${form.message}`;
    window.open(`https://wa.me/4915257668403?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <section id="kontakt" className="py-28 relative overflow-hidden bg-black">
      {/* Gold radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24
        bg-gradient-to-b from-transparent to-gold/40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div ref={ref} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gold/25 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-gold-pulse" />
            <span className="font-sans text-[10px] tracking-[0.25em] text-gold/70 uppercase">Booking offen</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display text-cream/92 leading-none mb-5"
            style={{ fontSize: "clamp(48px,8vw,96px)" }}
          >
            DEIN MOTIV.<br />
            <span className="gold-text">DEINE HAUT.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="font-sans text-cream/35 font-light text-[15px] max-w-lg mx-auto leading-[1.85]"
          >
            Erstgespräche sind kostenlos und unverbindlich.
            Schreib Natascha direkt an — wir finden dein Motiv.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT — contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-display text-2xl text-cream/85 mb-8 tracking-wide">DIREKT ERREICHBAR</h3>

            {/* WhatsApp */}
            <a href="https://wa.me/4915257668403?text=Hallo%20Natascha%2C%20ich%20m%C3%B6chte%20einen%20Termin%20anfragen."
              target="_blank" rel="noreferrer"
              className="flex items-center gap-4 p-5 mb-3 glass
                border-[#25D366]/20 hover:border-[#25D366]/40 hover:bg-[#25D366]/8
                transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-sans text-sm font-semibold text-[#25D366]">WhatsApp</div>
                <div className="font-sans text-xs text-cream/35">+49 1525 7668403</div>
              </div>
              <span className="text-[#25D366]/40 group-hover:text-[#25D366] transition-colors">→</span>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/tattooartist_nataschalee"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-4 p-5 mb-3 glass
                hover:border-pink-500/40 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-sans text-sm font-semibold text-pink-400">Instagram</div>
                <div className="font-sans text-xs text-cream/35">@tattooartist_nataschalee</div>
              </div>
              <span className="text-pink-400/40 group-hover:text-pink-400 transition-colors">→</span>
            </a>

            {/* Phone */}
            <a href="tel:+4915257668403"
              className="flex items-center gap-4 p-5 mb-8 glass
                hover:border-gold/30 transition-all duration-300 group">
              <div className="w-10 h-10 border border-gold/25 flex items-center justify-center flex-shrink-0">
                <span className="text-gold/60 text-sm">✆</span>
              </div>
              <div className="flex-1">
                <div className="font-sans text-sm font-medium text-cream/55 group-hover:text-cream transition-colors">Telefon</div>
                <div className="font-sans text-xs text-cream/30">+49 1525 7668403</div>
              </div>
              <span className="text-cream/20 group-hover:text-gold transition-colors">→</span>
            </a>

            {/* Hours */}
            <div className="glass-gold p-6">
              <h4 className="font-display text-lg text-gold/75 tracking-widest uppercase mb-5">Öffnungszeiten</h4>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="font-sans text-xs text-cream/30">{h.day}</span>
                    <span className={`font-sans text-xs font-medium ${h.time === "Geschlossen" ? "text-cream/18" : "text-cream/55"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.28 }}
            className="glass p-8 md:p-10"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-6 text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 border border-gold/40 flex items-center justify-center"
                >
                  <span className="text-gold text-2xl">✓</span>
                </motion.div>
                <h3 className="font-display text-3xl text-cream/90">ANFRAGE GESENDET!</h3>
                <p className="font-sans text-sm text-cream/35 font-light leading-[1.8] max-w-xs">
                  WhatsApp öffnet sich mit deiner Nachricht. Natascha meldet sich innerhalb von 48 h.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="font-sans text-[10px] tracking-[0.22em] uppercase text-gold/50
                    border-b border-gold/20 pb-1 hover:text-gold hover:border-gold transition-colors"
                >
                  Neue Anfrage
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-2xl text-cream/85 mb-8">TERMINANFRAGE</h3>

                <div className="grid grid-cols-2 gap-4">
                  <FloatInput label="Name"   required value={form.name}  onChange={set("name")} />
                  <FloatInput label="E-Mail" type="email" required value={form.email} onChange={set("email")} />
                </div>

                <FloatInput label="Telefon" type="tel" value={form.phone} onChange={set("phone")} placeholder="+49..." />

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-cream/30 mb-2">Stil</label>
                    <select
                      value={form.style}
                      onChange={(e) => setForm({ ...form, style: e.target.value })}
                      className="w-full bg-white/[0.04] border-b border-white/12 focus:border-gold/50
                        text-cream/65 font-sans text-sm px-0 py-3 outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Auswählen</option>
                      {tattooStyles.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <FloatInput label="Platzierung" value={form.placement} onChange={set("placement")} placeholder="z.B. Unterarm" />
                </div>

                <FloatInput label="Gewünschte Größe" value={form.size} onChange={set("size")} placeholder="z.B. 10 × 8 cm" />

                <FloatTextarea
                  label="Beschreibe dein Motiv"
                  required
                  value={form.message}
                  onChange={set("message")}
                  rows={4}
                  placeholder="Motiv, Bedeutung, Referenzen — Bilder direkt per WhatsApp schicken."
                />

                <MagneticButton type="submit">
                  Anfrage per WhatsApp senden
                  <span className="w-6 h-6 bg-black/15 flex items-center justify-center text-[11px]">→</span>
                </MagneticButton>

                <p className="font-sans text-[10px] text-cream/20 text-center leading-[1.7]">
                  Das Formular öffnet WhatsApp mit deiner Nachricht. Kostenlos & unverbindlich.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
