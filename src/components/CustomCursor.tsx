"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const label = labelRef.current;
    if (!outer || !inner || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outerX = mouseX;
    let outerY = mouseY;
    let rafId = 0;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      outerX += (mouseX - outerX) * 0.1;
      outerY += (mouseY - outerY) * 0.1;

      inner.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      outer.style.transform = `translate(${outerX - 20}px, ${outerY - 20}px)`;
      label.style.transform = `translate(${mouseX + 22}px, ${mouseY - 10}px)`;

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    /* Hover on interactive elements */
    const onEnter = (e: Event) => {
      isHovering = true;
      outer.style.width  = "52px";
      outer.style.height = "52px";
      outer.style.borderColor = "rgba(212,175,55,0.7)";
      outer.style.background  = "rgba(212,175,55,0.06)";
      inner.style.background  = "#D4AF37";
      outer.style.transition  = "width .3s ease, height .3s ease, border-color .3s ease, background .3s ease";

      const el = e.currentTarget as HTMLElement;
      const text = el.dataset.cursor;
      if (text) {
        label.textContent  = text;
        label.style.opacity = "1";
      }
    };

    const onLeave = () => {
      isHovering = false;
      outer.style.width  = "40px";
      outer.style.height = "40px";
      outer.style.borderColor = "rgba(255,255,255,0.22)";
      outer.style.background  = "transparent";
      inner.style.background  = "#ffffff";
      outer.style.transition  = "width .5s cubic-bezier(.22,1,.36,1), height .5s cubic-bezier(.22,1,.36,1), border-color .3s ease, background .3s ease";
      label.style.opacity = "0";
    };

    const attachListeners = () => {
      const els = document.querySelectorAll<HTMLElement>(
        "button, a, [data-cursor], input, textarea, select, label"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    attachListeners();

    /* Re-attach on route changes / dynamic content */
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring — lags behind */}
      <div
        ref={outerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.22)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          mixBlendMode: "normal",
        }}
      />

      {/* Inner dot — follows exactly */}
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#ffffff",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />

      {/* Hover label */}
      <div
        ref={labelRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          fontFamily: "var(--font-inter)",
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.85)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
          whiteSpace: "nowrap",
        }}
      />
    </>
  );
}
