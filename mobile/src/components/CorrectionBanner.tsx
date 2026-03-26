import { View, Text, StyleSheet } from 'react-native';
import type { Correction } from '@/lib/prompts';
import { colors } from '@/theme/colors';

interface CorrectionBannerProps {
  correction: Correction;
}

const errorTypeLabels: Record<Correction['errorType'], string> = {
  conjugation: 'Conjugaison',
  vocabulary: 'Vocabulaire',
  syntax: 'Syntaxe',
  pronunciation: 'Prononciation',
  grammar: 'Grammaire',
};

export function CorrectionBanner({ correction }: CorrectionBannerProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.meta}>
        {errorTypeLabels[correction.errorType]} · {correction.severity}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>✅ </Text>
        {correction.corrected}
      </Text>
      <Text style={styles.lineMuted}>
        <Text style={styles.label}>❌ </Text>
        {correction.userInput}
      </Text>
      <Text style={styles.lineSmall}>💡 {correction.explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 2,
    borderColor: colors.primaryGold + '55',
    backgroundColor: colors.primaryGold + '18',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  meta: {
    color: colors.sand,
    opacity: 0.85,
    fontSize: 12,
    marginBottom: 8,
  },
  line: {
    color: colors.sand,
    fontSize: 15,
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  lineMuted: {
    color: colors.warmGray,
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  lineSmall: {
    color: colors.warmGray,
    fontSize: 13,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  label: { fontWeight: '700' },
});
