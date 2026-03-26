# Prochaines étapes — à relire avant chaque session

Ce fichier résume **les décisions prises**, **ce qu’il reste à faire**, et **ce que tu dois faire toi-même** (comptes externes, clés, déploiement).

---

## Décisions déjà actées (ne pas re-débattre sans raison)

| Sujet | Choix |
|--------|--------|
| Client | App **React Native (Expo)** = cible produit ; **plus de Next.js** comme stack principale (migration en cours). |
| Backend | Approche **hybride** : **Supabase** (Postgres + Auth) + **petite API Node** pour secrets (Claude, Stripe, Whisper/TTS). |
| Données côté mobile | **Tout passe par l’API** (pas de lecture directe Supabase depuis l’app → évite les erreurs RLS). |
| Utilisateur à l’inscription | **Trigger SQL** sur `auth.users` → crée la ligne `public.users` (même `id` que Prisma). |
| Connexion | **Google + Apple** dès le départ. |
| Conversations | **Ne pas tout garder** : rétention + résumés (`User.aiMemorySummary`, `Conversation.sessionSummary`, purge des messages bruts). Voir `docs/MEMORY-AND-RETENTION.md`. |
| Monétisation | **Payant** avec **essai gratuit** (durée / carte à définir avec Stripe). |

---

## Ce que le code / le repo doit encore recevoir (ordre logique)

1. **Extraire l’API** hors de Next : dossier type `server/` ou `api/` (Hono/Fastify) avec les routes actuelles (`/api/chat`, conversations, Stripe, speech…).
2. **Brancher Supabase Auth** sur le mobile + **valider le JWT** sur l’API ; supprimer la dépendance NextAuth côté « app » quand la bascule est faite.
3. **SQL trigger** `auth.users` → `public.users` (fichier versionné, ex. `supabase/migrations/` ou doc + exécution manuelle).
4. **Aligner `User.id`** avec l’UUID Supabase (au lieu de `cuid()` si tu uniformises — à planifier avec une migration de données si besoin).
5. **Cron / job** : appeler `purgeExpiredConversationMessages` (ou équivalent hébergeur) pour la rétention.
6. **Chat sécurisé** : authentifier `/chat` ou signer les requêtes + rate limits (coût API).
7. **Nettoyer le repo** : retirer ou archiver le code Next une fois l’API + Expo stabilisés.

---

## Ce que **tu** dois faire de ton côté (checklist)

### Comptes & clés

- [ ] Projet **Supabase** : URL, anon key (mobile si besoin), **service role** uniquement sur le serveur.
- [ ] **Google Cloud** : OAuth (Android + iOS + web redirect selon Expo).
- [ ] **Apple Developer** : Sign in with Apple (Services ID, bundle, clé `.p8` si besoin).
- [ ] **Stripe** : clés test/prod, **webhook** pointant vers l’URL finale de ton API (`https://api.../webhooks/stripe`).
- [ ] **Anthropic**, **OpenAI** (Whisper), **Google Cloud TTS** : clés sur l’API uniquement.

### Base de données

- [ ] `DATABASE_URL` (Postgres Supabase ou autre) dans `.env` **côté serveur**.
- [ ] Appliquer le schéma : `npx prisma db push` ou `npx prisma migrate deploy` (voir `prisma/README.md` et `docs/MEMORY-AND-RETENTION.md`).
- [ ] Exécuter la migration **mémoire / rétention** si la base existait déjà avant ces colonnes :  
  `prisma/migrations/20250323180000_memory_retention/migration.sql`

### Mobile

- [ ] `EXPO_PUBLIC_API_URL` = URL de **ton API** (pas `localhost` sur téléphone physique : IP LAN ou domaine).

### Déploiement

- [ ] Où héberges-tu l’API (Railway, Fly, Render, VPS…) ?
- [ ] Nom de domaine + HTTPS pour Stripe webhooks.

---

## Commandes utiles (rappel)

| Action | Commande |
|--------|----------|
| Client Prisma après changement `schema.prisma` | `npx prisma generate` |
| Sync schéma vers la DB (dev) | `npx prisma db push` |
| **Ne pas** lancer sans DB configurée | `prisma migrate dev` (peut rester bloqué) |
| Lancer l’app Expo | `npm run mobile` |
| Lancer l’ancien Next (en attendant la migration API) | `npm run dev` |

---

## Avant une nouvelle session Cursor

1. Ouvre **`docs/NEXT-STEPS.md`** (ce fichier) + **`docs/ROADMAP.md`**.
2. Dis où tu en es : **API extraite ?** **Supabase créé ?** **DB migrée ?**
3. Indique si tu **bloques** sur une erreur précise (commande, message, capture).

---

## Fichiers de référence dans le repo

| Fichier | Contenu |
|---------|---------|
| `docs/ROADMAP.md` | État produit / technique, roadmap large |
| `docs/MEMORY-AND-RETENTION.md` | Mémoire IA, rétention, Prisma qui bloque |
| `docs/NEXT-STEPS.md` | **Ce fichier** — prochaines étapes & ta checklist |
| `prisma/README.md` | Commandes Prisma |
| `.cursorrules` | Pointe vers `.cursor/rules/` pour le contexte IA |

---

*Dernière mise à jour : à compléter quand une étape majeure est terminée (ex. « API extraite le 2025-… »).*
