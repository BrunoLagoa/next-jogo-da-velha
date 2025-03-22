export interface GameState {
  board: string[];
  currentPlayer: string;
  winner: string | null;
  history: { player: string; position: number; winner: string | null }[];
  playerXName: string;
  playerOName: string;
  playerXScore: number;
  playerOScore: number;
}