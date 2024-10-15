'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

interface ConfettiWrapperProps {
  trigger: boolean;
}

const ConfettiWrapper: React.FC<ConfettiWrapperProps> = ({ trigger }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial size
    updateWindowSize();

    // Add event listener
    window.addEventListener('resize', updateWindowSize);

    // Clean up
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    if (trigger) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return showConfetti ? (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      colors={['#f44336', '#9c27b0', '#3f51b5']}
      gravity={0.2}
    />
  ) : null;
};

export default ConfettiWrapper;
