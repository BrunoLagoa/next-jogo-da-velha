import { GameState } from '@/utils/gameLogic';

export interface GameStatusProps {
  gameState: GameState;
  onRestart: () => void;
}