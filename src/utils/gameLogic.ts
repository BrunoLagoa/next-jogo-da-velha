import { GameState } from '../types/gameStateTypes';

export const initialGameState: GameState = {
  board: Array(9).fill(''),
  currentPlayer: 'X',
  winner: null,
  history: [],
  playerXName: '',
  playerOName: '',
  playerXScore: 0,
  playerOScore: 0
};

export const checkWinner = (board: string[]): string | null => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const makeMove = (state: GameState, index: number): GameState => {
  if (state.board[index] !== '' || state.winner) {
    return state;
  }

  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  const winner = checkWinner(newBoard);

  return {
    ...state,
    board: newBoard,
    currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
    winner,
    history: [...state.history, { player: state.currentPlayer, position: index, winner: winner }]
  };
};