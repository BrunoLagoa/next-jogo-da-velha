export type GameState = {
  board: string[];
  currentPlayer: string;
  playerXName: string;
  playerOName: string;
  playerXScore: number;
  playerOScore: number;
  winner: string | null;
  history: { player: string; position: number; winner: string | null }[];
};

export const getInitialGameState = (currentState: GameState): GameState => ({
  board: Array(9).fill(''),
  currentPlayer: 'X',
  winner: null,
  history: [],
  playerXName: currentState.playerXName,
  playerOName: currentState.playerOName,
  playerXScore: currentState.playerXScore,
  playerOScore: currentState.playerOScore
});

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
  if (state.board[index] !== '') {
    return state;
  }

  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  const winner = checkWinner(newBoard);
  const isDraw = !winner && newBoard.every(cell => cell !== '');

  let playerXScore = state.playerXScore;
  let playerOScore = state.playerOScore;

  if (winner === 'X') {
    playerXScore += 1;
  } else if (winner === 'O') {
    playerOScore += 1;
  }

  return {
    ...state,
    board: newBoard,
    currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
    winner: isDraw ? null : winner,
    playerXScore,
    playerOScore,
    history: [...state.history, { player: state.currentPlayer, position: index, winner: isDraw ? null : winner }]
  };
};