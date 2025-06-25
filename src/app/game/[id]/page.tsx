"use client";

import { useParams } from 'next/navigation';
import GameController from '@/components/GameController';

export default function GamePage() {
  const params = useParams();
  const roomId = params?.id as string;

  return (
    <div className="min-h-screen">
      <GameController initialRoomId={roomId} />
    </div>
  );
}