import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { DEFAULT_BADGES, childInclude, handle } from '../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Upsert the current learner from the signed-in Clerk user. Creates the default
// badge set the first time we see this user.
export const POST = handle(async (req: Request) => {
  const { clerkId, name, email, avatar } = (await req.json().catch(() => ({}))) as {
    clerkId?: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
  if (!clerkId) return NextResponse.json({ error: 'clerkId required' }, { status: 400 });

  const existing = await prisma.child.findUnique({ where: { clerkId } });
  if (existing) {
    const updated = await prisma.child.update({
      where: { clerkId },
      data: {
        name: name ?? existing.name,
        email: email ?? existing.email,
        avatar: avatar ?? existing.avatar,
      },
      include: childInclude,
    });
    return NextResponse.json(updated);
  }

  const child = await prisma.child.create({
    data: {
      clerkId,
      name: name || 'Найз',
      email: email || null,
      avatar: avatar || '🦊',
      badges: { create: DEFAULT_BADGES },
    },
    include: childInclude,
  });
  return NextResponse.json(child);
});
