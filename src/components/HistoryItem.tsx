import React from 'react';
import { HistoryItemProps } from '../types/historyItemTypes';

const HistoryItem: React.FC<HistoryItemProps> = ({ move, moveNumber }) => {
  const formatMessage = (move: HistoryItemProps['move'], moveNumber: number) => {
    return `Jogada ${moveNumber}: ${move.player} na posição ${move.position}`;
  };

  return (
    <li className="text-gray-300" role="listitem">
      {formatMessage(move, moveNumber)}
    </li>
  );
};

export default HistoryItem;