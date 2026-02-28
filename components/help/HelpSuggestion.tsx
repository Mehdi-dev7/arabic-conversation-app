'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Scenario } from '@/lib/scenarios';
import { Language } from '@/lib/constants';

interface HelpSuggestionProps {
  scenario: Scenario;
  language: Language;
  onSelectSuggestion: (text: string) => void;
  show?: boolean;
}

export function HelpSuggestion({ 
  scenario, 
  language, 
  onSelectSuggestion,
  show = false 
}: HelpSuggestionProps) {
  const getSuggestions = (): { ar: string; fr: string }[] => {
    const baseIntro = [
      { ar: 'اسمي...', fr: 'Je m\'appelle...' },
      { ar: 'أنا من...', fr: 'Je viens de...' },
      { ar: 'أنا طالب/طالبة', fr: 'Je suis étudiant(e)' },
      { ar: 'أحب...', fr: 'J\'aime...' },
      { ar: 'هل يمكنك مساعدتي؟', fr: 'Peux-tu m\'aider?' },
    ];

    const cafeSuggestions = [
      { ar: 'أريد قهوة من فضلك', fr: 'Je voudrais un café s\'il vous plaît' },
      { ar: 'شاي بالنعناع', fr: 'Un thé à la menthe' },
      { ar: 'بكم هذا؟', fr: 'Combien ça coûte?' },
      { ar: 'بدون سكر', fr: 'Sans sucre' },
      { ar: 'شكراً جزيلاً', fr: 'Merci beaucoup' },
    ];

    const marketSuggestions = [
      { ar: 'كم سعر الكيلو؟', fr: 'Quel est le prix au kilo?' },
      { ar: 'أعطيني كيلو طماطم', fr: 'Donnez-moi un kilo de tomates' },
      { ar: 'هذا غالي قليلاً', fr: 'C\'est un peu cher' },
      { ar: 'هل عندك تفاح؟', fr: 'As-tu des pommes?' },
      { ar: 'أريد برتقال', fr: 'Je veux des oranges' },
    ];

    switch (scenario.id) {
      case 'cafe':
        return cafeSuggestions;
      case 'market':
        return marketSuggestions;
      default:
        return baseIntro;
    }
  };

  const suggestions = getSuggestions();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-full left-0 right-0 mb-4 px-4"
        >
          <div className="bg-neutral-warm-gray/20 backdrop-blur-md rounded-2xl p-4 border border-neutral-warm-gray/30 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💡</span>
              <h3 className="text-neutral-sand font-semibold text-sm">
                اقتراحات مفيدة
              </h3>
              <span className="text-neutral-sand/60 text-xs">(Suggestions utiles)</span>
            </div>

            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => onSelectSuggestion(suggestion.ar)}
                  className="
                    w-full text-left p-3 rounded-xl
                    bg-primary-gold/10 hover:bg-primary-gold/20
                    border border-primary-gold/20 hover:border-primary-gold/40
                    transition-all duration-200
                    group
                  "
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="text-neutral-sand font-arabic-body text-base mb-1 rtl" dir="rtl">
                    {suggestion.ar}
                  </p>
                  <p className="text-neutral-warm-gray text-xs font-latin">
                    {suggestion.fr}
                  </p>
                  <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-primary-gold text-xs">→ Cliquer pour utiliser</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <p className="text-neutral-sand/60 text-xs text-center mt-3 font-latin">
              💬 Cliquez sur une phrase pour l'utiliser dans la conversation
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
