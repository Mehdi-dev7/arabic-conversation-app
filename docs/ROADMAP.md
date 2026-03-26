# Roadmap — Arabic Conversation

Document de suivi : **ce qui est en place**, **ce qui est partiel**, et **ce qu’il reste à accomplir**, aligné sur le code actuel (pas seulement les spécifications théoriques).

---

## Légende

| Statut | Signification |
|--------|----------------|
| Fait | Implémenté et utilisable dans le flux prévu |
| Partiel | Existe mais incomplet, démo, ou non branché partout |
| À faire | Pas encore dans le code (ou abandonné / reporté) |

---

## 1. Architecture & infra

| Élément | Statut | Détail |
|--------|--------|--------|
| Monorepo Next.js (racine) + Expo `mobile/` | Fait | `npm run dev` + `npm run mobile` |
| API Next.js (`/api/*`) consommée par le mobile via `EXPO_PUBLIC_API_URL` | Fait | `mobile/src/api/chat.ts` |
| Règles Cursor découpées `.cursor/rules/*.mdc` | Fait | `.cursorrules` renvoie vers ces fichiers |
| Déploiement prod (Vercel + base) | À faire / à valider | À confirmer par environnement |
| Package partagé `packages/shared` (lib unique) | À faire | Aujourd’hui `lib/` et `mobile/src/lib/` sont dupliqués |

---

## 2. Backend & données

| Élément | Statut | Détail |
|--------|--------|--------|
| Prisma + PostgreSQL + modèles User, Conversation, Vocabulary, Progress, Correction, RateLimit | Fait | `prisma/schema.prisma` |
| Route `/api/chat` (Claude, `buildSystemPrompt`, scénarios) | Fait | Pas d’auth sur la route ; **risque coût / abus** si URL publique |
| Route `/api/conversations` (sauvegarde) + limite plan gratuit | Fait | Session requise ; `FREE_LIMIT = 2` / mois |
| Auth `/api/auth/[...nextauth]` + inscription email/mot de passe | Fait | Voir `lib/auth.ts`, pages `app/auth/*` |
| Vocabulaire / corrections API | Partiel | `app/api/vocabulary/route.ts` — à croiser avec l’UI |
| Rate limiting **global** sur `/api/chat` (clé API, IP, user) | À faire | Spécifié dans les règles produit, pas sur la route chat |
| Cache réponses fréquentes (coût) | À faire | Spécification |

---

## 3. Web (Next.js)

| Élément | Statut | Détail |
|--------|--------|--------|
| Landing, liste scénarios, pricing | Fait | `app/page.tsx`, `app/pricing/page.tsx` |
| Dashboard avec stats Prisma | Fait | `app/dashboard/page.tsx` |
| Chat scénario avec interface complète | Fait | `ChatInterface`, bulles, corrections, aide |
| Avatar animé (Framer) + fond scénario | Fait | `GestureAvatar`, `ScenarioBackground` |
| Mode vocal (Whisper + TTS) côté web | Partiel | Routes `speech-to-text`, `text-to-speech` + composants voix ; dépend des clés / config |
| PWA (next-pwa) | Partiel | Présent dans `package.json` / config ; à valider en build |

---

## 4. Mobile (Expo)

| Élément | Statut | Détail |
|--------|--------|--------|
| Navigation expo-router | Fait | Accueil, `chat/[scenarioId]`, dashboard placeholder |
| Choix MSA / Darija et niveau | Fait | `app/index.tsx` |
| Chat texte + messages + parsing corrections | Fait | `ChatScreen`, `CorrectionBanner` |
| Avatar SVG + Reanimated | Fait | `GestureAvatar` |
| Auth (Google / Apple / session) | À faire | Écran dashboard placeholder sans auth |
| Sauvegarde conversations / synchro backend | À faire | Pas d’appel à `/api/conversations` ni session |
| Mode vocal (expo-av + API) | À faire | Non présent dans `mobile/` |
| Sous-titres FR / parsing `TRADUCTION:` | Partiel | Logique côté `lib/prompts` ; UI mobile à brancher si besoin |
| Builds EAS (TestFlight / Play Store) | À faire | Pas encore dans le repo |

---

## 5. Paiements & plans

| Élément | Statut | Détail |
|--------|--------|--------|
| Stripe checkout / webhook / portail client | Fait | `app/api/stripe/*`, composants Paywall / abonnement |
| Application stricte des règles freemium (niveaux 2–4, Darija, etc.) | Partiel | Logique métier dans les règles `.mdc` ; à aligner avec `user.plan` partout |

---

## 6. Pédagogie & produit (spécifications vs code)

| Élément | Statut | Détail |
|--------|--------|--------|
| Niveaux `beginner` / `intermediate` / `advanced` + MSA/Darija | Fait | `lib/constants.ts`, prompts, scénarios |
| Parcours 4 niveaux (vocabulaire → immersion) du document produit | Partiel | Prisma a `vocabulary_acquisition` ; UI et prompts **simplifiés** par rapport au doc long |
| Warm-up quotidien | À faire | Spécifié, pas d’écran dédié |
| Flashcards / répétition espacée | À faire | Modèle DB possible ; pas d’app complète |
| Thèmes hiérarchiques (énorme spec) | Partiel | Données partielles dans `lib/scenarios.ts` ; pas tout le graphe du doc |
| Histoires multi-personnages | À faire | Spec dans `.cursor/rules`, pas dans l’app |
| Tableau de bord “parcours” complet | Partiel | Dashboard web riche ; mobile minimal |

---

## 7. Qualité & ops

| Élément | Statut | Détail |
|--------|--------|--------|
| ESLint | Partiel | Script `npm run lint` |
| Tests auto (E2E / API) | À faire | Liste dans les règles, peu ou pas de tests dans le repo |
| Observabilité (Sentry, logs) | À faire | Mentionné dans les specs projet |
| Lighthouse / perf web | À mesurer | Objectifs dans les règles |

---

## Prochaine session — priorité n°1 : boucle vocale « parler en arabe »

C’est le cœur du produit : **micro → transcription (Whisper) → texte envoyé au chat (Claude)**. À traiter **avant** d’empiler auth mobile ou paywall.

| # | Étape | Détail |
|---|--------|--------|
| 1 | **Clés & serveur** | `OPENAI_API_KEY` sur l’environnement qui sert `POST /api/speech-to-text` (Next). `EXPO_PUBLIC_API_URL` pointant vers cette machine (IP réseau local pour téléphone physique, pas seulement `localhost`). |
| 2 | **Permissions Expo** | Micro iOS/Android (`app.json` / `Info.plist` / Android `RECORD_AUDIO`) selon la doc Expo. |
| 3 | **Enregistrement** | `expo-av` (ou module audio recommandé par la version Expo) : démarrer / arrêter, exporter un fichier compatible (ex. m4a) ou blob attendu par la route. |
| 4 | **Appel STT** | `FormData` avec champ `audio` + `language` (`ar`) → même contrat que `app/api/speech-to-text/route.ts`. |
| 5 | **Enchaînement** | `text` → `sendChatMessage` (déjà dans `mobile/src/api/chat.ts`) comme une saisie utilisateur. |
| 6 | **Test manuel** | Phrase courte en arabe → vérifier transcription + réponse IA. |

**Option juste après (pas bloquante pour un premier test)** : TTS pour lire la réponse (`/api/text-to-speech` côté web) ; peut suivre une fois la boucle micro → texte → chat stable.

---

## Roadmap suggérée (ordre pragmatique)

### Court terme

1. **Mode vocal sur mobile** (étapes du tableau ci-dessus) — **priorité absolue** pour valider le produit.
2. **Sécuriser le chat** : auth ou clé signée sur `/api/chat`, rate limits par utilisateur/IP (évite abus une fois l’URL publique).
3. **Auth mobile** + **sauvegarde** conversations (Expo Auth Session / token vers NextAuth, `/api/conversations`).
4. **Un seul `lib` partagé** (`packages/shared` ou script de sync) pour éviter les divergences.

### Moyen terme (valeur produit)

5. **Sous-titres** (parsing `TRADUCTION:`) sur mobile + réglages utilisateur.
6. **Paywall** cohérent sur mobile (Stripe / deep link).
7. **TTS** sur mobile si pas encore branché (lecture de la réponse).

### Long terme (vision document)

8. Warm-up, flashcards, progression 4 niveaux complète.
9. Histoires interactives + audio ambiant avancé.
10. Publication **App Store / Play Store** (EAS).

---

## Synthèse

- **Déjà solide** : stack Next.js + Prisma + Stripe + chat IA + expérience web riche + **app Expo** pour le cœur conversation (texte).
- **Trous principaux** : **vocal sur mobile** (priorité produit), puis **auth & persistance mobile**, **protection économique de `/api/chat`**, **alignement** spec (`.cursor/rules`) / **code** (niveaux, thèmes, histoires).
- **Prochaine étape clé** : **boucle micro → Whisper → chat** sur Expo ; ensuite durcir auth + limites pour un usage réel.

---

*Dernière mise à jour : mars 2025 — priorité vocal mobile pour la prochaine session ; à ajuster après chaque sprint.*
