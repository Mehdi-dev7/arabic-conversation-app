import { Hono } from 'hono';
import type { Level, Language } from '../../../lib/constants.ts';

/** Résolution fiable du monorepo sous Node/tsx (import.meta.url). */
const { generateResponse } = await import(
  new URL('../../../lib/anthropic.ts', import.meta.url).href
);
const { buildSystemPrompt } = await import(
  new URL('../../../lib/prompts.ts', import.meta.url).href
);
const { getScenarioById } = await import(
  new URL('../../../lib/scenarios.ts', import.meta.url).href
);

interface ChatRequestBody {
  message: string;
  scenarioId: string;
  language: Language;
  level: Level;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  memoryBlock?: string;
}

export const chatRoutes = new Hono();

chatRoutes.post('/chat', async (c) => {
  try {
    let body: ChatRequestBody;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'Invalid JSON' }, 400);
    }

    const { message, scenarioId, language, level, conversationHistory, memoryBlock } = body;

    if (!message || !scenarioId || !language || !level) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
      return c.json({ error: 'Scenario not found' }, 404);
    }

    const systemPrompt = buildSystemPrompt(level, language, scenario, { memoryBlock });

    const messages = [
      ...(conversationHistory ?? []).map((msg) => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date(),
      })),
      {
        role: 'user' as const,
        content: message,
        timestamp: new Date(),
      },
    ];

    const response = await generateResponse(messages, systemPrompt, 1000);

    return c.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return c.json({ error: errorMessage }, 500);
  }
});
