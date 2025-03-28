"use client";

import { useState, useEffect } from 'react';
import { useRoomController } from '@/hooks/useRoomController';
import Lobby from '@/components/Lobby';
import GameRoom from '@/components/GameRoom';

interface GameControllerProps {
  initialRoomId?: string;
}

export default function GameController({ initialRoomId }: GameControllerProps) {
  const [playerName, setPlayerName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { rooms, createRoom, joinRoom, leaveRoom } = useRoomController();
  const maxLength = 20;

  const handleCreateRoom = async (name: string) => {
    if (!playerName || !name.trim()) return;
    try {
      const newRoom = await createRoom(name, playerName);
      setSelectedRoomId(newRoom.id);
    } catch (error) {
      console.error('Erro ao criar sala:', error);
    }
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

  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName.trim());
      setIsNameSubmitted(true);
      if (initialRoomId) {
        const room = rooms.find(r => r.id === initialRoomId);
        if (room && (room.playerX === null || room.playerO === null)) {
          handleJoinRoom(initialRoomId);
        }
      }
    }
  };

  useEffect(() => {
    if (isNameSubmitted && initialRoomId) {
      const room = rooms.find(r => r.id === initialRoomId);
      if (room && (room.playerX === null || room.playerO === null)) {
        handleJoinRoom(initialRoomId);
      }
    }
  }, [isNameSubmitted, initialRoomId, rooms, handleJoinRoom]);

  if (!isNameSubmitted) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-4 pb-16 gap-8 sm:p-20 sm:gap-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Jogo da Velha</h1>
          <p className="text-lg text-gray-300 text-center animate-pulse hover:animate-none transition-all duration-300 cursor-default">
            Prepare-se para a batalha mais divertida do universo! 🎮✨<br />
            Onde X e O dançam numa guerra pacífica pelo território!
          </p>
          <form onSubmit={handleNameSubmit} className="w-full max-w-md">
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={maxLength}
                placeholder="Digite seu nome"
                className="flex-1 px-4 py-2 rounded bg-gray-700 text-white"
              />
              <button
                type="submit"
                disabled={!playerName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar
              </button>
            </div>
            <p className="text-xs text-gray-400 px-1 mt-1">{playerName.length}/{maxLength} caracteres</p>
          </form>
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