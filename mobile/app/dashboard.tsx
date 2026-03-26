import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ title: 'Tableau de bord' }} />
      <View style={[styles.screen, { paddingTop: 8, paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.title}>مرحباً</Text>
        <Text style={styles.p}>
          L&apos;authentification (Google/Apple) et les abonnements Stripe restent côté serveur
          Next.js. Branchez ici Expo Auth Session ou votre API utilisateur quand vous serez prêt.
        </Text>
        <Link href="/" asChild>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>← Retour aux scénarios</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primaryNight,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.sand,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  p: {
    color: colors.warmGray,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  btn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryGold,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnText: { color: colors.primaryNight, fontWeight: '700', fontSize: 16 },
});
