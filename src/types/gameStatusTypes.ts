import { GameState } from "./gameStateTypes";

export interface GameStatusProps {
  gameState: GameState;
  onRestart: () => void;
  onContinue: () => void;
}