import { useScoreboardLogic } from '@/hooks/useScoreboardLogic';
import { ScoreboardProps } from '@/types/scoreboardTypes';

export default function Scoreboard({ gameState }: ScoreboardProps) {
  const { xWins, oWins } = useScoreboardLogic(gameState);

  return (
    <div className="flex gap-8 p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <span className="text-blue-400 font-bold text-xl">{gameState.playerXName}</span>
        <span className="text-white text-lg">{xWins}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-purple-500 font-bold text-xl">{gameState.playerOName}</span>
        <span className="text-white text-lg">{oWins}</span>
      </div>
    </div>
  );
}