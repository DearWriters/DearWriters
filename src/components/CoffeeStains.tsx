import React, { useEffect } from 'react';

interface CoffeeStain {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  type: number;
}

interface CoffeeStainsProps {
  stains: CoffeeStain[];
  onRemoveStain: (id: string) => void;
}

export function CoffeeStains({ stains, onRemoveStain }: CoffeeStainsProps) {
  useEffect(() => {
    stains.forEach((stain) => {
      const timer = setTimeout(() => {
        onRemoveStain(stain.id);
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [stains, onRemoveStain]);

  if (stains.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {stains.map((stain) => (
        <div
          key={stain.id}
          className="absolute mix-blend-multiply animate-fade-out"
          style={{
            left: `${stain.x}%`,
            top: `${stain.y}%`,
            transform: `translate(-50%, -50%) rotate(${stain.rotation}deg) scale(${stain.scale})`,
            opacity: stain.opacity,
            // @ts-ignore
            '--stain-opacity': stain.opacity,
          } as React.CSSProperties}
        >
          {stain.type === 0 ? (
            // Simple coffee ring
            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#5c4a3d" strokeWidth="4" strokeDasharray="10 5 20 5 40 10" opacity="0.6" />
              <circle cx="100" cy="100" r="76" fill="none" stroke="#5c4a3d" strokeWidth="2" strokeDasharray="5 10 15 5" opacity="0.4" />
              <path d="M 40 100 Q 60 140 100 160" fill="none" stroke="#5c4a3d" strokeWidth="6" opacity="0.5" />
              <path d="M 160 100 Q 140 60 100 40" fill="none" stroke="#5c4a3d" strokeWidth="3" opacity="0.3" />
            </svg>
          ) : stain.type === 1 ? (
            // Splatter
            <svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="75" cy="75" r="40" fill="#5c4a3d" opacity="0.5" />
              <circle cx="30" cy="40" r="10" fill="#5c4a3d" opacity="0.4" />
              <circle cx="120" cy="90" r="15" fill="#5c4a3d" opacity="0.6" />
              <circle cx="90" cy="30" r="8" fill="#5c4a3d" opacity="0.3" />
              <circle cx="50" cy="110" r="12" fill="#5c4a3d" opacity="0.5" />
            </svg>
          ) : (
            // Double ring
            <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
              <circle cx="110" cy="110" r="90" fill="none" stroke="#4a3b31" strokeWidth="5" strokeDasharray="30 5 10 5" opacity="0.7" />
              <circle cx="105" cy="115" r="85" fill="none" stroke="#4a3b31" strokeWidth="2" opacity="0.4" />
              <path d="M 30 110 A 80 80 0 0 0 110 190" fill="none" stroke="#4a3b31" strokeWidth="8" opacity="0.6" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
