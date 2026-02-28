import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Ajouter un mot au vocabulaire
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { word, translation, context, scenarioId } = await req.json();

    if (!word || !translation) {
      return NextResponse.json(
        { error: 'Mot et traduction requis' },
        { status: 400 }
      );
    }

    // Vérifier si le mot existe déjà
    const existing = await prisma.vocabulary.findFirst({
      where: {
        userId: session.user.id,
        word,
      },
    });

    if (existing) {
      // Incrémenter le mastery level
      const updated = await prisma.vocabulary.update({
        where: { id: existing.id },
        data: {
          masteryLevel: Math.min(existing.masteryLevel + 1, 5),
          lastReviewed: new Date(),
        },
      });

      return NextResponse.json({ vocabulary: updated, isNew: false });
    }

    // Créer nouveau mot
    const vocabulary = await prisma.vocabulary.create({
      data: {
        userId: session.user.id,
        word,
        translation,
        context: context || null,
        scenarioId: scenarioId || null,
        masteryLevel: 0,
      },
    });

    // Mettre à jour le compteur de mots appris
    const progress = await prisma.progress.findUnique({
      where: { userId: session.user.id },
    });

    if (progress) {
      await prisma.progress.update({
        where: { userId: session.user.id },
        data: {
          wordsLearned: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json({ vocabulary, isNew: true });
  } catch (error) {
    console.error('Add vocabulary error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout' },
      { status: 500 }
    );
  }
}

// Récupérer le vocabulaire
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const scenarioId = searchParams.get('scenarioId');
    const limit = parseInt(searchParams.get('limit') || '100');

    const where: any = {
      userId: session.user.id,
    };

    if (scenarioId) {
      where.scenarioId = scenarioId;
    }

    const vocabulary = await prisma.vocabulary.findMany({
      where,
      orderBy: [
        { masteryLevel: 'asc' },
        { learnedAt: 'desc' },
      ],
      take: limit,
    });

    return NextResponse.json({ vocabulary });
  } catch (error) {
    console.error('Get vocabulary error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    );
  }
}

// Mettre à jour le mastery level d'un mot
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { wordId, action } = await req.json();

    if (!wordId || !action) {
      return NextResponse.json(
        { error: 'ID et action requis' },
        { status: 400 }
      );
    }

    const vocabulary = await prisma.vocabulary.findUnique({
      where: { id: wordId },
    });

    if (!vocabulary || vocabulary.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Mot non trouvé' },
        { status: 404 }
      );
    }

    let newMasteryLevel = vocabulary.masteryLevel;

    if (action === 'correct') {
      newMasteryLevel = Math.min(vocabulary.masteryLevel + 1, 5);
    } else if (action === 'incorrect') {
      newMasteryLevel = Math.max(vocabulary.masteryLevel - 1, 0);
    }

    const updated = await prisma.vocabulary.update({
      where: { id: wordId },
      data: {
        masteryLevel: newMasteryLevel,
        lastReviewed: new Date(),
      },
    });

    return NextResponse.json({ vocabulary: updated });
  } catch (error) {
    console.error('Update vocabulary error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}
