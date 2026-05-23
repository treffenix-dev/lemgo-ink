# Lemgo INK — Claude Projektgedächtnis

## Projekt
Tattoo-Studio Website für **Natascha Lee**, Lemgo NRW.
Privates Studio, spezialisiert auf Black & Grey Realism, Portraits, Fine Line.
Ziel: Premium-Erlebnis das wie eine €15.000–30.000 Agentur-Seite wirkt.

## Stack
- Next.js 14 (App Router, Static), React 18, TypeScript
- Three.js + @react-three/fiber + @react-three/drei (3D)
- GSAP + ScrollTrigger (horizontaler Scroll, scroll-driven Animationen)
- Lenis (Smooth Scroll, synced mit GSAP ScrollTrigger)
- Framer Motion (Reveal-Animationen, AnimatePresence)
- Tailwind CSS mit Custom Tokens

## Design-System (Noble Dark Luxury)

### Farbpalette
```
bg:          #06050A  (warmes Tiefsschwarz, leicht violett)
surface:     #0F0E13  (dunkle warme Oberfläche)
surface-2:   #181620  (gehobene Oberfläche)
gold:        #C9A84C  (Amber-Gold, nicht zu messingfarben)
gold-light:  #E8C96A
gold-dark:   #8B6B1E
cream:       #EDE8DF  (warmes Ivory-Creme)
ivory:       #F5F1EA  (helles warmes Weiß)
muted:       #5A5660
border:      #1E1C26
```

### Typografie
- Display / Headlines: **Bebas Neue** (`font-display`)
- Body / Fließtext: **Space Grotesk** (`font-body`)
- UI / Labels / Buttons: **Inter** (`font-sans`)

### Typografie-Regeln
- Tracking auf Labels: `tracking-[0.38em]` (extrem weit)
- Tracking auf Nav-Links: `tracking-[0.22em]`
- Body-Text: `font-light`, `leading-[2.0]`, max-width ~380px
- Headlines: `leading-[0.88]` (tight), niemals `leading-normal`
- Gold-Akzent sparsam einsetzen — nur 1-2 Elemente pro Section

## Animations-Prinzipien (aus TikTok-Screenshots)

### HyperFrames CSS Animations
- Für Hintergründe, Glow-Effekte, Masken, einfache Loops → **reines CSS**
- Nur `transform` und `opacity` animieren (KEINE width/height/color/background direkt)
- Synchronisierte Timing-Kontrolle
- Performance: GPU-beschleunigte Properties only

### UI-Animation Regeln
- UI-Interaktionen: **200-300ms** mit natürlichen Ease-Kurven
- Entrance-Animationen: **800-1200ms** mit `cubic-bezier(0.22, 1, 0.36, 1)`
- Standard-Easing: `ease-out` für schnelle Reaktionen
- Premium-Easing: `cubic-bezier(0.16, 1, 0.36, 1)` für große Animationen
- Immer `prefers-reduced-motion` respektieren
- Stagger-Delay zwischen Elementen: max 80-100ms

### GSAP-Spezifisch
- ScrollTrigger immer mit Lenis synced: `lenis.on("scroll", ScrollTrigger.update)`
- Horizontaler Scroll: `gsap.to(track, { x: getScrollAmount, scrub: 1.4 })`
- Entrance: `gsap.from(el, { opacity: 0, y: 40, duration: 1.1, ease: "power3.out" })`

## Section-Struktur (Reihenfolge in page.tsx)
1. **Hero** — Phoenix 3D Partikel (morpht: Phoenix → "LEMGO INK" → Logo, 29s Zyklus)
2. **Stats** — Vertrauens-Indikatoren (Zahlen, Jahre, etc.)
3. **Artist** — Über Natascha Lee
4. **FlashDesigns** — Wanna-DOs / Flash Inspiration
5. **StylesSection** — GSAP Horizontal Scroll (5 Stile + CTA)
6. **Gallery** — Masonry Portfolio (3D-Tilt, Lightbox, Filter)
7. **Reviews** — Google Bewertungen
8. **Process** — Buchungsablauf
9. **FAQ** — Accordion
10. **Contact** — Glassmorphism Booking-Formular
11. **Footer**

## CSS-Klassen (globals.css)
- `.gold-text` — Gradient-Text in Amber-Gold
- `.gradient-text` — Weiß-zu-Gold Gradient
- `.section-label` — 9px, tracking 0.38em, gold/55
- `.gold-rule::before` — 28px goldene Linie
- `.glass` — Glassmorphism (warm tint)
- `.glass-gold` — Gold-Glassmorphism
- `.noble-divider` — Horizontale Gold-Trennlinie
- `.horizontal-track` — GSAP Horizontal Scroll Container

## Wichtige Komponenten
- `PhoenixScene.tsx` — 3D Partikel, morpht Phoenix→Text→Logo (5000 Partikel)
- `CustomCursor.tsx` — Eigener Cursor (body cursor:none in globals.css)
- `SmoothScroll.tsx` — Lenis + GSAP Sync
- `ScrollProgress.tsx` — Goldene Fortschrittsleiste oben
- `WhatsAppButton.tsx` — Floating WhatsApp +49 152 57668403
- `StylesSection.tsx` — GSAP Horizontal Scroll
- `Gallery.tsx` — Masonry mit realistischen SVG-Tattoo-Artworks

## Kontakt / Business-Daten
- Studio: Lemgo, NRW
- WhatsApp: +49 152 57668403
- Instagram: @tattooartist_nataschalee
- Google: 4.7 Sterne, 39 Bewertungen
- Stile: Black & Grey, Realism, Japanese, Old School, Fineline

## Tools & Skills — IMMER verwenden

Diese Skills/Tools MÜSSEN bei jeder Design- und Animations-Entscheidung berücksichtigt werden:

### 1. CSS Animations (HyperFrames) ✅ Aktiv eingebaut
**Wann nutzen:** Hintergründe, Glow-Effekte, Masken, einfache Loops
**Prinzipien:**
- Nur `transform` + `opacity` animieren (GPU-beschleunigt, kein Layout-Reflow)
- Glow-Effekte via `box-shadow` Animation
- Background-Gradient-Animationen für atmosphärische Tiefe
- CSS `@keyframes` für Loops (goldGlow, float, shimmer, borderGlow)
- Performance-first: kein `width`, `height`, `color`, `background-color` animieren
- Timing präzise mit Clip synchronisieren

### 2. UI-Animation ✅ Aktiv eingebaut
**Wann nutzen:** Alle Hover, Focus, Entrance, State-Changes
**Prinzipien:**
- UI-Reaktionen: **200ms** `ease-out`
- Standard Hover/Focus: **300ms** `ease-out`
- Entrance-Animationen: **900-1200ms** `cubic-bezier(0.16, 1, 0.36, 1)`
- Stagger zwischen Elementen: max **80-100ms**
- NUR `transform` und `opacity` für Transitions
- **IMMER** `@media (prefers-reduced-motion: reduce)` einfügen
- Bewegt nur was notwendig ist — Luxus zeigt sich durch Ruhe

### 3. Three.js / @react-three/fiber ✅ Aktiv (PhoenixScene)
- 3D Partikel-Animationen
- Shader-basierte Effekte (GLSL)
- Nur mit `dynamic(() => import(...), { ssr: false })`

### 4. GSAP + ScrollTrigger ✅ Aktiv
- Scroll-gesteuerte Animationen
- Horizontaler Scroll (StylesSection)
- Pinned sections
- Immer mit Lenis synced

### 5. Lenis Smooth Scroll ✅ Aktiv
- Cinematic Scroll-Gefühl
- Synced mit GSAP: `lenis.on("scroll", ScrollTrigger.update)`

### 6. Framer Motion ✅ Aktiv
- `useInView` für Section-Entrances
- `AnimatePresence` für Modals/Overlays
- `motion.div` für deklarative Animationen

### 7. Front-end Design Skill (aus TikTok)
**Prinzip:** Design-Thinking BEVOR Code — Struktur und Kreativität leiten die Entwicklung
- Zuerst Layout/Hierarchy planen, dann coden
- Mobile-first responsiv
- Typografie-Hierarchie: Display > Heading > Body > Label

### 8. Theme Factory Skill (aus TikTok)
**Angewendetes Theme:** Noble Dark Luxury
- Warme Schwarztöne statt hartes #000000
- Amber-Gold statt Messing-Gold
- Ivory-Creme statt neutrales Weiß
- Konsistente Spacing-Skala

### 9. Brand Guidelines Skill (aus TikTok)
**Lemgo INK Brand:**
- Primärfarbe: `#C9A84C` (Amber Gold)
- Hintergrund: `#06050A` (Warm Near-Black)
- Text: `#EDE8DF` (Warm Ivory)
- Schrift Display: Bebas Neue
- Schrift Body: Space Grotesk
- Stil: Noble, Präzise, Minimalistisch, Cinematic

### 10. Premium Website Design (TITAN BURN Inspiration aus TikTok)
**Anwenden auf Lemgo INK:**
- Dramatische Tiefenwirkung durch Licht und Schatten
- 3D-Elemente die aus dem Hintergrund ragen
- Dunkler atmosphärischer Hintergrund mit Texturen
- Floating-Elemente für Lebendigkeit
- Gradients die Tiefe suggerieren

---

## Was NICHT ändern
- `ssr: false` bei PhoenixScene (Three.js braucht Browser)
- Lenis + ScrollTrigger Sync — `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add`
- `alpha: false` im Canvas (ermöglicht Postprocessing wenn nötig)
- `body { cursor: none }` — CustomCursor übernimmt
