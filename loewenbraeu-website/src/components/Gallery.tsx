const PHOTOS = [
  { src: "https://img02.restaurantguru.com/c8/Restaurant-Munchener-Lowenbrau-food.jpg",     alt: "Speisen im Münchener Löwenbräu", main: true },
  { src: "https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg",    alt: "Gerichte Münchener Löwenbräu" },
  { src: "https://img02.restaurantguru.com/c8/Restaurant-Munchener-Lowenbrau-photo.jpg",    alt: "Münchener Löwenbräu Lemgo" },
  { src: "https://img02.restaurantguru.com/c689-Restaurant-Munchner-Lowenbrau-interior.jpg",alt: "Innenraum Münchener Löwenbräu" },
];

export function Gallery() {
  return (
    <section className="py-24 px-[5%] bg-surface">
      <div className="max-w-5xl mx-auto">
        <span className="text-[0.68rem] tracking-[0.42em] uppercase text-gold mb-3 block">Eindrücke</span>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-10">Aus unserem Restaurant</h2>

        <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-1.5 sm:gap-2">
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              className={`overflow-hidden group ${i === 0 ? "row-span-2" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 brightness-90 group-hover:brightness-100 ${
                  i === 0 ? "aspect-[3/2]" : "aspect-[4/3]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
