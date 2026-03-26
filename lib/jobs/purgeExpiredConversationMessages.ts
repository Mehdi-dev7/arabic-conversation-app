import { prisma } from '@/lib/prisma';

/**
 * À appeler depuis un cron (ex. quotidien) : supprime le contenu brut des messages
 * une fois messagesRetentionExpiresAt dépassé. Conserve sessionSummary et métadonnées.
 */
export async function purgeExpiredConversationMessages(): Promise<{ purged: number }> {
  const now = new Date();

  const candidates = await prisma.conversation.findMany({
    where: {
      messagesRetentionExpiresAt: { lte: now },
    },
    select: { id: true, messages: true },
  });

  let purged = 0;

  for (const c of candidates) {
    const raw = c.messages as unknown;
    const arr = Array.isArray(raw) ? raw : [];
    if (arr.length === 0) continue;

    await prisma.conversation.update({
      where: { id: c.id },
      data: { messages: [] },
    });
    purged += 1;
  }

  return { purged };
}
