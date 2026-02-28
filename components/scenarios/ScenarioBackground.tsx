'use client';

import { motion } from 'framer-motion';
import { Scenario } from '@/lib/scenarios';

interface ScenarioBackgroundProps {
  scenario: Scenario;
}

export function ScenarioBackground({ scenario }: ScenarioBackgroundProps) {
  const getBackgroundStyle = (scenarioId: string) => {
    switch (scenarioId) {
      case 'introduction':
        return {
          gradient: 'from-[#4A3C2F] via-[#6B4E3D] to-[#8B6F47]',
          pattern: 'cafe',
          overlay: 'bg-gradient-to-br from-amber-900/20 to-orange-900/30',
        };
      case 'cafe':
        return {
          gradient: 'from-[#2C1810] via-[#4A2C1A] to-[#6B4226]',
          pattern: 'cafe',
          overlay: 'bg-gradient-to-br from-orange-900/30 to-amber-800/20',
        };
      case 'market':
        return {
          gradient: 'from-[#8B4513] via-[#CD853F] to-[#DAA520]',
          pattern: 'market',
          overlay: 'bg-gradient-to-br from-yellow-600/20 to-orange-500/30',
        };
      case 'restaurant':
        return {
          gradient: 'from-[#8B0000] via-[#A52A2A] to-[#CD5C5C]',
          pattern: 'restaurant',
          overlay: 'bg-gradient-to-br from-red-900/30 to-orange-800/20',
        };
      case 'airport':
        return {
          gradient: 'from-[#1E3A8A] via-[#3B82F6] to-[#60A5FA]',
          pattern: 'airport',
          overlay: 'bg-gradient-to-br from-blue-900/20 to-sky-700/30',
        };
      case 'home':
        return {
          gradient: 'from-[#556B2F] via-[#6B8E23] to-[#8FBC8F]',
          pattern: 'home',
          overlay: 'bg-gradient-to-br from-green-900/20 to-emerald-800/30',
        };
      case 'grocery':
        return {
          gradient: 'from-[#8B7355] via-[#A0826D] to-[#C19A6B]',
          pattern: 'grocery',
          overlay: 'bg-gradient-to-br from-amber-900/20 to-yellow-800/30',
        };
      case 'taxi':
        return {
          gradient: 'from-[#E74C3C] via-[#C0392B] to-[#922B21]',
          pattern: 'taxi',
          overlay: 'bg-gradient-to-br from-red-900/30 to-orange-900/20',
        };
      case 'doctor':
        return {
          gradient: 'from-[#2ECC71] via-[#27AE60] to-[#1E8449]',
          pattern: 'doctor',
          overlay: 'bg-gradient-to-br from-green-900/20 to-teal-800/30',
        };
      default:
        return {
          gradient: 'from-primary-night via-neutral-warm-gray to-primary-night',
          pattern: 'default',
          overlay: 'bg-gradient-to-br from-neutral-warm-gray/20 to-primary-night/30',
        };
    }
  };

  const style = getBackgroundStyle(scenario.id);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Gradient de base */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />

      {/* Overlay de texture */}
      <div className={`absolute inset-0 ${style.overlay}`} />

      {/* Motifs décoratifs selon le scénario */}
      {style.pattern === 'cafe' && <CafePattern />}
      {style.pattern === 'market' && <MarketPattern />}
      {style.pattern === 'restaurant' && <RestaurantPattern />}
      {style.pattern === 'airport' && <AirportPattern />}
      {style.pattern === 'home' && <HomePattern />}
      {style.pattern === 'grocery' && <GroceryPattern />}
      {style.pattern === 'taxi' && <TaxiPattern />}
      {style.pattern === 'doctor' && <DoctorPattern />}

      {/* Particules flottantes */}
      <FloatingParticles color={scenario.avatarColor} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
    </div>
  );
}

// Motifs pour le café
function CafePattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      {/* Zellige pattern simplifié */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 border-2 border-amber-300"
          style={{
            left: `${(i % 5) * 20}%`,
            top: `${Math.floor(i / 5) * 25}%`,
            transform: 'rotate(45deg)',
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Motifs pour le marché
function MarketPattern() {
  return (
    <div className="absolute inset-0 opacity-15">
      {/* Tissus colorés */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
          style={{
            width: '100%',
            top: `${i * 12.5}%`,
          }}
          animate={{
            x: [-100, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// Motifs pour le restaurant
function RestaurantPattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      {/* Lanternes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-16 bg-gradient-to-b from-red-400 to-orange-400 rounded-full"
          style={{
            left: `${(i % 3) * 33}%`,
            top: `${Math.floor(i / 3) * 50}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Motifs pour l'aéroport
function AirportPattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      {/* Lignes de piste */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-20 bg-blue-300"
          style={{
            left: `${i * 10}%`,
            bottom: 0,
          }}
          animate={{
            y: [0, -600],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

// Particules flottantes
function FloatingParticles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// Motifs pour la maison
function HomePattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      {/* Motifs de coussins et tapis */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg"
          style={{
            left: `${(i % 3) * 33}%`,
            top: `${Math.floor(i / 3) * 50}%`,
            opacity: 0.15,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// Motifs pour l'épicerie
function GroceryPattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      {/* Étagères */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-2 bg-brown-400"
          style={{
            top: `${i * 20}%`,
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Motifs pour le taxi
function TaxiPattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      {/* Lignes de route qui défilent */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-1 bg-white"
          style={{
            left: `${i * 15}%`,
            top: '50%',
          }}
          animate={{
            x: [-100, 100],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        />
      ))}
    </div>
  );
}

// Motifs pour le docteur
function DoctorPattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      {/* Croix médicales */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(i % 3) * 33 + 15}%`,
            top: `${Math.floor(i / 3) * 50 + 20}%`,
          }}
        >
          <div className="relative w-8 h-8">
            <div className="absolute w-2 h-8 bg-green-300 left-3" />
            <div className="absolute w-8 h-2 bg-green-300 top-3" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
