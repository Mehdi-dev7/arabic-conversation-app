'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { GestureAvatar } from '@/components/avatar/GestureAvatar';
import { getScenarioById, getStarterMessage } from '@/lib/scenarios';
import { Level, Language } from '@/lib/constants';
import { use } from 'react';

interface PageProps {
  params: Promise<{ scenarioId: string }>;
}

export default function ChatPage({ params }: PageProps) {
  const { scenarioId } = use(params);
  const [language, setLanguage] = useState<Language>('msa');
  const [level] = useState<Level>('beginner');
  
  const scenario = getScenarioById(scenarioId);
  
  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-night to-neutral-warm-gray">
        <div className="text-neutral-sand text-center">
          <h1 className="text-2xl font-bold mb-4">Scénario introuvable</h1>
          <p>Le scénario demandé n'existe pas.</p>
        </div>
      </div>
    );
  }

  const initialMessage = getStarterMessage(scenario, language);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-night to-neutral-warm-gray">
      <header className="border-b border-neutral-warm-gray/30 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-sand font-arabic-display rtl" dir="rtl">
              {scenario.name}
            </h1>
            <p className="text-neutral-warm-gray text-sm font-latin">
              {scenario.nameEn}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-neutral-warm-gray/20 rounded-full p-1">
              <button
                onClick={() => setLanguage('msa')}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold transition-colors
                  ${language === 'msa' 
                    ? 'bg-primary-gold text-primary-night' 
                    : 'text-neutral-sand hover:text-primary-gold'
                  }
                `}
              >
                الفصحى (MSA)
              </button>
              <button
                onClick={() => setLanguage('darija')}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold transition-colors
                  ${language === 'darija' 
                    ? 'bg-primary-gold text-primary-night' 
                    : 'text-neutral-sand hover:text-primary-gold'
                  }
                `}
              >
                الدارجة (Darija)
              </button>
            </div>
            
            <GestureAvatar 
              color={scenario.avatarColor}
              isSpeaking={false}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full">
        <ChatInterface
          scenarioId={scenarioId}
          userLevel={level}
          language={language}
          initialMessage={initialMessage}
        />
      </main>
    </div>
  );
}
