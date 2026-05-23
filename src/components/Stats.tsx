"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { animate } from "animejs";

const stats = [
  { value: 4.7, suffix: "★", label: "Google Rating" },
  { value: 39, suffix: "+", label: "Bewertungen" },
  { value: 5, suffix: "J", label: "Erfahrung" },
  { value: 100, suffix: "%", label: "Custom Designs" },
];

function Counter({ value, inView }: { value: number; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isDecimal = value % 1 !== 0;
  const proxy = useRef({ val: 0 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    proxy.current.val = 0;
    const anim = animate(proxy.current, {
      val: value,
      duration: 2200,
      ease: "outExpo",
      onUpdate() {
        if (ref.current)
          ref.current.textContent = isDecimal
            ? proxy.current.val.toFixed(1)
            : Math.floor(proxy.current.val).toString();
      },
    });
    return () => { anim.pause(); };
  }, [inView, value, isDecimal]);

  return (
    <span ref={ref} className="font-display text-[clamp(36px,6vw,56px)] text-gold tabular-nums">
      0
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-0 border-y border-gold/8 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gold/8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="py-12 px-8 text-center"
            >
              <div className="flex items-end justify-center gap-1 mb-2">
                <Counter value={s.value} inView={inView} />
                <span className="font-display text-[clamp(20px,4vw,32px)] text-gold mb-1">
                  {s.suffix}
                </span>
              </div>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-cream/25">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
