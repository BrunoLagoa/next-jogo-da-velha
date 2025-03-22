import { CONFETTI_DURATION_MS } from '@/config/confettiConfig';
import { useEffect, useState } from 'react';

export const useConfetti = (winner: string | null) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      setOpacity(1);
      const interval = setInterval(() => {
        setOpacity((prevOpacity) => Math.max(0, prevOpacity - 0.01));
      }, CONFETTI_DURATION_MS / 100);
      const timer = setTimeout(() => {
        clearInterval(interval);
        setShowConfetti(false);
      }, CONFETTI_DURATION_MS);
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [winner]);

  return { showConfetti, opacity };
};