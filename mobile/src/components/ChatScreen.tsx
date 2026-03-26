import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CorrectionBanner } from '@/components/CorrectionBanner';
import { GestureAvatar } from '@/components/GestureAvatar';
import { MessageBubble } from '@/components/MessageBubble';
import type { Level, Language } from '@/lib/constants';
import { parseCorrectionFromResponse, type Correction } from '@/lib/prompts';
import { getScenarioById, getStarterMessage } from '@/lib/scenarios';
import { sendChatMessage } from '@/api/chat';
import { colors } from '@/theme/colors';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  correction?: Correction;
}

interface ChatScreenProps {
  scenarioId: string;
  userLevel: Level;
  language: Language;
}

export function ChatScreen({ scenarioId, userLevel, language }: ChatScreenProps) {
  const scenario = getScenarioById(scenarioId);
  const initialMessage = scenario
    ? getStarterMessage(scenario, language)
    : 'مرحبا!';

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialMessage, timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const listRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setMessages([
      { role: 'assistant', content: initialMessage, timestamp: new Date() },
    ]);
  }, [initialMessage, language, scenarioId]);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, scrollToEnd]);

  const processMessage = async (messageContent: string) => {
    const trimmed = messageContent.trim();
    if (!trimmed || isLoading || !scenario) return;

    const userMessage: Message = {
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsSpeaking(false);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const data = await sendChatMessage({
        message: trimmed,
        scenarioId,
        language,
        level: userLevel,
        conversationHistory: history,
      });

      const correction = parseCorrectionFromResponse(data.response);
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(data.timestamp),
        correction: correction ?? undefined,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1200);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'عذراً، حدث خطأ. تحقق من اتصال الخادم (EXPO_PUBLIC_API_URL).',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    void processMessage(inputValue);
  };

  if (!scenario) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Scénario introuvable</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top + 56}
    >
      <View style={styles.avatarRow}>
        <GestureAvatar
          color={scenario.avatarColor}
          isSpeaking={isSpeaking}
          isListening={isLoading}
          size="small"
        />
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View>
            {item.correction ? <CorrectionBanner correction={item.correction} /> : null}
            <MessageBubble
              content={item.content}
              role={item.role}
              timestamp={item.timestamp}
            />
          </View>
        )}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.typing}>
              <ActivityIndicator color={colors.primaryGold} />
            </View>
          ) : null
        }
      />

      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="اكتب رسالتك هنا..."
          placeholderTextColor={colors.warmGray}
          editable={!isLoading}
          multiline
          maxLength={2000}
          textAlign="right"
          textAlignVertical="center"
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!inputValue.trim() || isLoading) && styles.sendDisabled]}
          onPress={handleSend}
          disabled={!inputValue.trim() || isLoading}
        >
          <Text style={styles.sendLabel}>إرسال</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.primaryNight },
  centered: {
    flex: 1,
    backgroundColor: colors.primaryNight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: { color: colors.sand },
  avatarRow: {
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(139,131,120,0.35)',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  typing: {
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(139,131,120,0.35)',
    backgroundColor: colors.primaryNight,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(139, 131, 120, 0.22)',
    color: colors.sand,
    fontSize: 16,
  },
  sendBtn: {
    backgroundColor: colors.primaryGold,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 22,
    marginBottom: 2,
  },
  sendDisabled: { opacity: 0.45 },
  sendLabel: {
    color: colors.primaryNight,
    fontWeight: '700',
    fontSize: 15,
  },
});
