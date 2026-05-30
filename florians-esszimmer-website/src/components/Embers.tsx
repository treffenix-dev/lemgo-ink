"use client";

import { useEffect, useRef } from "react";

/**
 * Lebendiges Kerzenlicht: warme Funken steigen langsam auf und flackern.
 * Canvas-basiert, leichtgewichtig, SSR-sicher, respektiert reduced-motion.
 */
export default function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; t: number };
    const spawn = (): P => ({
      x: Math.random() * w,
      y: h + Math.random() * h * 0.6,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.5 + 0.15,
      vx: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.15,
      t: Math.random() * Math.PI * 2,
    });

    const N = Math.min(80, Math.floor(w / 16));
    const parts: P[] = Array.from({ length: N }, spawn);

    let raf = 0;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy;
        p.t += 0.02;
        p.x += p.vx + Math.sin(p.t) * 0.2;
        if (p.y < -10) Object.assign(p, spawn(), { y: h + 10 });
        const flick = 0.55 + Math.sin(p.t * 3) * 0.45;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 180, 96, ${p.a * flick})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(233, 150, 60, 0.85)";
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden />;
}
