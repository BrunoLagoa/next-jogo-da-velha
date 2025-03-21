import { GameState } from "@/utils/gameLogic";

export interface BoardProps {
  gameState: GameState;
  onCellClick: (index: number) => void;
}