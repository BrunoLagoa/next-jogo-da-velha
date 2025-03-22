import { GameState } from '@/utils/gameLogic';

export const useScoreboardLogic = (gameState: GameState) => {
  const calculateWins = () => {
    let xWins = 0;
    let oWins = 0;

    gameState.history.forEach((move, index, array) => {
      if (index > 0 && array[index - 1].player === move.player) {
        if (move.player === 'X') {
          xWins++;
        } else {
          oWins++;
        }
      }
    });

    return { xWins, oWins };
  };

  return calculateWins();
};