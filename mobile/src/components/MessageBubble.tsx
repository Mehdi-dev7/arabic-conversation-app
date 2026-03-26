import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
}

export function MessageBubble({ content, role, timestamp }: MessageBubbleProps) {
  const isAssistant = role === 'assistant';

  return (
    <View
      style={[
        styles.row,
        isAssistant ? styles.alignStart : styles.alignEnd,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isAssistant ? styles.bubbleAssistant : styles.bubbleUser,
        ]}
      >
        <Text
          style={[styles.text, isAssistant ? styles.textAssistant : styles.textUser]}
        >
          {content}
        </Text>
        {timestamp ? (
          <Text style={styles.time}>
            {new Date(timestamp).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    width: '100%',
  },
  alignStart: { alignItems: 'flex-start' },
  alignEnd: { alignItems: 'flex-end' },
  bubble: {
    maxWidth: '85%',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleAssistant: {
    backgroundColor: 'rgba(139, 131, 120, 0.25)',
  },
  bubbleUser: {
    backgroundColor: colors.primaryGold,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  textAssistant: { color: colors.sand },
  textUser: { color: colors.primaryNight },
  time: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
    color: colors.warmGray,
  },
});
