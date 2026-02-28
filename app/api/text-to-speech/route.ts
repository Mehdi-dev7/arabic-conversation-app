import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

let ttsClient: TextToSpeechClient | null = null;

function getTTSClient() {
  if (!ttsClient) {
    if (process.env.GOOGLE_CLOUD_API_KEY) {
      ttsClient = new TextToSpeechClient({
        apiKey: process.env.GOOGLE_CLOUD_API_KEY,
      });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      ttsClient = new TextToSpeechClient();
    }
  }
  return ttsClient;
}

export async function POST(req: NextRequest) {
  try {
    const { text, language = 'ar', gender = 'NEUTRAL' } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    const client = getTTSClient();
    
    if (!client) {
      return NextResponse.json(
        { error: 'Google Cloud TTS not configured. Please set GOOGLE_CLOUD_API_KEY or GOOGLE_APPLICATION_CREDENTIALS' },
        { status: 500 }
      );
    }

    const voiceConfig = {
      'ar': { languageCode: 'ar-XA', name: 'ar-XA-Standard-A' },
      'ar-male': { languageCode: 'ar-XA', name: 'ar-XA-Standard-B' },
      'ar-female': { languageCode: 'ar-XA', name: 'ar-XA-Standard-A' },
    };

    const selectedVoice = language === 'ar' && gender === 'MALE' 
      ? voiceConfig['ar-male'] 
      : voiceConfig['ar'];

    const request = {
      input: { text },
      voice: {
        languageCode: selectedVoice.languageCode,
        name: selectedVoice.name,
        ssmlGender: gender as 'NEUTRAL' | 'MALE' | 'FEMALE',
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        speakingRate: 0.9,
        pitch: 0,
      },
    };

    const [response] = await client.synthesizeSpeech(request);

    if (!response.audioContent) {
      throw new Error('No audio content generated');
    }

    return new NextResponse(response.audioContent as Buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline',
      },
    });

  } catch (error) {
    console.error('Google TTS error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Text-to-speech failed';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
