import { CONFETTI_DURATION_MS } from '@/config/confettiConfig';
import { useEffect, useState } from 'react';

export const useConfetti = (winner: string | null) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  return showConfetti;
};