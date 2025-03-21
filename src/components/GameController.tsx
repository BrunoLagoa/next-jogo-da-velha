import { useGameController } from '@/hooks/useGameController';
import Board from '@/components/Board';
import GameStatus from '@/components/GameStatus';
import GameHistory from '@/components/GameHistory';
import PlayerForm from '@/components/PlayerForm';

export default function GameController() {
  const { gameState, handleStart, handleCellClick, handleRestart } = useGameController();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Jogo da Velha</h1>
        <Board gameState={gameState} onCellClick={handleCellClick} />
        <GameStatus gameState={gameState} onRestart={handleRestart} />
        <PlayerForm onStart={handleStart} />
        <GameHistory history={gameState.history} />
      </main>
    </div>
  );
}