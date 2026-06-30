import { NextResponse } from 'next/server';
import { handle } from '../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const FALLBACK = [
  { proverb: 'Эрдэм номын далай гүн.', explanation: 'Сурах зүйл хязгааргүй их, тиймээс байнга суралцах хэрэгтэй.' },
  { proverb: 'Бага сурсан бат.', explanation: 'Багадаа сурсан зүйл насан туршид сайн тогтдог.' },
  { proverb: 'Ажил хийж эрдэм нэм.', explanation: 'Ажил хийх тусам шинэ зүйл сурч, чадвар нэмэгддэг.' },
  { proverb: 'Алдаагаа мэдвэл эрдэм.', explanation: 'Алдаагаа ойлгож засах нь өөрөө сурах нэг арга юм.' },
];

const pick = () => FALLBACK[Math.floor(Math.random() * FALLBACK.length)];

export const POST = handle(async () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ ...pick(), generated: false });

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 1,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Чи бол монгол хэлний зүйр цэцэн үг тайлбарладаг туслах. ' +
            '4-7 насны хүүхдэд ойлгомжтой, сурах урам зориг өгөх БОГИНО (10 үгнээс бага) ' +
            'жинхэнэ монгол зүйр цэцэн үг нэгийг сонгож, утгыг нь хүүхдэд ойлгомжтой ' +
            '1-2 өгүүлбэрээр тайлбарла. Зөвхөн JSON буцаа.',
        },
        {
          role: 'user',
          content:
            'Нэг зүйр цэцэн үг ба тайлбарыг гарга. ' +
            'Жишээ: {"proverb":"Эрдэм номын далай гүн.","explanation":"Сурах зүйл хязгааргүй их."}',
        },
      ],
    }),
  });

  if (!res.ok) {
    console.error('proverb OpenAI error', res.status, await res.text().catch(() => ''));
    return NextResponse.json({ ...pick(), generated: false });
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let proverb = '';
  let explanation = '';
  try {
    const j = JSON.parse(data.choices?.[0]?.message?.content ?? '{}');
    proverb = String(j.proverb ?? '').trim();
    explanation = String(j.explanation ?? '').trim();
  } catch {
    proverb = '';
  }

  if (!proverb) return NextResponse.json({ ...pick(), generated: false });
  return NextResponse.json({ proverb, explanation, generated: true });
});
