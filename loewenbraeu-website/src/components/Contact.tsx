const HOURS = [
  { day: "Montag",     time: "Ruhetag",                     closed: true },
  { day: "Dienstag",   time: "Ruhetag",                     closed: true },
  { day: "Mittwoch",   time: "11:30–14:00 · 17:00–22:30" },
  { day: "Donnerstag", time: "11:30–14:00 · 17:00–22:30" },
  { day: "Freitag",    time: "11:30–14:00 · 17:00–22:30" },
  { day: "Samstag",    time: "11:30–14:00 · 17:00–22:30" },
  { day: "Sonntag",    time: "11:30–14:00 · 17:00–22:30" },
];

export function Contact() {
  return (
    <section id="kontakt" className="py-28 px-[5%]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-3 block">Besuchen Sie uns</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-8">Öffnungszeiten</h2>
          <table className="w-full">
            <tbody>
              {HOURS.map((h) => (
                <tr key={h.day} className={`border-b border-border ${h.closed ? "opacity-35" : ""}`}>
                  <td className="py-3 text-sm text-muted">{h.day}</td>
                  <td className="py-3 text-sm text-cream text-right">{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <span className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-3 block">Kontakt & Anfahrt</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-8">Finden Sie uns</h2>
          <div className="flex flex-col divide-y divide-border border-t border-border">
            {[
              { label: "Adresse",       val: "Mittelstraße 144, 32657 Lemgo" },
              { label: "Telefon",       val: "05261 4267",       href: "tel:+4952614267" },
              { label: "Reservierung",  val: "Tischreservierung empfohlen" },
              { label: "Zahlung",       val: "Nur Barzahlung" },
            ].map((i) => (
              <div key={i.label} className="flex flex-col gap-0.5 py-4">
                <span className="text-[0.65rem] tracking-[0.28em] uppercase text-gold">{i.label}</span>
                {i.href ? (
                  <a href={i.href} className="text-[0.92rem] text-cream hover:text-gold-lt transition-colors">{i.val}</a>
                ) : (
                  <span className="text-[0.92rem] text-cream">{i.val}</span>
                )}
              </div>
            ))}
          </div>
          <a
            href="https://maps.google.com/?q=Mittelstra%C3%9Fe+144+32657+Lemgo"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-gold text-bg text-[0.8rem] font-medium tracking-[0.14em] uppercase px-7 py-3.5 hover:bg-gold-lt transition-colors"
          >
            In Google Maps öffnen →
          </a>
        </div>
      </div>
    </section>
  );
}
