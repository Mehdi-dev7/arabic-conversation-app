import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { beginnerScenarios, type Scenario } from '@/lib/scenarios';
import type { Language, Level } from '@/lib/constants';
import { colors } from '@/theme/colors';

function ScenarioRow({
  scenario,
  language,
  level,
}: {
  scenario: Scenario;
  language: Language;
  level: Level;
}) {
  const href = `/chat/${scenario.id}?language=${language}&level=${level}`;

  return (
    <Link href={href} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <View style={styles.cardHeader}>
          <Text style={styles.titleAr}>{scenario.name}</Text>
          <View style={[styles.badge, scenario.freeAccess ? styles.badgeFree : styles.badgePremium]}>
            <Text style={styles.badgeText}>{scenario.freeAccess ? 'Gratuit' : 'Premium'}</Text>
          </View>
        </View>
        <Text style={styles.titleEn}>{scenario.nameEn}</Text>
        <Text style={styles.desc} numberOfLines={3}>
          {scenario.description}
        </Text>
        <Text style={styles.cta}>Commencer →</Text>
      </Pressable>
    </Link>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<Language>('msa');
  const [level, setLevel] = useState<Level>('beginner');

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Text style={styles.brand}>📚 تعلم العربية</Text>
        <Link href="/dashboard" asChild>
          <Pressable>
            <Text style={styles.link}>Tableau de bord</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.heroAr}>تعلم العربية بالمحادثة</Text>
      <Text style={styles.heroFr}>App mobile — pratiquez avec l&apos;IA</Text>

      <View style={styles.toggles}>
        <Text style={styles.togglesLabel}>Langue</Text>
        <View style={styles.row}>
          {(['msa', 'darija'] as const).map((l) => (
            <Pressable
              key={l}
              onPress={() => setLanguage(l)}
              style={[styles.chip, language === l && styles.chipOn]}
            >
              <Text style={[styles.chipText, language === l && styles.chipTextOn]}>
                {l === 'msa' ? 'MSA' : 'Darija'}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.togglesLabel}>Niveau</Text>
        <View style={styles.row}>
          {(['beginner', 'intermediate', 'advanced'] as const).map((lv) => (
            <Pressable
              key={lv}
              onPress={() => setLevel(lv)}
              style={[styles.chip, level === lv && styles.chipOn]}
            >
              <Text style={[styles.chipText, level === lv && styles.chipTextOn]}>
                {lv === 'beginner' ? 'Débutant' : lv === 'intermediate' ? 'Inter.' : 'Avancé'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Scénarios</Text>
      <FlatList
        data={beginnerScenarios}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        renderItem={({ item }) => (
          <ScenarioRow scenario={item} language={language} level={level} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primaryNight,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brand: { color: colors.sand, fontSize: 18, fontWeight: '700' },
  link: { color: colors.primaryGold, fontSize: 15 },
  heroAr: {
    color: colors.sand,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    writingDirection: 'rtl',
  },
  heroFr: {
    color: colors.warmGray,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  toggles: { marginBottom: 16 },
  togglesLabel: {
    color: colors.warmGray,
    fontSize: 12,
    marginBottom: 6,
    marginTop: 8,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(139,131,120,0.25)',
  },
  chipOn: { backgroundColor: colors.primaryGold },
  chipText: { color: colors.sand, fontSize: 14 },
  chipTextOn: { color: colors.primaryNight, fontWeight: '700' },
  sectionTitle: {
    color: colors.sand,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'rgba(139,131,120,0.12)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(139,131,120,0.35)',
  },
  cardPressed: { opacity: 0.9 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  titleAr: {
    color: colors.sand,
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  titleEn: { color: colors.warmGray, fontSize: 14, marginBottom: 8 },
  desc: { color: colors.sand, opacity: 0.85, fontSize: 14, lineHeight: 20, marginBottom: 10 },
  cta: { color: colors.primaryGold, fontWeight: '600', fontSize: 15 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeFree: { backgroundColor: colors.successGreen + '33' },
  badgePremium: { backgroundColor: colors.primaryGold + '33' },
  badgeText: { color: colors.sand, fontSize: 11, fontWeight: '600' },
});
