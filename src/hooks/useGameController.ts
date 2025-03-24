"use client"

import { useState } from 'react';
import { getInitialGameState, makeMove, GameState } from '@/utils/gameLogic';

export const useGameController = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState({ 
    board: Array(9).fill(''), 
    history: [], 
    playerXName: '', 
    playerOName: '', 
    playerXScore: 0, 
    playerOScore: 0,
    currentPlayer: 'X',
    winner: null
  }));

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
      ...getInitialGameState({ 
        board: Array(9).fill(''), 
        history: [], 
        playerXName: '', 
        playerOName: '', 
        playerXScore: 0, 
        playerOScore: 0,
        currentPlayer: 'X',
        winner: null
      }),
      playerXName: prevState.playerXName,
      playerOName: prevState.playerOName,
      playerXScore: prevState.playerXScore,
      playerOScore: prevState.playerOScore
    }));
  };

  const handleContinue = () => {
    setGameState((prevState: GameState) => ({
      ...getInitialGameState(prevState),
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