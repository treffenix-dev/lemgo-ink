# Vendor — Claude-Code-Referenzbibliothek

Komplett eingefrorene Drittanbieter-Repos als **Referenz- und Werkzeug-Bibliothek**
für die Entwicklung. Diese Dateien werden **nicht** vom Next.js-Build kompiliert
(in `tsconfig.json` ausgeschlossen) und **nicht** zu Vercel deployt (`.vercelignore`).

Mitgelieferte `.github/workflows/` der Repos liegen unterhalb von `vendor/` und
werden von GitHub Actions **nicht** ausgeführt.

## Enthaltene Repos

| Ordner | Quelle | Commit | Upstream-Datum |
|---|---|---|---|
| `awesome-claude-code/` | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | `614f102` | 2026-04-27 |
| `superpowers/` | [obra/superpowers](https://github.com/obra/superpowers) | `6fd4507` | 2026-05-29 |
| `awesome-claude-skills/` | [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | `1da55aa` | 2026-04-28 |
| `AI-Projects-Index/` | [danielrosehill/AI-Projects-Index](https://github.com/danielrosehill/AI-Projects-Index) | `77ab9f6` | 2026-04-25 |
| `ECC/` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `64cd1ba` | 2026-05-28 |

Vendored am: **2026-05-30**. Git-Historie der Upstreams entfernt (reine Datei-Snapshots).
Lizenzen jeweils in `<ordner>/LICENSE`.

## Was wo steckt

- **awesome-claude-code/** — kuratierte Slash-Commands (`resources/slash-commands/`),
  Hooks, CLAUDE.md-Vorlagen, Workflows, `THE_RESOURCES_TABLE.csv`.
- **superpowers/** — Skills, Hooks und Tooling rund um Claude-Code-Workflows.
- **awesome-claude-skills/** — kuratierte Liste von Claude-Skills.
- **AI-Projects-Index/** — Index/Überblick über AI-Projekte.
- **ECC/** — sehr umfangreiche Sammlung: `commands/`, `skills/` (250+), `agents/`,
  `hooks/`, `rules/`, Multi-Tool-Configs (`.cursor`, `.opencode`, `.kiro`, …).

> Aktive, projekteigene Slash-Commands liegen in `../.claude/commands/`
> (`/build-check`, `/deploy`, `/design-review`, `/animate`, `/ship`). Die Vendor-Repos
> sind die Quelle/Inspiration dafür, werden selbst aber nicht automatisch geladen.

## Aktualisieren

```bash
git clone --depth 1 <repo-url> /tmp/acc
rm -rf vendor/<ordner> && cp -a /tmp/acc vendor/<ordner> && rm -rf vendor/<ordner>/.git
# danach Commit-SHA in der Tabelle oben aktualisieren
```
