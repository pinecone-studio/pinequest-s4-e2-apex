import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../../lib/prisma';
import { handle, requireSelf } from '../../../../../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string; key: string }> };

export const POST = handle(async (_req: Request, { params }: Ctx) => {
  const { clerkId, key } = await params;
  await requireSelf(clerkId);
  const child = await prisma.child.findUnique({ where: { clerkId } });
  if (!child) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const badge = await prisma.badge.update({
    where: { childId_key: { childId: child.id, key } },
    data: { unlocked: true },
  });
  return NextResponse.json(badge);
});
