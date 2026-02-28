'use client';

import { useState, useRef, useEffect } from 'react';
import { Howl } from 'howler';

interface AudioPlayerProps {
  text: string;
  language?: string;
  gender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
  autoPlay?: boolean;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  onError?: (error: string) => void;
}

export function AudioPlayer({
  text,
  language = 'ar',
  gender = 'NEUTRAL',
  autoPlay = false,
  onPlayStart,
  onPlayEnd,
  onError,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (autoPlay && text) {
      playAudio();
    }
    
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [text, autoPlay]);

  const generateAudio = async (): Promise<string> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, language, gender }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      return url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate speech';
      onError?.(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = async () => {
    try {
      if (howlRef.current) {
        howlRef.current.unload();
      }

      const url = audioUrl || await generateAudio();

      const sound = new Howl({
        src: [url],
        format: ['mp3'],
        html5: true,
        onplay: () => {
          setIsPlaying(true);
          onPlayStart?.();
        },
        onend: () => {
          setIsPlaying(false);
          onPlayEnd?.();
        },
        onerror: (id, error) => {
          console.error('Howler playback error:', error);
          setIsPlaying(false);
          onError?.('فشل في تشغيل الصوت');
        },
      });

      howlRef.current = sound;
      sound.play();
    } catch (err) {
      console.error('Audio playback error:', err);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (howlRef.current) {
      howlRef.current.stop();
      setIsPlaying(false);
    }
  };

  if (autoPlay) {
    return null;
  }

  return (
    <button
      onClick={isPlaying ? stopAudio : playAudio}
      disabled={isLoading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-200
        ${isPlaying 
          ? 'bg-error-red text-neutral-sand' 
          : isLoading
          ? 'bg-neutral-warm-gray text-neutral-sand opacity-50'
          : 'bg-primary-gold text-primary-night hover:bg-primary-gold/90'
        }
        disabled:cursor-not-allowed
      `}
      aria-label={isPlaying ? 'إيقاف الصوت' : 'تشغيل الصوت'}
    >
      {isLoading ? (
        <>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs">جاري التحميل...</span>
        </>
      ) : isPlaying ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="4" y="3" width="3" height="10" fill="currentColor" rx="1" />
            <rect x="9" y="3" width="3" height="10" fill="currentColor" rx="1" />
          </svg>
          <span className="text-xs">إيقاف</span>
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 3L13 8L4 13V3Z" fill="currentColor" />
          </svg>
          <span className="text-xs">استمع</span>
        </>
      )}
    </button>
  );
}
