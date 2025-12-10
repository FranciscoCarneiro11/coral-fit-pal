import { useCallback } from "react";
import confetti from "canvas-confetti";

export const useConfetti = () => {
  const triggerConfetti = useCallback(() => {
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5A5F', '#FF8A8E', '#FFB3B5', '#4ECDC4', '#45B7AA'],
    });

    // Second burst with slight delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF5A5F', '#FF8A8E', '#FFB3B5'],
      });
    }, 150);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4ECDC4', '#45B7AA', '#38A69A'],
      });
    }, 300);
  }, []);

  const triggerSmallConfetti = useCallback(() => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FF5A5F', '#FF8A8E'],
      scalar: 0.8,
    });
  }, []);

  return { triggerConfetti, triggerSmallConfetti };
};
