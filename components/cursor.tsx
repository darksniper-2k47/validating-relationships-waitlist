"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || isTouch || reduce) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let dx = 0, dy = 0;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest("a, button, summary, input, label, [data-magnetic]");
      hovering = !!t;
      if (ringRef.current) {
        ringRef.current.style.width = hovering ? "62px" : "36px";
        ringRef.current.style.height = hovering ? "62px" : "36px";
        ringRef.current.style.borderColor = hovering ? "#F4C542" : "#D4AF37";
        ringRef.current.style.background = hovering ? "rgba(244,197,66,0.08)" : "transparent";
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dx += (mx - dx) * 0.5;
      dy += (my - dy) * 0.5;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-[1.5px] transition-[width,height,background,border-color] duration-300 ease-out"
        style={{
          width: 36,
          height: 36,
          borderColor: "#D4AF37",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] w-1 h-1 rounded-full bg-covenant-bright"
      />
    </>
  );
}
