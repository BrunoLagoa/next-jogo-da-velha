"use client"

import { useState, useEffect } from 'react';
import { getInitialGameState, makeMove } from '@/utils/gameLogic';
import { pusherService } from '@/services/pusherService';
import { GameState } from '@/types/gameStateTypes';
import { authService } from '@/services/authService';

export const useGameController = () => {
  const [gameState, setGameState] = useState<GameState>({ 
    board: Array(9).fill(''), 
    history: [], 
    playerXName: '', 
    playerOName: '', 
    playerXScore: 0, 
    playerOScore: 0,
    currentPlayer: 'X',
    winner: null
  });
  const [gameInitialized, setGameInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = pusherService.onUpdate((update) => {
      if (update.type === 'GAME_MOVE') {
        setGameState(prevState => update.gameState || prevState);
        setGameInitialized(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStart = async (playerX: string, playerO: string) => {
    if (!playerX || !playerO) {
      return;
    }

    // Evita múltiplas inicializações
    if (gameInitialized || gameState.playerXName) {
      return;
    }

    try {
      const session = await authService.getSession();
      
      if (!session || !session.name) {
        return;
      }

      const currentPlayerName = session.name;

      // Verificar se o jogador atual faz parte desta sala
      if (currentPlayerName !== playerX && currentPlayerName !== playerO) {
        return;
      }

      // Determinar role do jogador
      const role = currentPlayerName === playerO ? 'O' : 'X';
      
      // Atualizar sessão com o papel do jogador
      await authService.updateSession({
        ...session,
        name: currentPlayerName,
        role: role
      });

      // Apenas o jogador X inicia o jogo para evitar conflitos
      if (role === 'X') {
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
        setGameInitialized(true);
      }
    } catch (error) {
      console.error('Erro ao inicializar jogo:', error);
    }
  };

  const handleCellClick = async (index: number) => {
    try {
      const session = await authService.getSession();
      if (!session) {
        return;
      }
      
      if (gameState.winner || gameState.board[index] !== '') {
        return;
      }

      if (!session.name || (session.name !== gameState.playerXName && session.name !== gameState.playerOName)) {
        return;
      }

      if (session.role !== gameState.currentPlayer) {
        return;
      }

      const newGameState = makeMove(gameState, index);
      pusherService.sendUpdate({
        type: 'GAME_MOVE',
        gameState: newGameState
      });
      setGameState(newGameState);
    } catch (error) {
      console.error('Erro ao fazer jogada:', error);
    }
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
    setGameInitialized(true);
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
    setGameInitialized(true);
  };

  return {
    gameState,
    handleStart,
    handleCellClick,
    handleRestart,
    handleContinue
  };
};