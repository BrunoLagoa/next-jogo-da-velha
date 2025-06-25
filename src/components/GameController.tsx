"use client";

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRoomController } from '@/hooks/useRoomController';
import { authService } from '@/services/authService';
import Lobby from '@/components/Lobby';
import GameRoom from '@/components/GameRoom';
import PageLayout from '@/components/PageLayout';
import GameTitle from '@/components/GameTitle';
import { GameControllerProps } from '@/types/gameControllerTypes';

// Componente para input do nome que só renderiza no cliente
const PlayerNameForm = dynamic(() => import('@/components/PlayerNameForm'), { 
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md">
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-20 h-10 bg-blue-500 rounded animate-pulse"></div>
      </div>
      <div className="text-xs text-gray-400 px-1 mt-1">Carregando...</div>
    </div>
  )
});

export default function GameController({ initialRoomId }: GameControllerProps) {
  const [playerName, setPlayerName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { rooms, createRoom, joinRoom, leaveRoom } = useRoomController();
  const maxLength = 20;

  // Garantir que o componente só renderize após a hidratação
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleCreateRoom = async (name: string) => {
    if (!playerName || !name.trim()) return;
    try {
      // Garantir que a sessão existe antes de criar a sala
      let session = await authService.getSession();
      if (!session) {
        session = await authService.createSession(playerName);
      }
      
      const newRoom = await createRoom(name, playerName);
      setSelectedRoomId(newRoom.id);
    } catch (error) {
      console.error('Erro ao criar sala:', error);
    }
  };

  const handleJoinRoom = useCallback(async (roomId: string) => {
    if (!playerName) return;
    
    try {
      // Garantir que a sessão existe antes de entrar na sala
      let session = await authService.getSession();
      if (!session) {
        session = await authService.createSession(playerName);
      }
      
      joinRoom(roomId, playerName);
      setSelectedRoomId(roomId);
    } catch (error) {
      console.error('Erro ao entrar na sala:', error);
    }
  }, [joinRoom, playerName]);

  const handleLeaveRoom = (roomId: string, playerName: string) => {
    leaveRoom(roomId, playerName);
    setSelectedRoomId(null);
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      // Criar sessão JWT quando o jogador confirma o nome
      await authService.createSession(playerName.trim());
      
      setIsNameSubmitted(true);
      
      if (initialRoomId) {
        const room = rooms.find(r => r.id === initialRoomId);
        if (room && (room.playerX === null || room.playerO === null)) {
          handleJoinRoom(initialRoomId);
        }
      }
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
      alert('Erro ao criar sessão. Tente novamente.');
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

  // Mostrar loading enquanto não hidratou
  if (!isHydrated) {
    return (
      <PageLayout>
        <GameTitle />
        <div className="text-lg text-gray-300 text-center">
          Carregando...
        </div>
      </PageLayout>
    );
  }

  if (!isNameSubmitted) {
    return (
      <PageLayout>
        <GameTitle />
        <p className="text-lg text-gray-300 text-center animate-pulse hover:animate-none transition-all duration-300 cursor-default">
          Prepare-se para a batalha mais divertida do universo! 🎮✨<br />
          Onde X e O dançam numa guerra pacífica pelo território!
        </p>
        <PlayerNameForm
          playerName={playerName}
          setPlayerName={setPlayerName}
          handleNameSubmit={handleNameSubmit}
          maxLength={maxLength}
        />
      </PageLayout>
    );
  }

  const selectedRoom = selectedRoomId ? rooms.find(room => room.id === selectedRoomId) : null;

  return (
    <PageLayout>
      <GameTitle />
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
    </PageLayout>
  );
}