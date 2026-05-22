"use client";

const techs = [
  { name: "Next.js", icon: "▲" },
  { name: "Three.js", icon: "◈" },
  { name: "React", icon: "⚛" },
  { name: "TypeScript", icon: "TS" },
  { name: "Framer Motion", icon: "◉" },
  { name: "GSAP", icon: "G" },
  { name: "Tailwind CSS", icon: "◇" },
  { name: "Vercel", icon: "△" },
  { name: "WebGL", icon: "◆" },
  { name: "Claude Code", icon: "✦" },
];

function MarqueeRow({
  items,
  reverse,
}: {
  items: typeof techs;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex gap-8 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/8 bg-white/3 backdrop-blur-sm hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 cursor-default"
          >
            <span className="text-accent font-mono text-sm">{item.icon}</span>
            <span className="text-sm text-muted font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg z-10 pointer-events-none" />
      <div className="mb-4">
        <MarqueeRow items={techs} />
      </div>
      <MarqueeRow items={[...techs].reverse()} reverse />
    </section>
  );
}
