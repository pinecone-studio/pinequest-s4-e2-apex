import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { childInclude, levelForExp, handle } from '../../../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string }> };

// Record a reading practice session and award stars (accuracy → stars).
export const POST = handle(async (req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  const child = await prisma.child.findUnique({ where: { clerkId } });
  if (!child) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const {
    accuracy = 0,
    durationMin = 0,
    wordsRead = 0,
    lessonId,
  } = (await req.json().catch(() => ({}))) as {
    accuracy?: number;
    durationMin?: number;
    wordsRead?: number;
    lessonId?: string;
  };

  const session = await prisma.readingSession.create({
    data: { childId: child.id, accuracy, durationMin, wordsRead, lessonId: lessonId || null },
  });

  const earnedStars = Math.max(1, Math.round(accuracy / 20)); // 0..100 → ~1..5
  const earnedCoins = earnedStars * 2;
  const earnedExp = Math.max(5, Math.round(accuracy / 5) + wordsRead); // нарийвчлал + уншсан үг
  const newExp = (child.exp || 0) + earnedExp;
  const updated = await prisma.child.update({
    where: { id: child.id },
    data: {
      stars: { increment: earnedStars },
      coins: { increment: earnedCoins },
      exp: newExp,
      level: levelForExp(newExp),
    },
    include: childInclude,
  });

  return NextResponse.json({ session, child: updated, earnedStars, earnedCoins, earnedExp });
});
