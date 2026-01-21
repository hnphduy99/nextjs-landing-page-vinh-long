import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [activities, count] = await Promise.all([
      prisma.adminActivity.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.adminActivity.count()
    ]);

    return NextResponse.json({ activities, count });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
