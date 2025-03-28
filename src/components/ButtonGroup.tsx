import React from 'react';
import ContinueButton from './ContinueButton';
import RestartButton from './RestartButton';
import { ButtonGroupProps } from '@/types/buttonGroupTypes';

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onContinue, onRestart }) => {
  return (
    <div className="flex gap-4">
      <ContinueButton onContinue={onContinue} />
      <RestartButton onRestart={onRestart} />
    </div>
  );
};

export default ButtonGroup;