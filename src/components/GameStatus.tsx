import React from 'react';
import ConfettiAnimation from './ConfettiAnimation';
import RestartButton from './RestartButton';
import { useGameLogic } from '@/hooks/useGameLogic';
import { GameStatusProps } from '@/types/gameStatusTypes';

const GameStatus: React.FC<GameStatusProps> = ({ gameState, onRestart }) => {
  const { getGameStatus } = useGameLogic();
  const { winner, isDraw } = getGameStatus(gameState);
  const currentPlayer = gameState.currentPlayer === 'X' 
    ? gameState.playerXName 
    : gameState.playerOName;

  return (
    <div className="flex flex-col items-center gap-4 w-full text-center">
      {winner && (
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Vencedor: <span className="text-white">{winner === 'X' ? gameState.playerXName : gameState.playerOName}</span>
        </div>
      )}
      {isDraw && (
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
          Empate! Ninguém venceu desta vez.
        </div>
      )}
      {!winner && !isDraw && (
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Vez de: <span className="text-white">{currentPlayer}</span>
        </div>
      )}
      {(gameState.winner || isDraw) && (
        <RestartButton onRestart={onRestart} />
      )}
      <ConfettiAnimation winner={gameState.winner} />
    </div>
  );
};

export default GameStatus;