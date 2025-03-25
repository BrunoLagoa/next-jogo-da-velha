"use client";

import { useState } from 'react';
import { useRoomController } from '@/hooks/useRoomController';
import Lobby from '@/components/Lobby';
import GameRoom from '@/components/GameRoom';

export default function GameController() {
  const [playerName, setPlayerName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { rooms, createRoom, joinRoom, leaveRoom } = useRoomController();

  const handleCreateRoom = (name: string) => {
    if (!playerName) return;
    const room = createRoom(name);
    joinRoom(room.id, playerName);
    setSelectedRoomId(room.id);
  };

  const handleJoinRoom = (roomId: string) => {
    if (!playerName) return;
    joinRoom(roomId, playerName);
    setSelectedRoomId(roomId);
  };

  const handleLeaveRoom = (roomId: string, playerName: string) => {
    leaveRoom(roomId, playerName);
    setSelectedRoomId(null);
  };

  if (!playerName) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-4 pb-16 gap-8 sm:p-20 sm:gap-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Jogo da Velha</h1>
          <div className="w-full max-w-md">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            />
          </div>
        </main>
      </div>
    );
  }

  const selectedRoom = selectedRoomId ? rooms.find(room => room.id === selectedRoomId) : null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-4 pb-16 gap-8 sm:p-20 sm:gap-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Jogo da Velha</h1>
        {selectedRoom ? (
          <GameRoom
            room={selectedRoom}
            playerName={playerName}
            onLeaveRoom={handleLeaveRoom}
          />
        ) : (
          <Lobby
            rooms={rooms}
            playerName={playerName}
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
          />
        )}
      </main>
    </div>
  );
}