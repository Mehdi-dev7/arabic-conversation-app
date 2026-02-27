import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function generateResponse(
  messages: Message[],
  systemPrompt: string,
  maxTokens: number = 1000
): Promise<string> {
  try {
    const anthropicMessages = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: anthropicMessages,
    });

    const textContent = response.content.find(block => block.type === 'text');
    return textContent && 'text' in textContent ? textContent.text : '';
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw new Error('Failed to generate response');
  }
}

export { anthropic };
