"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { value: 4.7, suffix: "★", label: "Google Rating", color: "text-gold" },
  { value: 39, suffix: "+", label: "Bewertungen", color: "text-gold" },
  { value: 5, suffix: "J", label: "Erfahrung", color: "text-gold" },
  { value: 100, suffix: "%", label: "Custom Designs", color: "text-gold" },
];

function Counter({
  value, suffix, inView,
}: {
  value: number; suffix: string; inView: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const isDecimal = value % 1 !== 0;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent = isDecimal ? v.toFixed(1) : Math.floor(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-[clamp(36px,6vw,56px)] font-bold text-gold tabular-nums">
      0
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-0 border-y border-gold/8 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gold/8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="py-12 px-8 text-center"
            >
              <div className="flex items-end justify-center gap-1 mb-2">
                <Counter value={s.value} suffix={s.suffix} inView={inView} />
                <span className="font-display text-[clamp(20px,4vw,32px)] font-bold text-gold mb-1">
                  {s.suffix}
                </span>
              </div>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-cream/25">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
