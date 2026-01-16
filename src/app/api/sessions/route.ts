import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        program: true,
        partner: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('[SESSIONS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
