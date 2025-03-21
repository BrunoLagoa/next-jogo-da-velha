import React from 'react';
import { GameHistoryProps } from '../types/gameHistoryTypes';

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Histórico de Jogadas</h2>
      <ul className="list-disc list-inside">
        {history.slice().reverse().map((move, index) => (
          <li key={index} className="text-gray-300">
            Jogada {index + 1}: {move.player} na posição {move.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;