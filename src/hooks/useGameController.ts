"use client"

import { useState } from 'react';
import { initialGameState, makeMove, GameState } from '@/utils/gameLogic';

export const useGameController = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleStart = (playerX: string, playerO: string) => {
    setGameState(prev => ({
      ...prev,
      playerXName: playerX,
      playerOName: playerO
    }));
  };

  const handleCellClick = (index: number) => {
    setGameState(prevState => makeMove(prevState, index));
  };

  const handleRestart = () => {
    setGameState({
      ...initialGameState,
      playerXName: gameState.playerXName,
      playerOName: gameState.playerOName
    });
  };

  return {
    gameState,
    handleStart,
    handleCellClick,
    handleRestart
  };
};