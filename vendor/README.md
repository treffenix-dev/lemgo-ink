# Vendor

Third-party code vendored (eingefroren) in dieses Projekt. Diese Dateien werden
**nicht** vom Next.js-Build kompiliert oder ausgeliefert – sie dienen als
Referenz- und Werkzeug-Bibliothek für die Entwicklung.

## `awesome-claude-code/`

Komplettes Repo von **[hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)** –
eine kuratierte Sammlung von Claude-Code-Ressourcen: Slash-Commands, Hooks,
Skills, Agent-Orchestratoren, Workflows, CLAUDE.md-Vorlagen und Tooling.

| | |
|---|---|
| Quelle | https://github.com/hesreallyhim/awesome-claude-code |
| Stand (Commit) | `614f102accbcd48206d63a21df64adc984026b40` |
| Upstream-Datum | 2026-04-27 |
| Vendored am | 2026-05-30 |
| Lizenz | siehe `awesome-claude-code/LICENSE` |
| Git-Historie | entfernt (nur Snapshot der Dateien) |

### Was drinsteckt

- `resources/` – kuratierte Slash-Commands, Hooks, CLAUDE.md-Beispiele
- `templates/` – Starter-Vorlagen
- `docs/` – Anleitungen & Guides
- `scripts/` / `tools/` – Python-Hilfsskripte (Wartung der Liste)
- `THE_RESOURCES_TABLE.csv` – vollständige Ressourcen-Tabelle
- `assets/` – Badges/SVGs des Original-Repos

### Aktualisieren

```bash
# komplettes Repo neu ziehen und Snapshot ersetzen
git clone --depth 1 https://github.com/hesreallyhim/awesome-claude-code.git /tmp/acc
rm -rf vendor/awesome-claude-code
cp -a /tmp/acc vendor/awesome-claude-code
rm -rf vendor/awesome-claude-code/.git
# danach Commit-SHA oben in dieser Datei aktualisieren
```
