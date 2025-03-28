"use client";

import { useState, useEffect } from 'react';
import { pusherService } from '@/services/pusherService';

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
    // Carregar salas existentes
    fetch('/api/rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Erro ao carregar salas:', error));

    const unsubscribe = pusherService.onUpdate((update) => {
      if (!update.room) return;

      switch (update.type) {
        case 'CREATE':
          setRooms(prevRooms => [...prevRooms, update.room as Room]);
          break;
        case 'JOIN':
        case 'LEAVE':
        case 'UPDATE_STATUS':
          setRooms(prevRooms =>
            prevRooms.map(room =>
              room.id === update.room?.id ? { ...update.room } : room
            ) as Room[]
          );
          break;
      }
    });

    return () => {
      unsubscribe();
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
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      playerX: playerName,
      playerO: null,
      status: 'waiting'
    };

    setRooms(prevRooms => [...prevRooms, newRoom]);
    pusherService.sendUpdate({ type: 'CREATE', room: newRoom });
    return newRoom;
  };

  const joinRoom = (roomId: string, playerName: string) => {
    const room = getRoomById(roomId);
    if (!room) return;

    if (room.playerX === playerName || room.playerO === playerName) return;

    let updatedRoom: Room | null = null;

    if (!room.playerX) {
      updatedRoom = { ...room, playerX: playerName };
    } else if (!room.playerO) {
      updatedRoom = { ...room, playerO: playerName, status: 'playing' };
    }

    if (updatedRoom) {
      setRooms(prevRooms =>
        prevRooms.map(r => r.id === roomId ? updatedRoom! : r).filter((room): room is Room => room !== undefined)
      );
      pusherService.sendUpdate({ type: 'JOIN', room: updatedRoom });
    }
  };

  const updateRoomStatus = (roomId: string, status: Room['status']) => {
    setRooms(prevRooms => {
      const updatedRooms = prevRooms.map(room => {
        if (room.id === roomId) {
          const updatedRoom: Room = { ...room, status };
          pusherService.sendUpdate({ type: 'UPDATE_STATUS', room: updatedRoom });
          return updatedRoom;
        }
        return room;
      }) as Room[];
      return updatedRooms;
    });
  };

  const leaveRoom = (roomId: string, playerName: string) => {
    const room = getRoomById(roomId);
    if (!room) return;

    if (room.playerX !== playerName && room.playerO !== playerName) return;

    let updatedRoom: Room | null = null;

    if (room.playerX === playerName) {
      updatedRoom = { ...room, playerX: null, status: 'waiting' };
    } else if (room.playerO === playerName) {
      updatedRoom = { ...room, playerO: null, status: 'waiting' };
    }

    if (updatedRoom) {
      setRooms(prevRooms => {
        // Se ambos os jogadores saíram, remove a sala
        if (!updatedRoom!.playerX && !updatedRoom!.playerO) {
          return prevRooms.filter(r => r.id !== roomId);
        }
        // Atualiza a sala existente
        return prevRooms.map(r => r.id === roomId ? updatedRoom! : r)
          .filter((room): room is Room => room !== undefined);
      });
      pusherService.sendUpdate({ type: 'LEAVE', room: updatedRoom });
    }
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