'use client';

import { motion } from 'framer-motion';

interface GestureAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  color?: string;
}

export function GestureAvatar({ 
  isListening = false, 
  isSpeaking = false,
  color = '#D4AF37' 
}: GestureAvatarProps) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        animate={isSpeaking ? {
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="relative"
          animate={isListening ? {
            scale: [1, 1.02, 1],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: isListening ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <svg
            width="120"
            height="200"
            viewBox="0 0 120 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="60"
              cy="30"
              r="25"
              fill={color}
              opacity="0.9"
              filter="url(#glow)"
            />
            
            <ellipse
              cx="60"
              cy="90"
              rx="30"
              ry="40"
              fill={color}
              opacity="0.8"
            />
            
            <motion.path
              d="M 30 100 Q 20 120 25 140"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
              animate={isSpeaking ? {
                d: [
                  "M 30 100 Q 20 120 25 140",
                  "M 30 100 Q 15 115 20 135",
                  "M 30 100 Q 20 120 25 140",
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: isSpeaking ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
            
            <motion.path
              d="M 90 100 Q 100 120 95 140"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
              animate={isSpeaking ? {
                d: [
                  "M 90 100 Q 100 120 95 140",
                  "M 90 100 Q 105 115 100 135",
                  "M 90 100 Q 100 120 95 140",
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: isSpeaking ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
            
            <rect
              x="48"
              y="130"
              width="10"
              height="35"
              rx="5"
              fill={color}
              opacity="0.8"
            />
            <rect
              x="62"
              y="130"
              width="10"
              height="35"
              rx="5"
              fill={color}
              opacity="0.8"
            />
            
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
