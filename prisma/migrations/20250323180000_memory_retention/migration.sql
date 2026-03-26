-- Mémoire IA + rétention des messages bruts (colonnes ajoutées au schéma existant)
-- PostgreSQL 11+ (ADD COLUMN IF NOT EXISTS)

ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "aiMemorySummary" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "aiMemoryUpdatedAt" TIMESTAMP(3);

ALTER TABLE "conversations" ADD COLUMN IF NOT EXISTS "messagesRetentionExpiresAt" TIMESTAMP(3);
ALTER TABLE "conversations" ADD COLUMN IF NOT EXISTS "sessionSummary" TEXT;

CREATE INDEX IF NOT EXISTS "conversations_messagesRetentionExpiresAt_idx" ON "conversations"("messagesRetentionExpiresAt");

ALTER TABLE "progress" ADD COLUMN IF NOT EXISTS "learningSnapshot" JSONB;
