import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Sauvegarder une conversation
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { scenarioId, language, level, messages, duration } = await req.json();

    if (!scenarioId || !language || !level || !messages) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Vérifier le rate limiting pour les free users
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        rateLimit: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Si free plan, vérifier la limite
    if (user.plan === 'free') {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const conversationsThisMonth = await prisma.conversation.count({
        where: {
          userId: session.user.id,
          createdAt: {
            gte: firstDayOfMonth,
          },
        },
      });

      const FREE_LIMIT = 2;

      if (conversationsThisMonth >= FREE_LIMIT) {
        return NextResponse.json(
          { error: 'LIMIT_REACHED', message: 'Limite mensuelle atteinte. Passez à Premium pour des conversations illimitées.' },
          { status: 403 }
        );
      }
    }

    // Sauvegarder la conversation
    const conversation = await prisma.conversation.create({
      data: {
        userId: session.user.id,
        scenarioId,
        language,
        level,
        messages,
        duration: duration || 0,
      },
    });

    // Mettre à jour le rate limit
    if (user.rateLimit) {
      await prisma.rateLimit.update({
        where: { userId: session.user.id },
        data: {
          conversationsThisMonth: {
            increment: 1,
          },
        },
      });
    } else {
      // Créer le rate limit s'il n'existe pas
      await prisma.rateLimit.create({
        data: {
          userId: session.user.id,
          conversationsThisMonth: 1,
        },
      });
    }

    // Mettre à jour la progression
    const progress = await prisma.progress.findUnique({
      where: { userId: session.user.id },
    });

    if (progress) {
      await prisma.progress.update({
        where: { userId: session.user.id },
        data: {
          totalConversations: {
            increment: 1,
          },
          totalHours: {
            increment: duration ? duration / 3600 : 0,
          },
        },
      });
    } else {
      // Créer la progression si elle n'existe pas
      await prisma.progress.create({
        data: {
          userId: session.user.id,
          totalConversations: 1,
          totalHours: duration ? duration / 3600 : 0,
        },
      });
    }

    // Mettre à jour lastActiveDate et streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    let newStreakDays = user.streakDays;

    if (lastActive) {
      lastActive.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor(
        (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 1) {
        // Jour consécutif
        newStreakDays += 1;
      } else if (daysDiff > 1) {
        // Streak cassé
        newStreakDays = 1;
      }
      // daysDiff === 0 : même jour, on ne change rien
    } else {
      // Première conversation
      newStreakDays = 1;
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        lastActiveDate: new Date(),
        streakDays: newStreakDays,
      },
    });

    return NextResponse.json({
      success: true,
      conversation,
      streak: newStreakDays,
    });
  } catch (error) {
    console.error('Save conversation error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    );
  }
}

// Récupérer les conversations
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const conversations = await prisma.conversation.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await prisma.conversation.count({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      conversations,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    );
  }
}
