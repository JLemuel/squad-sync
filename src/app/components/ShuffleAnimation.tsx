import React, { useEffect, useState, useCallback } from 'react';
import { Student } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ShuffleAnimationProps {
  students: Student[];
  duration: number;
  onComplete: () => void;
}

const ShuffleAnimation: React.FC<ShuffleAnimationProps> = ({ students, duration, onComplete }) => {
  const [shuffledStudents, setShuffledStudents] = useState<Student[]>([]);

  const shuffleStudents = useCallback(() => {
    const newShuffled = [...students].sort(() => Math.random() - 0.5);
    setShuffledStudents(newShuffled);
  }, [students]);

  useEffect(() => {
    const shuffleInterval = setInterval(shuffleStudents, 500);
    const timer = setTimeout(() => {
      clearInterval(shuffleInterval);
      onComplete();
    }, duration);

    return () => {
      clearInterval(shuffleInterval);
      clearTimeout(timer);
    };
  }, [duration, onComplete, shuffleStudents]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center" role="dialog" aria-label="Shuffling students">
      <div className="grid grid-cols-3 gap-4 p-8 bg-card rounded-[var(--radius)] shadow-xl">
        <AnimatePresence>
          {shuffledStudents.map((student) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              transition={{ duration: 0.5 }}
              className="bg-muted p-4 rounded-[calc(var(--radius)-0.25rem)] shadow-md flex items-center space-x-3"
            >
              <Image
                loader={({ src }) => src}
                src={student.avatarUrl}
                alt={student.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-medium truncate">{student.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShuffleAnimation;
