'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PLANS } from '@/lib/stripe';

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      router.push('/auth/signin?redirect=/pricing');
      return;
    }

    setLoading(planId);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Erreur');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-night via-neutral-warm-gray to-primary-night">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-neutral-sand">
            تعلم العربية
          </Link>
          {session ? (
            <Link
              href="/dashboard"
              className="text-neutral-sand hover:text-primary-gold transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="text-neutral-sand hover:text-primary-gold transition-colors"
            >
              Se connecter
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-sand mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-neutral-sand/70 mb-8">
            Commencez gratuitement, passez à Premium quand vous êtes prêt
          </p>

          {/* Toggle Mensuel/Annuel */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-full p-2">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                billingInterval === 'monthly'
                  ? 'bg-primary-gold text-primary-night'
                  : 'text-neutral-sand hover:text-primary-gold'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors relative ${
                billingInterval === 'yearly'
                  ? 'bg-primary-gold text-primary-night'
                  : 'text-neutral-sand hover:text-primary-gold'
              }`}
            >
              Annuel
              <span className="absolute -top-2 -right-2 bg-success-green text-white text-xs px-2 py-1 rounded-full">
                -33%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* FREE Plan */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-neutral-sand mb-2">
                {PLANS.FREE.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-neutral-sand">0€</span>
                <span className="text-neutral-sand/60">/mois</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {PLANS.FREE.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-sand/80 text-sm">
                  <span className="text-primary-gold mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/auth/signup"
              className="block w-full bg-white/20 text-neutral-sand py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors text-center"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* PREMIUM Plan */}
          <div className="bg-primary-gold/20 backdrop-blur-lg rounded-2xl p-8 border-2 border-primary-gold relative">
            {/* Badge Popular */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-gold text-primary-night px-4 py-1 rounded-full text-sm font-semibold">
              ⭐ Populaire
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-neutral-sand mb-2">
                {billingInterval === 'monthly'
                  ? PLANS.PREMIUM_MONTHLY.name
                  : PLANS.PREMIUM_YEARLY.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-neutral-sand">
                  {billingInterval === 'monthly'
                    ? PLANS.PREMIUM_MONTHLY.price
                    : Math.round((PLANS.PREMIUM_YEARLY.price / 12) * 100) / 100}
                  €
                </span>
                <span className="text-neutral-sand/60">/mois</span>
              </div>
              {billingInterval === 'yearly' && (
                <p className="text-sm text-neutral-sand/70 mt-2">
                  Soit {PLANS.PREMIUM_YEARLY.price}€/an • Économisez 33%
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              {(billingInterval === 'monthly'
                ? PLANS.PREMIUM_MONTHLY.features
                : PLANS.PREMIUM_YEARLY.features
              ).map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-sand text-sm">
                  <span className="text-primary-gold mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                handleSubscribe(
                  billingInterval === 'monthly' ? 'premium_monthly' : 'premium_yearly'
                )
              }
              disabled={loading === 'premium_monthly' || loading === 'premium_yearly'}
              className="w-full bg-primary-gold text-primary-night py-3 rounded-lg font-semibold hover:bg-primary-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === 'premium_monthly' || loading === 'premium_yearly'
                ? 'Chargement...'
                : 'Passer à Premium'}
            </button>
          </div>

          {/* STUDENT Plan */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-neutral-sand mb-2">
                {PLANS.STUDENT_MONTHLY.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-neutral-sand">
                  {PLANS.STUDENT_MONTHLY.price}€
                </span>
                <span className="text-neutral-sand/60">/mois</span>
              </div>
              <p className="text-sm text-neutral-sand/70 mt-2">Tarif étudiant -50%</p>
            </div>

            <ul className="space-y-3 mb-8">
              {PLANS.STUDENT_MONTHLY.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-sand/80 text-sm">
                  <span className="text-primary-gold mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('student_monthly')}
              disabled={loading === 'student_monthly'}
              className="w-full bg-white/20 text-neutral-sand py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === 'student_monthly' ? 'Chargement...' : 'Tarif étudiant'}
            </button>

            <p className="text-xs text-neutral-sand/60 mt-4 text-center">
              Justificatif de scolarité requis
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-neutral-sand mb-6 text-center">
            Questions fréquentes
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-neutral-sand mb-2">
                Puis-je annuler à tout moment ?
              </h4>
              <p className="text-neutral-sand/70 text-sm">
                Oui, vous pouvez annuler votre abonnement à tout moment depuis votre dashboard.
                Aucun frais caché, aucun engagement.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-sand mb-2">
                Comment fonctionne le tarif étudiant ?
              </h4>
              <p className="text-neutral-sand/70 text-sm">
                Après souscription, envoyez-nous votre carte étudiante à support@app.com.
                Nous vérifierons votre statut et activerons le tarif -50%.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-sand mb-2">
                Puis-je changer de plan ?
              </h4>
              <p className="text-neutral-sand/70 text-sm">
                Oui, vous pouvez passer de mensuel à annuel (ou inversement) à tout moment.
                Le changement prend effet immédiatement avec prorata.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-sand mb-2">
                Quels moyens de paiement acceptez-vous ?
              </h4>
              <p className="text-neutral-sand/70 text-sm">
                Nous acceptons toutes les cartes bancaires (Visa, Mastercard, Amex) via
                Stripe, notre processeur de paiement sécurisé.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
