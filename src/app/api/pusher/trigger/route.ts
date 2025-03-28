import Pusher from 'pusher';
import { pusherConfig, GAME_CHANNEL } from '@/config/pusherConfig';
import { NextResponse } from 'next/server';

const pusher = new Pusher({
  appId: pusherConfig.appId,
  key: pusherConfig.key,
  secret: pusherConfig.secret,
  cluster: pusherConfig.cluster,
  useTLS: pusherConfig.useTLS
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, data } = body;

    await pusher.trigger(GAME_CHANNEL, event, data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar evento Pusher:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}