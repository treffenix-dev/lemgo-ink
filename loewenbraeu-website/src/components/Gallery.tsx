const PHOTOS = [
  { src: "https://img02.restaurantguru.com/c8/Restaurant-Munchener-Lowenbrau-food.jpg",      alt: "Speisen im Münchener Löwenbräu", span: "row-span-2" },
  { src: "https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg",     alt: "Gerichte Münchener Löwenbräu",   span: "" },
  { src: "https://img02.restaurantguru.com/c8/Restaurant-Munchener-Lowenbrau-photo.jpg",     alt: "Münchener Löwenbräu Lemgo",      span: "" },
  { src: "https://img02.restaurantguru.com/c689-Restaurant-Munchner-Lowenbrau-interior.jpg", alt: "Innenraum Münchener Löwenbräu",  span: "" },
];

export function Gallery() {
  return (
    <section className="py-36 px-[5%] bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="gold-rule" />
            <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] text-cream">
              Eindrücke
            </h2>
          </div>
          <p className="font-sans text-[0.68rem] text-muted tracking-[0.16em] uppercase hidden md:block">
            Mittelstraße 144 · Lemgo
          </p>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr_1fr] grid-rows-2 gap-[3px]">
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              className={`overflow-hidden group ${p.span}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
                style={{
                  filter: "brightness(0.85) saturate(0.85)",
                  aspectRatio: i === 0 ? "auto" : "4/3",
                  minHeight: i === 0 ? "100%" : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
