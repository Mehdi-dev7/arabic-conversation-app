'use client';

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

interface AmbientSoundProps {
  scenarioId: string;
  volume?: number;
  autoPlay?: boolean;
}

export function AmbientSound({ scenarioId, volume = 0.15, autoPlay = true }: AmbientSoundProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const howlRef = useRef<Howl | null>(null);

  const ambientSounds: Record<string, string[]> = {
    introduction: [
      '/sounds/cafe-ambience.mp3',
      '/sounds/light-chatter.mp3',
    ],
    cafe: [
      '/sounds/cafe-ambience.mp3',
      '/sounds/coffee-machine.mp3',
    ],
    market: [
      '/sounds/market-crowd.mp3',
      '/sounds/vendor-calls.mp3',
    ],
    restaurant: [
      '/sounds/restaurant-ambience.mp3',
      '/sounds/cutlery-sounds.mp3',
    ],
    airport: [
      '/sounds/airport-ambience.mp3',
      '/sounds/announcements.mp3',
    ],
  };

  useEffect(() => {
    const soundUrls = ambientSounds[scenarioId] || ambientSounds.introduction;
    const soundUrl = soundUrls[0];

    if (typeof window !== 'undefined') {
      const sound = new Howl({
        src: [soundUrl],
        loop: true,
        volume: currentVolume,
        html5: true,
        preload: true,
        onloaderror: (id, error) => {
          console.warn(`Failed to load ambient sound: ${error}`);
        },
        onload: () => {
          if (autoPlay) {
            sound.play();
            setIsPlaying(true);
          }
        },
      });

      howlRef.current = sound;
    }

    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
    };
  }, [scenarioId, autoPlay]);

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(currentVolume);
    }
  }, [currentVolume]);

  const togglePlay = () => {
    if (!howlRef.current) return;

    if (isPlaying) {
      howlRef.current.pause();
      setIsPlaying(false);
    } else {
      howlRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
  };

  return (
    <div className="flex items-center gap-3 bg-neutral-warm-gray/10 backdrop-blur-sm rounded-full px-4 py-2 border border-neutral-warm-gray/20">
      <button
        onClick={togglePlay}
        className="text-neutral-sand hover:text-primary-gold transition-colors"
        aria-label={isPlaying ? 'إيقاف الصوت المحيط' : 'تشغيل الصوت المحيط'}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.05"
          value={currentVolume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-neutral-warm-gray/30 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary-gold
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-3
            [&::-moz-range-thumb]:h-3
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary-gold
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <span className="text-xs text-neutral-sand/60 min-w-[2.5rem]">
          {Math.round(currentVolume * 100)}%
        </span>
      </div>
    </div>
  );
}
