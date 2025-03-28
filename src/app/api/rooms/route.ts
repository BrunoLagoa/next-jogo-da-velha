import { NextResponse } from 'next/server';

interface Room {
  id: string;
  name: string;
  playerX: string | null;
  playerO: string | null;
  status: 'waiting' | 'playing' | 'finished';
}

const rooms: Room[] = [];

export async function GET() {
  try {
    return NextResponse.json(rooms, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const room = await request.json();
    rooms.push(room);
    return NextResponse.json(room, {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}