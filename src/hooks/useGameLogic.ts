import { useCallback } from 'react';
import { GameState } from '../utils/gameLogic';

export const useGameLogic = () => {
  const checkWinner = useCallback((board: string[]): string | null => {
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
  }, []);

  const checkDraw = useCallback((board: string[]): boolean => {
    return board.every(cell => cell !== '');
  }, []);

  const getGameStatus = useCallback((state: GameState) => {
    const winner = checkWinner(state.board);
    const isDraw = !winner && checkDraw(state.board);

    return {
      winner,
      isDraw
    };
  }, [checkWinner, checkDraw]);

  return {
    getGameStatus
  };
};