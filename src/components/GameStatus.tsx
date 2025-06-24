import React from 'react';
import ConfettiAnimation from './ConfettiAnimation';
import { useGameLogic } from '@/hooks/useGameLogic';
import { GameStatusProps } from '@/types/gameStatusTypes';
import MessageDisplay from './MessageDisplay';
import ButtonGroup from './ButtonGroup';

const GameStatus: React.FC<GameStatusProps> = ({ gameState, onRestart, onContinue }) => {
  const { getGameStatus } = useGameLogic();
  const { winner, isDraw } = getGameStatus(gameState);
  const currentPlayer = gameState.currentPlayer === 'X' 
    ? gameState.playerXName 
    : gameState.playerOName;

  const showButtons = gameState.winner || isDraw || gameState.winner === 'draw';
  
  // Determina o valor correto para o confetti
  const confettiWinner = winner || (isDraw ? false : null);

  return (
    <div className="flex flex-col items-center gap-4 w-full text-center">
      <MessageDisplay
        winner={winner === 'X' ? gameState.playerXName : winner === 'O' ? gameState.playerOName : winner}
        isDraw={isDraw || gameState.winner === 'draw'}
        currentPlayer={currentPlayer}
      />
      {showButtons && (
        <ButtonGroup onContinue={onContinue} onRestart={onRestart} />
      )}
      <ConfettiAnimation winner={confettiWinner} />
    </div>
  );
};

export default GameStatus;