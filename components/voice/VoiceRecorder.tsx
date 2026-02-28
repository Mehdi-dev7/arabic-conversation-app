'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  language?: string;
  disabled?: boolean;
}

export function VoiceRecorder({ 
  onTranscription, 
  language = 'ar',
  disabled = false 
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const analyzeAudio = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average / 255);

    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  };

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      analyzeAudio();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendAudioToWhisper(audioBlob);
        
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('تعذر الوصول إلى الميكروفون. الرجاء التحقق من الأذونات.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  const sendAudioToWhisper = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.webm');
      formData.append('language', language);

      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('فشل في معالجة الصوت');
      }

      const data = await response.json();
      if (data.success && data.text) {
        onTranscription(data.text);
      } else {
        throw new Error('لم يتم التعرف على أي نص');
      }
    } catch (err) {
      console.error('Whisper error:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في معالجة الصوت');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        type="button"
        onMouseDown={!disabled && !isProcessing ? startRecording : undefined}
        onMouseUp={stopRecording}
        onTouchStart={!disabled && !isProcessing ? startRecording : undefined}
        onTouchEnd={stopRecording}
        disabled={disabled || isProcessing}
        className={`
          relative w-20 h-20 rounded-full
          flex items-center justify-center
          transition-all duration-200
          ${isRecording 
            ? 'bg-error-red shadow-lg shadow-error-red/50' 
            : isProcessing
            ? 'bg-neutral-warm-gray'
            : 'bg-primary-gold hover:bg-primary-gold/90'
          }
          ${disabled || isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        whileHover={!disabled && !isProcessing ? { scale: 1.05 } : {}}
        whileTap={!disabled && !isProcessing ? { scale: 0.95 } : {}}
      >
        {isProcessing ? (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-neutral-sand rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isRecording ? 'text-neutral-sand' : 'text-primary-night'}
          >
            <path
              d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
              fill="currentColor"
            />
            <path
              d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10H3V12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12V10H19Z"
              fill="currentColor"
            />
            <path d="M11 22H13V24H11V22Z" fill="currentColor" />
          </svg>
        )}

        {isRecording && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-error-red"
            animate={{
              scale: [1, 1.2 + audioLevel * 0.3, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>

      <div className="text-center">
        <p className="text-sm text-neutral-sand font-latin">
          {isRecording 
            ? '🎤 جاري التسجيل... اضغط للإيقاف'
            : isProcessing
            ? '⏳ جاري معالجة الصوت...'
            : '🎙️ اضغط مع الاستمرار للتحدث'
          }
        </p>
        {error && (
          <p className="text-xs text-error-red mt-2 font-arabic-body" dir="rtl">
            {error}
          </p>
        )}
      </div>

      {isRecording && (
        <div className="w-full max-w-xs">
          <div className="h-1 bg-neutral-warm-gray/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-error-red"
              animate={{ width: `${audioLevel * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
