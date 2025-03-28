import React from 'react';
import { CellProps } from '@/types/cellTypes';

const Cell: React.FC<CellProps> = ({ value, index, disabled, onClick }) => {
  return (
    <button
      className="w-20 h-20 border-2 border-gray-600 hover:border-blue-400 flex items-center justify-center text-2xl font-bold transition-all duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(index)}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Cell;