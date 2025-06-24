export interface AdConfig {
  publisherId: string;
  slots: {
    banner: string;
    sidebar: string;
    interstitial: string;
    gameResult: string;
  };
}

export interface AdPlacement {
  id: string;
  name: string;
  location: 'lobby' | 'game' | 'result' | 'between_games';
  type: 'banner' | 'sidebar' | 'interstitial';
  enabled: boolean;
  frequency?: number; // Para intersticiais: a cada X jogos
}

export const AD_PLACEMENTS: AdPlacement[] = [
  {
    id: 'lobby-banner',
    name: 'Banner do Lobby',
    location: 'lobby',
    type: 'banner',
    enabled: true
  },
  {
    id: 'game-sidebar',
    name: 'Banner Lateral do Jogo',
    location: 'game',
    type: 'sidebar',
    enabled: true
  },
  {
    id: 'result-banner',
    name: 'Banner de Resultado',
    location: 'result',
    type: 'banner',
    enabled: true
  },
  {
    id: 'interstitial-between-games',
    name: 'Intersticial Entre Jogos',
    location: 'between_games',
    type: 'interstitial',
    enabled: true,
    frequency: 3 // A cada 3 jogos
  }
];

// Configuração para desenvolvimento/teste
export const AD_CONFIG: AdConfig = {
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-4742409395558588",
  slots: {
    banner: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || "1234567890",
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "2345678901",
    interstitial: process.env.NEXT_PUBLIC_ADSENSE_INTERSTITIAL_SLOT || "3456789012",
    gameResult: process.env.NEXT_PUBLIC_ADSENSE_RESULT_SLOT || "4567890123"
  }
}; 