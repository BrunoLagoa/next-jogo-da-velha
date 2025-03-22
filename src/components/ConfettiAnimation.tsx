import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { ConfettiAnimationProps } from '@/types/confettiAnimationTypes';

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ winner }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  return showConfetti ? (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={false}
      numberOfPieces={500}
    />
  ) : null;
};

export default ConfettiAnimation;