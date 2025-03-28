import React from 'react';
import { MessageDisplayProps } from '@/types/messageDisplayTypes';

const MessageDisplay: React.FC<MessageDisplayProps> = ({ winner, isDraw, currentPlayer }) => {
  return (
    <>
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
      {!winner && !isDraw && (
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Vez de: <span className="text-white">{currentPlayer}</span>
        </div>
      )}
    </>
  );
};

export default MessageDisplay;