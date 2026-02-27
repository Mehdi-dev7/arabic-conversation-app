import { ScenarioCard } from '@/components/scenarios/ScenarioCard';
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-neutral-sand font-latin">
              Scénarios pour débutants
            </h2>
            <span className="text-sm text-neutral-warm-gray">
              {beginnerScenarios.length} scénarios disponibles
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerScenarios.map((scenario, index) => (
              <ScenarioCard 
                key={scenario.id} 
                scenario={scenario} 
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="bg-neutral-warm-gray/10 backdrop-blur-sm border border-neutral-warm-gray/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-neutral-sand mb-4 font-latin">
            Pourquoi apprendre avec nous ?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="group hover:scale-105 transition-transform">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🎯</div>
              <h4 className="font-bold text-neutral-sand mb-2">Conversations réalistes</h4>
              <p className="text-neutral-warm-gray text-sm">
                Pratiquez dans des situations quotidiennes authentiques
              </p>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">✨</div>
              <h4 className="font-bold text-neutral-sand mb-2">Corrections en temps réel</h4>
              <p className="text-neutral-warm-gray text-sm">
                Améliorez-vous instantanément avec des explications claires
              </p>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🌙</div>
              <h4 className="font-bold text-neutral-sand mb-2">Halal-compliant</h4>
              <p className="text-neutral-warm-gray text-sm">
                Avatar abstrait respectueux des principes islamiques
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-warm-gray/30">
            <p className="text-neutral-warm-gray text-sm mb-4">
              🚀 Commencez gratuitement avec le scénario "التعارف" (Introduction)
            </p>
            <p className="text-neutral-sand/60 text-xs">
              Passez au Premium pour débloquer tous les scénarios, le mode vocal et plus encore
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
