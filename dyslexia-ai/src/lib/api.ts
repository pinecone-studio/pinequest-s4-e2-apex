// Backend now lives in this same Next.js app (src/app/api/*), so calls go to the
// same origin by default. NEXT_PUBLIC_API_URL can still point elsewhere if needed.
function resolveBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  return ''; // same-origin: fetch('/api/...')
}

export const API_BASE_URL = resolveBaseUrl();

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status} ${path}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// --- Types (mirror the Prisma models the app needs) ---
export type Badge = {
  id: string;
  key: string;
  label: string;
  emoji: string;
  unlocked: boolean;
};

export type Child = {
  id: string;
  clerkId: string | null;
  name: string;
  email: string | null;
  avatar: string;
  level: number;
  title: string;
  stars: number;
  streak: number;
  coins: number;
  exp: number;
  dyslexiaTestDone: boolean;
  dyslexiaScore: number | null;
  dyslexiaRisk: string | null;
  dyslexiaWeakSkills: string[];
  badges: Badge[];
};

export type DyslexiaRisk = 'low' | 'medium' | 'high';

// Туршлагын оноо (exp) → түвшин ба прогресс. Server-тэй ижил логик (50·N·(N-1)).
export const expToReach = (level: number) => 50 * level * (level - 1);
export function expProgress(exp: number) {
  const safe = Math.max(0, exp || 0);
  let level = 1;
  while (safe >= expToReach(level + 1)) level++;
  const base = expToReach(level);
  return {
    level,
    current: safe - base,
    needed: expToReach(level + 1) - base,
  };
}

// Түвшингээс шууд тооцох tier badge — DB-д хадгалах шаардлагагүй
const TIERS = [
  { min: 20, name: 'Алмаз', color: '#5AA9E6', glyph: '💎' },
  { min: 15, name: 'Алт', color: '#E6B84F', glyph: '🥇' },
  { min: 10, name: 'Мөнгө', color: '#9AA7B4', glyph: '🥈' },
  { min: 5, name: 'Хүрэл', color: '#C08457', glyph: '🥉' },
  { min: 1, name: 'Шинэхэн', color: '#8FB487', glyph: '🌱' },
];
export const levelBadge = (level: number) => TIERS.find((t) => level >= t.min) ?? TIERS[TIERS.length - 1];

// Тест дуусахад илгээх даалгавар бүрийн хариу.
export type DyslexiaAnswer = { type: string; correct: boolean };

export type Lesson = { id: string; order: number; letter: string; title: string; emoji: string };
export type Story = { id: string; title: string; emoji: string; level: string; category: string; minutes: number };
export type Game = { id: string; title: string; subtitle: string; emoji: string };
export type Stats = {
  sessions: number;
  avgAccuracy: number;
  totalMinutes: number;
  totalWords: number;
  recent: { id: string; accuracy: number; durationMin: number; wordsRead: number; createdAt: string }[];
};

// --- API methods ---
export const api = {
  // Upsert + fetch the signed-in learner
  me: (input: { clerkId: string; name?: string; email?: string; avatar?: string }) =>
    request<Child>('/api/me', { method: 'POST', body: JSON.stringify(input) }),

  getChild: (clerkId: string) => request<Child>(`/api/me/${clerkId}`),

  updateChild: (clerkId: string, data: Partial<Pick<Child, 'name' | 'avatar' | 'title' | 'level'>>) =>
    request<Child>(`/api/me/${clerkId}`, { method: 'PATCH', body: JSON.stringify(data) }),

  recordReadingSession: (
    clerkId: string,
    data: { accuracy: number; durationMin: number; wordsRead: number; lessonId?: string }
  ) =>
    request<{ session: unknown; child: Child; earnedStars: number; earnedCoins: number; earnedExp: number }>(
      `/api/me/${clerkId}/reading-session`,
      { method: 'POST', body: JSON.stringify(data) }
    ),

  reward: (clerkId: string, data: { coins?: number; exp?: number }) =>
    request<{ child: Child; earnedCoins: number; earnedExp: number }>(
      `/api/me/${clerkId}/reward`,
      { method: 'POST', body: JSON.stringify(data) }
    ),

  stats: (clerkId: string) => request<Stats>(`/api/me/${clerkId}/stats`),

  saveDyslexiaResult: (
    clerkId: string,
    data: { score: number; risk: DyslexiaRisk; answers?: DyslexiaAnswer[] }
  ) =>
    request<Child>(`/api/me/${clerkId}/dyslexia-result`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  unlockBadge: (clerkId: string, key: string) =>
    request<Badge>(`/api/me/${clerkId}/badge/${key}/unlock`, { method: 'POST' }),

  lessons: () => request<Lesson[]>('/api/lessons'),
  stories: () => request<Story[]>('/api/stories'),
  games: () => request<Game[]>('/api/games'),
};
