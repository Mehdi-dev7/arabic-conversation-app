# Mémoire IA et rétention des conversations

## Pourquoi `migrate dev` reste figé ?

`prisma migrate dev` **ouvre une connexion** à PostgreSQL (`DATABASE_URL`). Si la variable n’est pas définie, que le serveur est injoignable ou attend une confirmation, la commande peut **bloquer indéfiniment**.

**Solutions :**

1. **Base locale prête** : dans `.env`, `DATABASE_URL="postgresql://USER:PASS@localhost:5432/DBNAME"` puis :
   ```bash
   npx prisma migrate deploy
   ```
   ou, sans historique de migrations, synchronisation directe du schéma :
   ```bash
   npx prisma db push
   ```

2. **Appliquer seulement les nouvelles colonnes** (base déjà existante) : exécuter le SQL dans  
   `prisma/migrations/20250323180000_memory_retention/migration.sql`  
   via ton client SQL ou Supabase SQL Editor.

3. **Générer le client Prisma sans base** :
   ```bash
   npx prisma generate
   ```

## Modèle métier (résumé)

| Élément | Rôle |
|---------|------|
| `User.aiMemorySummary` | Résumé glissant pour le prompt (pas tout le chat). |
| `User.aiMemoryUpdatedAt` | Horodatage de ce résumé. |
| `Progress.learningSnapshot` | JSON optionnel (thèmes, jalons). |
| `Conversation.messagesRetentionExpiresAt` | Après cette date, purge possible des `messages` bruts. |
| `Conversation.sessionSummary` | Court résumé conservé après purge. |

Politique des délais : `lib/retention.ts`. Job de purge : `lib/jobs/purgeExpiredConversationMessages.ts` (à brancher sur un cron).

## Prompt IA

`buildSystemPrompt(..., { memoryBlock })` injecte un bloc **STUDENT MEMORY**.  
L’API `/api/chat` accepte un corps optionnel `memoryBlock` (idéalement construit côté serveur à partir de `User` + `Progress` via `buildTutorMemoryBlock` dans `lib/ai-user-context.ts`).
