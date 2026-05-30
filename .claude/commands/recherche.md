---
description: Phase 1 der Agentur-Pipeline. Analysiert Konkurrenz/Anbieter und die Ausgangslage eines Kunden, liefert ein knappes Briefing mit Positionierung und den 3 größten Hebeln.
---

# /recherche

Wettbewerbs- & Marktrecherche für `$ARGUMENTS` (Kunde, Branche und/oder Konkurrenz-URLs).

## Ablauf
1. **Sammeln**
   - Konkurrenz-/Anbieter-Seiten mit **Playwright** screenshotten (Desktop + Mobile).
   - Inhalte/Claims mit **fetch** ziehen.
2. **Analysieren** (Taste-Skills)
   - Positionierung: Wie verkaufen die sich? Preis-/Premium-Signal?
   - Struktur: Welche Sektionen, welcher Flow, welche CTA?
   - Schwächen: Wo ist es langweilig, langsam, austauschbar?
3. **Briefing ausgeben** (kurz, kein Roman)
   - **Zielgruppe** + was sie bewegt
   - **Positionierung** für unseren Kunden (1 Satz)
   - **3 größte Hebel**, mit denen wir besser sind
   - **2–3 Referenz-Seiten** als Struktur-Inspiration → übergeben an `/referenz`

## Regel
Fakten vor Bauchgefühl: erst schauen (Screenshots/Inhalte), dann urteilen.
