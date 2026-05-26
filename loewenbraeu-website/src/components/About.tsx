const INTERIOR = "https://img02.restaurantguru.com/c689-Restaurant-Munchner-Lowenbrau-interior.jpg";

export function About() {
  return (
    <section id="ueber-uns" className="py-36 px-[5%]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[3fr_2fr] gap-20 items-center">

        {/* Image — large, photography-first */}
        <div className="relative overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={INTERIOR}
            alt="Innenraum Münchener Löwenbräu Lemgo"
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ filter: "brightness(0.88) saturate(0.9)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-bg/60 to-transparent" />
        </div>

        {/* Text */}
        <div>
          <span className="gold-rule" />
          <h2 className="font-display font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-cream mb-7">
            50 Jahre<br />Tradition
          </h2>
          <p className="font-sans text-[0.82rem] text-muted leading-[2.0] mb-5">
            Was als kleines Gasthaus begann, ist heute eines der beständigsten
            Restaurants Lemgos. Über ein halbes Jahrhundert kochen wir mit
            denselben Rezepten und derselben Leidenschaft.
          </p>
          <p className="font-sans text-[0.82rem] text-muted leading-[2.0] mb-10">
            Balkanische Hausmannskost trifft auf deutsche Gastfreundschaft —
            Ćevapčići nach Originalrezept, Steaks vom Grill, Schnitzel die
            satt machen.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {[
              { num: "4,8 ★", label: "Google-Bewertung" },
              { num: "347",   label: "Rezensionen"      },
              { num: "50+",   label: "Jahre"             },
              { num: "Mi–So", label: "Geöffnet"          },
            ].map((s) => (
              <div key={s.label} className="border-t border-border pt-4">
                <span className="font-display font-light text-[1.6rem] text-gold-lt block leading-none mb-1">{s.num}</span>
                <span className="font-sans text-[0.62rem] text-muted tracking-[0.14em] uppercase">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
