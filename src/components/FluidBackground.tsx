import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

export const FluidBackground = ({ sentiment }: { sentiment: 'happy' | 'sad' | 'neutral' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (sentiment === 'happy') {
        gradient.addColorStop(0, '#fef3c7'); // amber-50
        gradient.addColorStop(1, '#fcd34d');
      } else if (sentiment === 'sad') {
        gradient.addColorStop(0, '#eff6ff'); // blue-50
        gradient.addColorStop(1, '#bfdbfe');
      } else {
        gradient.addColorStop(0, '#fafaf9'); // stone-50
        gradient.addColorStop(1, '#e7e5e4');
      }

      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.3;
      
      // Simple fluid-like movement
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2 + Math.sin(time) * 50);
      ctx.bezierCurveTo(canvas.width / 3, canvas.height / 2 + Math.cos(time) * 100, canvas.width * 2 / 3, canvas.height / 2 - Math.sin(time) * 100, canvas.width, canvas.height / 2 + Math.cos(time) * 50);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      requestAnimationFrame(animate);
    };
    animate();
  }, [sentiment]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};
