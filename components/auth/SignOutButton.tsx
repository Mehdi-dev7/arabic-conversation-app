'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

export function SignOutButton({ className = '' }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className={`
        px-4 py-2 bg-error-red/80 text-white rounded-lg 
        hover:bg-error-red transition-colors 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? 'Déconnexion...' : 'Se déconnecter'}
    </button>
  );
}
