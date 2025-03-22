import React from 'react';
import Confetti from 'react-confetti';
import { ConfettiAnimationProps } from '@/types/confettiAnimationTypes';
import { useConfetti } from '@/hooks/useConfetti';
import { getConfettiConfig } from '@/config/confettiConfig';

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ winner }) => {
  const { showConfetti, opacity } = useConfetti(winner);

  return (
    showConfetti && (
      <Confetti
        width={getConfettiConfig().WIDTH}
        height={getConfettiConfig().HEIGHT}
        recycle={getConfettiConfig().RECYCLE}
        numberOfPieces={getConfettiConfig().NUMBER_OF_PIECES}
        opacity={opacity}
      />
    )
  );
};

export default ConfettiAnimation;
