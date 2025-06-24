import { GAME_CONFIG } from '@/config/gameConfig';
import { GameState } from '@/types/gameStateTypes';

export const getInitialGameState = (currentState: GameState): GameState => {
  const randomPlayer = Math.random() < 0.5 ? GAME_CONFIG.PLAYERS.X.SYMBOL : GAME_CONFIG.PLAYERS.O.SYMBOL;
  
  return {
    board: Array(GAME_CONFIG.BOARD_SIZE).fill(''),
    currentPlayer: randomPlayer,
    winner: null,
    history: [],
    playerXName: currentState.playerXName,
    playerOName: currentState.playerOName,
    playerXScore: currentState.playerXScore,
    playerOScore: currentState.playerOScore
  };
};

export const checkWinner = (board: string[]): string | null => {
  for (const combination of GAME_CONFIG.WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const makeMove = (state: GameState, index: number): GameState => {
  if (state.board[index] !== '') {
    return state;
  }

  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  const winner = checkWinner(newBoard);
  let playerXScore = state.playerXScore;
  let playerOScore = state.playerOScore;

  if (winner === 'X') {
    playerXScore += 1;
  } else if (winner === 'O') {
    playerOScore += 1;
  }

  const isDraw = !winner && newBoard.every(cell => cell !== '');

  return {
    ...state,
    board: newBoard,
    currentPlayer: state.currentPlayer === GAME_CONFIG.PLAYERS.X.SYMBOL ? GAME_CONFIG.PLAYERS.O.SYMBOL : GAME_CONFIG.PLAYERS.X.SYMBOL,
    winner: isDraw ? 'draw' : winner,
    playerXScore,
    playerOScore,
    history: [...state.history, { player: state.currentPlayer, position: index, winner: isDraw ? 'draw' : winner }]
  };
};