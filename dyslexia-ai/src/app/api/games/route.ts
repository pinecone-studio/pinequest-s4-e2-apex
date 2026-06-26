import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { handle } from '../../../lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = handle(async () => NextResponse.json(await prisma.game.findMany()));
