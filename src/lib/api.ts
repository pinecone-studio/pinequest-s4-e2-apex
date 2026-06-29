import Constants from 'expo-constants';

// Resolves the backend API base URL.
//
// Priority:
//  1. EXPO_PUBLIC_API_URL  — set this for staging/production.
//  2. In Expo dev, derive the dev machine's LAN IP from the packager host so a
//     physical device / emulator can reach the server (localhost would point at
//     the device itself).
//  3. Fallback to localhost (web / simulator).
const DEV_PORT = 4000;

function resolveBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  // e.g. "192.168.1.5:8081" — the Metro bundler host the app connected to.
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants as any).expoGoConfig?.debuggerHost ||
    (Constants as any).manifest?.debuggerHost;
  const host = hostUri?.split(':')[0];
  if (host) return `http://${host}:${DEV_PORT}`;

  return `http://localhost:${DEV_PORT}`;
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
  avatar?: string;
  level?: number;
  title?: string;
  stars?: number;
  streak?: number;
  coins?: number;
  exp?: number;
  dyslexiaTestDone?: boolean;
  dyslexiaScore?: number | null;
  dyslexiaRisk?: string | null;
  dyslexiaWeakSkills?: string[];
  badges?: Badge[];
  createdAt?: string;
};

export type DyslexiaRisk = 'low' | 'medium' | 'high';

// Туршлагын оноо (exp) → түвшин ба прогресс. Server-тэй ижил логик (100 exp = 1 түвшин).
export const EXP_PER_LEVEL = 100;
export function expProgress(exp: number) {
  const safe = Math.max(0, exp || 0);
  return {
    level: Math.floor(safe / EXP_PER_LEVEL) + 1,
    current: safe % EXP_PER_LEVEL, // одоогийн түвшин дэх exp
    needed: EXP_PER_LEVEL,
  };
}

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
  // Upsert + fetch the signed-in learner.
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

  // Тоглоом, өдрийн сорил зэрэгт coin/exp олгох.
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

  scanText: (imageBase64: string, mimeType = 'image/jpeg') =>
    request<{ original: string; simplified: string }>('/api/scan-text', {
      method: 'POST',
      body: JSON.stringify({ imageBase64, mimeType }),
    }),
};
