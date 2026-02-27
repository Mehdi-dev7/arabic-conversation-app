import { Level, Language } from './constants';

export interface Scenario {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  detailedContext: string;
  estimatedDuration: number;
  vocabulary?: string[];
  freeAccess: boolean;
  background: string;
  ambient: string;
  avatarColor: string;
  level: Level;
  learningGoals: string[];
  conversationTips: string[];
}

export const beginnerScenarios: Scenario[] = [
  {
    id: 'introduction',
    name: 'التعارف',
    nameEn: 'Self Introduction',
    description: 'Learn to introduce yourself and have a basic conversation',
    detailedContext: `You're at a cozy Moroccan cafe in Marrakech. You've just sat down at a table near the window when a friendly local at the next table smiles and starts a conversation. The atmosphere is warm and welcoming - perfect for practicing your Arabic! This is your chance to introduce yourself, talk about where you're from, and learn about them.`,
    estimatedDuration: 5,
    vocabulary: ['اسم', 'عمر', 'مدينة', 'عمل', 'هواية', 'بلد', 'أنا', 'أنت'],
    freeAccess: true,
    background: 'Moroccan cafe interior (tables, zellige tiles, mint tea)',
    ambient: 'Light chatter, coffee machine sounds, Arabic music softly playing',
    avatarColor: '#8B4513',
    level: 'beginner',
    learningGoals: [
      'Introduce yourself (name, age, country)',
      'Ask someone about themselves',
      'Talk about your job or studies',
      'Mention your hobbies',
      'Basic greetings and farewells'
    ],
    conversationTips: [
      'Start with "اسمي..." (My name is...)',
      'Use "أنا من..." (I am from...)',
      'Ask "ما اسمك؟" (What is your name?)',
      'Say "أنا طالب/طالبة" (I am a student) or mention your job',
      'End with "تشرفنا" (Nice to meet you)'
    ]
  },
  {
    id: 'cafe',
    name: 'في المقهى',
    nameEn: 'At the Cafe',
    description: 'Order drinks and make small talk with the barista',
    detailedContext: `You're at a traditional Moroccan cafe, standing at the counter. The barista greets you warmly with a smile. You can smell fresh mint tea and strong coffee. Behind the counter, you see traditional teapots and colorful glasses. Time to order something delicious and chat a bit!`,
    estimatedDuration: 8,
    vocabulary: ['قهوة', 'شاي', 'سكر', 'ساخن', 'بارد', 'حليب', 'بكم', 'شكرا'],
    freeAccess: false,
    background: 'Moroccan cafe interior (counter, traditional teapots, zellige tiles)',
    ambient: 'Light chatter, coffee machine sounds, cups clinking',
    avatarColor: '#8B4513',
    level: 'beginner',
    learningGoals: [
      'Order hot and cold drinks',
      'Ask about prices',
      'Express preferences (with/without sugar, milk)',
      'Make polite small talk',
      'Say thank you and goodbye'
    ],
    conversationTips: [
      'Say "أريد..." (I want...)',
      'Ask "بكم هذا؟" (How much is this?)',
      'Say "من فضلك" (Please)',
      'Use "شكرا" (Thank you)',
      'Ask "كيف حالك؟" (How are you?)'
    ]
  },
  {
    id: 'market',
    name: 'السوق',
    nameEn: 'At the Market',
    description: 'Buy fruits, vegetables, and practice bargaining',
    detailedContext: `You're walking through a vibrant Moroccan souk (market). Colorful stalls are everywhere - fresh oranges, bright red tomatoes, fragrant herbs. A friendly vendor calls out to you, inviting you to check out their produce. The market is bustling with energy, and it's time to practice your Arabic shopping skills!`,
    estimatedDuration: 10,
    vocabulary: ['طماطم', 'تفاح', 'برتقال', 'كيلو', 'ثمن', 'رخيص', 'غالي', 'أعطيني'],
    freeAccess: false,
    background: 'Colorful market stalls (fruits, vegetables, fabrics, spices)',
    ambient: 'Vendor calls, bargaining voices, bustling crowds',
    avatarColor: '#D4AF37',
    level: 'beginner',
    learningGoals: [
      'Name common fruits and vegetables',
      'Ask for quantities (1 kilo, 2 kilos)',
      'Inquire about prices',
      'Practice basic bargaining',
      'Use polite shopping phrases'
    ],
    conversationTips: [
      'Say "أعطيني..." (Give me...)',
      'Ask "كم سعر...؟" (What is the price of...?)',
      'Say "كيلو واحد" (One kilo)',
      'Learn "غالي" (expensive) and "رخيص" (cheap)',
      'Try bargaining: "أقل من ذلك؟" (Less than that?)'
    ]
  },
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return beginnerScenarios.find(scenario => scenario.id === id);
};

export const getStarterMessage = (scenario: Scenario, language: Language): string => {
  if (scenario.id === 'introduction') {
    return language === 'msa' 
      ? "السلام عليكم ورحمة الله! أهلاً وسهلاً. اسمي أحمد، وأنا من هنا من مراكش. ما اسمك؟ ومن أين أنت؟"
      : "السلام عليكم! اسميتي أحمد، أنا من مراكش. شنو سميتك؟ منين نتا/نتي؟";
  }
  
  if (scenario.id === 'cafe') {
    return language === 'msa'
      ? "مرحبا بك! أهلاً في مقهانا. عندنا قهوة، شاي بالنعناع، وعصائر طازجة. ماذا تحب أن تشرب اليوم؟"
      : "مرحبا بيك! شنو غادي تشرب اليوم؟ عندنا أتاي، قهوة، وحتى العصير طازج!";
  }
  
  if (scenario.id === 'market') {
    return language === 'msa'
      ? "أهلا وسهلا يا صديقي! تفضل، تفضل! عندي أحسن الفواكه والخضروات في السوق، كلها طازجة من الصباح! شوف هاذ الطماطم، حمراء وطازجة! شنو تبغي؟"
      : "مرحبا خويا! تفضل تفضل! عندي الفواكه والخضرة كلها طازجة اليوم. شوف هاد الطماطم والتفاح، زوينين بزاف! شنو بغيتي؟";
  }
  
  return language === 'msa' ? "مرحبا! كيف يمكنني مساعدتك؟" : "مرحبا! كيفاش نقدر نعاونك؟";
};
