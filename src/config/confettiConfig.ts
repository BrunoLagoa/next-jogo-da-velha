export const CONFETTI_DURATION_MS = 24000; // 24 segundos

export const getConfettiConfig = () => {
  if (typeof window !== 'undefined') {
    return {
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight,
      RECYCLE: false,
      NUMBER_OF_PIECES: 600
    };
  }
  return {
    WIDTH: 0,
    HEIGHT: 0,
    RECYCLE: false,
    NUMBER_OF_PIECES: 0
  };
};