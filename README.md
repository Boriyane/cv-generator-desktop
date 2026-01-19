# CV Generator Desktop

Application desktop offline pour générer un CV professionnel avec Electron + Vite + React + TypeScript.

## Fonctionnalités
- Wizard 4 étapes avec preview temps réel.
- Templates Modern Minimal, Executive, Two-column.
- Thèmes (couleur d'accent + police).
- Export PDF local via Playwright dans le process main.
- Import/Export JSON du profil.
- Sauvegarde automatique locale (fichier JSON dans `userData`).

## Installation
```bash
npm install
```

## Développement
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Packaging
```bash
npm run dist
```

## Notes techniques
- `nodeIntegration` désactivé et `contextIsolation` activé.
- IPC strict via liste blanche + validateurs.
- Données nettoyées (escape HTML) pour éviter les injections.
- Export PDF : rendu HTML des templates React puis `printToPDF` via Playwright.
