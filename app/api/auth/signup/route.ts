import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        plan: 'free',
        currentLevel: 'vocabulary_acquisition',
        preferredLanguage: 'msa',
        streakDays: 0,
      },
    });

    await prisma.progress.create({
      data: {
        userId: user.id,
      },
    });

    await prisma.rateLimit.create({
      data: {
        userId: user.id,
        conversationsThisMonth: 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Compte créé avec succès',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création du compte' },
      { status: 500 }
    );
  }
}
