import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

interface GestureAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 0.65,
  medium: 1,
  large: 1.25,
};

export function GestureAvatar({
  isListening = false,
  isSpeaking = false,
  color = '#D4AF37',
  size = 'medium',
}: GestureAvatarProps) {
  const pulse = useSharedValue(1);
  const baseScale = sizeMap[size];

  useEffect(() => {
    const fast = isSpeaking ? 450 : isListening ? 1200 : 2000;
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: fast }),
        withTiming(1, { duration: fast })
      ),
      -1,
      true
    );
  }, [isSpeaking, isListening, pulse]);

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [{ scale: baseScale * pulse.value }],
  }));

  return (
    <Animated.View style={[styles.container, wrapperStyle]}>
      <Svg width={120} height={200} viewBox="0 0 120 200">
        <Defs>
          <LinearGradient id="headG" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity={1} />
            <Stop offset="100%" stopColor={color} stopOpacity={0.85} />
          </LinearGradient>
          <LinearGradient id="bodyG" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity={0.95} />
            <Stop offset="100%" stopColor={color} stopOpacity={0.75} />
          </LinearGradient>
        </Defs>
        <Circle cx={60} cy={35} r={28} fill="url(#headG)" opacity={0.95} />
        <Rect x={52} y={60} width={16} height={20} rx={8} fill="url(#bodyG)" opacity={0.85} />
        <Ellipse cx={60} cy={90} rx={38} ry={15} fill={color} opacity={0.75} />
        <Ellipse cx={60} cy={110} rx={32} ry={42} fill="url(#bodyG)" opacity={0.95} />
        <Path
          d="M 28 100 Q 18 120 22 145"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
          opacity={0.9}
        />
        <Circle cx={22} cy={150} r={7} fill={color} opacity={0.95} />
        <Path
          d="M 92 100 Q 102 120 98 145"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
          opacity={0.9}
        />
        <Circle cx={98} cy={150} r={7} fill={color} opacity={0.95} />
        <Rect x={48} y={145} width={10} height={45} rx={5} fill={color} opacity={0.85} />
        <Rect x={62} y={145} width={10} height={45} rx={5} fill={color} opacity={0.85} />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
