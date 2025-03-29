import Pusher from 'pusher-js';
import { pusherConfig, GAME_CHANNEL, GAME_EVENTS } from '@/config/pusherConfig';
import { RoomUpdate } from '@/types/roomTypes';
class PusherService {
  private pusher: Pusher;
  private channel: import('pusher-js').Channel;
  private messageHandlers: ((update: RoomUpdate) => void)[] = [];

  constructor() {
    this.pusher = new Pusher(pusherConfig.key, {
      cluster: pusherConfig.cluster,
      forceTLS: pusherConfig.useTLS
    });

    this.channel = this.pusher.subscribe(GAME_CHANNEL);

    this.channel.bind(GAME_EVENTS.ROOM_UPDATE, (data: RoomUpdate) => {
      this.messageHandlers.forEach(handler => handler(data));
    });

    this.channel.bind(GAME_EVENTS.GAME_MOVE, (data: RoomUpdate) => {
      this.messageHandlers.forEach(handler => handler(data));
    });
  }

  sendUpdate(update: RoomUpdate) {
    const eventName = update.type === 'GAME_MOVE' ? GAME_EVENTS.GAME_MOVE : GAME_EVENTS.ROOM_UPDATE;
    fetch('/api/pusher/trigger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventName,
        data: update
      })
    });
  }

  onUpdate(handler: (update: RoomUpdate) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  disconnect() {
    this.pusher.unsubscribe(GAME_CHANNEL);
    this.pusher.disconnect();
  }
}

export const pusherService = new PusherService();