import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { ManageSubscriptionButton } from '@/components/stripe/ManageSubscriptionButton';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Récupérer les données utilisateur complètes
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: true,
      conversations: {
        take: 5,
        orderBy: { createdAt: 'desc' },
      },
      _count: {
        select: {
          conversations: true,
          vocabulary: true,
          corrections: true,
        },
      },
    },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  // Calculer les statistiques
  const totalConversations = user._count.conversations;
  const totalWords = user._count.vocabulary;
  const totalCorrections = user._count.corrections;
  const streakDays = user.streakDays;

  // Vérifier si l'utilisateur a atteint sa limite (free plan)
  const isFreePlan = user.plan === 'free';
  const conversationsThisMonth = user.conversations.filter((conv) => {
    const now = new Date();
    const convDate = new Date(conv.createdAt);
    return (
      convDate.getMonth() === now.getMonth() &&
      convDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const freeLimit = 2;
  const hasReachedLimit = isFreePlan && conversationsThisMonth >= freeLimit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-night via-neutral-warm-gray to-primary-night">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-sand">
              مرحباً، {user.name || 'المتعلم'}
            </h1>
            <p className="text-neutral-sand/70 text-sm">
              {user.email}
            </p>
          </div>
          <SignOutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Badge */}
        <div className="mb-6 flex items-center gap-3">
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              isFreePlan
                ? 'bg-neutral-warm-gray/30 text-neutral-sand'
                : 'bg-primary-gold/20 text-primary-gold border-2 border-primary-gold'
            }`}
          >
            {isFreePlan ? '📦 Plan Gratuit' : '⭐ Plan Premium'}
          </span>
          {isFreePlan ? (
            <Link
              href="/pricing"
              className="px-4 py-2 bg-primary-gold text-primary-night rounded-full text-sm font-semibold hover:bg-primary-gold/90 transition-colors"
            >
              ⬆️ Passer à Premium
            </Link>
          ) : (
            <ManageSubscriptionButton isPremium={true} />
          )}
        </div>

        {/* Free Plan Limit Warning */}
        {isFreePlan && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              hasReachedLimit
                ? 'bg-error-red/20 border-error-red/40 text-error-red'
                : 'bg-warning-orange/20 border-warning-orange/40 text-warning-orange'
            }`}
          >
            <p className="font-semibold mb-1">
              {hasReachedLimit
                ? '⚠️ Limite atteinte'
                : `💡 ${conversationsThisMonth}/${freeLimit} conversations ce mois-ci`}
            </p>
            <p className="text-sm">
              {hasReachedLimit
                ? 'Passez à Premium pour des conversations illimitées.'
                : `Encore ${freeLimit - conversationsThisMonth} conversation${
                    freeLimit - conversationsThisMonth > 1 ? 's' : ''
                  } disponible${freeLimit - conversationsThisMonth > 1 ? 's' : ''}.`}
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Conversations */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-sand/70 text-sm">Conversations</span>
              <span className="text-3xl">💬</span>
            </div>
            <p className="text-4xl font-bold text-neutral-sand">{totalConversations}</p>
            <p className="text-neutral-sand/60 text-xs mt-1">Total</p>
          </div>

          {/* Mots appris */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-sand/70 text-sm">Mots appris</span>
              <span className="text-3xl">📚</span>
            </div>
            <p className="text-4xl font-bold text-neutral-sand">{totalWords}</p>
            <p className="text-neutral-sand/60 text-xs mt-1">Vocabulaire</p>
          </div>

          {/* Corrections */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-sand/70 text-sm">Corrections</span>
              <span className="text-3xl">✅</span>
            </div>
            <p className="text-4xl font-bold text-neutral-sand">{totalCorrections}</p>
            <p className="text-neutral-sand/60 text-xs mt-1">Reçues</p>
          </div>

          {/* Streak */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-sand/70 text-sm">Streak</span>
              <span className="text-3xl">🔥</span>
            </div>
            <p className="text-4xl font-bold text-neutral-sand">{streakDays}</p>
            <p className="text-neutral-sand/60 text-xs mt-1">Jours consécutifs</p>
          </div>
        </div>

        {/* Niveau & Langue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-semibold text-neutral-sand mb-4">
              📊 Niveau actuel
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-2xl font-bold text-primary-gold">
                  {user.currentLevel === 'vocabulary_acquisition' && 'Niveau 1'}
                  {user.currentLevel === 'comprehension' && 'Niveau 2'}
                  {user.currentLevel === 'assisted_conversation' && 'Niveau 3'}
                  {user.currentLevel === 'immersion' && 'Niveau 4'}
                </p>
                <p className="text-neutral-sand/70 text-sm mt-1">
                  {user.currentLevel === 'vocabulary_acquisition' &&
                    'Acquisition du vocabulaire'}
                  {user.currentLevel === 'comprehension' && 'Compréhension'}
                  {user.currentLevel === 'assisted_conversation' &&
                    'Conversation assistée'}
                  {user.currentLevel === 'immersion' && 'Immersion totale'}
                </p>
              </div>
              <Link
                href="/levels"
                className="px-4 py-2 bg-primary-gold text-primary-night rounded-lg font-semibold hover:bg-primary-gold/90 transition-colors text-sm"
              >
                Changer
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-semibold text-neutral-sand mb-4">
              🌍 Langue préférée
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-2xl font-bold text-primary-gold">
                  {user.preferredLanguage === 'msa' ? 'العربية الفصحى' : 'الدارجة المغربية'}
                </p>
                <p className="text-neutral-sand/70 text-sm mt-1">
                  {user.preferredLanguage === 'msa'
                    ? 'Modern Standard Arabic'
                    : 'Moroccan Darija'}
                </p>
              </div>
              <Link
                href="/settings"
                className="px-4 py-2 bg-primary-gold text-primary-night rounded-lg font-semibold hover:bg-primary-gold/90 transition-colors text-sm"
              >
                Changer
              </Link>
            </div>
          </div>
        </div>

        {/* Conversations récentes */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
          <h2 className="text-lg font-semibold text-neutral-sand mb-4">
            📝 Conversations récentes
          </h2>
          {user.conversations.length === 0 ? (
            <p className="text-neutral-sand/60 text-center py-8">
              Aucune conversation pour le moment.
            </p>
          ) : (
            <div className="space-y-3">
              {user.conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/chat/${conv.scenarioId}?conversation=${conv.id}`}
                  className="block p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-neutral-sand">
                        {conv.scenarioId === 'introduction' && '🤝 التعارف'}
                        {conv.scenarioId === 'cafe' && '☕ في المقهى'}
                        {conv.scenarioId === 'market' && '🛒 في السوق'}
                        {conv.scenarioId === 'doctor' && '🏥 عند الطبيب'}
                        {conv.scenarioId === 'restaurant' && '🍽️ في المطعم'}
                        {conv.scenarioId === 'taxi' && '🚖 في التاكسي'}
                      </p>
                      <p className="text-neutral-sand/60 text-sm mt-1">
                        {conv.language === 'msa' ? 'MSA' : 'Darija'} • Niveau{' '}
                        {conv.level}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-neutral-sand/70 text-sm">
                        {new Date(conv.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-neutral-sand/50 text-xs mt-1">
                        {Math.floor(conv.duration / 60)} min
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/"
            className="bg-primary-gold text-primary-night p-6 rounded-2xl font-semibold hover:bg-primary-gold/90 transition-colors text-center"
          >
            <span className="text-4xl mb-2 block">💬</span>
            Nouvelle conversation
          </Link>
          <Link
            href="/vocabulary"
            className="bg-white/10 backdrop-blur-lg text-neutral-sand p-6 rounded-2xl font-semibold hover:bg-white/20 transition-colors text-center border border-white/20"
          >
            <span className="text-4xl mb-2 block">📖</span>
            Mon vocabulaire
          </Link>
          <Link
            href="/settings"
            className="bg-white/10 backdrop-blur-lg text-neutral-sand p-6 rounded-2xl font-semibold hover:bg-white/20 transition-colors text-center border border-white/20"
          >
            <span className="text-4xl mb-2 block">⚙️</span>
            Paramètres
          </Link>
        </div>
      </main>
    </div>
  );
}
