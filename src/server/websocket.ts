import { WebSocket, WebSocketServer } from 'ws';
import { Room } from '@/hooks/useRoomController';

export interface RoomUpdate {
  type: 'CREATE' | 'JOIN' | 'LEAVE' | 'UPDATE_STATUS';
  room: Room;
}

const wss = new WebSocketServer({ port: 3001 });

const clients = new Set<WebSocket>();

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    try {
      const update = JSON.parse(message.toString());
      console.log('Received update:', update);
      
      // Broadcast the update to all connected clients except the sender
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(update));
        }
      });
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