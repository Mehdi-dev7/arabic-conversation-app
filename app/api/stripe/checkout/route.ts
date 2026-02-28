import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe, getPriceIdFromPlan } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: 'Plan requis' }, { status: 400 });
    }

    const priceId = getPriceIdFromPlan(planId);

    if (!priceId) {
      return NextResponse.json({ error: 'Plan invalide' }, { status: 400 });
    }

    // Récupérer ou créer le customer Stripe
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    let customerId = user.stripeCustomerId;

    // Créer le customer Stripe s'il n'existe pas
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });

      customerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeCustomerId: customerId,
        },
      });
    }

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        userId: user.id,
        planId,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          planId,
        },
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error: any) {
    console.error('Stripe Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de la session' },
      { status: 500 }
    );
  }
}
