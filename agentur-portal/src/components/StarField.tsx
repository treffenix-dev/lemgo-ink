"use client";

import { useEffect, useRef } from "react";

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight * 3; // cover full page
    canvas.width = W;
    canvas.height = H;

    // Generate stars
    const STARS = 220;
    const stars = Array.from({ length: STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.3,
      speed: Math.random() * 0.18 + 0.04,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.012 + 0.004,
      baseAlpha: Math.random() * 0.28 + 0.08,
    }));

    let t = 0;
    let raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      t += 1;

      for (const s of stars) {
        const alpha = s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.12;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,195,255,${Math.max(0, alpha)})`;
        ctx.fill();

        // Slow vertical drift
        s.y -= s.speed;
        if (s.y < -2) s.y = H + 2;
      }
    };
    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight * 3;
      canvas.width = W;
      canvas.height = H;
      stars.forEach((s) => {
        s.x = Math.random() * W;
        s.y = Math.random() * H;
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
}
