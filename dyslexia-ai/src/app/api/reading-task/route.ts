import { NextResponse } from 'next/server';
import { handle } from '../../../lib/server';
import { normalizeWeakAreas } from '../../../lib/dyslexia';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Дислекси тестийн дүнд тулгуурлан богино унших даалгавар (өгүүлбэр) үүсгэнэ.
export const POST = handle(async (req: Request) => {
  const { weakSkills, risk } = (await req.json().catch(() => ({}))) as {
    weakSkills?: string[];
    risk?: string;
  };

  const areas = normalizeWeakAreas(weakSkills);

  // Эрсдэл өндөр байх тусам богино, энгийн үгтэй өгүүлбэр.
  const length =
    risk === 'high' ? '4-6 үг' : risk === 'medium' ? '6-8 үг' : '7-9 үг';

  // Бодит, ойлгомжтой сэдэв өгснөөр өгүүлбэр утга учиртай гарна.
  const THEMES = [
    'муур', 'нохой', 'туулай', 'шувуу', 'загас', 'морь', 'хонь', 'баавгай',
    'нар', 'сар', 'од', 'үүл', 'бороо', 'цас', 'салхи',
    'мод', 'цэцэг', 'навч', 'ой', 'уул', 'гол',
    'ээж', 'аав', 'эгч', 'дүү', 'найз', 'хүүхэд',
    'бөмбөг', 'ном', 'тоглоом', 'алим', 'талх', 'сүү',
  ];
  const theme = THEMES[Math.floor(Math.random() * THEMES.length)];

  const apiKey = process.env.OPENAI_API_KEY;
  const fallback = 'Бяцхан муур наранд тоглож байна.';

  if (!apiKey) {
    return NextResponse.json({ text: fallback, focus: areas, generated: false });
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: [
            'Чи бол 4-7 насны, дөнгөж унш сурч буй хүүхдэд зориулж өгүүлбэр зохиодог монгол хэлний багш.',
            'Зорилго: хүүхэд амархан ойлгох, амьдралд ойр НЭГ маш энгийн өгүүлбэр зохио.',
            '',
            'Заавал баримтлах дүрэм:',
            '1. Маш энгийн, өдөр тутмын үг (амьтан, гэр бүл, байгаль, хоол, тоглоом) ашигла.',
            '2. Бүтэц энгийн: эзэн + (юу) + үйл. Нэг л тодорхой үйлдэл буюу дүр зураг.',
            '3. Одоо/энгийн цагт, бодит, логиктой. Зүйрлэл, хийсвэр санаа, ховор/хэцүү үг ХОРИОТОЙ.',
            '4. Дүрмийн ба үг сонголтын алдаагүй, жинхэнэ монгол өгүүлбэр байх.',
            '5. Том үсгээр эхэлж, цэгээр төгс.',
            '6. ЗӨВХӨН өгүүлбэрийг буцаа. Тайлбар, хашилт, дугаар, emoji бүү нэм.',
            '',
            'Сайн жишээнүүд:',
            '«Муур дулаахан наранд хэвтэж байна.»',
            '«Ээж надад улаан алим өглөө.»',
            '«Бяцхан туулай ногоон зүлгэн дээр гүйнэ.»',
            '«Шувуу модны мөчир дээр суув.»',
            '«Аав бид хоёр цэцэг услав.»',
          ].join('\n'),
        },
        {
          role: 'user',
          content:
            `«${theme}» гэдэг үгийг гол болгон, 4-7 настай хүүхдэд маш ойлгомжтой, ` +
            `утга учиртай нэг өгүүлбэр зохио. Урт нь ойролцоогоор ${length}.`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('OpenAI error', res.status, detail);
    return NextResponse.json({ text: fallback, focus: areas, generated: false });
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const raw = data.choices?.[0]?.message?.content?.trim() || fallback;
  // Эхэн/төгсгөлийн хашилт, дугаарлалтыг цэвэрлэх.
  const text = raw.replace(/^["'“”\d.\-)\s]+/, '').replace(/["'“”\s]+$/, '').trim() || fallback;

  return NextResponse.json({ text, focus: areas, generated: true });
});
