import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { childInclude, handle, requireSelf } from '../../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string }> };

export const GET = handle(async (_req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  await requireSelf(clerkId);
  const child = await prisma.child.findUnique({ where: { clerkId }, include: childInclude });
  if (!child) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(child);
});

export const PATCH = handle(async (req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  await requireSelf(clerkId);
  const { name, avatar, title } = (await req.json().catch(() => ({}))) as {
    name?: string;
    avatar?: string;
    title?: string;
  };
  const child = await prisma.child.update({
    where: { clerkId },
    data: {
      ...(name !== undefined && { name: String(name).slice(0, 60) }),
      ...(avatar !== undefined && { avatar: String(avatar).slice(0, 16) }),
      ...(title !== undefined && { title: String(title).slice(0, 60) }),
    },
    include: childInclude,
  });
  return NextResponse.json(child);
});
