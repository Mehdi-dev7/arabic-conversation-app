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
  {
    id: 'restaurant',
    name: 'المطعم',
    nameEn: 'At the Restaurant',
    description: 'Full dining experience with menu, ordering, and conversation',
    detailedContext: `You're sitting in a beautiful Moroccan restaurant with traditional decor - colorful cushions, ornate lanterns, and the aroma of tajine fills the air. A waiter approaches with a warm smile, ready to help you discover authentic Moroccan cuisine. This is your chance to order a meal, ask about ingredients, and enjoy the full dining experience!`,
    estimatedDuration: 12,
    vocabulary: ['طعام', 'طاجين', 'كسكس', 'لذيذ', 'حار', 'قائمة', 'حساب', 'إكرامية'],
    freeAccess: false,
    background: 'Moroccan restaurant (lanterns, cushions, traditional tables)',
    ambient: 'Cutlery sounds, low conversations, traditional music',
    avatarColor: '#C46845',
    level: 'beginner',
    learningGoals: [
      'Read and understand a simple menu',
      'Order a complete meal (starter, main, dessert)',
      'Ask about ingredients and preparation',
      'Request the bill and understand pricing',
      'Express likes and dislikes about food'
    ],
    conversationTips: [
      'Say "أريد طاجين من فضلك" (I want tajine please)',
      'Ask "ما المكونات؟" (What are the ingredients?)',
      'Say "لذيذ جداً!" (Very delicious!)',
      'Ask "الحساب من فضلك" (The bill please)',
      'Use "شكراً على الضيافة" (Thank you for the hospitality)'
    ]
  },
  {
    id: 'airport',
    name: 'المطار',
    nameEn: 'At the Airport',
    description: 'Navigate check-in, security, and find your gate',
    detailedContext: `You've just arrived at Mohammed V International Airport in Casablanca. The departure hall is busy with travelers. You need to check in, go through security, and find your gate. Airport staff are helpful, and you'll practice essential travel Arabic - from checking in your luggage to understanding announcements!`,
    estimatedDuration: 10,
    vocabulary: ['طائرة', 'بطاقة', 'حقيبة', 'بوابة', 'رحلة', 'جواز', 'أمن', 'موعد'],
    freeAccess: false,
    background: 'Modern airport terminal (departure boards, gates, travelers)',
    ambient: 'PA announcements, rolling luggage, airport atmosphere',
    avatarColor: '#4A90E2',
    level: 'beginner',
    learningGoals: [
      'Check in and handle luggage',
      'Understand basic airport vocabulary',
      'Ask for directions to gates',
      'Communicate with security staff',
      'Understand departure times'
    ],
    conversationTips: [
      'Say "أريد تسجيل الدخول" (I want to check in)',
      'Ask "أين البوابة؟" (Where is the gate?)',
      'Say "حقيبة واحدة" (One suitcase)',
      'Ask "متى موعد الإقلاع؟" (When is departure?)',
      'Use "شكراً على المساعدة" (Thank you for the help)'
    ]
  },
  {
    id: 'home',
    name: 'في البيت',
    nameEn: 'At Home',
    description: 'Daily household conversations and family interactions',
    detailedContext: `You're visiting a Moroccan family's home for the first time. You're sitting in their cozy living room (salon) with comfortable cushions and traditional tea service. The family is welcoming and curious about you. This is a perfect opportunity to practice everyday household vocabulary and have warm, family-oriented conversations!`,
    estimatedDuration: 8,
    vocabulary: ['بيت', 'غرفة', 'مطبخ', 'عائلة', 'أم', 'أب', 'أخ', 'أخت'],
    freeAccess: false,
    background: 'Moroccan living room (salon, cushions, tea set, warm atmosphere)',
    ambient: 'Calm atmosphere, birds chirping, occasional voices',
    avatarColor: '#556B2F',
    level: 'beginner',
    learningGoals: [
      'Talk about family members',
      'Describe rooms in a house',
      'Discuss daily routines',
      'Accept and offer hospitality',
      'Use polite guest expressions'
    ],
    conversationTips: [
      'Say "بيتكم جميل" (Your house is beautiful)',
      'Ask "كم عدد أفراد عائلتك؟" (How many in your family?)',
      'Say "عندي أخ وأخت" (I have a brother and sister)',
      'Use "بالصحة والراحة" (With health and comfort)',
      'Say "شكراً على الاستقبال" (Thank you for the welcome)'
    ]
  },
  {
    id: 'grocery',
    name: 'البقالة',
    nameEn: 'At the Grocery Store',
    description: 'Shop for everyday items and household necessities',
    detailedContext: `You're at a local Moroccan grocery store (حانوت). The shelves are stocked with spices, canned goods, bread, dairy products, and household items. The shopkeeper greets you kindly. You need to find what you're looking for, ask for products, and pay at the counter. Time to practice your shopping vocabulary!`,
    estimatedDuration: 8,
    vocabulary: ['خبز', 'حليب', 'بيض', 'أرز', 'زيت', 'ماء', 'صابون', 'كيس'],
    freeAccess: false,
    background: 'Small grocery store (shelves, counter, products)',
    ambient: 'Quiet shop sounds, doorbell, cash register',
    avatarColor: '#8B7355',
    level: 'beginner',
    learningGoals: [
      'Ask for common grocery items',
      'Understand quantities and packaging',
      'Request plastic bags',
      'Pay and receive change',
      'Ask if items are available'
    ],
    conversationTips: [
      'Say "عندك خبز؟" (Do you have bread?)',
      'Ask "أريد كيلو أرز" (I want a kilo of rice)',
      'Say "كم الثمن؟" (How much?)',
      'Ask "معك كيس؟" (Do you have a bag?)',
      'Use "احتفظ بالباقي" (Keep the change)'
    ]
  },
  {
    id: 'taxi',
    name: 'التاكسي',
    nameEn: 'Taking a Taxi',
    description: 'Navigate transportation and give directions',
    detailedContext: `You're standing on a busy street in Casablanca, and you've just hailed a petit taxi (small red taxi). The driver pulls over and asks where you're going. You need to tell him your destination, negotiate the fare if needed, and maybe have some small talk during the ride. Essential vocabulary for getting around Morocco!`,
    estimatedDuration: 7,
    vocabulary: ['تاكسي', 'عنوان', 'يمين', 'يسار', 'مباشرة', 'توقف', 'أجرة', 'بعيد'],
    freeAccess: false,
    background: 'Inside taxi (street view, traffic, dashboard)',
    ambient: 'Traffic sounds, engine running, street atmosphere',
    avatarColor: '#E74C3C',
    level: 'beginner',
    learningGoals: [
      'Tell driver your destination',
      'Give simple directions (left, right, straight)',
      'Ask about fare and distance',
      'Request stops',
      'Make small talk with driver'
    ],
    conversationTips: [
      'Say "إلى المطار من فضلك" (To the airport please)',
      'Ask "بكم الأجرة؟" (How much is the fare?)',
      'Say "على اليمين" (To the right)',
      'Ask "هل هو بعيد؟" (Is it far?)',
      'Say "توقف هنا من فضلك" (Stop here please)'
    ]
  },
  {
    id: 'doctor',
    name: 'عند الطبيب',
    nameEn: 'At the Doctor',
    description: 'Describe symptoms and understand medical advice',
    detailedContext: `You're at a doctor's clinic in Morocco. You're not feeling well and need to explain your symptoms. The doctor is patient and wants to help. This is important vocabulary for health situations - describing pain, understanding prescriptions, and asking about treatment. Don't worry, it's just for learning!`,
    estimatedDuration: 10,
    vocabulary: ['طبيب', 'مريض', 'ألم', 'صداع', 'حمى', 'دواء', 'وصفة', 'صحة'],
    freeAccess: false,
    background: 'Doctor\'s office (desk, medical posters, examination room)',
    ambient: 'Quiet medical office, occasional phone ring',
    avatarColor: '#2ECC71',
    level: 'beginner',
    learningGoals: [
      'Describe basic symptoms',
      'Point to body parts',
      'Understand simple medical advice',
      'Ask about medication',
      'Say how long you\'ve been sick'
    ],
    conversationTips: [
      'Say "أنا مريض" (I am sick)',
      'Say "عندي صداع" (I have a headache)',
      'Ask "ما الدواء؟" (What is the medicine?)',
      'Say "منذ يومين" (Since two days)',
      'Ask "متى آخذ الدواء؟" (When do I take the medicine?)'
    ]
  },
];

export const allScenarios = [...beginnerScenarios];

export const getScenarioById = (id: string): Scenario | undefined => {
  return allScenarios.find(scenario => scenario.id === id);
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
  
  if (scenario.id === 'restaurant') {
    return language === 'msa'
      ? "أهلاً وسهلاً! مرحباً بكم في مطعمنا. هل هذه زيارتكم الأولى؟ عندنا اليوم طاجين دجاج لذيذ وكسكس بالخضار. تفضل، هذه القائمة. ماذا تحب أن تطلب؟"
      : "مرحبا بيك! هاد أول مرة تجي عندنا؟ عندنا اليوم طاجين ديال الدجاج بنين وكسكس بالخضرة. شوف القائمة. شنو بغيتي تاكل؟";
  }
  
  if (scenario.id === 'airport') {
    return language === 'msa'
      ? "مساء الخير! أهلاً بكم في مطار محمد الخامس. كيف يمكنني مساعدتك اليوم؟ هل تريد تسجيل الدخول لرحلتك؟ من فضلك، أعطني جواز السفر وبطاقة الحجز."
      : "مساء الخير! مرحبا بيك فالمطار. كيفاش نقدر نعاونك؟ بغيتي تسجل الدخول؟ عطيني الباسبور وبطاقة الحجز عافاك.";
  }
  
  if (scenario.id === 'home') {
    return language === 'msa'
      ? "أهلاً وسهلاً! مرحباً بك في بيتنا. تفضل، اجلس واسترح. بيتك! هل تريد شاياً بالنعناع؟ أخبرني عن نفسك، من أين أنت؟"
      : "مرحبا بيك! تفضل، دار ديالك! جلس مرتاح. بغيتي أتاي بالنعناع؟ قول لينا على راسك، منين نتا؟";
  }
  
  if (scenario.id === 'grocery') {
    return language === 'msa'
      ? "السلام عليكم! أهلاً بك. كيف حالك اليوم؟ ماذا تحتاج؟ عندنا كل شيء طازج - خبز من الفرن، حليب، بيض، كل شيء. تفضل!"
      : "السلام! كيداير؟ شنو بغيتي اليوم؟ عندنا كلشي طازج - الخبز من الفران، الحليب، البيض، كلشي. تفضل!";
  }
  
  if (scenario.id === 'taxi') {
    return language === 'msa'
      ? "مرحباً! أهلاً بك. إلى أين تريد أن تذهب؟ قل لي العنوان أو اسم المكان. أنا أعرف المدينة جيداً!"
      : "مرحبا! فين غادي؟ قول ليا العنوان ولا سمية البلاصة. أنا كانعرف المدينة مزيان!";
  }
  
  if (scenario.id === 'doctor') {
    return language === 'msa'
      ? "مساء الخير، تفضل اجلس. أنا الدكتور أحمد. كيف حالك اليوم؟ ما هي المشكلة؟ أخبرني، هل تشعر بألم في مكان معين؟"
      : "مساء الخير، تفضل جلس. أنا الدكتور أحمد. كيداير؟ شنو المشكل؟ قول ليا، واش كتحس بشي ألم؟";
  }
  
  return language === 'msa' ? "مرحبا! كيف يمكنني مساعدتك؟" : "مرحبا! كيفاش نقدر نعاونك؟";
};
