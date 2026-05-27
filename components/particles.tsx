"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  twinkle: number;
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;

    const seed = () => {
      const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: -(Math.random() * 0.25 + 0.05),
        vx: (Math.random() - 0.5) * 0.1,
        a: Math.random() * 0.4 + 0.15,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      seed();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += 0.02;
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        const a = p.a * (0.7 + 0.3 * Math.sin(p.twinkle));
        ctx.beginPath();
        ctx.fillStyle = `rgba(244, 197, 66, ${a})`;
        ctx.shadowColor = "rgba(244, 197, 66, 0.6)";
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
