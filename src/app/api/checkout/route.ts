import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { sanitize } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { planName, amount, parentDetails, studentDetails, sessionId } = await req.json();

    if (!planName || !amount || !parentDetails || !studentDetails || !sessionId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Sanitize inputs
    const sanitizedStudentDetails = {
      name: sanitize(studentDetails.name),
      dob: studentDetails.dob,
      notes: sanitize(studentDetails.notes),
    };

    const sanitizedParentDetails = {
      firstName: sanitize(parentDetails.firstName),
      lastName: sanitize(parentDetails.lastName),
      email: parentDetails.email, // Clerk email is usually pre-verified but we can sanitize if it comes from metadata
      phone: sanitize(parentDetails.phone),
    };

    // 1. Handle User (Parent)
    let dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
    
    if (!dbUser) {
      // Create user if they don't exist in DB
      dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      });
    }

    // 2. Create Stripe Checkout Session
    console.log('Creating Stripe session for user:', userId);

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Campy Program: ${planName}`,
              description: `Registration for ${sanitizedStudentDetails.name}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        userId: userId,
        sessionId: sessionId,
        planName,
        studentName: sanitizedStudentDetails.name,
        studentDob: sanitizedStudentDetails.dob,
        studentNotes: sanitizedStudentDetails.notes,
        parentFirstName: sanitizedParentDetails.firstName,
        parentLastName: sanitizedParentDetails.lastName,
        parentEmail: sanitizedParentDetails.email,
        parentPhone: sanitizedParentDetails.phone,
      },
    });

    // 3. Create Pending Records
    // Create Student
    // @ts-ignore - Prisma types may be out of sync
    const student = await (prisma as any).student.create({
      data: {
        parentId: dbUser.id,
        name: sanitizedStudentDetails.name,
        dob: new Date(sanitizedStudentDetails.dob),
        notes: sanitizedStudentDetails.notes
      }
    });

    // Create Payment
    // @ts-ignore - Prisma types may be out of sync
    await (prisma as any).payment.create({
      data: {
        userId: dbUser.id,
        studentId: student.id,
        sessionId: sessionId,
        amount: amount,
        status: 'PENDING',
        stripeSessionId: checkoutSession.id,
      }
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error('[STRIPE_CHECKOUT_ERROR]', { message, stack, raw: error });
    return new NextResponse(JSON.stringify({ 
      error: 'Internal Error', 
      details: message 
    }), { status: 500 });
  }
}
