import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

const hasKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Нээлттэй: нэвтрэх хуудсууд + өгөгдлийн API (утасны апп болон web хоёулаа дууддаг).
// AI/TTS endpoint-ууд (reading-task, tts, stt, word-list) ХАМГААЛАЛТТАЙ үлдэнэ —
// OpenAI/Chimege quota-г хамгаална (зөвхөн нэвтэрсэн web хэрэглэгч ашиглана).
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/health',
  '/api/me(.*)',
  '/api/lessons',
  '/api/stories',
  '/api/games',
  '/api/tts', // утасны «Авианы мөрдөгч» тоглоом Chimege дуу дуудна
  '/api/scan-text',
]);

// Without a Clerk key we can't run clerkMiddleware, so fall back to a no-op so
// the app still renders the SetupNotice instead of 500-ing on every request.
const handler = hasKey
  ? clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) await auth.protect();
    })
  : (_req: NextRequest) => undefined;

export default handler;

export const config = {
  matcher: [
    // Skip Next internals and static files, run on everything else.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
