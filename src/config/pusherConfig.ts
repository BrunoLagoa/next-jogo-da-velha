// Configuração do Pusher
export const pusherConfig = {
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
  useTLS: true
};

// Nome do canal e eventos do Pusher
export const GAME_CHANNEL = 'game-channel';
export const GAME_EVENTS = {
  ROOM_UPDATE: 'room-update',
  GAME_MOVE: 'game-move'
};