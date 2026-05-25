const REVIEWS = [
  { text: "Freundlicher Service, Sauberkeit, gutes Preis-Leistungs-Verhältnis und perfekte Steaks. Wir kommen immer wieder gerne.", author: "Google-Rezension" },
  { text: "Über 50 Jahre erfolgreiche Gastronomie — das sagt alles. Die Ćevapčići sind die besten in der Region.", author: "Google-Rezension" },
  { text: "Tolles Essen, gemütliche Atmosphäre, sehr aufmerksames Personal. Das Schnitzel war hervorragend, gerne wieder!", author: "Google-Rezension" },
];

export function Reviews() {
  return (
    <section id="bewertungen" className="py-28 px-[5%] bg-surface">
      <div className="max-w-5xl mx-auto">
        <span className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-3 block">Was unsere Gäste sagen</span>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-10">Kundenbewertungen</h2>

        <div className="flex items-center gap-6 pb-8 mb-8 border-b border-border">
          <span className="font-display text-6xl text-gold-lt leading-none">4,8</span>
          <div>
            <div className="text-gold text-xl tracking-widest">★★★★★</div>
            <div className="text-[0.78rem] text-muted mt-1">347 Google-Bewertungen · Platz 29 von 109 in Lemgo</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.text} className="bg-bg border border-border p-6">
              <div className="text-gold text-sm tracking-widest mb-3">★★★★★</div>
              <p className="text-[0.88rem] text-cream leading-loose italic mb-4">&bdquo;{r.text}&ldquo;</p>
              <p className="text-[0.72rem] text-muted">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
