import { GameState } from '@/utils/gameLogic';

export const useScoreboardLogic = (gameState: GameState) => {
  const calculateWins = () => {
    return {
      xWins: gameState.playerXScore,
      oWins: gameState.playerOScore
    };
  };

  return calculateWins();
};