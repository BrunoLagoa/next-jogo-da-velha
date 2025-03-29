export interface RoomProps {
  id: string;
  name: string;
  playerX: string | null;
  playerO: string | null;
  status: 'waiting' | 'playing' | 'finished';
}

export interface RoomUpdate {
  type: 'CREATE' | 'JOIN' | 'LEAVE' | 'UPDATE_STATUS' | 'GAME_MOVE';
  room?: {
    id: string;
    name: string;
    playerX: string | null;
    playerO: string | null;
    status: 'waiting' | 'playing' | 'finished';
  };
  gameState?: {
    board: string[];
    currentPlayer: string;
    playerXName: string;
    playerOName: string;
    playerXScore: number;
    playerOScore: number;
    winner: string | null;
    history: { player: string; position: number; winner: string | null }[];
  };
}