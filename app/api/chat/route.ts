import { NextRequest, NextResponse } from 'next/server';
import { generateResponse } from '@/lib/anthropic';
import { buildSystemPrompt } from '@/lib/prompts';
import { getScenarioById } from '@/lib/scenarios';
import { Level, Language } from '@/lib/constants';

interface ChatRequestBody {
  message: string;
  scenarioId: string;
  language: Language;
  level: Level;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  /** Optionnel : bloc mémoire (résumé + progression) — idéalement fourni par l’API après chargement User/Progress. */
  memoryBlock?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestBody = await req.json();
    const { message, scenarioId, language, level, conversationHistory, memoryBlock } = body;

    if (!message || !scenarioId || !language || !level) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      );
    }

    const systemPrompt = buildSystemPrompt(level, language, scenario, {
      memoryBlock,
    });
    
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date(),
      })),
      {
        role: 'user' as const,
        content: message,
        timestamp: new Date(),
      }
    ];

    const response = await generateResponse(messages, systemPrompt, 1000);

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
