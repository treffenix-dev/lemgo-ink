"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const LAYOUTS = [
  { id: "default",  label: "Dark Luxury",       desc: "Navy · Gold",    dot: "#D4A840" },
  { id: "rustic",   label: "Rustikales Bayern",  desc: "Holz · Amber",   dot: "#DA962A" },
  { id: "light",    label: "Modern Hell",        desc: "Clean · Zeitlos",dot: "#A06E14" },
  { id: "abendrot", label: "Abendrot",           desc: "Rot · Kupfer",   dot: "#DC6450" },
] as const;

type LayoutId = (typeof LAYOUTS)[number]["id"];

function applyTheme(id: LayoutId) {
  const root = document.documentElement;
  if (id === "default") delete root.dataset.theme;
  else root.dataset.theme = id;
}

function SwitcherInner({ backLink }: { backLink?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = (params.get("theme") ?? "default") as LayoutId;
  const [active, setActive] = useState<LayoutId>(
    LAYOUTS.some((l) => l.id === initial) ? initial : "default"
  );
  const [pitchMode, setPitchMode] = useState(false);

  useEffect(() => { applyTheme(active); }, [active]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "d" && !e.ctrlKey && !e.metaKey && !(e.target instanceof HTMLInputElement)) {
        setPitchMode((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (pitchMode) {
    return (
      <button
        onClick={() => setPitchMode(false)}
        className="fixed bottom-5 right-5 z-[200] w-9 h-9 rounded-full flex items-center justify-center shadow-xl transition-all duration-200"
        style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
        title="Design-Auswahl (D)"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeOpacity="0.45" strokeWidth="1"/>
          <circle cx="6.5" cy="6.5" r="2" fill="white" fillOpacity="0.45"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[200]">
      <div
        className="flex items-center gap-1 rounded-2xl px-3 py-2 shadow-2xl"
        style={{
          background: "rgba(0,0,0,0.84)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Back to selector */}
        {backLink && (
          <>
            <button
              onClick={() => router.push(backLink)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[0.62rem] tracking-wide transition-all duration-200 mr-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
              title="Zurück zur Auswahl"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Auswahl
            </button>
            <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.08)" }} />
          </>
        )}

        {/* Label */}
        <span className="text-[0.58rem] tracking-[0.22em] uppercase mx-2" style={{ color: "rgba(255,255,255,0.28)" }}>
          Variante
        </span>

        {/* Theme options */}
        {LAYOUTS.map((l) => {
          const isActive = active === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setActive(l.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200"
              style={{
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)",
              }}
              title={l.desc}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300"
                style={{
                  background: l.dot,
                  boxShadow: isActive ? `0 0 8px ${l.dot}90` : "none",
                  transform: isActive ? "scale(1.25)" : "scale(1)",
                }}
              />
              <span className="text-[0.65rem] tracking-wide whitespace-nowrap font-medium hidden sm:inline">
                {l.label}
              </span>
            </button>
          );
        })}

        <div className="w-px h-4 mx-1" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* Pitch mode */}
        <button
          onClick={() => setPitchMode(true)}
          className="px-2.5 py-1.5 rounded-xl text-[0.62rem] tracking-wide transition-colors"
          style={{ color: "rgba(255,255,255,0.25)" }}
          title="Panel ausblenden (D)"
        >
          Pitch
        </button>
      </div>
    </div>
  );
}

export function LayoutSwitcher({ backLink }: { backLink?: string }) {
  return (
    <Suspense>
      <SwitcherInner backLink={backLink} />
    </Suspense>
  );
}
