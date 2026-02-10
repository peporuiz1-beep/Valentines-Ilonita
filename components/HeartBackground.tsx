
import React, { useMemo } from 'react';

const HeartBackground: React.FC = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 20}s`,
      size: `${15 + Math.random() * 20}px`,
      opacity: 0.1 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-300 animate-float"
          style={{
            left: heart.left,
            fontSize: heart.size,
            opacity: heart.opacity,
            animation: `float ${heart.duration} linear infinite`,
            animationDelay: heart.delay,
            bottom: '-50px',
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
          }
        }
        .animate-float {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default HeartBackground;
