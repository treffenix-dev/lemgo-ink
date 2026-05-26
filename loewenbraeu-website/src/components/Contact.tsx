const HOURS = [
  { day: "Montag",     time: "Ruhetag",                        closed: true },
  { day: "Dienstag",   time: "Ruhetag",                        closed: true },
  { day: "Mittwoch",   time: "11:30 bis 14:00  ·  17:00 bis 22:30" },
  { day: "Donnerstag", time: "11:30 bis 14:00  ·  17:00 bis 22:30" },
  { day: "Freitag",    time: "11:30 bis 14:00  ·  17:00 bis 22:30" },
  { day: "Samstag",    time: "11:30 bis 14:00  ·  17:00 bis 22:30" },
  { day: "Sonntag",    time: "11:30 bis 14:00  ·  17:00 bis 22:30" },
];

export function Contact() {
  return (
    <>
      {/* Öffnungszeiten — eigene Section */}
      <section id="oeffnungszeiten" className="py-36 px-[5%] bg-surface">
        <div className="max-w-3xl mx-auto">
          <span className="gold-rule" />
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] text-cream mb-12">
            Öffnungszeiten
          </h2>
          <table className="w-full">
            <tbody>
              {HOURS.map((h) => (
                <tr key={h.day} className="border-b border-border">
                  <td className={`py-3.5 font-sans text-[0.8rem] ${h.closed ? "text-muted/40" : "text-muted"}`}>
                    {h.day}
                  </td>
                  <td className={`py-3.5 font-sans text-[0.8rem] text-right ${h.closed ? "text-muted/40" : "text-cream"}`}>
                    {h.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-sans text-[0.72rem] text-muted mt-6">
            Reservierung empfohlen · Barzahlung vor Ort
          </p>
        </div>
      </section>

      {/* Kontakt — eigene Section */}
      <section id="kontakt" className="py-36 px-[5%]">
        <div className="max-w-3xl mx-auto">
          <span className="gold-rule" />
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] text-cream mb-12">
            Kontakt
          </h2>
          <div className="flex flex-col gap-8">
            {[
              { label: "Adresse",      val: "Mittelstraße 144\n32657 Lemgo" },
              { label: "Telefon",      val: "05261 4267",                     href: "tel:+4952614267" },
              { label: "Inhaber",      val: "Danko Bradaric" },
              { label: "Zahlung",      val: "Barzahlung vor Ort" },
            ].map((i) => (
              <div key={i.label}>
                <span className="font-sans text-[0.6rem] tracking-[0.28em] uppercase text-gold block mb-1.5">{i.label}</span>
                {i.href ? (
                  <a href={i.href} className="font-display font-light text-[1.2rem] text-cream hover:text-gold-lt transition-colors whitespace-pre-line">
                    {i.val}
                  </a>
                ) : (
                  <span className="font-display font-light text-[1.2rem] text-cream/80 whitespace-pre-line">{i.val}</span>
                )}
              </div>
            ))}

            <a
              href="https://maps.google.com/?q=Mittelstra%C3%9Fe+144+32657+Lemgo"
              target="_blank"
              rel="noreferrer"
              className="inline-block font-sans text-[0.7rem] tracking-[0.22em] uppercase text-cream border border-cream/20 px-8 py-3.5 hover:border-gold-lt hover:text-gold-lt transition-all duration-300 w-fit mt-2"
            >
              In Google Maps öffnen →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
