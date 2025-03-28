import { Room } from '@/hooks/useRoomController';

export interface LobbyProps {
  rooms: Room[];
  playerName: string;
  onCreateRoom: (name: string) => void;
  onJoinRoom: (roomId: string) => void;
}