"use client"

import { useState } from 'react';
import { initialGameState, makeMove, GameState } from '@/utils/gameLogic';

export const useGameController = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleStart = (playerX: string, playerO: string) => {
    setGameState((prev: GameState) => ({ 
      ...prev,
      playerXName: playerX,
      playerOName: playerO
    }));
  };

  const handleCellClick = (index: number) => {
    setGameState((prevState: GameState) => makeMove(prevState, index));
  };

  const handleRestart = () => {
    setGameState((prevState: GameState) => ({ 
      ...initialGameState,
      playerXName: prevState.playerXName,
      playerOName: prevState.playerOName,
      playerXScore: prevState.playerXScore,
      playerOScore: prevState.playerOScore
    }));
  };

  const handleContinue = () => {
    setGameState((prevState: GameState) => ({ 
      ...initialGameState,
      playerXName: prevState.playerXName,
      playerOName: prevState.playerOName,
      playerXScore: prevState.playerXScore,
      playerOScore: prevState.playerOScore
    }));
  };

  return {
    gameState,
    handleStart,
    handleCellClick,
    handleRestart,
    handleContinue
  };
};