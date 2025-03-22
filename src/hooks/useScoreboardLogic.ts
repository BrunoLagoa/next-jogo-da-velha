import { GameState } from '@/utils/gameLogic';

export const useScoreboardLogic = (gameState: GameState) => {
  const calculateWins = () => {
    let xWins = 0;
    let oWins = 0;

    gameState.history.forEach((move) => {
      if (move.winner === 'X') {
        xWins++;
      } else if (move.winner === 'O') {
        oWins++;
      }
    });

    return { xWins, oWins };
  };

  return calculateWins();
};