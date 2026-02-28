'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { CorrectionPopup } from './CorrectionPopup';
import { VoiceRecorder } from '../voice/VoiceRecorder';
import { AudioPlayer } from '../voice/AudioPlayer';
import { Level, Language } from '@/lib/constants';
import { Correction, parseCorrectionFromResponse } from '@/lib/prompts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  correction?: Correction;
  hasAudio?: boolean;
}

interface ChatInterfaceProps {
  scenarioId: string;
  userLevel: Level;
  language: Language;
  initialMessage: string;
}

export function ChatInterface({ 
  scenarioId, 
  userLevel, 
  language,
  initialMessage 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: initialMessage,
      timestamp: new Date(),
      hasAudio: true,
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: initialMessage,
      timestamp: new Date(),
      hasAudio: true,
    }]);
  }, [initialMessage, language]);

  const processMessage = async (messageContent: string) => {
    const userMessage: Message = {
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent,
          scenarioId,
          language,
          level: userLevel,
          conversationHistory: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const correction = parseCorrectionFromResponse(data.response);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(data.timestamp),
        correction: correction || undefined,
        hasAudio: true,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'عذراً، حدث خطأ. الرجاء المحاولة مرة أخرى.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    await processMessage(inputValue);
  };

  const handleVoiceTranscription = async (text: string) => {
    await processMessage(text);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-primary-night to-neutral-warm-gray/30">
      {/* Mode Toggle */}
      <div className="border-b border-neutral-warm-gray/30 p-3 flex justify-center">
        <div className="flex gap-2 bg-neutral-warm-gray/20 rounded-full p-1">
          <button
            onClick={() => setIsVoiceMode(false)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold transition-colors
              ${!isVoiceMode 
                ? 'bg-primary-gold text-primary-night' 
                : 'text-neutral-sand hover:text-primary-gold'
              }
            `}
          >
            ✍️ نص
          </button>
          <button
            onClick={() => setIsVoiceMode(true)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold transition-colors
              ${isVoiceMode 
                ? 'bg-primary-gold text-primary-night' 
                : 'text-neutral-sand hover:text-primary-gold'
              }
            `}
          >
            🎤 صوت
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index}>
            {message.correction && (
              <CorrectionPopup correction={message.correction} />
            )}
            <div className="flex flex-col gap-2">
              <MessageBubble
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
              {message.role === 'assistant' && message.hasAudio && (
                <div className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <AudioPlayer
                    text={message.content}
                    language={language}
                    autoPlay={index === messages.length - 1 && isVoiceMode}
                    onPlayStart={() => setIsSpeaking(true)}
                    onPlayEnd={() => setIsSpeaking(false)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-warm-gray/20 rounded-2xl px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {isVoiceMode ? (
        <div className="border-t border-neutral-warm-gray/30 p-6">
          <VoiceRecorder
            onTranscription={handleVoiceTranscription}
            language={language}
            disabled={isLoading || isSpeaking}
          />
        </div>
      ) : (
        <form onSubmit={handleSendMessage} className="border-t border-neutral-warm-gray/30 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              disabled={isLoading}
              className="
                flex-1 bg-neutral-warm-gray/20 text-neutral-sand 
                rounded-full px-6 py-3
                font-arabic-body text-base
                placeholder-neutral-warm-gray
                focus:outline-none focus:ring-2 focus:ring-primary-gold
                disabled:opacity-50
                rtl
              "
              dir="rtl"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="
                bg-primary-gold text-primary-night 
                rounded-full px-6 py-3
                font-semibold
                hover:bg-primary-gold/90
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              إرسال
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
