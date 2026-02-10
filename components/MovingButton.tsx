
import React, { useState, useRef, useEffect } from 'react';

interface MovingButtonProps {
  children: React.ReactNode;
  className?: string;
}

const MovingButton: React.FC<MovingButtonProps> = ({ children, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    const btn = buttonRef.current;
    if (!btn) return;

    // Get viewport dimensions
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Get button dimensions
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    // Calculate random position within bounds
    // We keep it at least 50px away from edges
    const newX = Math.random() * (vw - btnWidth - 100) + 50;
    const newY = Math.random() * (vh - btnHeight - 100) + 50;

    // Relative to the current viewport scroll or absolute?
    // Let's use fixed positioning for the button so we use absolute screen coords.
    setPosition({ x: newX, y: newY });
  };

  // On first move attempt, we switch to fixed positioning
  const [isFixed, setIsFixed] = useState(false);

  const handleInteraction = () => {
    if (!isFixed) setIsFixed(true);
    moveButton();
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
      className={`${className} transition-all duration-300 ease-out ${
        isFixed ? 'fixed z-50' : 'relative'
      }`}
      style={
        isFixed
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
            }
          : {}
      }
    >
      {children}
    </button>
  );
};

export default MovingButton;
