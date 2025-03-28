"use client";

import { useState } from 'react';
import { Room } from '@/hooks/useRoomController';

interface LobbyProps {
  rooms: Room[];
  playerName: string;
  onCreateRoom: (name: string) => void;
  onJoinRoom: (roomId: string) => void;
}

export default function Lobby({ rooms, playerName, onCreateRoom, onJoinRoom }: LobbyProps) {
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) return;
    onCreateRoom(newRoomName);
    setNewRoomName('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Criar Nova Sala</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Nome da sala"
            className="flex-1 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <button
            disabled={!newRoomName.trim()}
            onClick={handleCreateRoom}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar Sala
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Salas Disponíveis</h2>
        <div className="grid gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <p className="text-gray-400">
                  Status: {room.status === 'waiting' ? 'Aguardando jogadores' : room.status === 'playing' ? 'Em andamento' : 'Finalizado'}
                </p>
                <p className="text-sm text-gray-400">
                  {room.playerX ? `Jogador X: ${room.playerX}` : ''}
                  {room.playerX && room.playerO ? ' | ' : ''}
                  {room.playerO ? `Jogador O: ${room.playerO}` : ''}
                </p>
              </div>
              <button
                onClick={() => onJoinRoom(room.id)}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={room.status !== 'waiting' || room.playerX === playerName || room.playerO === playerName}
              >
                Entrar
              </button>
            </div>
          ))}
          {rooms.length === 0 && (
            <p className="text-gray-400 text-center py-8">Nenhuma sala disponível. Crie uma nova sala para começar!</p>
          )}
        </div>
      </div>
    </div>
  );
}