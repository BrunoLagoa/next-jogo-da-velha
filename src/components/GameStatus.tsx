import React from 'react';
import RestartButton from './RestartButton';

interface GameStatusProps {
  gameState: {
    winner: string | null;
    board: string[];
  };
  onRestart: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameState, onRestart }) => {
  const isDraw = !gameState.winner && gameState.board.every(cell => cell !== '');

  return (
    <div className="flex flex-col items-center gap-4 w-full text-center">
      {gameState.winner && (
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Vencedor: <span className="text-white">{gameState.winner}</span>
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