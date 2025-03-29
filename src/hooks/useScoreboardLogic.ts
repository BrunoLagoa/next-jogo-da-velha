import { GameState } from "@/types/gameStateTypes";

export const useScoreboardLogic = (gameState: GameState) => {
  const calculateWins = () => {
    return {
      xWins: gameState.playerXScore,
      oWins: gameState.playerOScore
    };
  };

  return calculateWins();
};