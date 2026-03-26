# API Node (Hono)

Sert à remplacer progressivement les routes `app/api/*` de Next.js.

## Prérequis

- `npm install` dans ce dossier (déjà fait si tu vois `node_modules/`).
- `ANTHROPIC_API_KEY` : chargée depuis `server/.env` **ou** `.env` à la racine du monorepo (voir `index.ts` à la racine de `server/`).

## Commandes

```bash
cd server && npm run dev
```

Depuis la racine : `npm run api` — écoute par défaut sur **http://localhost:4000**.

## Routes

- `GET /health` — santé du service
- `POST /api/chat` — même corps JSON que l’ancienne route Next (`message`, `scenarioId`, `language`, `level`, `conversationHistory`, `memoryBlock` optionnel)

## Mobile / Expo

Dans `mobile/.env` :

```env
EXPO_PUBLIC_API_URL=http://localhost:4000
```

(Sur appareil physique : IP de ta machine au lieu de `localhost`.)

## Si `npm install` dans `server/` échoue ou reste bloqué

Relance avec un terminal « complet » (pas sandbox) ou : `cd server && npm install`

## Imports du dossier `lib/` à la racine du repo

Les routes utilisent `import(new URL('../../../lib/...', import.meta.url))` pour que Node/tsx résolvent correctement les fichiers du monorepo (évite les exports « vides » avec les chemins relatifs classiques).
