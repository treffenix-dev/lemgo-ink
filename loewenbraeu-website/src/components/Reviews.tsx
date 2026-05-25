const REVIEWS = [
  { text: "Freundlicher Service, Sauberkeit, gutes Preis-Leistungs-Verhältnis und perfekte Steaks. Wir kommen immer wieder gerne.", author: "Google-Rezension" },
  { text: "Über 50 Jahre erfolgreiche Gastronomie — das sagt alles. Die Ćevapčići sind die besten in der Region.", author: "Google-Rezension" },
  { text: "Tolles Essen, gemütliche Atmosphäre, sehr aufmerksames Personal. Das Schnitzel war hervorragend, gerne wieder!", author: "Google-Rezension" },
];

export function Reviews() {
  return (
    <section id="bewertungen" className="py-36 px-[5%]">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="gold-rule" />
            <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] text-cream">
              Was unsere Gäste sagen
            </h2>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display font-light text-5xl text-gold-lt">4,8</span>
            <div>
              <div className="text-gold text-sm tracking-widest">★★★★★</div>
              <div className="font-sans text-[0.65rem] text-muted mt-0.5">347 Google-Bewertungen</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {REVIEWS.map((r) => (
            <div key={r.text} className="bg-bg p-10 flex flex-col gap-6">
              <span className="font-display text-5xl text-gold/25 leading-none select-none">&ldquo;</span>
              <p className="font-display font-light text-[1.05rem] text-cream/80 leading-[1.7] flex-1">
                {r.text}
              </p>
              <div className="flex items-center gap-3">
                <span className="w-4 h-px bg-gold/40" />
                <span className="font-sans text-[0.62rem] text-muted tracking-[0.16em] uppercase">{r.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
