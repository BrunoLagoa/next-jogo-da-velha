import { WebSocket, WebSocketServer } from 'ws';
import { Room } from '@/hooks/useRoomController';

export interface RoomUpdate {
  type: 'CREATE' | 'JOIN' | 'LEAVE' | 'UPDATE_STATUS' | 'GAME_MOVE';
  room?: Room;
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

const wss = new WebSocketServer({ port: 3001 });

const clients = new Set<WebSocket>();

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    try {
      const update: RoomUpdate = JSON.parse(message.toString());
      console.log('Received update:', update);
      
      if (update.type === 'GAME_MOVE' && update.gameState) {
        // Broadcast the game move to all connected clients
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(update));
          }
        });
      } else {
        // For other updates, broadcast to all clients except the sender
        clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(update));
          }
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

console.log('WebSocket server running on port 3001');