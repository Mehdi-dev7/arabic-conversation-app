'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scenario } from '@/lib/scenarios';

interface ScenarioCardProps {
  scenario: Scenario;
  index: number;
}

export function ScenarioCard({ scenario, index }: ScenarioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/chat/${scenario.id}`}
        className="
          block bg-neutral-warm-gray/10 backdrop-blur-sm
          border border-neutral-warm-gray/30
          rounded-2xl p-6
          hover:border-primary-gold hover:shadow-lg hover:shadow-primary-gold/20
          transition-all duration-300
          group
          relative overflow-hidden
        "
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-gold/0 to-primary-gold/0 group-hover:from-primary-gold/5 group-hover:to-primary-gold/10 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-neutral-sand mb-2 font-arabic-display rtl group-hover:text-primary-gold transition-colors" dir="rtl">
                {scenario.name}
              </h3>
              <p className="text-neutral-warm-gray font-latin text-sm">
                {scenario.nameEn}
              </p>
            </div>
            
            <div className={`
              px-3 py-1 rounded-full text-xs font-semibold
              ${scenario.freeAccess 
                ? 'bg-success-green/20 text-success-green' 
                : 'bg-primary-gold/20 text-primary-gold'
              }
            `}>
              {scenario.freeAccess ? '✓ GRATUIT' : '⭐ PREMIUM'}
            </div>
          </div>
          
          <p className="text-neutral-sand/80 text-sm mb-4 font-latin leading-relaxed">
            {scenario.description}
          </p>

          {scenario.detailedContext && (
            <div className="bg-neutral-warm-gray/10 rounded-lg p-3 mb-4 border border-neutral-warm-gray/20">
              <p className="text-xs text-neutral-sand/70 font-latin italic leading-relaxed">
                {scenario.detailedContext.substring(0, 120)}...
              </p>
            </div>
          )}

          <div className="space-y-3 mb-4">
            {scenario.vocabulary && scenario.vocabulary.length > 0 && (
              <div>
                <p className="text-xs text-neutral-warm-gray mb-2 font-latin">📚 Vocabulaire clé :</p>
                <div className="flex flex-wrap gap-2">
                  {scenario.vocabulary.slice(0, 5).map((word, i) => (
                    <span
                      key={i}
                      className="bg-neutral-warm-gray/20 text-neutral-sand px-2 py-1 rounded-full text-xs font-arabic-body"
                      dir="rtl"
                    >
                      {word}
                    </span>
                  ))}
                  {scenario.vocabulary.length > 5 && (
                    <span className="text-neutral-warm-gray text-xs self-center">
                      +{scenario.vocabulary.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {scenario.learningGoals && scenario.learningGoals.length > 0 && (
              <div>
                <p className="text-xs text-neutral-warm-gray mb-2 font-latin">🎯 Objectifs :</p>
                <ul className="space-y-1">
                  {scenario.learningGoals.slice(0, 3).map((goal, i) => (
                    <li key={i} className="text-xs text-neutral-sand/70 font-latin flex items-start gap-2">
                      <span className="text-primary-gold">•</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-neutral-warm-gray/30">
            <div className="flex items-center gap-4">
              <span className="text-xs text-neutral-warm-gray font-latin flex items-center gap-1">
                ⏱️ {scenario.estimatedDuration} min
              </span>
              <span className="text-xs text-neutral-warm-gray font-latin flex items-center gap-1">
                📊 {scenario.level === 'beginner' ? 'Débutant' : scenario.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
              </span>
            </div>
            
            <motion.span 
              className="text-primary-gold font-semibold text-sm group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform"
              whileHover={{ x: 5 }}
            >
              Commencer
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
