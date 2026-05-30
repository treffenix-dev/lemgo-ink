---
description: Eine Animation/Interaction nach dem Pflicht-Stack bauen (Lenis, GSAP+ScrollTrigger, Framer Motion, Anime.js v4, Three.js/R3F). Wählt das richtige Tool je Use-Case und liefert performanten, SSR-sicheren Code.
---

# /animate

Baut eine Animation für `$ARGUMENTS` — mit dem richtigen Werkzeug aus dem Stack, nicht mit Zufalls-CSS.

## Tool-Wahl (Pflicht-Stack)
| Use-Case | Tool |
|---|---|
| Globales Smooth-Scroll | **Lenis** |
| Scroll-getriggerte Sequenzen, Pin, Parallax | **GSAP + ScrollTrigger** |
| Mount/Unmount, Modals, Page-Transitions | **Framer Motion** |
| Stagger, mathe-/grid-basierte Bewegung | **Anime.js v4** |
| 3D, Partikel, Shader | **Three.js / @react-three/fiber** |
| Reine Performance-Transforms | **HyperFrames CSS** |

## Regeln
- **SSR-sicher:** Init in `useEffect`; R3F/Three-Komponenten `"use client"` bzw. `dynamic(..., { ssr:false })`.
- **Cleanup:** GSAP-Tweens/ScrollTrigger und Lenis im Effect-Cleanup zerstören (kein Memory-Leak, kein Doppel-Init bei HMR).
- **Performance:** nur `transform`/`opacity` animieren; `will-change` sparsam; `prefers-reduced-motion` respektieren.
- **Kohärenz:** Easing & Dauer am bestehenden Projekt-Rhythmus ausrichten (siehe `/design-review`).

## Ablauf
1. Use-Case → Tool wählen (Tabelle oben).
2. Komponente bauen/erweitern, Cleanup + reduced-motion einbauen.
3. Kurz erklären, warum genau dieses Tool.
4. Abschließen mit `/build-check`.
