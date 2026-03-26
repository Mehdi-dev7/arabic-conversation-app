export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Language = 'msa' | 'darija';

export const levelConfigs = {
  beginner: {
    systemPrompt: `You are a patient Arabic tutor. Use simple sentences (5-8 words max). 
    Provide immediate, gentle corrections. Repeat user's message correctly.
    Translate complex words. Vocabulary < 500 words.`,
    maxTokensPerMessage: 500,
    correctionFrequency: 'immediate' as const,
    translationHelp: true,
  },
  
  intermediate: {
    systemPrompt: `You are an encouraging Arabic tutor. Use natural conversational phrases.
    Introduce common idioms. Correct errors with brief explanations.
    Vocabulary 500-2000 words.`,
    maxTokensPerMessage: 1000,
    correctionFrequency: 'moderate' as const,
    translationHelp: false,
  },
  
  advanced: {
    systemPrompt: `You are a sophisticated Arabic conversation partner. Use complex structures,
    idioms, and multiple registers. Debate topics. Subtle corrections.
    Vocabulary > 2000 words.`,
    maxTokensPerMessage: 2000,
    correctionFrequency: 'minimal' as const,
    translationHelp: false,
  }
};

export const languageConfigs = {
  msa: {
    name: 'العربية الفصحى (Modern Standard Arabic)',
    description: 'Formal, media, education, administration',
    systemPromptAddition: `Speak in Modern Standard Arabic (Fusha). 
    Use grammatically correct classical structures.`,
  },
  
  darija: {
    name: 'الدارجة المغربية (Moroccan Darija)',
    description: 'Conversational daily Moroccan dialect',
    systemPromptAddition: `Speak in Moroccan Darija (Moroccan Arabic dialect). 
    Use colloquial expressions, local idioms.
    Grammar can be flexible as in natural speech.`,
  }
};
