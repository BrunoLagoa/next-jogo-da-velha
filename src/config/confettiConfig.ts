export const CONFETTI_DURATION_MS = 10000;

export const getConfettiConfig = () => {
  if (typeof window !== 'undefined') {
    return {
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight,
      RECYCLE: false,
      NUMBER_OF_PIECES: 200
    };
  }
  return {
    WIDTH: 0,
    HEIGHT: 0,
    RECYCLE: false,
    NUMBER_OF_PIECES: 0
  };
};