---
description: Gegateter Vercel-Deploy. Erzwingt zuerst einen fehlerfreien lokalen Build, deployt erst danach. Niemals blind deployen.
---

# /deploy

Sicheres Deployment nach dem Deployment-Gesetz aus CLAUDE.md.

## Ablauf

1. **Build-Gate (zwingend)** — erst `/build-check` bzw. `npm run build`.
   Schlägt der Build fehl → **kein Deploy**, zurück zu `/build-check`.

2. **Branch/Diff prüfen** — was wird deployt? Kurz zusammenfassen.

3. **Deploy**
   ```bash
   # Preview
   vercel
   # Production (nur nach ausdrücklicher Freigabe)
   vercel --prod
   ```
   Production-Deploys **nur** auf explizite Anweisung des Benutzers.

4. **Verifizieren** — Deploy-URL nennen, Build-Logs auf Warnungen prüfen.

## Regeln
- Kein `vercel --prod` ohne grünen lokalen Build **und** Freigabe.
- Bei 2 fehlgeschlagenen Deploy-Versuchen → STOPP, Benutzer fragen (Token-Bremse).
- Secrets/Env nur über Vercel-Env-Vars, nie committen.
