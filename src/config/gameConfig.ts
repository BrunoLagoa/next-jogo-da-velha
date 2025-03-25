export const GAME_CONFIG = {
  BOARD_SIZE: 9,
  PLAYERS: {
    X: {
      SYMBOL: 'X',
      DEFAULT_NAME: 'Jogador X',
      COLOR: 'text-blue-400'
    },
    O: {
      SYMBOL: 'O',
      DEFAULT_NAME: 'Jogador O',
      COLOR: 'text-purple-500'
    }
  },
  WINNING_COMBINATIONS: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
};