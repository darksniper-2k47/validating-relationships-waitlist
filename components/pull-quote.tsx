"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS =
  "Stop calling everyone friend. Love all. Trust few.".split(" ");

export default function PullQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.2"] });

  return (
    <section ref={ref} className="relative py-24 sm:py-36 lg:py-56 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(244,197,66,0.12),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative">
        <p className="text-center text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-covenant-bright mb-8 sm:mb-12">
          From the book
        </p>
        <p className="font-display italic font-medium text-[clamp(30px,8vw,108px)] leading-[1.05] text-center text-white tracking-[-0.02em]">
          {WORDS.map((w, i) => {
            const start = i / WORDS.length;
            const end = start + 1 / WORDS.length;
            return (
              <ScrollWord key={i} word={w} scrollYProgress={scrollYProgress} range={[start, end]} />
            );
          })}
        </p>
        <p className="text-center mt-8 sm:mt-12 font-display italic text-[clamp(16px,3vw,26px)] text-covenant-bright">
          1 John 4:1 · John 2:24
        </p>
      </div>
    </section>
  );
}

function ScrollWord({
  word,
  scrollYProgress,
  range,
}: {
  word: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(scrollYProgress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em] glow-gold">
      {word}
    </motion.span>
  );
}
