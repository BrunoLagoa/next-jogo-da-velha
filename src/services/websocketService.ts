interface RoomUpdate {
  type: 'CREATE' | 'JOIN' | 'LEAVE' | 'UPDATE_STATUS';
  room: {
    id: string;
    name: string;
    playerX: string | null;
    playerO: string | null;
    status: 'waiting' | 'playing' | 'finished';
  };
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: ((update: RoomUpdate) => void)[] = [];

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket('ws://localhost:3001');

    this.ws.onmessage = (event) => {
      try {
        const update: RoomUpdate = JSON.parse(event.data);
        this.messageHandlers.forEach(handler => handler(update));
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
      setTimeout(() => this.connect(), 5000); // Reconnect after 5 seconds
    };
  }

  sendUpdate(update: RoomUpdate) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(update));
    }
  }

  onUpdate(handler: (update: RoomUpdate) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const websocketService = new WebSocketService();