import React from 'react';
import { ContinueButtonProps } from '@/types/continueButtonTypes';

const ContinueButton: React.FC<ContinueButtonProps> = ({ onContinue }) => {
  return (
    <button
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
      onClick={onContinue}
    >
      Continuar
    </button>
  );
};

export default ContinueButton;