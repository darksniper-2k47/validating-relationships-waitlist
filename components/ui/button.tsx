"use client";

import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  variant?: "molten" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "molten", size = "md", magnetic = true, children, ...props },
  ref
) {
  const localRef = useRef<HTMLButtonElement | null>(null);
  const setRef = (el: HTMLButtonElement | null) => {
    localRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
  };

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 14, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 14, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic) return;
    const el = localRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-wide overflow-hidden select-none whitespace-nowrap";
  const sizes = { md: "px-8 py-4 text-[15px]", lg: "px-11 py-[22px] text-[17px]" };
  const variants = {
    molten: "btn-molten",
    ghost:
      "border border-covenant-gold/40 text-covenant-gold hover:bg-covenant-gold/10 hover:border-covenant-bright transition-colors",
  };

  return (
    <motion.button
      ref={setRef}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-magnetic={magnetic ? "" : undefined}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(props as object)}
    >
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </motion.button>
  );
});

export default Button;
