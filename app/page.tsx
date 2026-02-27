import Link from 'next/link';
import { beginnerScenarios } from '@/lib/scenarios';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-night via-primary-night to-neutral-warm-gray">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-sand mb-4 font-arabic-display">
            تعلم العربية بالمحادثة
          </h1>
          <p className="text-xl text-neutral-warm-gray font-latin">
            Apprenez l'arabe par la conversation avec l'IA
          </p>
          <p className="text-neutral-warm-gray mt-2 font-latin">
            Pratiquez l'arabe standard moderne (MSA) ou le dialecte marocain (Darija)
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-sand mb-6 font-latin">
            Scénarios pour débutants
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {beginnerScenarios.map((scenario) => (
              <Link
                key={scenario.id}
                href={`/chat/${scenario.id}`}
                className="
                  block bg-neutral-warm-gray/10 backdrop-blur-sm
                  border border-neutral-warm-gray/30
                  rounded-2xl p-6
                  hover:border-primary-gold hover:shadow-lg hover:shadow-primary-gold/20
                  transition-all duration-300
                  group
                "
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-neutral-sand mb-2 font-arabic-display rtl" dir="rtl">
                    {scenario.name}
                  </h3>
                  <p className="text-neutral-warm-gray font-latin">
                    {scenario.nameEn}
                  </p>
                </div>
                
                <p className="text-neutral-sand/80 text-sm mb-4 font-latin">
                  {scenario.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-warm-gray font-latin">
                    ⏱️ {scenario.estimatedDuration} min
                  </span>
                  {scenario.freeAccess && (
                    <span className="bg-success-green/20 text-success-green text-xs px-3 py-1 rounded-full font-semibold">
                      GRATUIT
                    </span>
                  )}
                  {!scenario.freeAccess && (
                    <span className="bg-primary-gold/20 text-primary-gold text-xs px-3 py-1 rounded-full font-semibold">
                      PREMIUM
                    </span>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-warm-gray/30">
                  <span className="text-primary-gold group-hover:translate-x-1 inline-block transition-transform">
                    Commencer →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-neutral-warm-gray/10 backdrop-blur-sm border border-neutral-warm-gray/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-neutral-sand mb-4 font-latin">
            Pourquoi apprendre avec nous ?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-4xl mb-2">🎯</div>
              <h4 className="font-bold text-neutral-sand mb-2">Conversations réalistes</h4>
              <p className="text-neutral-warm-gray text-sm">
                Pratiquez dans des situations quotidiennes authentiques
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">✨</div>
              <h4 className="font-bold text-neutral-sand mb-2">Corrections en temps réel</h4>
              <p className="text-neutral-warm-gray text-sm">
                Améliorez-vous instantanément avec des explications claires
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">🌙</div>
              <h4 className="font-bold text-neutral-sand mb-2">Halal-compliant</h4>
              <p className="text-neutral-warm-gray text-sm">
                Avatar abstrait respectueux des principes islamiques
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
