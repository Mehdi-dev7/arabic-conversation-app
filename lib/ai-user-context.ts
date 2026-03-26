import type { Progress, User } from '@prisma/client';

/**
 * Bloc texte à injecter dans le system prompt pour que le tuteur IA
 * « se souvienne » sans recevoir l’intégralité des anciennes conversations.
 */
export function buildTutorMemoryBlock(input: {
  user: Pick<User, 'currentLevel' | 'preferredLanguage' | 'aiMemorySummary'>;
  progress: Pick<Progress, 'commonErrors' | 'learningSnapshot' | 'wordsLearned' | 'totalConversations'> | null;
}): string {
  const sections: string[] = [];

  sections.push(
    `Profil apprenant: niveau=${input.user.currentLevel}, langue préférée=${input.user.preferredLanguage}.`
  );

  if (input.user.aiMemorySummary?.trim()) {
    sections.push(
      `Mémoire long terme (résumé pédagogique, pas l’historique complet des messages):\n${input.user.aiMemorySummary.trim()}`
    );
  }

  if (input.progress) {
    const bits: string[] = [];
    bits.push(`Conversations totales (indicatif): ${input.progress.totalConversations}`);
    bits.push(`Mots suivis (vocabulaire): ${input.progress.wordsLearned}`);
    if (input.progress.commonErrors && typeof input.progress.commonErrors === 'object') {
      bits.push(
        `Erreurs fréquentes (agrégées): ${JSON.stringify(input.progress.commonErrors)}`
      );
    }
    if (input.progress.learningSnapshot && typeof input.progress.learningSnapshot === 'object') {
      bits.push(
        `Progression structurée: ${JSON.stringify(input.progress.learningSnapshot)}`
      );
    }
    sections.push(bits.join('\n'));
  }

  return sections.join('\n\n');
}
