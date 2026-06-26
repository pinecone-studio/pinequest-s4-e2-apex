import { NextResponse } from 'next/server';
import { handle } from '../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type WordItem = { word: string; emoji: string };

const FALLBACK: WordItem[] = [
  { word: 'МУУР', emoji: '🐱' },
  { word: 'НОХОЙ', emoji: '🐶' },
  { word: 'НАР', emoji: '☀️' },
  { word: 'МОД', emoji: '🌳' },
  { word: 'АЛИМ', emoji: '🍎' },
  { word: 'ЗАГАС', emoji: '🐟' },
  { word: 'ШУВУУ', emoji: '🐦' },
  { word: 'НОМ', emoji: '📖' },
];

// Зурагт буулгахад хялбар, цэвэр кирилл үг сонгоно (3-7 үсэг).
function clean(items: unknown): WordItem[] {
  if (!Array.isArray(items)) return [];
  const seen = new Set<string>();
  const out: WordItem[] = [];
  for (const it of items) {
    const word = String((it as WordItem)?.word ?? '').trim().toUpperCase();
    const emoji = String((it as WordItem)?.emoji ?? '').trim();
    if (!/^[А-ЯӨҮЁ]{3,7}$/.test(word)) continue; // зөвхөн кирилл, 3-7 үсэг
    if (!emoji || seen.has(word)) continue;
    seen.add(word);
    out.push({ word, emoji });
  }
  return out;
}

// Дислекси тестийн дүнд тулгуурлан тоглоомын үгсийг AI-аар үүсгэнэ.
export const POST = handle(async (req: Request) => {
  const { risk } = (await req.json().catch(() => ({}))) as { weakSkills?: string[]; risk?: string };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ words: FALLBACK, generated: false });

  const len = risk === 'high' ? '3-4 үсэг' : risk === 'medium' ? '3-5 үсэг' : '3-6 үсэг';

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 0.8,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Чи бол хүүхдийн унших тоглоомд зориулж энгийн монгол үг гаргадаг туслах. ' +
            'Зөвхөн зурагт тод буулгаж болох БОДИТ ЮМС, АМЬТАН, ХООЛ, БАЙГАЛИЙН нэр үг сонго. ' +
            'Өнгө, тэмдэг нэр, үйл үг, хийсвэр үг бүү оруул (жишээ нь «бор», «шар» болохгүй). ' +
            'Зөвхөн JSON буцаа.',
        },
        {
          role: 'user',
          content:
            `4-7 насны хүүхэд мэддэг ${len}-тэй 8 энгийн монгол НЭР ҮГ гарга. ` +
            'Үг бүр өөрийн зурагтайгаа таарсан НЭГ emoji-тэй байх. Үгсийг ТОМ үсгээр бич. ' +
            'Жишээ: {"words":[{"word":"МУУР","emoji":"🐱"},{"word":"НОМ","emoji":"📖"},{"word":"АЛИМ","emoji":"🍎"}]}',
        },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('word-list OpenAI error', res.status, detail);
    return NextResponse.json({ words: FALLBACK, generated: false });
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: { words?: unknown } = {};
  try {
    parsed = JSON.parse(data.choices?.[0]?.message?.content ?? '{}');
  } catch {
    parsed = {};
  }

  const words = clean(parsed.words);
  if (words.length < 4) return NextResponse.json({ words: FALLBACK, generated: false });

  return NextResponse.json({ words, generated: true });
});
