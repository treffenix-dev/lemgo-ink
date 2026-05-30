"use client";

/** Rote Laufschrift quer über die Seite. */
export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-red text-paper select-none">
      <div className="flex w-max animate-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-7 py-3 font-display text-xl md:text-3xl uppercase tracking-wide">{t}</span>
            <span className="text-paper/70 text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
