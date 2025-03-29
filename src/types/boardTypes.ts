import { GameState } from "./gameStateTypes";

export interface BoardProps {
  gameState: GameState;
  onCellClick: (index: number) => void;
}