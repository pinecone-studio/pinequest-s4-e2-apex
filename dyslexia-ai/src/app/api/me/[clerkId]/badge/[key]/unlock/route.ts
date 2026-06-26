import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../../lib/prisma';
import { handle } from '../../../../../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string; key: string }> };

// Unlock a badge for the learner.
export const POST = handle(async (_req: Request, { params }: Ctx) => {
  const { clerkId, key } = await params;
  const child = await prisma.child.findUnique({ where: { clerkId } });
  if (!child) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const badge = await prisma.badge.update({
    where: { childId_key: { childId: child.id, key } },
    data: { unlocked: true },
  });
  return NextResponse.json(badge);
});
