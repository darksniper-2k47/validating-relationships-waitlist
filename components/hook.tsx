"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

export default function Hook() {
  return (
    <section id="hook" className="relative py-20 sm:py-28 lg:py-44 border-t border-covenant-gold/[0.08]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-center"
        >
          <div>
            <motion.p variants={fadeUp} className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
              The question that started this book
            </motion.p>
            <motion.h2 variants={fadeUp} className="h2 mt-6 max-w-2xl">
              Have you ever said:
              <br />
              <span className="italic-light">&ldquo;I can&rsquo;t believe he would do that to me?&rdquo;</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-8 space-y-4 max-w-xl text-parchment leading-relaxed">
              <p>You called him brother. You opened your home. You bailed him out when he had nothing.</p>
              <p>Then the wind changed — and so did he.</p>
              <p>Bishop Joshua went to God on his knees to ask why people behave like this.</p>
              <p className="text-covenant-bright">The answer was not about them.</p>
            </motion.div>
          </div>

          <motion.aside variants={fadeUp} className="glass p-7 sm:p-10 lg:p-12 relative">
            <svg className="w-12 h-12 mb-6 text-covenant-gold/70" viewBox="0 0 60 60" aria-hidden>
              <path
                d="M15 20 q-10 0 -10 10 v15 h15 v-15 h-10 q0 -10 5 -10 z M40 20 q-10 0 -10 10 v15 h15 v-15 h-10 q0 -10 5 -10 z"
                fill="currentColor"
              />
            </svg>
            <p className="font-display italic text-[clamp(24px,2.5vw,32px)] leading-snug text-parchment font-medium mb-8">
              The fault is not theirs. Your problem is that you have not learned to weigh relationships wisely.
            </p>
            <p className="text-[12px] tracking-[0.15em] uppercase text-covenant-gold">
              — what the Lord told Bishop Joshua, in prayer
            </p>
          </motion.aside>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mt-14 sm:mt-24 font-display italic text-[clamp(20px,4vw,32px)] text-covenant-bright glow-gold px-4"
        >
          This book is the blueprint he wishes he had years ago.
        </motion.p>
      </div>
    </section>
  );
}
