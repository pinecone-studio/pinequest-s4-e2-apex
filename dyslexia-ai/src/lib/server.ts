import { NextResponse } from 'next/server';

// The badge set every new learner starts with (locked until earned).
export const DEFAULT_BADGES = [
  { key: 'first_word', label: 'Анхны үг', emoji: '🌟' },
  { key: 'streak_5', label: '5 өдрийн дараалал', emoji: '🔥' },
  { key: 'bookworm', label: 'Номын хорхой', emoji: '📚' },
  { key: 'star_collector', label: 'Од цуглуулагч', emoji: '🏅' },
];

export const childInclude = { badges: { orderBy: { id: 'asc' as const } } };

// Туршлагын оноо (exp) → түвшин. Түвшин бүрд 100 exp хэрэгтэй.
export const EXP_PER_LEVEL = 100;
export const levelForExp = (exp: number) => Math.floor((exp || 0) / EXP_PER_LEVEL) + 1;

// Wrap a route handler so thrown errors become JSON 500s (like the Express `wrap`).
export function handle<T extends unknown[]>(
  fn: (...args: T) => Promise<Response>
): (...args: T) => Promise<Response> {
  return async (...args: T) => {
    try {
      return await fn(...args);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Internal error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
}

// Prisma needs the Node.js runtime; force-dynamic avoids any response caching.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
