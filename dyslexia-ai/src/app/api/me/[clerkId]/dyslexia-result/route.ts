import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { childInclude, handle, requireSelf } from '../../../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string }> };
type Answer = { type?: string; correct?: boolean };

export const POST = handle(async (req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  await requireSelf(clerkId);
  const { score, risk, answers } = (await req.json().catch(() => ({}))) as {
    score?: number;
    risk?: string;
    answers?: Answer[];
  };

  const answerList = Array.isArray(answers) ? answers : [];
  const weakSkills = [
    ...new Set(
      answerList
        .filter((a) => a && a.correct === false && typeof a.type === 'string')
        .map((a) => a.type as string)
    ),
  ];

  const existing = await prisma.child.findUnique({ where: { clerkId } });
  if (!existing) return NextResponse.json({ error: 'not found' }, { status: 404 });

  if (answerList.length) {
    await prisma.dyslexiaTest.create({
      data: {
        childId: existing.id,
        score: typeof score === 'number' ? score : 0,
        risk: risk || 'low',
        answers: answerList,
        weakSkills,
      },
    });
  }

  const child = await prisma.child.update({
    where: { clerkId },
    data: {
      dyslexiaTestDone: true,
      dyslexiaScore: typeof score === 'number' ? score : null,
      dyslexiaRisk: risk || null,
      dyslexiaTestedAt: new Date(),
      dyslexiaWeakSkills: weakSkills,
    },
    include: childInclude,
  });
  return NextResponse.json(child);
});
