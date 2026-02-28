'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Erreur de configuration du serveur';
      case 'AccessDenied':
        return 'Accès refusé';
      case 'Verification':
        return 'Le lien de vérification est invalide ou a expiré';
      case 'OAuthSignin':
        return 'Erreur lors de la connexion OAuth';
      case 'OAuthCallback':
        return 'Erreur lors du callback OAuth';
      case 'OAuthCreateAccount':
        return 'Impossible de créer le compte OAuth';
      case 'EmailCreateAccount':
        return 'Impossible de créer le compte email';
      case 'Callback':
        return 'Erreur lors du callback';
      case 'OAuthAccountNotLinked':
        return 'Cet email est déjà utilisé avec une autre méthode de connexion';
      case 'EmailSignin':
        return 'Erreur lors de l\'envoi de l\'email';
      case 'CredentialsSignin':
        return 'Email ou mot de passe incorrect';
      case 'SessionRequired':
        return 'Vous devez être connecté pour accéder à cette page';
      default:
        return 'Une erreur d\'authentification est survenue';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-night via-neutral-warm-gray to-primary-night p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-error-red/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-error-red"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-neutral-sand mb-4">
            Erreur d'authentification
          </h1>
          <p className="text-neutral-sand/70 mb-8">
            {getErrorMessage(error)}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full bg-primary-gold text-primary-night py-3 px-4 rounded-lg font-semibold hover:bg-primary-gold/90 transition-colors text-center"
            >
              Réessayer
            </Link>
            <Link
              href="/"
              className="block w-full bg-white/10 text-neutral-sand py-3 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors text-center border border-white/20"
            >
              Retour à l'accueil
            </Link>
          </div>

          {/* Support Link */}
          <div className="mt-6 text-sm text-neutral-sand/60">
            Besoin d'aide ?{' '}
            <Link href="/contact" className="text-primary-gold hover:text-primary-gold/80">
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
