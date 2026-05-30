---
description: Award-Niveau-Kritik (Awwwards/Godly) der aktuellen UI. Nutzt die Taste-, Emil-Kowalski- und High-End-Visual-Design-Skills für eine schonungslose Bewertung plus konkrete Fixes.
---

# /design-review

Bewertet das aktuelle Frontend gnadenlos auf Award-Niveau und liefert umsetzbare Fixes — kein Lob ohne Substanz, kein AI-Slop.

## Skills aktiv einsetzen
- **design-taste-frontend / gpt-taste** — Hierarchie, Typo, Spacing, Farbsystem
- **emil-design-eng** — Micro-Interactions, Easing, Timing, Hover/Focus-States
- **high-end-visual-design** — Komposition, Kontrast, „Wow"-Momente
- **full-output-enforcement** — vollständige, ehrliche Bewertung

## Ablauf
1. Betroffene Komponenten/Seiten benennen (oder `$ARGUMENTS`).
2. Bewerten entlang:
   - **Typografie & Rhythmus** — Skala, Zeilenhöhe, Maßstabssprünge
   - **Layout & Whitespace** — Grid, Tension, Atemraum
   - **Motion** — folgt der Stack? (Lenis Smooth-Scroll, GSAP/ScrollTrigger, Framer-Transitions, Anime.js-Stagger, Three.js/Shader). Easing & Dauer kohärent?
   - **Performance-Gefühl** — 60fps, kein Jank, `transform`/`opacity` statt Layout-Thrash
   - **Detailgrad** — States, Empty/Loading, Dark-Mode, Responsivität
3. **Verdict:** Award-tauglich? Ja/Nein + die 3 größten Hebel.
4. Pro Finding: konkreter Fix (Datei:Zeile + Code-Snippet).

## Maßstab
Würde das bei **Awwwards / Godly.website** bestehen? Wenn nein — warum, und was genau fehlt.
