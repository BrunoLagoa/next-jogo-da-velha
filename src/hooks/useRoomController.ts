"use client";

import { useState, useEffect } from 'react';
import { websocketService } from '@/services/websocketService';

export interface Room {
  id: string;
  name: string;
  playerX: string | null;
  playerO: string | null;
  status: 'waiting' | 'playing' | 'finished';
}

export const useRoomController = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    websocketService.connect();

    const unsubscribe = websocketService.onUpdate((update) => {
      switch (update.type) {
        case 'CREATE':
          setRooms(prevRooms => [...prevRooms, update.room]);
          break;
        case 'JOIN':
        case 'LEAVE':
        case 'UPDATE_STATUS':
          setRooms(prevRooms =>
            prevRooms.map(room =>
              room.id === update.room.id ? update.room : room
            )
          );
          break;
      }
    });

    return () => {
      unsubscribe();
      websocketService.disconnect();
    };
  }, []);

  const getRoomById = (roomId: string) => {
    return rooms.find(room => room.id === roomId);
  };

  const isRoomAvailable = (roomId: string) => {
    const room = getRoomById(roomId);
    return room && (room.playerX === null || room.playerO === null);
  };

  const createRoom = (name: string, playerName: string) => {
    const newRoom: Room = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      playerX: playerName,
      playerO: null,
      status: 'waiting'
    };

    setRooms(prevRooms => [...prevRooms, newRoom]);
    websocketService.sendUpdate({ type: 'CREATE', room: newRoom });
    return newRoom;
  };

  const joinRoom = (roomId: string, playerName: string) => {
    setRooms(prevRooms => {
      const updatedRooms = prevRooms.map(room => {
        if (room.id === roomId) {
          if (!room.playerX) {
            const updatedRoom: Room = { ...room, playerX: playerName };
            websocketService.sendUpdate({ type: 'JOIN', room: updatedRoom });
            return updatedRoom;
          } else if (!room.playerO) {
            const updatedRoom: Room = {
              ...room,
              playerO: playerName,
              status: 'playing'
            };
            websocketService.sendUpdate({ type: 'JOIN', room: updatedRoom });
            return updatedRoom;
          }
        }
        return room;
      });
      return updatedRooms;
    });
  };

  const updateRoomStatus = (roomId: string, status: Room['status']) => {
    setRooms(prevRooms => {
      const updatedRooms = prevRooms.map(room => {
        if (room.id === roomId) {
          const updatedRoom: Room = { ...room, status };
          websocketService.sendUpdate({ type: 'UPDATE_STATUS', room: updatedRoom });
          return updatedRoom;
        }
        return room;
      });
      return updatedRooms;
    });
  };

  const leaveRoom = (roomId: string, playerName: string) => {
    setRooms(prevRooms => {
      const updatedRooms = prevRooms.map(room => {
        if (room.id === roomId) {
          let updatedRoom: Room;
          if (room.playerX === playerName) {
            updatedRoom = { ...room, playerX: null, status: 'waiting' } as Room;
          } else if (room.playerO === playerName) {
            updatedRoom = { ...room, playerO: null, status: 'waiting' } as Room;
          } else {
            return room;
          }
          websocketService.sendUpdate({ type: 'LEAVE', room: updatedRoom });
          return updatedRoom;
        }
        return room;
      });
      return updatedRooms;
    });
  };

  return {
    rooms,
    createRoom,
    joinRoom,
    updateRoomStatus,
    leaveRoom,
    getRoomById,
    isRoomAvailable
  };
};