# ⚠️ ZWEI GETRENNTE PROJEKTE — NIEMALS MISCHEN

## Projekt 1: Lemgo INK (DIESES Repo)
- **Pfad:** `/home/user/3D-Animation-Webseiten-bauen/` (Root)
- **Repo:** `treffenix-dev/3D-Animation-Webseiten-bauen`
- **Branch:** `claude/3d-web-animations-P1GAF`
- **Vercel:** Eigenes Deployment, Root Directory = `/`
- **Zweck:** Tattoo-Studio Website für Natascha Lee

## Projekt 2: Agentur-Portal (SEPARATES Projekt)
- **Pfad:** `/home/user/agentur-portal/`
- **Repo:** Eigenes Repo (NICHT dieses hier)
- **Vercel:** Eigenes Deployment, Root Directory = `agentur-portal`
- **Zweck:** Kundenportal für WebAgentur (Supabase + Stripe)
- **WICHTIG:** Alle Änderungen am Portal → separater Git-Kontext, niemals hier committen

---

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
- Anime.js v4 (Micro-Animationen, Number-Counter, Stagger)
- Tailwind CSS mit Custom Tokens

## Design-System (Noble Dark Luxury)

### Farbpalette
```
bg:          #06050A  (warmes Tiefschwarz, leicht violett)
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

## Animations-Prinzipien

### HyperFrames CSS Animations
- Für Hintergründe, Glow-Effekte, Masken, einfache Loops → **reines CSS**
- Nur `transform` und `opacity` animieren (KEINE width/height/color/background direkt)
- Synchronisierte Timing-Kontrolle
- Performance: GPU-beschleunigte Properties only
- Ideal für: atmosphärische Hintergründe, Glow-Loops, Scan-Effekte

### UI-Animation Regeln
- UI-Interaktionen: **200-300ms** mit natürlichen Ease-Kurven
- Entrance-Animationen: **800-1200ms** mit `cubic-bezier(0.22, 1, 0.36, 1)`
- Standard-Easing: `ease-out` für schnelle Reaktionen
- Premium-Easing: `cubic-bezier(0.16, 1, 0.36, 1)` für große Animationen
- Immer `prefers-reduced-motion` respektieren
- Stagger-Delay zwischen Elementen: max 80-100ms
- NUR `transform` und `opacity` für Transitions

### GSAP-Spezifisch
- ScrollTrigger immer mit Lenis synced: `lenis.on("scroll", ScrollTrigger.update)`
- Horizontaler Scroll: `gsap.to(track, { x: getScrollAmount, scrub: 1.4 })`
- Entrance: `gsap.from(el, { opacity: 0, y: 40, duration: 1.1, ease: "power3.out" })`

### 3D Scroll-Based Technique (BESPOKE/EUROPA Style)
- Produkt schwebt in 3D-Raum und reagiert auf Scroll
- CSS `perspective` + GSAP ScrollTrigger scrubbed timeline
- Elemente kippen/drehen sich proportional zum Scroll-Fortschritt
- Dramatische Typografie die in 3D-Objekte übergeht

## Section-Struktur (Reihenfolge in page.tsx)
1. **Hero** — Phoenix 3D Partikel (morpht: Phoenix → "LEMGO INK" → Logo, 29s Zyklus)
2. **Stats** — Vertrauens-Indikatoren (Anime.js Counter)
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
- `.anim-gold-glow` — Pulsierendes Gold-Glow CSS
- `.anim-float` — Sanftes Schweben
- `.anim-shimmer` — Gold-Shimmer
- `.anim-border-glow` — Border Glow Loop
- `.anim-line-grow` — Linie wächst von links
- `.anim-entrance` — fadeInUp Entrance
- `.transition-ui` (200ms), `.transition-std` (300ms), `.transition-slow` (600ms)

## Wichtige Komponenten
- `PhoenixScene.tsx` — 3D Partikel, morpht Phoenix→Text→Logo (5000 Partikel)
- `CustomCursor.tsx` — Eigener Cursor (body cursor:none in globals.css)
- `SmoothScroll.tsx` — Lenis + GSAP Sync
- `ScrollProgress.tsx` — Goldene Fortschrittsleiste oben
- `WhatsAppButton.tsx` — Floating WhatsApp +49 152 57668403
- `StylesSection.tsx` — GSAP Horizontal Scroll
- `Gallery.tsx` — Masonry mit realistischen SVG-Tattoo-Artworks
- `Stats.tsx` — Anime.js v4 Number Counter

## Kontakt / Business-Daten
- Studio: Lemgo, NRW
- WhatsApp: +49 152 57668403
- Instagram: @tattooartist_nataschalee
- Google: 4.7 Sterne, 39 Bewertungen
- Stile: Black & Grey, Realism, Japanese, Old School, Fineline

---

## TOOLS & SKILLS — ALLES DAVON IMMER VERWENDEN

Diese Werkzeuge werden für JEDE Website-Entwicklung eingesetzt.
Bei jeder Design- und Animations-Entscheidung MÜSSEN diese berücksichtigt werden.

---

### ANIMATION BIBLIOTHEKEN (im Projekt installiert)

#### 1. Anime.js v4 ✅ Installiert
```bash
npm install animejs
```
```ts
import { animate, stagger } from "animejs";

// Number Counter (JS-Objekt animieren):
const proxy = { val: 0 };
animate(proxy, {
  val: 100,
  duration: 2200,
  ease: "outExpo",
  onUpdate() { el.textContent = Math.floor(proxy.val).toString(); }
});

// Stagger Sequence:
animate(".card", {
  opacity: [0, 1],
  translateY: [30, 0],
  duration: 600,
  ease: "outExpo",
  delay: stagger(80)
});
```
**Wann nutzen:** Number Counters, Stagger-Entrances, Spring-Physik-Animationen, Timeline-Sequenzen

#### 2. Framer Motion ✅ Aktiv
- `useInView` für Section-Entrances
- `AnimatePresence` für Modals/Overlays
- `motion.div` für deklarative Animationen
- Stagger via `variants + staggerChildren`

#### 3. GSAP + ScrollTrigger ✅ Aktiv
- Scroll-gesteuerte Animationen, Horizontaler Scroll
- Pinned sections, Parallax
- Immer mit Lenis synced: `lenis.on("scroll", ScrollTrigger.update)`

#### 4. Three.js / @react-three/fiber ✅ Aktiv
- 3D Partikel-Animationen (PhoenixScene)
- GLSL Shader-Effekte
- Skelettanimationen, Charakter-Poses
- Spring-Physik: Federn, Dämpfung, Oszillationen
- Nur mit `dynamic(() => import(...), { ssr: false })`

#### 5. Lenis Smooth Scroll ✅ Aktiv
- Cinematic Scroll-Gefühl, synced mit GSAP

#### 6. HyperFrames CSS Animations ✅ Eingebaut in globals.css
- Nur `transform` + `opacity` animieren
- `@keyframes goldGlow, float, shimmer, borderGlow, lineGrow, fadeInUp`
- Ideal für atmosphärische Schleifen, Glow-Effekte

#### 7. UI-Animation ✅ Eingebaut
- 200ms UI-Reaktionen, 300ms Hover, 900ms Entrance
- Nur transform+opacity, prefers-reduced-motion Support

---

### CLAUDE SKILLS (npx skills add)

#### 8. Emil Kowalski Skill — animations.dev
```bash
npx skills add emilkowalski/skill
```
- Deckt Animationen, Design, Code, Performance ab
- Auf case-by-case Basis einsetzen (z.B. Animationen reviewen lassen)
- Vor/nach Vergleiche für Modal-Animationen: scale, duration, easing, reduced-motion

#### 9. Impeccable — Anti-AI-Slop Design CLI
```bash
npx skills add pbakaus/impeccable
```
- Detektiert 24 Design-Fehler bevor sie shipped werden
- "Design fluency for AI harnesses" — gibt Designer-Sprache in Prompts
- **Verbotene Muster (NIEMALS nutzen):**
  - Lila/Purple Gradienten
  - Bounce-Easing
  - Cramped Padding (zu wenig Innenabstand)
  - Generische AI-Slop Ästhetik
- **Slash-Commands:**
  - `/normalize blog` — Design-Standards anwenden
  - `/normalize buttons` — Buttons standardisieren
  - `/critique landing-page` — UX Design Review
  - `/polish feature-modal` — Finaler Pass vor Deployment
  - Kombinieren: `/audit /normalize /polish blog`

#### 10. Taste Skill — tasteskill.dev
```bash
npx skills add LeonxInx/taste-skill
```
- High-Agency Frontend: Layout, Typography, Color, Motion Taste
- 7.2k GitHub Stars
- "Improves how AI tools write frontend code so AI builds modern, premium designs with proper aesthetics"
- Compatible mit Cursor + Claude Code

#### 11. UI/UX Pro Max — Design Intelligence
```bash
install https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git
```
- 57 UI Styles, 95 Color Palettes, 56 Font Pairings, 8 Tech Stacks, 24 Chart Types
- Searchable database: UI styles, color palettes, font pairings, UX guidelines
- AI-powered design recommendations
- Works with: Claude Code, Cursor, Windsurf, Antigravity, GitHub Copilot

#### 12. Anthropic Official Skills (6 Skills)
```bash
# Skill 01 — Front-end Design
npx skills add https://github.com/anthropics/skills --skill frontend-design
# Claude follows complete design-thinking process before writing code

# Skill 02 — Figma to Code
npx skills add https://github.com/anthropics/skills --skill figma
# Turn Figma designs into production-ready code with exact 1:1 fidelity

# Skill 03 — Theme Factory
npx skills add https://github.com/anthropics/skills --skill theme-factory
# 10 polished themes with curated color palettes + professional font pairings

# Skill 04 — Brand Guidelines
npx skills add https://github.com/anthropics/skills --skill brand-guidelines
# Automatically enforces brand colors, fonts, spacing, tone across every output

# Skill 05 — Canvas Design
npx skills add https://github.com/anthropics/skills --skill canvas-design
# Create visual art, posters, compositions — exported as PNG or PDF

# Skill 06 — Skill Creator
npx skills add https://github.com/anthropics/skills --skill skill-creator
# Build custom skills for design system, brand voice, or workflow
```

---

### COMPONENT BIBLIOTHEKEN

#### 13. 21st.dev — shadcn Component Library
```bash
npx shadcn@latest add https://21st.dev/r/[component-name]
```
- 73+ Hero Sections, Marketing Blocks
- Kategorien: Announcements (10), Backgrounds (33), Borders (12), Calls to Action (34), Clients (16), Comparisons (6), Docks (6), Features (36), Footers (14), **Heroes (73)**, Hooks (31)
- Dependencies: meist nur framer-motion
- Direkt kopierbar mit "Copy prompt" oder "Copy code"

---

### DESIGN RESSOURCEN (täglich besuchen für Inspiration)

#### 14. Uiverse.io — Open-Source UI Components
- Largest Library of Open-Source UI
- Kopierbar als HTML/CSS, Tailwind, React und Figma
- Community-built: Buttons, Cards, Inputs, Switches, Loaders

#### 15. 60fps.design — App Animation Inspiration
- Endless collection of delightful details from best-in-class apps
- Filtern nach: Apps, Screens, UI Elements, Flows
- Referenz für: micro-interactions, transitions, loading states

#### 16. Fontjoy.com — AI Font Pairing
- "Font pairing made simple" — deep learning basierte Font-Kombinationen
- Generate → Lock → Edit für die perfekte Kombination
- Referenz für Schrift-Hierarchien

#### 17. Lummi.ai — Quality AI Stock Images
- "No more boring stock" — AI-powered royalty-free images
- Für Projekt-Demos und Mockups nutzen

#### 18. Grainient.supply — Grainy Gradient Backgrounds
- High quality, grainy textured + smooth gradient backgrounds
- Über 1000 Premium-Hintergründe
- "Present your designs like a Pro"

#### 19. Mobbin.com — Mobile App UI Inspiration
- iOS + Android + Web App Screenshots
- Filter nach: Finance, Business, Health, Shopping, AI, etc.
- Referenz für Navigation, Cards, Flows

---

### CLAUDE PROMPTS & TEXT-TOOLS

#### 20. LazarusAI Prompts (lazarusai.de)
```
/ghost [dein Text] 
→ Schreibt Text komplett um. Klingt 100% menschlich. Kein AI-Detektor kommt durch.

/mirror [Beispiel deines Stils] — schreib jetzt [AUFGABE] in diesem Stil
→ Claude analysiert deinen Stil und übernimmt ihn komplett.

/punch [dein langweiliger Text]
→ Streicht alles Unnötige. Macht jeden Satz direkter, härter, kraftvoller.
```

#### 21. Its AI Guide — Prompt Templates für Websites
```
1. PLAN: "Help me plan a complete website for [type of business] in [location].
   Target audience: [audience]. Goal: [sales/leads/bookings/portfolio].
   Suggest pages, what each includes, site structure, conversion goal per page."

2. STRUKTUR: "Create a complete homepage structure for [business].
   Include: hero, trust, services, social proof, FAQ, CTA.
   Tone: [friendly/professional/modern]. Explain why each section appears in that order."

3. COPY: "Write complete homepage copy. Strong headline in under 8 seconds,
   subheadline addressing main objection, CTA text, 3 benefit statements as results
   (not features), closing section making next step obvious. Tone: [tone]."

4. VISUAL STYLE: "Suggest complete visual style for [business].
   Primary+secondary palette with hex codes, font pairings, button styles,
   spacing guidelines, image direction, overall mood: [modern/luxury/minimal]."

5. LANDING PAGE CODE: "Create responsive landing page in HTML/CSS for [business].
   Hero + features (3 key benefits) + testimonials (3 blocks) + CTA.
   Clean code, clear class names, easy to edit."

6. SERVICES PAGE: "Write content for services page [business].
   Services: [1], [2], [3]. For each: title, description, ideal client,
   key benefit, specific CTA. Easy to understand for first-time visitor."

7. ABOUT PAGE: "Write About page for [business/person].
   Origin story, mission statement, 3 core values, what makes us different,
   closing that makes reader confident. Tone: [friendly/professional/warm]."

8. SEO CONTENT: "Write SEO-optimized copy for [page] targeting keyword [keyword].
   Page title under 60 chars, 3 H2 headings, short paragraphs under 4 lines,
   natural keyword usage, closing CTA. Mobile-readable, impossible to confuse with AI."
```

---

### TOOLS FÜR DESIGN QUALITÄT

#### 22. Playwright — Browser Automation Testing
```bash
# Claude kann die Website sehen und Bugs catchen
npm install @playwright/test
```
- End-to-end testing für moderne Web-Apps
- Spins up browser, screenshots the UI, catches bugs before you do
- 67k GitHub Stars

#### 23. Framer MCP — Design direkt in Framer
- MCP Plugin für Framer
- Copy MCP server URL → Add to Claude Code / Cursor
- Claude kann direkt in Framer designen

#### 24. Higgsfield MCP — Cinematic Image/Video Generation
```bash
npx skills add higgsfield-ai/skills
```
- Cinematic image/video generation
- Für Hero-Visuals, Mood-Boards, Tattoo-Referenz-Bilder

---

### DESIGN-PHILOSOPHIE (aus allen Screenshots destilliert)

#### Was PREMIUM Design ausmacht (TITAN BURN / 3D Scroll Style)
- Dramatische Tiefenwirkung durch Licht und Schatten
- 3D-Elemente die aus dem Hintergrund ragen und auf Scroll reagieren
- Dunkler atmosphärischer Hintergrund mit Texturen (Noise, Grain)
- Floating-Elemente für Lebendigkeit (float Animation)
- Gradients die Tiefe suggerieren, nicht nur Farbe
- Editorial Large Type: Headlines die mehr als 50% des Viewports füllen

#### Anti-Patterns (NIEMALS in Premium Design)
- Lila/Purple Gradienten (AI-Slop Tell #1)
- Bounce-Easing auf irgendwas
- Cramped Padding (zu enge Abstände)
- Box-Shadows in allen Richtungen gleichzeitig
- Zu viele Farben (max 3 im System)
- Outline-Buttons als primäre CTAs
- Centered Body Text auf Desktop

#### Noble Dark Luxury Regeln für Lemgo INK
- Warme Schwarztöne statt hartes #000000 → `#06050A`
- Amber-Gold statt Messing-Gold → `#C9A84C`
- Ivory-Creme statt neutrales Weiß → `#EDE8DF`
- Gold sparsam: max 1-2 Akzente pro Section
- Typografie-Hierarchie: Display (Bebas) > Heading > Body (Inter) > Label
- Whitespace ist Luxus — großzügige Margins und Padding
- Animations zeigen sich durch Ruhe, nicht durch Überwältigung

---

## Was NICHT ändern
- `ssr: false` bei PhoenixScene (Three.js braucht Browser)
- Lenis + ScrollTrigger Sync — `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add`
- `alpha: false` im Canvas (ermöglicht Postprocessing wenn nötig)
- `body { cursor: none }` — CustomCursor übernimmt
- `animejs` v4 API: `ease: "outExpo"` (nicht `easing`), Objekte direkt animieren
