import { Level, Language } from './constants';

export interface Scenario {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  estimatedDuration: number;
  vocabulary?: string[];
  freeAccess: boolean;
  background: string;
  ambient: string;
  avatarColor: string;
  level: Level;
}

export const beginnerScenarios: Scenario[] = [
  {
    id: 'introduction',
    name: 'التعارف',
    nameEn: 'Self Introduction',
    description: 'Learn to introduce yourself',
    estimatedDuration: 5,
    vocabulary: ['اسم', 'عمر', 'مدينة', 'عمل', 'هواية'],
    freeAccess: true,
    background: 'Moroccan cafe interior (tables, zellige tiles)',
    ambient: 'Light chatter, coffee machine sounds',
    avatarColor: '#8B4513',
    level: 'beginner',
  },
  {
    id: 'cafe',
    name: 'في المقهى',
    nameEn: 'At the Cafe',
    description: 'Order drinks, small talk with barista',
    estimatedDuration: 8,
    vocabulary: ['قهوة', 'شاي', 'سكر', 'ساخن', 'بارد'],
    freeAccess: false,
    background: 'Moroccan cafe interior (tables, zellige tiles)',
    ambient: 'Light chatter, coffee machine sounds',
    avatarColor: '#8B4513',
    level: 'beginner',
  },
  {
    id: 'market',
    name: 'السوق',
    nameEn: 'At the Market',
    description: 'Buy fruits, vegetables, bargain',
    estimatedDuration: 10,
    vocabulary: ['طماطم', 'تفاح', 'كيلو', 'ثمن', 'رخيص'],
    freeAccess: false,
    background: 'Colorful market stalls (fabrics, spices)',
    ambient: 'Vendor calls, bargaining voices',
    avatarColor: '#D4AF37',
    level: 'beginner',
  },
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return beginnerScenarios.find(scenario => scenario.id === id);
};

export const getStarterMessage = (scenario: Scenario, language: Language): string => {
  if (scenario.id === 'introduction') {
    return language === 'msa' 
      ? "السلام عليكم! أنا سعيد بلقائك. ما اسمك؟"
      : "السلام! واش كتعرف تهضر بالدارجة؟ شنو سميتك؟";
  }
  
  if (scenario.id === 'cafe') {
    return language === 'msa'
      ? "مرحبا! ماذا تريد أن تشرب اليوم؟"
      : "مرحبا! شنو غادي تشرب اليوم؟";
  }
  
  if (scenario.id === 'market') {
    return language === 'msa'
      ? "أهلا وسهلا! عندي فواكه وخضروات طازجة. ماذا تريد؟"
      : "مرحبا! عندي الخضرة والفواكه طازجة. شنو بغيتي؟";
  }
  
  return language === 'msa' ? "مرحبا!" : "مرحبا!";
};
