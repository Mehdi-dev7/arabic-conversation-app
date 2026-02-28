'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ManageSubscriptionButtonProps {
  isPremium: boolean;
}

export function ManageSubscriptionButton({ isPremium }: ManageSubscriptionButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Erreur');
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <button
        onClick={handleManageSubscription}
        disabled={loading}
        className="ml-3 text-primary-gold hover:text-primary-gold/80 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Chargement...' : 'Gérer l\'abonnement'}
      </button>
    );
  }

  return null;
}
