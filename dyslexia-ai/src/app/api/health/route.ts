import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Public health check — баталгаажуулна: API ажиллаж, DB-д холбогдож байгаа эсэх.
export async function GET() {
  try {
    const [children, lessons, stories, games] = await Promise.all([
      prisma.child.count(),
      prisma.lesson.count(),
      prisma.story.count(),
      prisma.game.count(),
    ]);
    return NextResponse.json({ ok: true, db: true, counts: { children, lessons, stories, games } });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'db error';
    return NextResponse.json({ ok: false, db: false, error: message }, { status: 500 });
  }
}
