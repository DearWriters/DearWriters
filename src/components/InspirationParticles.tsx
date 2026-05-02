import React, { useEffect, useRef } from 'react';

interface InspirationParticlesProps {
  isRaining: boolean;
}

export function InspirationParticles({ isRaining }: InspirationParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!isRaining) {
      // Stop audio
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.5);
        setTimeout(() => {
          if (noiseNodeRef.current) {
            noiseNodeRef.current.stop();
            noiseNodeRef.current.disconnect();
            noiseNodeRef.current = null;
          }
        }, 500);
      }
      return;
    }

    // Start Audio (White Noise / Rain sound)
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const bufferSize = ctx.sampleRate * 2; // 2 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Pink noise approximation for softer rain sound
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Lowpass filter to make it sound like distant rain/rumble
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.setTargetAtTime(0.3, ctx.currentTime, 1); // Fade in

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noiseNodeRef.current = noise;
    gainNodeRef.current = gain;

    // Start Particles
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

    const particles: { x: number, y: number, radius: number, speed: number, opacity: number, char: string }[] = [];
    const runes = ['✧', '✦', '⋆', '✨', '✺', '✵', '☆', '★'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random(),
        char: runes[Math.floor(Math.random() * runes.length)]
      });
    }

    const draw = () => {
      c.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        c.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        c.font = `${p.radius * 6}px serif`;
        c.fillText(p.char, p.x, p.y);

        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.5; // slight sway

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRaining]);

  if (!isRaining) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
