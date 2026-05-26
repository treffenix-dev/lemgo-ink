# ⚠️ PROJEKTE — JEDES PROJEKT HAT SEIN EIGENES REPO. NIEMALS MISCHEN.

## GOLDENE REGEL: 1 Projekt = 1 GitHub Repo = 1 Vercel Deployment = 1 Claude Code Session

---

## AKTIVE PROJEKTE

| Projekt | GitHub Repo | Vercel URL | Zweck |
|---------|------------|------------|-------|
| **Lemgo INK** | `treffenix-dev/lemgo-ink` | lemgo-ink.vercel.app | Tattoo-Studio Website Natascha Lee |
| **Löwenbräu Website** | `treffenix-dev/loewenbraeu-website` | loewenbraeu-lemgo.vercel.app | Restaurant Website Lemgo |
| **Agentur Portal** | `treffenix-dev/Agentur-portal` | agentur-portal.vercel.app | Eigenes Command Center / CRM |

---

## DIESES REPO: lemgo-ink
- **GitHub:** `treffenix-dev/lemgo-ink`
- **Zweck:** Tattoo-Studio Website für Natascha Lee, Lemgo NRW
- **Stack:** Next.js 14, Three.js, GSAP, Framer Motion, Anime.js v4, Tailwind

---

## NEUES PROJEKT STARTEN — PFLICHT-WORKFLOW

Jedes neue Kundenprojekt MUSS diesem Workflow folgen:

### Schritt 1 — GitHub Repo erstellen
```
Name-Schema: [kunde]-[typ]
Beispiele:
  mario-pizza-website
  salon-anna-booking
  zahnarzt-schmidt-website
  fitnessstudio-lemgo-website
```
→ github.com/treffenix-dev → New Repository → Name eingeben → Public → Create

### Schritt 2 — Claude Code Session starten
→ code.claude.ai → New Project → GitHub Repo auswählen (das neue Repo)
→ NIEMALS ein bestehendes Repo für ein neues Projekt verwenden

### Schritt 3 — Vercel Deployment verbinden
→ vercel.com → Add New Project → GitHub Repo importieren → Deploy
→ Projektname = Repo-Name (z.B. `mario-pizza-website`)

### Schritt 4 — Projekt in PROJECTS.md eintragen
→ Die Datei `PROJECTS.md` in DIESEM Repo (`lemgo-ink`) pflegen
→ Jedes Projekt mit Status, URL, Kunde, Startdatum eintragen

---

## NAMING CONVENTION

| Was | Schema | Beispiel |
|-----|--------|---------|
| GitHub Repo | `[kunde]-[typ]` (lowercase, kein Leerzeichen) | `mario-pizza-website` |
| Vercel Projekt | gleich wie Repo | `mario-pizza-website` |
| Vercel URL | automatisch: `mario-pizza-website.vercel.app` | |
| Claude Session | gleich wie Repo | |
| package.json name | gleich wie Repo | `"name": "mario-pizza-website"` |

---

## WAS NIEMALS ERLAUBT IST

- ❌ Zwei Kundenprojekte im selben GitHub Repo
- ❌ Einen Kundenordner als Unterordner in einem anderen Projekt anlegen
- ❌ "Ich mach das schnell hier rein" — IMMER eigenes Repo
- ❌ In einer Session arbeiten die für ein anderes Projekt autorisiert ist

---

# 🧠 UNIVERSELLE DENK-PRINZIPIEN (für ALLE Projekte, immer aktiv)

## TRICK 02 — LLM-COUNCIL PRINZIP

**Vor jeder wichtigen Entscheidung: Validiere aus mehreren Perspektiven.**

Anstatt blind der ersten Idee zu folgen, denke wie ein Gremium aus 3 LLMs:

```
PERSPEKTIVE 1 — Der Kritiker:
  Was kann an diesem Ansatz scheitern?
  Was wurde übersehen? Was ist der worst case?

PERSPEKTIVE 2 — Der Pragmatiker:
  Was ist die einfachste Lösung die funktioniert?
  Wird hier über-engineered? Gibt es eine direktere Route?

PERSPEKTIVE 3 — Der Erfahrene:
  Wie würde ein Senior-Dev das angehen?
  Welche Muster/Fallen kennt man aus der Praxis?
```

**Anwendung in der Praxis:**
- Bei Build-Fehlern: Nicht den ersten Fix probieren — erst alle Ursachen analysieren
- Bei Design-Entscheidungen: Nicht freelancen — erst Research (Awwwards, Godly)
- Bei Architektur: Nicht sofort coden — erst mehrere Ansätze durchdenken
- Bei Fehlern die länger als 10min bestehen: Komplett neu denken, andere Perspektive

---

## BRUTAL EHRLICH — EPISTEMIC HUMILITY RULES

**Ich bin committed zu Ehrlichkeit, Genauigkeit und epistemischer Bescheidenheit über allem anderen.**

### 1. UNSICHERHEIT — Immer kommunizieren

Wenn ich nicht 100% sicher bin, sage ich das klar:

```
"Ich bin nicht sicher, aber..."
"Du solltest das verifizieren..."
"Ich könnte hier falsch liegen, aber..."
"Basierend auf den mir verfügbaren Informationen..."
"Das ist meine beste Einschätzung, keine gesicherte Tatsache."
```

- Niemals unsichere Behauptungen als Fakten darstellen
- Wenn die Antwort vom fehlenden Kontext abhängt → sagen was fehlt
- Wenn es mehrere plausible Antworten gibt → alle erklären, nicht so tun als gäbe es nur eine

### 2. QUELLEN — Niemals erfinden

**Ich erfinde NIEMALS:**
- Paper-Titel oder Studien
- URLs oder Links
- Autoren oder Experten
- Statistiken oder Zahlen
- Bücher oder Zitate
- Firmenberichte
- Historische Referenzen

Wenn ich keine Quelle kenne → sage ich, dass ich keine habe. Punkt.

### 3. FEHLER — Sofort zugeben

- Wenn ich einen Fehler erkenne: sofort transparent darauf hinweisen
- Nicht verteidigen, nicht umschweifen
- "Ich habe mich geirrt: [was genau falsch war] — der richtige Weg ist: [fix]"

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

# Skill 02 — Figma to Code
npx skills add https://github.com/anthropics/skills --skill figma

# Skill 03 — Theme Factory
npx skills add https://github.com/anthropics/skills --skill theme-factory

# Skill 04 — Brand Guidelines
npx skills add https://github.com/anthropics/skills --skill brand-guidelines

# Skill 05 — Canvas Design
npx skills add https://github.com/anthropics/skills --skill canvas-design

# Skill 06 — Skill Creator
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

---

### COMPONENT BIBLIOTHEKEN

#### 13. 21st.dev — shadcn Component Library
```bash
npx shadcn@latest add https://21st.dev/r/[component-name]
```
- 73+ Hero Sections, Marketing Blocks
- Kategorien: Announcements, Backgrounds, Borders, CTAs, Heroes (73), Hooks (31)
- Dependencies: meist nur framer-motion

---

### DESIGN RESSOURCEN (täglich für Inspiration)

- **Awwwards.com / Godly.website / Dribbble.com** — Referenzen vor JEDEM Build
- **Uiverse.io** — Open-Source UI Components (HTML/CSS, Tailwind, React)
- **60fps.design** — App Animation Inspiration
- **Fontjoy.com** — AI Font Pairing
- **Lummi.ai** — Quality AI Stock Images
- **Grainient.supply** — Grainy Gradient Backgrounds
- **Mobbin.com** — Mobile App UI Inspiration

---

### DESIGN-PHILOSOPHIE

#### Was PREMIUM Design ausmacht
- Dramatische Tiefenwirkung durch Licht und Schatten
- 3D-Elemente die aus dem Hintergrund ragen und auf Scroll reagieren
- Dunkler atmosphärischer Hintergrund mit Texturen (Noise, Grain)
- Editorial Large Type: Headlines die mehr als 50% des Viewports füllen

#### Anti-Patterns (NIEMALS)
- Lila/Purple Gradienten (AI-Slop Tell #1)
- Bounce-Easing auf irgendwas
- Cramped Padding
- Zu viele Farben (max 3 im System)
- Outline-Buttons als primäre CTAs
- Centered Body Text auf Desktop

#### Noble Dark Luxury Regeln für Lemgo INK
- Warme Schwarztöne → `#06050A`
- Amber-Gold → `#C9A84C`
- Ivory-Creme → `#EDE8DF`
- Gold sparsam: max 1-2 Akzente pro Section
- Whitespace ist Luxus — großzügige Margins

---

## Was NICHT ändern
- `ssr: false` bei PhoenixScene (Three.js braucht Browser)
- Lenis + ScrollTrigger Sync — `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add`
- `alpha: false` im Canvas
- `body { cursor: none }` — CustomCursor übernimmt
- `animejs` v4 API: `ease: "outExpo"` (nicht `easing`), Objekte direkt animieren
