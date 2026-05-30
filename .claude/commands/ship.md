---
description: Vollständige Pre-Ship-Checkliste. Verkettet Design-Review, Lint und Build-Gate, fasst den Zustand zusammen und gibt erst dann für /deploy frei.
---

# /ship

Bringt eine Änderung sauber bis an die Deploy-Schwelle — nichts geht raus, das nicht durch alle Gates ist.

## Checkliste (der Reihe nach)

1. **Design-Gate** → `/design-review`
   Award-Niveau erreicht? Mindestens die Top-3-Hebel adressiert?

2. **Lint**
   ```bash
   npm run lint
   ```
   Fehler beheben (Warnungen bewerten).

3. **Build-Gate** → `/build-check`
   `npm run build` muss fehlerfrei sein. Max. 2 Versuche, dann STOPP.

4. **Diff-Review**
   - Kein toter Code, keine `console.log`-Reste, keine auskommentierten Blöcke.
   - Keine Secrets/Env im Diff.
   - Animationen haben Cleanup + `prefers-reduced-motion`.

5. **Zusammenfassung**
   - Was wurde geändert, was ist grün, was ist offen.
   - Erst bei allen grünen Gates: `/deploy` vorschlagen.

## Regel
Schlägt ein Gate fehl → hier anhalten, Problem benennen, **nicht** weiter Richtung Deploy.
