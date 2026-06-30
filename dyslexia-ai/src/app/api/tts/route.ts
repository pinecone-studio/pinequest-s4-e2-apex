import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { text } = (await req.json().catch(() => ({}))) as { text?: string };
  if (!text) return NextResponse.json({ error: 'text required' }, { status: 400 });

  const token = process.env.CHIMEGE_API_TTs;
  if (!token) return NextResponse.json({ error: 'CHIMEGE_API_TTs not set' }, { status: 500 });

  const res = await fetch('https://api.chimege.com/v1.2/synthesize', {
    method: 'POST',
    headers: {
      'Content-Type': 'plain/text',
      token,
      'voice-id': '1',
    },
    body: text,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('Chimege TTS error', res.status, detail);
    return NextResponse.json({ error: `TTS ${res.status}` }, { status: 502 });
  }

  const audio = await res.arrayBuffer();
  return new NextResponse(audio, {
    status: 200,
    headers: { 'Content-Type': 'audio/wav', 'Cache-Control': 'no-store' },
  });
}
