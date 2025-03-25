"use client";

import { useState } from 'react';

export interface Room {
  id: string;
  name: string;
  playerX: string | null;
  playerO: string | null;
  status: 'waiting' | 'playing' | 'finished';
}

export const useRoomController = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const createRoom = (name: string) => {
    const newRoom: Room = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      playerX: null,
      playerO: null,
      status: 'waiting'
    };

    setRooms([...rooms, newRoom]);
    return newRoom;
  };

  const joinRoom = (roomId: string, playerName: string) => {
    setRooms(prevRooms => {
      return prevRooms.map(room => {
        if (room.id === roomId) {
          if (!room.playerX) {
            return { ...room, playerX: playerName } as Room;
          } else if (!room.playerO) {
            return {
              ...room,
              playerO: playerName,
              status: 'playing'
            } as Room;
          }
        }
        return room;
      });
    });
  };

  const updateRoomStatus = (roomId: string, status: Room['status']) => {
    setRooms(prevRooms => {
      return prevRooms.map(room => {
        if (room.id === roomId) {
          return { ...room, status };
        }
        return room;
      });
    });
  };

  const leaveRoom = (roomId: string, playerName: string) => {
    setRooms(prevRooms => {
      return prevRooms.map(room => {
        if (room.id === roomId) {
          if (room.playerX === playerName) {
            return { ...room, playerX: null, status: 'waiting' };
          } else if (room.playerO === playerName) {
            return { ...room, playerO: null, status: 'waiting' };
          }
        }
        return room;
      });
    });
  };

  return {
    rooms,
    createRoom,
    joinRoom,
    updateRoomStatus,
    leaveRoom
  };
};