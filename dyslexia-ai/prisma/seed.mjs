// Seeds the shared content catalogs (lessons, stories, games).
// Run with:  npm run db:seed   (i.e. `prisma db seed`)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const LESSONS = [
  { order: 1, letter: 'А', title: 'А үсэг', emoji: '🍎' },
  { order: 2, letter: 'Б', title: 'Б үсэг', emoji: '🐻' },
  { order: 3, letter: 'В', title: 'В үсэг', emoji: '🚐' },
  { order: 4, letter: 'Г', title: 'Г үсэг', emoji: '🐗' },
  { order: 5, letter: 'Д', title: 'Д үсэг', emoji: '🌊' },
  { order: 6, letter: 'Е', title: 'Е үсэг', emoji: '🌲' },
];

const STORIES = [
  { title: 'Сар луу нисье', emoji: '🚀', level: '⭐⭐ Хялбар', category: 'Сансар', minutes: 6 },
  { title: 'Ойн үнэг', emoji: '🦊', level: '⭐ Анхан шат', category: 'Амьтад', minutes: 4 },
];

const GAMES = [
  { title: 'Үсэг тааруулах', subtitle: 'Үсгийг авиатай тааруул', emoji: '🔤' },
  { title: 'Үг угсрах', subtitle: 'Энгийн үг угсар', emoji: '🧱' },
  { title: 'Авианы мөрдөгч', subtitle: 'Сонсоод үсгийг сонго', emoji: '🕵️' },
  { title: 'Зураг тааруулах', subtitle: 'Зургийг үгтэй тааруул', emoji: '🖼️' },
];

async function main() {
  for (const l of LESSONS) {
    await prisma.lesson.upsert({ where: { order: l.order }, update: l, create: l });
  }
  await prisma.story.deleteMany();
  await prisma.story.createMany({ data: STORIES });
  await prisma.game.deleteMany();
  await prisma.game.createMany({ data: GAMES });

  console.log(`✅ Seeded ${LESSONS.length} lessons, ${STORIES.length} stories, ${GAMES.length} games`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
