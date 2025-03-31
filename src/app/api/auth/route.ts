import { NextRequest, NextResponse } from 'next/server';
import { sign, verify, Secret } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { authConfig } from '@/config/authConfig';

async function getCookieStore() {
  return await cookies();
}

async function setSessionCookie(session: PlayerSession) {
  const token = sign(session, authConfig.jwtSecret as Secret, { expiresIn: `${authConfig.cookieOptions.maxAge}s` });
  const cookieStore = await getCookieStore();
  cookieStore.set(authConfig.cookieName, token, {
    ...authConfig.cookieOptions,
    sameSite: authConfig.cookieOptions.sameSite as 'strict' | 'lax' | 'none'
  });
}

export interface PlayerSession {
  id: string;
  name: string;
  role?: 'X' | 'O';
}

export async function POST(request: NextRequest) {
  try {
    const { playerName } = await request.json();
    if (!playerName || typeof playerName !== 'string' || playerName.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid player name' }, { status: 400 });
    }

    const playerId = crypto.randomUUID();
    const session: PlayerSession = {
      id: playerId,
      name: playerName.trim()
    };

    await setSessionCookie(session);

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await getCookieStore();
    const token = cookieStore.get(authConfig.cookieName)?.value;
    if (!token) {
      return NextResponse.json(null);
    }

    const session = verify(token, authConfig.jwtSecret as Secret) as PlayerSession;
    if (!session || !session.id || !session.name) {
      cookieStore.delete(authConfig.cookieName);
      return NextResponse.json(null);
    }

    return NextResponse.json(session);
  } catch (error) {
    const cookieStore = await getCookieStore();
    console.error('Error getting session:', error);
    cookieStore.delete(authConfig.cookieName);
    return NextResponse.json(null);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await request.json() as PlayerSession;
    if (!session || !session.id || !session.name) {
      return NextResponse.json({ error: 'Invalid session data' }, { status: 400 });
    }

    if (session.role && !['X', 'O'].includes(session.role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    await setSessionCookie(session);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await getCookieStore();
    cookieStore.delete(authConfig.cookieName);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
}