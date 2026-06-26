import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { childInclude, handle } from '../../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string }> };

// Read a learner (and badges) by Clerk id.
export const GET = handle(async (_req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  const child = await prisma.child.findUnique({ where: { clerkId }, include: childInclude });
  if (!child) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(child);
});

// Update profile fields (avatar, name, title, level…).
export const PATCH = handle(async (req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  const { name, avatar, title, level } = (await req.json().catch(() => ({}))) as {
    name?: string;
    avatar?: string;
    title?: string;
    level?: number;
  };
  const child = await prisma.child.update({
    where: { clerkId },
    data: {
      ...(name !== undefined && { name }),
      ...(avatar !== undefined && { avatar }),
      ...(title !== undefined && { title }),
      ...(level !== undefined && { level }),
    },
    include: childInclude,
  });
  return NextResponse.json(child);
});
