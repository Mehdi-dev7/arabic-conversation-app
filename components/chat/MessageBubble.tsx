interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
}

export function MessageBubble({ content, role, timestamp }: MessageBubbleProps) {
  const isAssistant = role === 'assistant';
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3
          ${isAssistant 
            ? 'bg-neutral-warm-gray/20 text-neutral-sand' 
            : 'bg-primary-gold text-primary-night'
          }
        `}
      >
        <p 
          className="font-arabic-body text-base leading-relaxed rtl"
          dir="rtl"
        >
          {content}
        </p>
        {timestamp && (
          <p className="text-xs opacity-60 mt-1">
            {new Date(timestamp).toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        )}
      </div>
    </div>
  );
}
