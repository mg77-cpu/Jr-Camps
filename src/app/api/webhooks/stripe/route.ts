import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { resend } from '@/lib/resend';
import PaymentEmail from '@/emails/PaymentEmail';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const metadata = session.metadata;
    if (!metadata) {
      return new NextResponse('No metadata found', { status: 400 });
    }

    const {
      userId,
      studentName,
      studentDob,
      studentNotes,
      parentFirstName,
      parentLastName,
      parentEmail,
      parentPhone,
      planName,
      sessionId
    } = metadata;

    try {
      // 1. Find or Create User
      if (!userId) {
        throw new Error('Missing userId in metadata');
      }

      // @ts-ignore
      let user = await (prisma as any).user.findUnique({
        where: { clerkId: userId }
      });

      if (!user) {
        // Fallback create if not exists for some reason
        // @ts-ignore
        user = await (prisma as any).user.create({
          data: {
            clerkId: userId,
            email: parentEmail,
            firstName: parentFirstName,
            lastName: parentLastName,
            phone: parentPhone,
            role: 'parent'
          }
        });
      }

      // 2. Find or Create Student
      // Since we already create the student in the checkout route as PENDING,
      // we should try to find it first to avoid duplicates if possible, 
      // but the checkout route logic currently creates it every time.
      // To keep it simple and match the current flow, we'll create it here too if it doesn't exist.
      
      // @ts-ignore
      let student = await (prisma as any).student.findFirst({
        where: {
          parentId: user.id,
          name: studentName,
          dob: new Date(studentDob)
        }
      });

      if (!student) {
        // @ts-ignore
        student = await (prisma as any).student.create({
          data: {
            parentId: user.id,
            name: studentName,
            dob: new Date(studentDob),
            notes: studentNotes
          }
        });
      }

      // 3. Create or Update Payment
      const paymentData = {
        userId: user.id,
        studentId: student.id,
        sessionId: sessionId,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        status: 'COMPLETED',
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent as string,
        currency: session.currency || 'usd'
      };

      // Check if pending payment exists
      // @ts-ignore
      const existingPayment = await (prisma as any).payment.findUnique({
        where: { stripeSessionId: session.id }
      });

      if (existingPayment) {
        // @ts-ignore
        await (prisma as any).payment.update({
          where: { stripeSessionId: session.id },
          data: paymentData
        });
      } else {
        // @ts-ignore
        await (prisma as any).payment.create({
          data: paymentData
        });
      }

      // 4. Send Payment Confirmation Email
      await resend.emails.send({
        from: 'Campy <billing@campy.com>',
        to: [parentEmail],
        subject: `Payment Confirmed - ${planName}`,
        react: PaymentEmail({
          userFirstName: parentFirstName || 'there',
          planName: planName,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          studentName: studentName,
        }),
      });

      console.info('checkout.session.completed', { sessionId: session.id });
    } catch (error: any) {
      console.error('[WEBHOOK_DATABASE_ERROR]', error);
      return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
    }
  }

  if (event.type === 'checkout.session.expired') {
    await prisma.payment.update({
      where: { stripeSessionId: session.id },
      data: {
        status: 'FAILED',
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
