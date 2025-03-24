import React, { useMemo } from 'react';
import { GameHistoryProps } from '../types/gameHistoryTypes';
import HistoryItem from './HistoryItem';

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  const reversedHistory = useMemo(() => [...history].reverse(), [history]);

  if (!history.length) return null;

  return (
    <div className="mt-8" role="region" aria-label="Histórico de Jogadas">
      <h2 className="text-xl font-bold mb-4">Histórico de Jogadas</h2>
      <ul className="list-disc list-inside" role="list">
        {reversedHistory.map((move, index) => (
          <HistoryItem
            key={history.length - index}
            move={move}
            moveNumber={history.length - index}
          />
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;