"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const CHAPTERS = [
  "The Architecture of Relationships",
  "Levels of Relationship — the 500, 120, 70, 12, 3",
  "The Acquaintance — keeping it casual",
  "Colleagues and Neighbors — professional and polite",
  "Casual Friends — fun but not forever",
  "Fair Weather Friends — when the going gets tough",
  "Covenant Friends — the real deal",
  "Hidden Enemies — the people closest to your destiny",
  "Personality Traits and Relationships",
  "Understanding Introverts and Extroverts",
  "The Gift of Goodbye",
  "The Covenant Recap — the essence of this book",
];

const APPENDICES = [
  "The Building Assessment Worksheet",
  "The Covenant Friendship Contract",
  "The Hidden Enemy Audit for Leaders",
];

export default function Chapters() {
  return (
    <section id="chapters" className="relative py-20 sm:py-28 lg:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.p variants={fadeUp} className="eyebrow inline-flex justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
            Inside the book
          </motion.p>
          <motion.h2 variants={fadeUp} className="h2 mt-6 mx-auto max-w-3xl">
            12 chapters.
            <br />
            <span className="italic-light">Every one earned the hard way.</span>
          </motion.h2>
        </motion.header>

        <ol className="max-w-3xl mx-auto">
          {CHAPTERS.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-8 items-baseline py-5 sm:py-6 border-b border-covenant-gold/10 hover:border-covenant-gold/40 sm:hover:pl-3 transition-all duration-500"
            >
              <span className="font-display italic font-medium text-[20px] sm:text-[26px] text-covenant-gold group-hover:text-covenant-bright transition-colors w-9 sm:w-12 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-heading font-semibold text-[16px] sm:text-[clamp(18px,2.2vw,24px)] text-parchment leading-snug">
                {c}
              </span>
              <span aria-hidden className="hidden sm:block w-6 h-px bg-covenant-gold/30 self-center group-hover:bg-covenant-bright group-hover:w-10 transition-all" />
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-12 sm:mt-16 px-6 sm:px-8 py-6 sm:py-7 rounded-2xl bg-parchment/[0.03] border border-covenant-gold/15 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 max-w-3xl mx-auto"
        >
          <p className="font-display italic text-[19px] sm:text-[22px] text-covenant-bright shrink-0">Plus three appendices</p>
          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-7 list-none">
            {APPENDICES.map((a) => (
              <li
                key={a}
                className="text-[13.5px] sm:text-sm text-parchment-mute relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-covenant-gold"
              >
                {a}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
