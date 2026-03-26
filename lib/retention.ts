/**
 * Politique de rétention des messages bruts (pas de stockage infini).
 * Les résumés (User.aiMemorySummary, Conversation.sessionSummary) et Progress restent pour la mémoire IA + stats.
 */

export const RETENTION = {
  free: {
    /** Jours après lesquels les messages Json[] peuvent être purgés */
    rawMessagesDays: 14,
  },
  premium: {
    rawMessagesDays: 90,
  },
  student: {
    rawMessagesDays: 90,
  },
} as const;

export type PlanKey = 'free' | 'premium' | 'student';

export function normalizePlan(plan: string): PlanKey {
  if (plan === 'premium' || plan === 'student') return plan;
  return 'free';
}

/** Date limite avant purge des messages bruts pour une conversation créée à `referenceDate`. */
export function computeMessagesRetentionExpiresAt(
  plan: string,
  referenceDate: Date = new Date()
): Date {
  const key = normalizePlan(plan);
  const days = RETENTION[key].rawMessagesDays;
  return new Date(referenceDate.getTime() + days * 86_400_000);
}
