import React, { useEffect, useRef } from 'react';

interface FireParticlesProps {
  isBurning: boolean;
}

export function FireParticles({ isBurning }: FireParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isBurning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: { x: number, y: number, radius: number, speed: number, opacity: number, color: string }[] = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        radius: Math.random() * 5 + 2,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        color: Math.random() > 0.5 ? '#ff4500' : '#ff8c00'
      });
    }

    const draw = () => {
      c.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        c.fillStyle = p.color;
        c.globalAlpha = p.opacity;
        c.beginPath();
        c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        c.fill();

        p.y -= p.speed;
        p.x += Math.sin(p.y * 0.05) * 2;
        p.opacity -= 0.005;

        if (p.y < 0 || p.opacity <= 0) {
          p.y = height + 20;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.5 + 0.5;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isBurning]);

  if (!isBurning) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
