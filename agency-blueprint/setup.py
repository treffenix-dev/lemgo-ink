import os
import shutil

# CLAUDE.md ins Root kopieren
src = os.path.join(os.path.dirname(__file__), "CLAUDE.md")
dst = os.path.join(os.path.dirname(__file__), "..", "CLAUDE.md")
shutil.copy(src, dst)

# Ordnerstruktur anlegen
folders = [
    "src/components",
    "src/hooks",
    "src/utils",
    "src/assets/3d",
    "public/models",
]
for folder in folders:
    os.makedirs(folder, exist_ok=True)
    print(f"  📁 {folder}")

print("\n✅ Agentur-System initialisiert. 24-Tool-Stack aktiv.")
