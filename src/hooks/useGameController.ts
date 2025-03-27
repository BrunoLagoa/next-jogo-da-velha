"use client"

import { useState, useEffect } from 'react';
import { getInitialGameState, makeMove, GameState } from '@/utils/gameLogic';
import { websocketService } from '@/services/websocketService';

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

  useEffect(() => {
    const unsubscribe = websocketService.onUpdate((update) => {
      if (update.type === 'GAME_MOVE') {
        setGameState(prevState => update.gameState || prevState);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStart = (playerX: string, playerO: string) => {
    const playerName = localStorage.getItem('playerName');
    if (!playerName) {
      localStorage.setItem('playerName', playerX);
    } else if (playerName !== playerX && playerName !== playerO) {
      return;
    }
    const initialState = getInitialGameState({ 
      board: Array(9).fill(''), 
      history: [], 
      playerXName: playerX, 
      playerOName: playerO, 
      playerXScore: 0, 
      playerOScore: 0,
      currentPlayer: 'X',
      winner: null
    });
    websocketService.sendUpdate({
      type: 'GAME_MOVE',
      gameState: initialState
    });
    setGameState(initialState);
  };

  const handleCellClick = (index: number) => {
    const playerName = localStorage.getItem('playerName');
    const currentPlayerName = gameState.currentPlayer === 'X' ? gameState.playerXName : gameState.playerOName;

    if (!playerName || playerName !== currentPlayerName || gameState.winner || gameState.board[index] !== '') {
      console.log('Jogada inválida:', {
        playerName,
        currentPlayerName,
        currentPlayer: gameState.currentPlayer,
        winner: gameState.winner,
        cellOccupied: gameState.board[index] !== ''
      });
      return;
    }

    const newGameState = makeMove(gameState, index);
    websocketService.sendUpdate({
      type: 'GAME_MOVE',
      gameState: newGameState
    });
    setGameState(newGameState);
  };

  const handleRestart = () => {
    const newState = getInitialGameState({ 
      board: Array(9).fill(''), 
      history: [], 
      playerXName: gameState.playerXName, 
      playerOName: gameState.playerOName, 
      playerXScore: 0, 
      playerOScore: 0,
      currentPlayer: 'X',
      winner: null
    });
    websocketService.sendUpdate({
      type: 'GAME_MOVE',
      gameState: newState
    });
    setGameState(newState);
  };

  const handleContinue = () => {
    const newState = {
      ...getInitialGameState(gameState),
      playerXName: gameState.playerXName,
      playerOName: gameState.playerOName,
      playerXScore: gameState.playerXScore,
      playerOScore: gameState.playerOScore
    };
    websocketService.sendUpdate({
      type: 'GAME_MOVE',
      gameState: newState
    });
    setGameState(newState);
  };

  return {
    gameState,
    handleStart,
    handleCellClick,
    handleRestart,
    handleContinue
  };
};