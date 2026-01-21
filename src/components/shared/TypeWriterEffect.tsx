'use client';

import React, { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  messages: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  messages,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];

    if (isPaused) {
      // Pause when message is fully typed
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && currentText === currentMessage) {
      // Message fully typed, pause before deleting
      const timeoutId = setTimeout(() => {
        setIsPaused(true);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && currentText === '') {
      // Fully deleted, move to next message
      const timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    // Type or delete one character
    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          // Delete one character
          setCurrentText((prev) => prev.slice(0, -1));
        } else {
          // Type one character
          setCurrentText((prev) => currentMessage.slice(0, prev.length + 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    isPaused,
    currentMessageIndex,
    messages,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <div className="inline-flex items-center justify-center">
      <span className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};
