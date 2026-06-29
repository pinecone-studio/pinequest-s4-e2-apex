import { NextRequest, NextResponse } from 'next/server';
import { handle } from '../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = handle(async (req: NextRequest) => {
  const { imageBase64, mimeType = 'image/jpeg' } = (await req.json()) as {
    imageBase64: string;
    mimeType?: string;
  };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI key missing' }, { status: 500 });
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${imageBase64}` },
            },
            {
              type: 'text',
              text: `Энэ зурган дээрх текстийг уншаад хариулт өг.

ОРИГИНАЛ: гэж бичээд зурагнаас оролцоосон бүх текстийг бич.
ХЯЛБАРЧИЛСАН: гэж бичээд дислекси хүүхдэд ойлгомжтой, богино өгүүлбэртэй, энгийн үгтэй хувилбарыг монгол хэлээр бич.

Хэрэв зурганд текст байхгүй бол "Текст олдсонгүй" гэж хариулна уу.`,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('OpenAI vision error', res.status, detail);
    return NextResponse.json({ error: 'AI алдаа гарлаа' }, { status: 502 });
  }

  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  const content = data.choices[0]?.message?.content ?? '';

  const originalMatch = content.match(/ОРИГИНАЛ:\s*([\s\S]*?)(?=\nХЯЛБАРЧИЛСАН:|$)/);
  const simplifiedMatch = content.match(/ХЯЛБАРЧИЛСАН:\s*([\s\S]*?)$/);

  return NextResponse.json({
    original: originalMatch?.[1]?.trim() ?? content,
    simplified: simplifiedMatch?.[1]?.trim() ?? content,
  });
});
