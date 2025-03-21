import React from 'react';
import RestartButton from './RestartButton';
import { useGameLogic } from '@/hooks/useGameLogic';
import { GameStatusProps } from '@/types/gameStatusTypes';

const GameStatus: React.FC<GameStatusProps> = ({ gameState, onRestart }) => {
  const { getGameStatus } = useGameLogic();
  const { winner, isDraw } = getGameStatus(gameState);

  return (
    <div className="flex flex-col items-center gap-4 w-full text-center">
      {winner && (
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Vencedor: <span className="text-white">{winner}</span>
        </div>
      )}
      {isDraw && (
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
          Empate! Ninguém venceu desta vez.
        </div>
      )}
      {(gameState.winner || isDraw) && (
        <RestartButton onRestart={onRestart} />
      )}
    </div>
  );
};

export default GameStatus;