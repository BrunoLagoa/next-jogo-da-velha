export interface Move {
  player: string;
  position: number;
}

export interface GameHistoryProps {
  history: Move[];
}