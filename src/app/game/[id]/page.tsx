"use client";

import { useParams } from 'next/navigation';
import GameController from '@/components/GameController';

export default function GamePage() {
  const params = useParams();
  const roomId = params?.id as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <GameController initialRoomId={roomId} />
    </div>
  );
}