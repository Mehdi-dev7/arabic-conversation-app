import { Stack, useLocalSearchParams } from 'expo-router';
import { ChatScreen } from '@/components/ChatScreen';
import type { Language, Level } from '@/lib/constants';
import { getScenarioById } from '@/lib/scenarios';

function parseLanguage(v: string | string[] | undefined): Language {
  const s = Array.isArray(v) ? v[0] : v;
  return s === 'darija' ? 'darija' : 'msa';
}

function parseLevel(v: string | string[] | undefined): Level {
  const s = Array.isArray(v) ? v[0] : v;
  if (s === 'intermediate' || s === 'advanced') return s;
  return 'beginner';
}

export default function ChatRoute() {
  const params = useLocalSearchParams<{
    scenarioId: string;
    language?: string;
    level?: string;
  }>();

  const scenarioId =
    typeof params.scenarioId === 'string'
      ? params.scenarioId
      : params.scenarioId?.[0] ?? '';
  const language = parseLanguage(params.language);
  const level = parseLevel(params.level);
  const scenario = getScenarioById(scenarioId);

  return (
    <>
      <Stack.Screen
        options={{
          title: scenario?.nameEn ?? 'Conversation',
          headerBackTitle: 'Retour',
        }}
      />
      <ChatScreen scenarioId={scenarioId} userLevel={level} language={language} />
    </>
  );
}
