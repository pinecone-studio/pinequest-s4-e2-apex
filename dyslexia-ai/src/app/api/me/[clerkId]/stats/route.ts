import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { handle, requireSelf } from '../../../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string }> };

export const GET = handle(async (_req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  await requireSelf(clerkId);
  const child = await prisma.child.findUnique({ where: { clerkId } });
  if (!child) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const sessions = await prisma.readingSession.findMany({
    where: { childId: child.id },
    orderBy: { createdAt: 'desc' },
  });
  const count = sessions.length;
  const avgAccuracy = count ? sessions.reduce((s, x) => s + x.accuracy, 0) / count : 0;
  const totalMinutes = sessions.reduce((s, x) => s + x.durationMin, 0);
  const totalWords = sessions.reduce((s, x) => s + x.wordsRead, 0);

  return NextResponse.json({
    sessions: count,
    avgAccuracy: Math.round(avgAccuracy),
    totalMinutes,
    totalWords,
    recent: sessions.slice(0, 10),
  });
});
