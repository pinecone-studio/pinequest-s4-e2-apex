import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const token = process.env.CHIMEGE_API_STT;
  if (!token) return NextResponse.json({ error: 'CHIMEGE_API_STT not set' }, { status: 500 });

  const audio = await req.arrayBuffer();
  if (!audio.byteLength) return NextResponse.json({ error: 'empty audio' }, { status: 400 });

  const res = await fetch('https://api.chimege.com/v1.2/transcribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      token,
    },
    body: audio,
  });

  const body = await res.text().catch(() => '');
  if (!res.ok) {
    console.error('Chimege STT error', res.status, body);
    return NextResponse.json({ error: `STT ${res.status}` }, { status: 502 });
  }

  let transcript = body.trim();
  try {
    const json = JSON.parse(body);
    transcript = (json.result ?? json.transcript ?? json.text ?? transcript).toString().trim();
  } catch {
  }

  return NextResponse.json({ transcript });
}
