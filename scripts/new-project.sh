#!/bin/bash
# ============================================================
# treffenix-dev — Neues Kundenprojekt starten
# Verwendung: bash scripts/new-project.sh
# ============================================================

set -e

echo ""
echo "======================================"
echo "  treffenix-dev — Neues Projekt"
echo "======================================"
echo ""

# --- Eingaben ---
read -p "Repo-Name (z.B. mario-pizza-website): " REPO_NAME
read -p "Kundenname (z.B. Mario Rossi): " KUNDE
read -p "Branche / Typ (z.B. Restaurant, Tattoo-Studio, Salon): " BRANCHE
read -p "Primärfarbe Hex (z.B. #C9A84C oder Enter für Standard): " FARBE
FARBE=${FARBE:-"#3B82F6"}

echo ""
echo "Erstelle Projekt: $REPO_NAME"
echo "--------------------------------------"

# --- Verzeichnis anlegen ---
PROJECT_DIR="/home/user/$REPO_NAME"
if [ -d "$PROJECT_DIR" ]; then
  echo "⚠️  Verzeichnis $PROJECT_DIR existiert bereits!"
  exit 1
fi

# --- Next.js Projekt erstellen ---
echo "→ Next.js initialisieren..."
npx create-next-app@latest "$PROJECT_DIR" \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-git \
  --yes

# --- package.json Name setzen ---
sed -i "s/\"name\": \".*\"/\"name\": \"$REPO_NAME\"/" "$PROJECT_DIR/package.json"

# --- Standard Dependencies installieren ---
echo "→ Dependencies installieren..."
cd "$PROJECT_DIR"
npm install framer-motion lucide-react clsx

# --- CLAUDE.md für neues Projekt erstellen ---
cat > "$PROJECT_DIR/CLAUDE.md" << EOF
# $REPO_NAME — Claude Projektgedächtnis

## Projekt
- **Kunde:** $KUNDE
- **Branche:** $BRANCHE
- **GitHub:** \`treffenix-dev/$REPO_NAME\`
- **Vercel:** $REPO_NAME.vercel.app
- **Gestartet:** $(date +"%B %Y")

## Design-System

### Primärfarbe
\`\`\`
primary: $FARBE
\`\`\`

### Stack
- Next.js 14 (App Router), TypeScript
- Tailwind CSS
- Framer Motion (Animationen)
- Lucide React (Icons)

## Notizen
[Hier Besonderheiten des Projekts eintragen]

---

## GOLDENE REGEL
Dieses Repo gehört NUR zu $KUNDE.
Niemals Code aus anderen Projekten hier einmischen.
EOF

# --- Git initialisieren ---
echo "→ Git initialisieren..."
git init
git -c commit.gpgsign=false add .
git -c commit.gpgsign=false commit -m "Initial commit: $REPO_NAME

Kunde: $KUNDE
Branche: $BRANCHE
Stack: Next.js 14, TypeScript, Tailwind, Framer Motion"

echo ""
echo "======================================"
echo "  ✅ Projekt bereit!"
echo "======================================"
echo ""
echo "NÄCHSTE SCHRITTE:"
echo ""
echo "1. GitHub Repo erstellen:"
echo "   → github.com/treffenix-dev → New Repository"
echo "   → Name: $REPO_NAME"
echo ""
echo "2. Repo pushen:"
echo "   cd $PROJECT_DIR"
echo "   git remote add origin https://github.com/treffenix-dev/$REPO_NAME.git"
echo "   git push -u origin main"
echo ""
echo "3. Vercel verbinden:"
echo "   → vercel.com → Add New Project → $REPO_NAME importieren"
echo ""
echo "4. Claude Code Session starten:"
echo "   → code.claude.ai → New Session → $REPO_NAME Repo verbinden"
echo ""
echo "5. PROJECTS.md in lemgo-ink updaten!"
echo ""
