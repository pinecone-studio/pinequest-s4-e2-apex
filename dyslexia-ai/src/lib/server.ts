import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function requireSelf(clerkId: string): Promise<void> {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return;
  const { userId } = await auth();
  if (!userId || userId !== clerkId) throw new HttpError(403, 'forbidden');
}

export const DEFAULT_BADGES = [
  { key: 'first_word', label: 'Анхны үг', emoji: '🌟' },
  { key: 'streak_5', label: '5 өдрийн дараалал', emoji: '🔥' },
  { key: 'bookworm', label: 'Номын хорхой', emoji: '📚' },
  { key: 'star_collector', label: 'Од цуглуулагч', emoji: '🏅' },
];

export const childInclude = { badges: { orderBy: { id: 'asc' as const } } };

export { expToReach, levelForExp } from './level';

export function handle<T extends unknown[]>(
  fn: (...args: T) => Promise<Response>
): (...args: T) => Promise<Response> {
  return async (...args: T) => {
    try {
      return await fn(...args);
    } catch (err) {
      if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
      console.error(err);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
  };
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
