const INTERIOR = "https://img02.restaurantguru.com/c689-Restaurant-Munchner-Lowenbrau-interior.jpg";

export function About() {
  const stats = [
    { num: "4,8 ★", label: "Google-Bewertung" },
    { num: "347",   label: "Bewertungen" },
    { num: "50+",   label: "Jahre Erfahrung" },
    { num: "Di–So", label: "Geöffnet" },
  ];

  return (
    <section id="ueber-uns" className="py-28 px-[5%]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-3 block">Unsere Geschichte</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight mb-5">
            50 Jahre<br />gute Küche in Lemgo
          </h2>
          <p className="text-muted text-sm leading-loose max-w-md mb-5">
            Was als kleines Gasthaus in der Lemgoer Innenstadt begann, ist heute
            eines der beständigsten Restaurants der Stadt. Seit über einem halben
            Jahrhundert kochen wir mit denselben Rezepten, denselben Zutaten —
            und derselben Leidenschaft.
          </p>
          <p className="text-muted text-sm leading-loose max-w-md">
            Balkanische Hausmannskost trifft auf deutsche Gastfreundschaft.
            Ćevapčići nach Originalrezept, Steaks vom Grill und Schnitzel
            die satt machen — das ist unser Versprechen.
          </p>

          <div className="grid grid-cols-2 gap-5 mt-10">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-gold/40 pl-4">
                <span className="font-display text-[1.8rem] text-gold-lt block">{s.num}</span>
                <span className="text-[0.72rem] text-muted tracking-[0.1em]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden border border-border group aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={INTERIOR}
            alt="Innenraum Münchener Löwenbräu"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] brightness-90"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/80 to-transparent px-4 py-3 text-[0.68rem] text-gold tracking-[0.2em] uppercase">
            Innenraum · Mittelstraße 144, Lemgo
          </div>
        </div>
      </div>
    </section>
  );
}
