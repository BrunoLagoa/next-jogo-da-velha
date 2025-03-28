import React from 'react';
import Cell from './Cell';
import { BoardProps } from '@/types/boardTypes';

const Board: React.FC<BoardProps> = ({ gameState, onCellClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-64 h-64">
      {gameState.board.map((cell: string, index: number) => (
        <Cell
          key={index}
          value={cell}
          index={index}
          disabled={cell !== '' || gameState.winner !== null}
          onClick={onCellClick}
        />
      ))}
    </div>
  );
};

export default Board;