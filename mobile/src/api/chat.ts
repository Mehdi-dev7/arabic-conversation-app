import Constants from 'expo-constants';
import type { Level, Language } from '@/lib/constants';

export interface ChatRequestBody {
  message: string;
  scenarioId: string;
  language: Language;
  level: Level;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface ChatResponseBody {
  success: boolean;
  response: string;
  timestamp: string;
}

/** URL de base du backend Next.js (routes /api/*). Définir EXPO_PUBLIC_API_URL pour appareil physique. */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv?.trim()) {
    return fromEnv.replace(/\/$/, '');
  }
  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(':')[0];
  if (host && host !== 'localhost') {
    return `http://${host}:3000`;
  }
  return 'http://localhost:3000';
}

export async function sendChatMessage(
  body: ChatRequestBody
): Promise<ChatResponseBody> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `Erreur HTTP ${res.status}`);
  }
  return JSON.parse(text) as ChatResponseBody;
}
