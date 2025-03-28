import { Room } from '@/hooks/useRoomController';

export interface GameRoomProps {
  room: Room;
  playerName: string;
  onLeaveRoom: (roomId: string, playerName: string) => void;
}