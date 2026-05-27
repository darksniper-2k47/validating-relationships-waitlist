"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Button from "@/components/ui/button";
import { EASE, fadeUp, letterReveal, stagger } from "@/lib/motion";

const SCRIPT_LETTERS = "Validating".split("");

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 14 });

  // Disable mouse tilt on touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={stageRef}
      id="top"
      className="relative min-h-[100svh] flex items-center pt-[120px] pb-16 sm:pt-36 sm:pb-24 lg:pt-48"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto max-w-7xl px-5 sm:px-8 w-full"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-20 items-center">
          {/* Copy */}
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="eyebrow text-[10px] sm:text-[12px]">
              <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
              New book · Releasing June 2026
            </motion.p>

            <h1 className="mt-5 sm:mt-8 leading-[0.9] tracking-[-0.03em]">
              <span className="block font-display italic font-medium text-[clamp(54px,12vw,140px)] text-covenant-bright glow-gold">
                <span className="inline-flex overflow-hidden pb-1">
                  {SCRIPT_LETTERS.map((l, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterReveal}
                      initial="hidden"
                      animate="show"
                      className="inline-block"
                    >
                      {l}
                    </motion.span>
                  ))}
                </span>
              </span>
              <motion.span
                variants={fadeUp}
                className="block font-heading font-extrabold text-[clamp(38px,9vw,104px)] text-white -mt-1 sm:-mt-2 glow-white"
              >
                Relationships
              </motion.span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 sm:mt-8 font-display italic text-[clamp(18px,4.5vw,28px)] text-parchment leading-snug border-l-2 border-covenant-gold pl-4 sm:pl-5 max-w-xl"
            >
              The extent to which you make it in life is dependent on the kind of relationships you allow into your life.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-6 sm:mt-7 max-w-lg space-y-2.5 text-parchment-mute text-[14.5px] sm:text-[15.5px] leading-relaxed"
            >
              <p>
                <span className="text-covenant-bright font-semibold">$100.</span> That is how much Bishop Joshua lent a man he called his friend.
              </p>
              <p>Months later he needed $10 back. The friend had the money. He never sent it.</p>
              <p className="text-parchment font-display italic text-[16px] sm:text-[17px]">That is the moment this book started.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <Button
                magnetic={!isTouch}
                onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto"
              >
                Join the waitlist
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex">
                  {[
                    "from-ember-brown to-covenant-dark",
                    "from-covenant-dark to-covenant-gold",
                    "from-crimson to-ember-brown",
                    "from-covenant-gold to-covenant-bright",
                  ].map((g, i) => (
                    <span
                      key={i}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-obsidian -ml-2 first:ml-0 bg-gradient-to-br ${g}`}
                    />
                  ))}
                </div>
                <p className="text-[12px] sm:text-[13px] text-parchment-mute leading-tight">
                  <strong className="text-covenant-bright font-semibold">127</strong> founding readers
                </p>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-5 sm:mt-6 text-[12px] sm:text-[13px] text-parchment-mute/75">
              Free first chapter the day preorders open. Founding-reader price. No spam.
            </motion.p>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            className="flex flex-col items-center gap-6 sm:gap-8"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <motion.div
              style={!isTouch ? { rotateX: rx, rotateY: ry, transformPerspective: 1200 } : undefined}
              className="relative w-[78%] max-w-[300px] sm:w-full sm:max-w-[440px] aspect-[4/5] animate-float will-change-transform"
            >
              <div aria-hidden className="absolute -inset-8 sm:-inset-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,197,66,0.28),transparent_60%)] blur-2xl -z-10" />
              <img
                src="/images/cover-front.jpg"
                alt="Validating Relationships by Dr. Joshua N. Simeon — book cover"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.65),0_0_0_1px_rgba(212,175,55,0.3)]"
              />
              <span className="absolute -top-3 -right-3 w-3 h-3 rounded-full bg-covenant-bright shadow-[0_0_20px_#F4C542] animate-pulse" />
              <span className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-covenant-gold shadow-[0_0_15px_#D4AF37]" />
            </motion.div>

            {/* Stat strip */}
            <div className="flex items-center gap-5 sm:gap-7 w-full max-w-[380px] sm:max-w-[420px]">
              <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[radial-gradient(circle,#F4C542_0%,#D4AF37_70%,#8B6914_100%)] flex items-center justify-center text-obsidian font-display italic font-bold text-[11px] sm:text-[13px] leading-tight text-center shadow-[0_8px_24px_rgba(212,175,55,0.4),inset_0_2px_0_rgba(255,240,180,0.6)]">
                <span aria-hidden className="absolute -inset-2 border border-dashed border-covenant-gold/40 rounded-full animate-spinSlow" />
                First<br />Edition
              </div>

              <div className="flex justify-between flex-1 gap-3">
                {[
                  { n: "12", l: "Chapters" },
                  { n: "3", l: "Apps" },
                  { n: "R299", l: "Price" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col gap-0.5">
                    <span className="font-heading font-bold text-[18px] sm:text-[22px] text-covenant-bright leading-none">{s.n}</span>
                    <span className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-parchment-mute">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint — desktop only */}
      <div aria-hidden className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-parchment-mute">
        <span>Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-covenant-gold to-transparent animate-scrollHint" />
      </div>
    </section>
  );
}
