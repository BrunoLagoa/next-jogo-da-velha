"use client";

import { useEffect, useCallback, useMemo } from 'react';
import { useGameController } from '@/hooks/useGameController';
import { useAds } from '@/hooks/useAds';
import Board from '@/components/Board';
import GameStatus from '@/components/GameStatus';
import GameHistory from '@/components/GameHistory';
import Scoreboard from '@/components/Scoreboard';
import AdBanner from '@/components/AdBanner';
import AdInterstitial from '@/components/AdInterstitial';
import { GameRoomProps } from '@/types/gameRoomTypes';
import { AD_CONFIG } from '@/types/adTypes';

export default function GameRoom({ room, playerName, onLeaveRoom }: GameRoomProps) {
  const { gameState, handleStart, handleCellClick, handleRestart, handleContinue } = useGameController();
  const { showInterstitial, isAdEnabled, onGameEnd, onGameStart, closeInterstitial } = useAds();

  // Memoriza o estado do jogo para evitar re-execuções desnecessárias
  const gameStatus = useMemo(() => {
    const hasWinner = !!gameState.winner;
    const isDraw = gameState.board && gameState.board.every(cell => cell !== '') && !gameState.winner;
    const isGameEnded = hasWinner || isDraw;
    
    console.log('GameRoom - Estado do jogo:', {
      hasWinner,
      isDraw,
      isGameEnded,
      winner: gameState.winner,
      board: gameState.board,
      playerXName: gameState.playerXName,
      playerOName: gameState.playerOName
    });
    
    return {
      hasWinner,
      isDraw,
      isGameEnded,
      gameId: `${gameState.playerXName}-${gameState.playerOName}-${gameState.history.length}`
    };
  }, [gameState.winner, gameState.board, gameState.playerXName, gameState.playerOName, gameState.history.length]);

  const initializeGame = useCallback(async () => {
    if (room.playerX && room.playerO && room.status === 'playing' && !gameState.playerXName) {
      console.log('GameRoom - Inicializando jogo');
      await handleStart(room.playerX, room.playerO);
      onGameStart(); // Reset do controle de fim de jogo
    }
  }, [room.playerX, room.playerO, room.status, gameState.playerXName, handleStart, onGameStart]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Detectar fim de jogo para anúncios - com controle de duplicação
  useEffect(() => {
    console.log('GameRoom - Verificando fim de jogo:', {
      isGameEnded: gameStatus.isGameEnded,
      gameId: gameStatus.gameId,
      showInterstitial
    });
    
    if (gameStatus.isGameEnded) {
      console.log('GameRoom - Jogo terminou! Chamando onGameEnd');
      onGameEnd(gameStatus.gameId);
    }
  }, [gameStatus.isGameEnded, gameStatus.gameId, onGameEnd, showInterstitial]);

  const handleLeave = () => {
    onLeaveRoom(room.id, playerName);
  };

  const handleRestartWithAd = () => {
    console.log('GameRoom - Reiniciando jogo');
    handleRestart();
    onGameStart(); // Reset para o próximo jogo
  };

  const handleContinueWithAd = () => {
    console.log('GameRoom - Continuando jogo');
    handleContinue();
    onGameStart(); // Reset para o próximo jogo
  };

  if (!room.playerX || !room.playerO) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Sala: {room.name}</h2>
        <p className="text-gray-400 mb-4">
          Aguardando outro jogador...
          <br />
          {room.playerX ? `${room.playerX} está pronto!` : 'Aguardando Jogador X...'}
          <br />
          {room.playerO ? `${room.playerO} está pronto!` : 'Aguardando Jogador O...'}
        </p>
        
        {/* Banner de anúncio na tela de espera */}
        {isAdEnabled('lobby-banner') && (
          <div className="mb-4">
            <AdBanner
              slot={AD_CONFIG.slots.banner}
              className="flex justify-center"
              width={320}
              height={100}
            />
          </div>
        )}
        
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
    <>
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
        
        {gameState.playerXName && gameState.playerOName ? (
          <div className="flex gap-8 w-full max-w-6xl">
            {/* Coluna principal do jogo */}
            <div className="flex-1 flex flex-col gap-8 items-center">
              <Scoreboard gameState={gameState} />
              <Board gameState={gameState} onCellClick={handleCellClick} />
              <GameStatus 
                gameState={gameState} 
                onRestart={handleRestartWithAd} 
                onContinue={handleContinueWithAd} 
              />
              <GameHistory history={gameState.history} />
            </div>
            
            {/* Sidebar com anúncios (em telas maiores) */}
            {isAdEnabled('game-sidebar') && (
              <div className="hidden lg:block w-64">
                <div className="sticky top-4">
                  <AdBanner
                    slot={AD_CONFIG.slots.sidebar}
                    width={250}
                    height={400}
                    responsive={false}
                    className="mb-4"
                  />
                  
                  {/* Segundo banner se o jogo for longo */}
                  <AdBanner
                    slot={AD_CONFIG.slots.sidebar}
                    width={250}
                    height={250}
                    responsive={false}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-400 mb-4">Inicializando jogo...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          </div>
        )}
      </div>
      
      {/* Anúncio intersticial entre jogos */}
      <AdInterstitial
        show={showInterstitial}
        onClose={closeInterstitial}
        delaySeconds={5}
      />
      
      {/* Debug info - remover depois */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
          <div>Show Banner: {showInterstitial ? 'SIM' : 'NÃO'}</div>
          <div>Jogo Terminado: {gameStatus.isGameEnded ? 'SIM' : 'NÃO'}</div>
          <div>Winner: {gameState.winner || 'Nenhum'}</div>
          <div>GameId: {gameStatus.gameId}</div>
        </div>
      )}
    </>
  );
}