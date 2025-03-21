import React from 'react';

interface RestartButtonProps {
  onRestart: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onRestart }) => {
  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
      onClick={onRestart}
    >
      Reiniciar Jogo
    </button>
  );
};

export default RestartButton;