import React from 'react';

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
        <button
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          onClick={onRestart}
        >
          Reiniciar Jogo
        </button>
      )}
    </div>
  );
};

export default GameStatus;