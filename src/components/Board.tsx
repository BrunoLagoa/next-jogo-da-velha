import React from 'react';
import { BoardProps } from '@/types/boardTypes';

const Board: React.FC<BoardProps> = ({ gameState, onCellClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-64 h-64">
      {gameState.board.map((cell: string, index: number) => (
        <button
          key={index}
          className="w-20 h-20 border-2 border-gray-600 hover:border-blue-400 flex items-center justify-center text-2xl font-bold transition-all duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={() => onCellClick(index)}
          disabled={cell !== '' || gameState.winner !== null}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default Board;