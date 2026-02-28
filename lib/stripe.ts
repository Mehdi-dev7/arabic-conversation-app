import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY manquant dans .env.local');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

// Plans disponibles
export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    priceId: null,
    features: [
      '2 conversations par mois',
      'Scénario Introduction uniquement',
      'Mode texte seulement',
      'Corrections basiques',
      'Historique 7 jours',
    ],
    limits: {
      conversationsPerMonth: 2,
      scenarios: ['introduction'],
      voiceMode: false,
      historyDays: 7,
    },
  },
  PREMIUM_MONTHLY: {
    id: 'premium_monthly',
    name: 'Premium Mensuel',
    price: 9.99,
    priceId: process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY,
    interval: 'month',
    features: [
      'Conversations illimitées',
      'Tous les scénarios',
      'Mode vocal complet (STT + TTS)',
      'Corrections avancées en temps réel',
      'Historique illimité',
      'Tracking vocabulaire avancé',
      'Export PDF/Anki',
      'Statistiques détaillées',
      'Support prioritaire',
    ],
    limits: {
      conversationsPerMonth: Infinity,
      scenarios: 'all',
      voiceMode: true,
      historyDays: Infinity,
    },
  },
  PREMIUM_YEARLY: {
    id: 'premium_yearly',
    name: 'Premium Annuel',
    price: 79.99,
    priceId: process.env.STRIPE_PRICE_ID_PREMIUM_YEARLY,
    interval: 'year',
    savings: '33%',
    features: [
      'Toutes les fonctionnalités Premium',
      '💰 Économisez 33% (= 6.67€/mois)',
      'Facturation annuelle (79.99€/an)',
    ],
    limits: {
      conversationsPerMonth: Infinity,
      scenarios: 'all',
      voiceMode: true,
      historyDays: Infinity,
    },
  },
  STUDENT_MONTHLY: {
    id: 'student_monthly',
    name: 'Étudiant',
    price: 4.99,
    priceId: process.env.STRIPE_PRICE_ID_STUDENT_MONTHLY,
    interval: 'month',
    requiresVerification: true,
    features: [
      'Toutes les fonctionnalités Premium',
      '🎓 Tarif étudiant -50%',
      'Justificatif requis (carte étudiante)',
    ],
    limits: {
      conversationsPerMonth: Infinity,
      scenarios: 'all',
      voiceMode: true,
      historyDays: Infinity,
    },
  },
} as const;

// Mapper plan string → Stripe Price ID
export function getPriceIdFromPlan(planId: string): string | null {
  switch (planId) {
    case 'premium_monthly':
      return process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY || null;
    case 'premium_yearly':
      return process.env.STRIPE_PRICE_ID_PREMIUM_YEARLY || null;
    case 'student_monthly':
      return process.env.STRIPE_PRICE_ID_STUDENT_MONTHLY || null;
    default:
      return null;
  }
}

// Mapper Stripe Price ID → plan string
export function getPlanFromPriceId(priceId: string): string {
  if (priceId === process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY) {
    return 'premium';
  }
  if (priceId === process.env.STRIPE_PRICE_ID_PREMIUM_YEARLY) {
    return 'premium';
  }
  if (priceId === process.env.STRIPE_PRICE_ID_STUDENT_MONTHLY) {
    return 'student';
  }
  return 'free';
}
