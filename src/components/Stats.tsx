"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Projekte umgesetzt", color: "text-accent" },
  { value: 98, suffix: "%", label: "Kundenzufriedenheit", color: "text-cyan" },
  { value: 5, suffix: "x", label: "Schneller mit KI", color: "text-violet" },
  { value: 2.4, suffix: "M€", label: "Umsatz generiert", color: "text-emerald-400" },
];

function Counter({
  value,
  suffix,
  color,
  inView,
}: {
  value: number;
  suffix: string;
  color: string;
  inView: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const isDecimal = value % 1 !== 0;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(latest) {
        node.textContent = isDecimal ? latest.toFixed(1) : Math.floor(latest).toString();
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className={`font-display text-6xl md:text-7xl font-bold tabular-nums ${color}`}
    >
      0
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 border-y border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-cyan/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-white/8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="flex flex-col items-center text-center lg:px-12"
            >
              <div className="flex items-end gap-1 mb-3">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                  inView={inView}
                />
                <span className={`font-display text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm text-muted leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
