'use client';

import { motion } from 'framer-motion';

interface GestureAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export function GestureAvatar({ 
  isListening = false, 
  isSpeaking = false,
  color = '#D4AF37',
  size = 'medium'
}: GestureAvatarProps) {
  const sizes = {
    small: { width: 80, height: 140, scale: 0.7 },
    medium: { width: 120, height: 200, scale: 1 },
    large: { width: 160, height: 280, scale: 1.3 },
  };

  const { width, height, scale } = sizes[size];

  return (
    <div className="flex items-center justify-center relative">
      <motion.div
        className="relative"
        style={{ scale }}
        animate={
          isSpeaking ? {
            y: [0, -5, 0],
          } : isListening ? {
            y: [0, -2, 0],
          } : {
            y: [0, -3, 0],
          }
        }
        transition={{
          duration: isSpeaking ? 0.8 : isListening ? 2 : 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox="0 0 120 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={color} stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Tête - Sphère lumineuse avec motif */}
          <motion.g
            animate={isSpeaking ? {
              scale: [1, 1.08, 1],
            } : {}}
            transition={{
              duration: 0.6,
              repeat: isSpeaking ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <circle
              cx="60"
              cy="35"
              r="28"
              fill="url(#headGradient)"
              filter={isSpeaking ? "url(#strongGlow)" : "url(#glow)"}
            />
            
            {/* Motif géométrique sur la tête */}
            <motion.path
              d="M 45 35 L 55 25 L 65 35 L 55 45 Z"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.4"
              animate={isSpeaking ? {
                rotate: [0, 360],
                opacity: [0.4, 0.7, 0.4],
              } : {}}
              transition={{
                duration: 3,
                repeat: isSpeaking ? Infinity : 0,
                ease: "linear"
              }}
              style={{ transformOrigin: '55px 35px' }}
            />
            <motion.path
              d="M 60 20 L 70 30 L 60 40 L 50 30 Z"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.3"
              animate={isSpeaking ? {
                rotate: [0, -360],
                opacity: [0.3, 0.6, 0.3],
              } : {}}
              transition={{
                duration: 4,
                repeat: isSpeaking ? Infinity : 0,
                ease: "linear"
              }}
              style={{ transformOrigin: '60px 30px' }}
            />
          </motion.g>

          {/* Cou */}
          <rect
            x="52"
            y="60"
            width="16"
            height="20"
            rx="8"
            fill="url(#bodyGradient)"
            opacity="0.8"
          />

          {/* Corps - Forme élégante */}
          <ellipse
            cx="60"
            cy="110"
            rx="32"
            ry="42"
            fill="url(#bodyGradient)"
            filter="url(#glow)"
          />

          {/* Épaules */}
          <ellipse
            cx="60"
            cy="90"
            rx="38"
            ry="15"
            fill={color}
            opacity="0.7"
          />

          {/* Bras gauche avec geste */}
          <motion.g
            animate={
              isSpeaking ? {
                rotate: [0, -15, 0],
              } : isListening ? {
                rotate: [0, -8, 0],
              } : {
                rotate: [0, -5, 0],
              }
            }
            transition={{
              duration: isSpeaking ? 1 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: '28px 100px' }}
          >
            <path
              d="M 28 100 Q 18 120 22 145"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
              filter="url(#glow)"
            />
            {/* Main gauche */}
            <circle
              cx="22"
              cy="150"
              r="7"
              fill={color}
              opacity="0.9"
            />
          </motion.g>

          {/* Bras droit avec geste */}
          <motion.g
            animate={
              isSpeaking ? {
                rotate: [0, 15, 0],
              } : isListening ? {
                rotate: [0, 8, 0],
              } : {
                rotate: [0, 5, 0],
              }
            }
            transition={{
              duration: isSpeaking ? 1.2 : 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
            style={{ transformOrigin: '92px 100px' }}
          >
            <path
              d="M 92 100 Q 102 120 98 145"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
              filter="url(#glow)"}
            />
            {/* Main droite */}
            <circle
              cx="98"
              cy="150"
              r="7"
              fill={color}
              opacity="0.9"
            />
          </motion.g>

          {/* Jambes */}
          <rect
            x="48"
            y="145"
            width="10"
            height="45"
            rx="5"
            fill={color}
            opacity="0.8"
          />
          <rect
            x="62"
            y="145"
            width="10"
            height="45"
            rx="5"
            fill={color}
            opacity="0.8"
          />

          {/* Ondes sonores quand il parle */}
          {isSpeaking && (
            <>
              <motion.ellipse
                cx="60"
                cy="35"
                rx="35"
                ry="35"
                fill="none"
                stroke={color}
                strokeWidth="2"
                opacity="0"
                animate={{
                  scale: [1, 1.5, 1.8],
                  opacity: [0.6, 0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.ellipse
                cx="60"
                cy="35"
                rx="35"
                ry="35"
                fill="none"
                stroke={color}
                strokeWidth="2"
                opacity="0"
                animate={{
                  scale: [1, 1.5, 1.8],
                  opacity: [0.6, 0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5
                }}
              />
            </>
          )}

          {/* Particules d'écoute */}
          {isListening && (
            <>
              <motion.circle
                cx="35"
                cy="35"
                r="3"
                fill={color}
                opacity="0"
                animate={{
                  x: [-10, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.circle
                cx="85"
                cy="35"
                r="3"
                fill={color}
                opacity="0"
                animate={{
                  x: [10, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </>
          )}
        </svg>

        {/* Aura de fond */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl -z-10"
          style={{ backgroundColor: color }}
          animate={{
            opacity: isSpeaking ? [0.1, 0.3, 0.1] : isListening ? [0.05, 0.15, 0.05] : [0.05, 0.1, 0.05],
            scale: isSpeaking ? [1, 1.2, 1] : isListening ? [1, 1.1, 1] : [1, 1.05, 1],
          }}
          transition={{
            duration: isSpeaking ? 1 : isListening ? 2 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Indicateur d'état */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {isSpeaking && (
          <div className="flex items-center gap-1 bg-primary-gold/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-1.5 bg-primary-gold rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className="text-xs text-primary-gold font-semibold">يتحدث</span>
          </div>
        )}
        {isListening && (
          <div className="flex items-center gap-1 bg-error-red/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-1.5 bg-error-red rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <span className="text-xs text-error-red font-semibold">يستمع</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
