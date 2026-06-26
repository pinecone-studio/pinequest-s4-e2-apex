import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { childInclude, levelForExp, handle } from '../../../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string }> };

// Generic reward — тоглоом, өдрийн сорил зэрэгт coin/exp олгох.
export const POST = handle(async (req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  const child = await prisma.child.findUnique({ where: { clerkId } });
  if (!child) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as { coins?: number; exp?: number };
  const coins = Math.max(0, Math.round(Number(body?.coins) || 0));
  const exp = Math.max(0, Math.round(Number(body?.exp) || 0));
  const newExp = (child.exp || 0) + exp;
  const updated = await prisma.child.update({
    where: { id: child.id },
    data: {
      coins: { increment: coins },
      exp: newExp,
      level: levelForExp(newExp),
    },
    include: childInclude,
  });

  return NextResponse.json({ child: updated, earnedCoins: coins, earnedExp: exp });
});
