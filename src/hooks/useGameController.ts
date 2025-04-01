"use client"

import { useState, useEffect } from 'react';
import { getInitialGameState, makeMove } from '@/utils/gameLogic';
import { pusherService } from '@/services/pusherService';
import { GameState } from '@/types/gameStateTypes';
import { authService } from '@/services/authService';

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
    const unsubscribe = pusherService.onUpdate((update) => {
      if (update.type === 'GAME_MOVE') {
        setGameState(prevState => update.gameState || prevState);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStart = async (playerX: string, playerO: string) => {
    let session = await authService.getSession();
    
    // Se não houver sessão, cria uma nova baseada no nome do jogador
    if (!session) {
      // Verifica se o jogador está se conectando como X ou O
      const playerName = playerX || playerO;
      session = await authService.createSession(playerName);
      session.role = playerName === playerX ? 'X' : 'O';
    } 
    // Se já existe sessão, atribui o papel com base no nome do jogador
    else {
      if (session.name === playerX) {
        session.role = 'X';
      } else if (session.name === playerO) {
        session.role = 'O';
      } else {
        // Se o nome da sessão não corresponde a nenhum jogador, cria nova sessão
        const availableRole = playerX ? 'O' : 'X';
        const playerName = availableRole === 'X' ? playerX : playerO;
        session = await authService.createSession(playerName);
        session.role = availableRole;
      }
    }
    await authService.updateSession(session);
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
    pusherService.sendUpdate({
      type: 'GAME_MOVE',
      gameState: initialState
    });
    setGameState(initialState);
  };

  const handleCellClick = async (index: number) => {
    const session = await authService.getSession();
    if (!session) return;
    
    if (gameState.winner || gameState.board[index] !== '') {
      console.log('Jogada inválida:', {
        winner: gameState.winner,
        cellOccupied: gameState.board[index] !== ''
      });
      return;
    }

    if (!session.name || (session.name !== gameState.playerXName && session.name !== gameState.playerOName)) {
      console.log('Jogador não registrado:', {
        playerName: session.name,
        playerX: gameState.playerXName,
        playerO: gameState.playerOName
      });
      return;
    }

    if (session.role !== gameState.currentPlayer) {
      console.log('Não é sua vez:', {
        playerRole: session.role,
        currentPlayer: gameState.currentPlayer
      });
      return;
    }

    const newGameState = makeMove(gameState, index);
    pusherService.sendUpdate({
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
    pusherService.sendUpdate({
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
    pusherService.sendUpdate({
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