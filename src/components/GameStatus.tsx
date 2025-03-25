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

  return (
    <div className="flex flex-col items-center gap-4 w-full text-center">
      <MessageDisplay
        winner={winner === 'X' ? gameState.playerXName : winner === 'O' ? gameState.playerOName : null}
        isDraw={isDraw}
        currentPlayer={currentPlayer}
      />
      {(gameState.winner || isDraw) && (
        <ButtonGroup onContinue={onContinue} onRestart={onRestart} />
      )}
      <ConfettiAnimation winner={gameState.winner} />
    </div>
  );
};

export default GameStatus;