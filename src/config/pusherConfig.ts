export const pusherConfig = {
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
  useTLS: true
};

export const GAME_CHANNEL = 'game-channel';
export const GAME_EVENTS = {
  ROOM_UPDATE: 'room-update',
  GAME_MOVE: 'game-move',
  AD_SHOW_INTERSTITIAL: 'ad-show-interstitial',
  AD_CLOSE_INTERSTITIAL: 'ad-close-interstitial'
};