"use client";

import { useEffect } from 'react';
import { useGameController } from '@/hooks/useGameController';
import Board from '@/components/Board';
import GameStatus from '@/components/GameStatus';
import GameHistory from '@/components/GameHistory';
import Scoreboard from '@/components/Scoreboard';
import { GameRoomProps } from '@/types/gameRoomTypes';

export default function GameRoom({ room, playerName, onLeaveRoom }: GameRoomProps) {
  const { gameState, handleStart, handleCellClick, handleRestart, handleContinue } = useGameController();

  useEffect(() => {
    if (room.playerX && room.playerO && room.status === 'playing' && !gameState.playerXName) {
      handleStart(room.playerX, room.playerO);
    }
  }, [room.playerX, room.playerO, room.status, gameState.playerXName, handleStart]);

  const handleLeave = () => {
    onLeaveRoom(room.id, playerName);
  };

  if (!room.playerX || !room.playerO) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Sala: {room.name}</h2>
        <p className="text-gray-400 mb-4">
          Aguardando outro jogador...
          {room.playerX ? `${room.playerX} está pronto!` : ''}
          {room.playerO ? `${room.playerO} está pronto!` : ''}
        </p>
        <button
          onClick={handleLeave}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Sair da Sala
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center p-4">
      <div className="flex gap-4 justify-between items-center w-full max-w-4xl">
        <h2 className="text-2xl font-bold">Sala: {room.name}</h2>
        <button
          onClick={handleLeave}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Sair
        </button>
      </div>
      <Scoreboard gameState={gameState} />
      <Board gameState={gameState} onCellClick={handleCellClick} />
      <GameStatus gameState={gameState} onRestart={handleRestart} onContinue={handleContinue} />
      <GameHistory history={gameState.history} />
    </div>
  );
}