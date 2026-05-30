# 🚀 Agentur-Pipeline 2026

Der feste Ablauf für **jeden** Kundenauftrag — von der Recherche bis zum Verkauf.
Ziel: in **kürzester Zeit** eine **vollständige, fehlerfreie** Premium-Webseite
präsentieren und verkaufen. Jede Phase hat ein Tool und einen Slash-Command.

> **Award-Niveau, kein Slop.** Jede Entscheidung spiegelt den Pflicht-Stack
> (siehe `CLAUDE.md`).

---

## Phase 1 — Recherche & Wettbewerb → `/recherche`
**Frage:** Wo steht der Kunde, was macht die Konkurrenz, wo ist die Lücke?
- Konkurrenz-/Anbieter-Seiten mit **Playwright** screenshotten, mit **fetch** Inhalte ziehen.
- Positionierung, Struktur, Schwächen analysieren (Taste-Skills).
- **Output:** kurzes Briefing — Zielgruppe, Positionierung, 3 Hebel, Referenz-Seiten.

## Phase 2 — Struktur & Konzept → `/referenz`
**Frage:** Welche Struktur trägt? Inspiration → **eigenes**, besseres Design.
- Referenz-Seite/Screenshot analysieren (Sektionen, Flow, Hierarchie).
- Mit **image-to-code** + **redesign-existing-projects** als **originale** Komponenten neu aufbauen.
- ⚠️ **Niemals 1:1 kopieren** (Urheberrecht + Markenschaden). Struktur als Vorlage, Umsetzung neu.
- **Output:** Wireframe/Sektionsplan + Komponentenliste.

## Phase 3 — Schnell bauen → `/animate` + Stack
**Frage:** Wie liefere ich Premium in kurzer Zeit?
- Basis aus `agentur-blueprint` / wiederverwendbaren Komponenten.
- Animationen nach Stack (Lenis, GSAP, Framer Motion, Anime.js, Three.js) via `/animate`.
- Assets über **Cloudinary** optimieren (Ladezeit = Conversion).
- **Output:** lauffähige Seite lokal.

## Phase 4 — Fehlerfrei liefern → `/design-review` + `/ship`
**Frage:** Ist es Award-Niveau **und** technisch sauber?
- **Playwright**: Seite real screenshotten, Responsive & States prüfen.
- `/design-review` (Taste/Emil) → die 3 größten Hebel fixen.
- `/ship`: Lint + `/build-check` (Build muss grün sein, max. 2 Versuche → STOPP).
- **Output:** vollständige, fehlerfreie Seite + Vercel-Preview-Link.

## Phase 5 — Präsentieren & Verkaufen → `/pitch` + `/marketing`
**Frage:** Wie wird aus der Seite ein verkaufter Auftrag?
- `/pitch`: Präsentation + Value-Proposition + Preisrahmen + klarer nächster Schritt.
- `/marketing`: Akquise-Content, Positionierung der Agentur, Case-Study aus dem Projekt.
- **Output:** verkaufte Webseite + Marketing-Material für den nächsten Kunden.

---

## Zeit-Ziel pro Projekt (Richtwert)
| Phase | Zeit |
|---|---|
| 1 Recherche | 0,5 Tag |
| 2 Konzept | 0,5 Tag |
| 3 Bauen | 2–3 Tage |
| 4 Qualität | 0,5 Tag |
| 5 Pitch | 0,5 Tag |

## Goldene Regeln
1. **Build vor Deploy** — immer (`/build-check`).
2. **Original statt Kopie** — Referenzen inspirieren, nicht klauen.
3. **Performance = Verkauf** — schnelle Seite, optimierte Assets.
4. **Jede Phase hat ein Deliverable** — nichts bleibt vage.
