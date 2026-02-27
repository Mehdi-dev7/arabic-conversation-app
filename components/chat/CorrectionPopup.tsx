'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Correction } from '@/lib/prompts';

interface CorrectionPopupProps {
  correction: Correction;
  onClose?: () => void;
}

export function CorrectionPopup({ correction, onClose }: CorrectionPopupProps) {
  const severityColors = {
    minor: 'bg-warning-orange/10 border-warning-orange',
    moderate: 'bg-primary-gold/10 border-primary-gold',
    major: 'bg-error-red/10 border-error-red',
  };

  const errorTypeLabels = {
    conjugation: '🔄 Conjugaison',
    vocabulary: '📚 Vocabulaire',
    syntax: '🔗 Syntaxe',
    pronunciation: '🗣️ Prononciation',
    grammar: '📖 Grammaire',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          relative rounded-2xl border-2 p-4 mb-4
          ${severityColors[correction.severity]}
          backdrop-blur-sm
        `}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-sand/80">
              {errorTypeLabels[correction.errorType]}
            </span>
            <span className={`
              text-xs px-2 py-0.5 rounded-full
              ${correction.severity === 'major' ? 'bg-error-red/20 text-error-red' : ''}
              ${correction.severity === 'moderate' ? 'bg-primary-gold/20 text-primary-gold' : ''}
              ${correction.severity === 'minor' ? 'bg-warning-orange/20 text-warning-orange' : ''}
            `}>
              {correction.severity === 'major' ? 'Important' : 
               correction.severity === 'moderate' ? 'Modéré' : 'Mineur'}
            </span>
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="text-neutral-warm-gray hover:text-neutral-sand transition-colors"
              aria-label="Fermer"
            >
              ✕
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-neutral-warm-gray mb-1">❌ Votre version :</p>
            <p className="font-arabic-body text-base text-error-red/90 rtl" dir="rtl">
              {correction.userInput}
            </p>
          </div>

          <div>
            <p className="text-xs text-neutral-warm-gray mb-1">✅ Version correcte :</p>
            <p className="font-arabic-body text-base text-success-green rtl" dir="rtl">
              {correction.corrected}
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-warm-gray/20">
            <p className="text-xs text-neutral-warm-gray mb-1">💡 Explication :</p>
            <p className="font-arabic-body text-sm text-neutral-sand/90 rtl leading-relaxed" dir="rtl">
              {correction.explanation}
            </p>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(212, 175, 55, 0)',
              '0 0 0 10px rgba(212, 175, 55, 0.1)',
              '0 0 0 20px rgba(212, 175, 55, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
