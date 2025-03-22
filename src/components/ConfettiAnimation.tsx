import React from 'react';
import Confetti from 'react-confetti';
import { ConfettiAnimationProps } from '@/types/confettiAnimationTypes';
import { useConfetti } from '@/hooks/useConfetti';
import { CONFETTI_CONFIG } from '@/config/confettiConfig';

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ winner }) => {
  const showConfetti = useConfetti(winner);

  return (
    showConfetti && (
      <Confetti
        width={CONFETTI_CONFIG.WIDTH}
        height={CONFETTI_CONFIG.HEIGHT}
        recycle={CONFETTI_CONFIG.RECYCLE}
        numberOfPieces={CONFETTI_CONFIG.NUMBER_OF_PIECES}
      />
    )
  );
};

export default ConfettiAnimation;
