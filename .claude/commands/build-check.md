---
description: Lokalen Next.js-Build erzwingen, Fehler analysieren und beheben. Setzt das strikte Deployment-Gesetz aus CLAUDE.md durch (Build muss fehlerfrei sein, max. 2 Versuche, dann STOPP).
---

# /build-check

Führt den verpflichtenden lokalen Build-Gate aus, **bevor** irgendetwas Richtung Vercel geht.

## Ablauf

1. **Build laufen lassen**
   ```bash
   npm run build
   ```
   Bei fehlenden Dependencies vorher `npm install`.

2. **Bei Erfolg** → Kurzmeldung „Build ✓ – deploy-ready" + ggf. `/deploy` vorschlagen.

3. **Bei Fehler**
   - Fehlermeldung exakt zitieren (Datei:Zeile).
   - Ursache lokal beheben (Typfehler, fehlende Imports, Three.js/SSR-Probleme, etc.).
   - Erneut `npm run build`.

4. **Token-Bremse (Pflicht):** Nach **2** fehlgeschlagenen Build-Versuchen **STOPP** —
   Problem zusammenfassen und den Benutzer fragen. Nicht blind weiterprobieren.

## Typische Stolpersteine in diesem Projekt
- `window`/`document` in Three.js/R3F-Code → muss client-side sein (`"use client"` / dynamic import `ssr:false`).
- GSAP/Lenis-Init im SSR → in `useEffect` kapseln.
- `vendor/` ist vom Type-Check ausgeschlossen — Fehler dort ignorieren, sie gehören nicht zum Build.
