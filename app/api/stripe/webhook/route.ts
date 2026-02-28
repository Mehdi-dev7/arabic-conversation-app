import { NextRequest, NextResponse } from 'next/server';
import { stripe, getPlanFromPriceId } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  // Gérer les événements Stripe
  try {
    switch (event.type) {
      // Abonnement créé avec succès
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          const userId = session.metadata?.userId;
          
          if (userId) {
            const priceId = subscription.items.data[0]?.price.id;
            const plan = getPlanFromPriceId(priceId);

            await prisma.user.update({
              where: { id: userId },
              data: {
                plan,
                stripeCustomerId: session.customer as string,
                subscriptionStatus: 'active',
              },
            });

            console.log(`✅ Subscription activated for user ${userId} with plan ${plan}`);
          }
        }
        break;
      }

      // Abonnement mis à jour
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (user) {
          const priceId = subscription.items.data[0]?.price.id;
          const plan = getPlanFromPriceId(priceId);

          await prisma.user.update({
            where: { id: user.id },
            data: {
              plan,
              subscriptionStatus: subscription.status,
            },
          });

          console.log(`✅ Subscription updated for user ${user.id} - Status: ${subscription.status}`);
        }
        break;
      }

      // Abonnement supprimé
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              plan: 'free',
              subscriptionStatus: 'canceled',
            },
          });

          console.log(`✅ Subscription canceled for user ${user.id} - Reset to free plan`);
        }
        break;
      }

      // Paiement réussi
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: invoice.customer as string },
          });

          if (user) {
            console.log(`✅ Payment succeeded for user ${user.id}`);
          }
        }
        break;
      }

      // Paiement échoué
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: invoice.customer as string },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: 'past_due',
            },
          });

          console.log(`⚠️ Payment failed for user ${user.id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
