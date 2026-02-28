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

    const restaurantSuggestions = [
      { ar: 'أريد طاجين من فضلك', fr: 'Je voudrais un tajine s\'il vous plaît' },
      { ar: 'ما المكونات؟', fr: 'Quels sont les ingrédients?' },
      { ar: 'لذيذ جداً!', fr: 'Très délicieux!' },
      { ar: 'الحساب من فضلك', fr: 'L\'addition s\'il vous plaît' },
      { ar: 'هل الطعام حار؟', fr: 'Est-ce que c\'est épicé?' },
    ];

    const airportSuggestions = [
      { ar: 'أريد تسجيل الدخول', fr: 'Je veux m\'enregistrer' },
      { ar: 'أين البوابة؟', fr: 'Où est la porte?' },
      { ar: 'حقيبة واحدة', fr: 'Une valise' },
      { ar: 'متى موعد الإقلاع؟', fr: 'À quelle heure est le départ?' },
      { ar: 'هذا جواز سفري', fr: 'Voici mon passeport' },
    ];

    const homeSuggestions = [
      { ar: 'بيتكم جميل', fr: 'Votre maison est belle' },
      { ar: 'كم عدد أفراد عائلتك؟', fr: 'Combien êtes-vous dans la famille?' },
      { ar: 'عندي أخ وأخت', fr: 'J\'ai un frère et une sœur' },
      { ar: 'شكراً على الاستقبال', fr: 'Merci pour l\'accueil' },
      { ar: 'أريد شاياً من فضلك', fr: 'Je voudrais du thé s\'il vous plaît' },
    ];

    const grocerySuggestions = [
      { ar: 'عندك خبز؟', fr: 'As-tu du pain?' },
      { ar: 'أريد كيلو أرز', fr: 'Je veux un kilo de riz' },
      { ar: 'كم الثمن؟', fr: 'Combien?' },
      { ar: 'معك كيس؟', fr: 'As-tu un sac?' },
      { ar: 'أريد حليب', fr: 'Je veux du lait' },
    ];

    const taxiSuggestions = [
      { ar: 'إلى المطار من فضلك', fr: 'À l\'aéroport s\'il vous plaît' },
      { ar: 'بكم الأجرة؟', fr: 'Combien coûte la course?' },
      { ar: 'على اليمين', fr: 'À droite' },
      { ar: 'هل هو بعيد؟', fr: 'Est-ce loin?' },
      { ar: 'توقف هنا من فضلك', fr: 'Arrêtez-vous ici s\'il vous plaît' },
    ];

    const doctorSuggestions = [
      { ar: 'أنا مريض', fr: 'Je suis malade' },
      { ar: 'عندي صداع', fr: 'J\'ai mal à la tête' },
      { ar: 'ما الدواء؟', fr: 'Quel est le médicament?' },
      { ar: 'منذ يومين', fr: 'Depuis deux jours' },
      { ar: 'عندي حمى', fr: 'J\'ai de la fièvre' },
    ];

    switch (scenario.id) {
      case 'cafe':
        return cafeSuggestions;
      case 'market':
        return marketSuggestions;
      case 'restaurant':
        return restaurantSuggestions;
      case 'airport':
        return airportSuggestions;
      case 'home':
        return homeSuggestions;
      case 'grocery':
        return grocerySuggestions;
      case 'taxi':
        return taxiSuggestions;
      case 'doctor':
        return doctorSuggestions;
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
