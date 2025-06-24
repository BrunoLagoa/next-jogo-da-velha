"use client";

import { useEffect, useCallback } from 'react';
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
  const { showInterstitial, isAdEnabled, onGameEnd, closeInterstitial } = useAds();

  const initializeGame = useCallback(async () => {
    if (room.playerX && room.playerO && room.status === 'playing' && !gameState.playerXName) {
      await handleStart(room.playerX, room.playerO);
    }
  }, [room.playerX, room.playerO, room.status, gameState.playerXName, handleStart]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Detectar fim de jogo para anúncios
  useEffect(() => {
    if (gameState.winner || (gameState.board && gameState.board.every(cell => cell !== '') && !gameState.winner)) {
      onGameEnd();
    }
  }, [gameState.winner, gameState.board, onGameEnd]);

  const handleLeave = () => {
    onLeaveRoom(room.id, playerName);
  };

  const handleRestartWithAd = () => {
    handleRestart();
  };

  const handleContinueWithAd = () => {
    handleContinue();
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
    </>
  );
}