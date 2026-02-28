'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface PaywallProps {
  title?: string;
  message?: string;
  feature?: string;
  children?: ReactNode;
}

export function Paywall({
  title = '⭐ Fonctionnalité Premium',
  message = 'Cette fonctionnalité est réservée aux abonnés Premium.',
  feature,
  children,
}: PaywallProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-primary-night to-neutral-warm-gray max-w-lg w-full rounded-2xl border-2 border-primary-gold p-8 shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary-gold/20 rounded-full flex items-center justify-center">
            <span className="text-5xl">🔒</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-neutral-sand text-center mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-neutral-sand/80 text-center mb-2">{message}</p>

        {/* Feature */}
        {feature && (
          <p className="text-primary-gold text-center font-semibold mb-6">
            🎯 {feature}
          </p>
        )}

        {/* Features List */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <p className="text-neutral-sand font-semibold mb-3 text-sm">
            Avec Premium, débloquez :
          </p>
          <ul className="space-y-2 text-sm text-neutral-sand/80">
            <li className="flex items-center gap-2">
              <span className="text-primary-gold">✓</span>
              Conversations illimitées
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-gold">✓</span>
              Tous les scénarios
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-gold">✓</span>
              Mode vocal complet
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-gold">✓</span>
              Corrections avancées
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-gold">✓</span>
              Historique illimité
            </li>
          </ul>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="text-center">
            <p className="text-neutral-sand/60 text-xs mb-1">À partir de</p>
            <p className="text-3xl font-bold text-primary-gold">9.99€</p>
            <p className="text-neutral-sand/60 text-xs">/mois</p>
          </div>
          <div className="text-neutral-sand/40">ou</div>
          <div className="text-center">
            <p className="text-neutral-sand/60 text-xs mb-1">Annuel</p>
            <p className="text-2xl font-bold text-primary-gold">79.99€</p>
            <p className="text-success-green text-xs font-semibold">Économisez 33%</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/pricing"
            className="block w-full bg-primary-gold text-primary-night py-3 px-6 rounded-lg font-semibold hover:bg-primary-gold/90 transition-colors text-center"
          >
            Voir les plans Premium →
          </Link>

          {children || (
            <button
              onClick={() => window.history.back()}
              className="block w-full bg-white/10 text-neutral-sand py-3 px-6 rounded-lg font-medium hover:bg-white/20 transition-colors text-center"
            >
              Retour
            </button>
          )}
        </div>

        {/* Note */}
        <p className="text-center text-neutral-sand/50 text-xs mt-6">
          💳 Annulation facile à tout moment
        </p>
      </div>
    </div>
  );
}
