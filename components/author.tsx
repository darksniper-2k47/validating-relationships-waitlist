"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const CREDITS = [
  ["Founder", "Command of Faith Ministries Worldwide"],
  ["Headquarters", "Cape Town, South Africa"],
  ["Focus", "Covenant, leadership, kingdom building"],
  ["Voice", "Raw honesty. Biblical depth."],
];

export default function Author() {
  return (
    <section id="author" className="relative py-20 sm:py-28 lg:py-44">
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
            About the author
          </motion.p>
          <motion.h2 variants={fadeUp} className="h2 mt-6">
            Dr. Joshua N. Simeon
          </motion.h2>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-[0.7fr_1fr] gap-10 lg:gap-20 items-start"
        >
          <motion.div variants={fadeUp} className="relative aspect-[4/5] max-w-[360px] sm:max-w-none mx-auto w-full rounded-[20px] overflow-hidden border border-covenant-gold/25 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <img
              src="/images/author.jpg"
              alt="Dr. Joshua N. Simeon — author of Validating Relationships"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
            <div aria-hidden className="absolute inset-4 border border-dashed border-covenant-gold/25 rounded-full animate-spinSlow [animation-duration:60s] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex flex-col items-center gap-1.5">
              <span className="font-display italic text-[20px] text-covenant-bright tracking-wide glow-gold">Author</span>
              <span className="font-heading font-semibold text-white text-[16px]">Dr. Joshua N. Simeon</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4 sm:space-y-5 text-[15px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-parchment">
            <p className="font-display italic text-[19px] sm:text-[22px] text-parchment">
              Founder and set man of <strong className="text-white not-italic font-semibold">Command of Faith Ministries Worldwide</strong>, a fast-growing commission headquartered in Cape Town, South Africa.
            </p>
            <p>
              A dynamic preacher with profound insight into the word. Called to raise covenant men and women, and to teach on relationships, leadership, and kingdom building with raw honesty and biblical depth.
            </p>
            <p>
              He has learned, often painfully, that the extent to which you make it in life is dependent on the kinds of relationships you allow into your life.
            </p>
            <p>
              He pastors a global ministry from Cape Town, where he lives with his family. He is still learning to validate relationships daily.
            </p>

            <ul className="mt-7 sm:mt-8 pt-7 sm:pt-8 border-t border-covenant-gold/15 grid grid-cols-2 gap-x-5 sm:gap-x-8 gap-y-4 list-none">
              {CREDITS.map(([label, val]) => (
                <li key={label}>
                  <span className="block text-[11px] tracking-[0.2em] uppercase text-covenant-gold mb-1">{label}</span>
                  <span className="text-parchment-mute text-sm">{val}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
