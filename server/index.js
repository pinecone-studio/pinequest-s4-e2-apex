// PineQuest / Lexi AI — backend API server.
// Wraps Prisma (server-side only) behind a small REST API the Expo app calls.
//
//   npm run server     # starts on PORT (default 4000), listening on 0.0.0.0
//
// Notes:
// - Children are keyed by their Clerk user id (clerkId).
// - Listening on 0.0.0.0 so a physical device / emulator on the same LAN can
//   reach it via the dev machine's IP.
const express = require('express');
const cors = require('cors');
const { prisma } = require('./prisma');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// The badge set every new learner starts with (locked until earned).
const DEFAULT_BADGES = [
  { key: 'first_word', label: 'Анхны үг', emoji: '🌟' },
  { key: 'streak_5', label: '5 өдрийн дараалал', emoji: '🔥' },
  { key: 'bookworm', label: 'Номын хорхой', emoji: '📚' },
  { key: 'star_collector', label: 'Од цуглуулагч', emoji: '🏅' },
];

const childInclude = { badges: { orderBy: { id: 'asc' } } };

// Small async wrapper so route handlers can throw and we still return JSON 500s.
const wrap = (fn) => (req, res) =>
  Promise.resolve(fn(req, res)).catch((err) => {
    console.error(err);
    res.status(500).json({ error: err.message });
  });

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Upsert the current learner from the signed-in Clerk user. Creates the default
// badge set the first time we see this user.
app.post(
  '/api/me',
  wrap(async (req, res) => {
    const { clerkId, name, email, avatar } = req.body || {};
    if (!clerkId) return res.status(400).json({ error: 'clerkId required' });

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
      return res.json(updated);
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
    res.json(child);
  })
);

// Read a learner (and badges) by Clerk id.
app.get(
  '/api/me/:clerkId',
  wrap(async (req, res) => {
    const child = await prisma.child.findUnique({
      where: { clerkId: req.params.clerkId },
      include: childInclude,
    });
    if (!child) return res.status(404).json({ error: 'not found' });
    res.json(child);
  })
);

// Update profile fields (avatar, name, title, level…).
app.patch(
  '/api/me/:clerkId',
  wrap(async (req, res) => {
    const { name, avatar, title, level } = req.body || {};
    const child = await prisma.child.update({
      where: { clerkId: req.params.clerkId },
      data: {
        ...(name !== undefined && { name }),
        ...(avatar !== undefined && { avatar }),
        ...(title !== undefined && { title }),
        ...(level !== undefined && { level }),
      },
      include: childInclude,
    });
    res.json(child);
  })
);

// Record a reading practice session and award stars (accuracy → stars).
app.post(
  '/api/me/:clerkId/reading-session',
  wrap(async (req, res) => {
    const child = await prisma.child.findUnique({ where: { clerkId: req.params.clerkId } });
    if (!child) return res.status(404).json({ error: 'not found' });

    const { accuracy = 0, durationMin = 0, wordsRead = 0, lessonId } = req.body || {};
    const session = await prisma.readingSession.create({
      data: { childId: child.id, accuracy, durationMin, wordsRead, lessonId: lessonId || null },
    });

    const earnedStars = Math.max(1, Math.round(accuracy / 20)); // 0..100 → ~1..5
    const updated = await prisma.child.update({
      where: { id: child.id },
      data: { stars: { increment: earnedStars }, coins: { increment: earnedStars } },
      include: childInclude,
    });

    res.json({ session, child: updated, earnedStars });
  })
);

// Aggregate stats for the Parent dashboard.
app.get(
  '/api/me/:clerkId/stats',
  wrap(async (req, res) => {
    const child = await prisma.child.findUnique({ where: { clerkId: req.params.clerkId } });
    if (!child) return res.status(404).json({ error: 'not found' });

    const sessions = await prisma.readingSession.findMany({
      where: { childId: child.id },
      orderBy: { createdAt: 'desc' },
    });
    const count = sessions.length;
    const avgAccuracy = count ? sessions.reduce((s, x) => s + x.accuracy, 0) / count : 0;
    const totalMinutes = sessions.reduce((s, x) => s + x.durationMin, 0);
    const totalWords = sessions.reduce((s, x) => s + x.wordsRead, 0);

    res.json({
      sessions: count,
      avgAccuracy: Math.round(avgAccuracy),
      totalMinutes,
      totalWords,
      recent: sessions.slice(0, 10),
    });
  })
);

// Save the Lexi-AI dyslexia screening result and mark onboarding test as done.
app.post(
  '/api/me/:clerkId/dyslexia-result',
  wrap(async (req, res) => {
    const { score, risk, answers } = req.body || {};

    // answers: [{ type, correct }] — буруу хариулсан даалгаврын төрлүүдээс
    // сул ур чадварын жагсаалт гаргана (давхардлыг хасч). Хичээлийг хүүхэд бүрд
    // тааруулахад үүнийг ашиглана.
    const answerList = Array.isArray(answers) ? answers : [];
    const weakSkills = [
      ...new Set(
        answerList
          .filter((a) => a && a.correct === false && typeof a.type === 'string')
          .map((a) => a.type)
      ),
    ];

    const existing = await prisma.child.findUnique({ where: { clerkId: req.params.clerkId } });
    if (!existing) return res.status(404).json({ error: 'not found' });

    // Оролдлого бүрийг түүхэнд хадгална (дэлгэрэнгүй хариунуудтай),
    // мөн хамгийн сүүлийн сул ур чадварыг Child дээр шуурхай ашиглахаар хадгална.
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
      where: { clerkId: req.params.clerkId },
      data: {
        dyslexiaTestDone: true,
        dyslexiaScore: typeof score === 'number' ? score : null,
        dyslexiaRisk: risk || null,
        dyslexiaTestedAt: new Date(),
        dyslexiaWeakSkills: weakSkills,
      },
      include: childInclude,
    });
    res.json(child);
  })
);

// Unlock a badge for the learner.
app.post(
  '/api/me/:clerkId/badge/:key/unlock',
  wrap(async (req, res) => {
    const child = await prisma.child.findUnique({ where: { clerkId: req.params.clerkId } });
    if (!child) return res.status(404).json({ error: 'not found' });
    const badge = await prisma.badge.update({
      where: { childId_key: { childId: child.id, key: req.params.key } },
      data: { unlocked: true },
    });
    res.json(badge);
  })
);

// --- Content catalogs (shared, not per-child) ---
app.get('/api/lessons', wrap(async (_req, res) => res.json(await prisma.lesson.findMany({ orderBy: { order: 'asc' } }))));
app.get('/api/stories', wrap(async (_req, res) => res.json(await prisma.story.findMany())));
app.get('/api/games', wrap(async (_req, res) => res.json(await prisma.game.findMany())));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ PineQuest API listening on http://0.0.0.0:${PORT}`);
});
