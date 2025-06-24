import { CONFETTI_DURATION_MS } from '@/config/confettiConfig';
import { useEffect, useState, useMemo } from 'react';

export const useConfetti = (winner: string | null | boolean) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [opacity, setOpacity] = useState(1);

  // Memoriza quando deve mostrar confetti
  const shouldShow = useMemo(() => {
    return winner !== null && winner !== undefined;
  }, [winner]);

  useEffect(() => {
    if (shouldShow) {
      setShowConfetti(true);
      setOpacity(1);

      const interval = setInterval(() => {
        setOpacity(prev => {
          const newOpacity = Math.max(0, prev - 0.01);
          return newOpacity;
        });
      }, CONFETTI_DURATION_MS / 100);

      const timer = setTimeout(() => {
        clearInterval(interval);
        setShowConfetti(false);
        setOpacity(1);
      }, CONFETTI_DURATION_MS);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      setShowConfetti(false);
      setOpacity(1);
    }
  }, [shouldShow]);

  return { showConfetti, opacity };
};