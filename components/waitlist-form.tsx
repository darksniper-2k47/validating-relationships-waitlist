"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, EASE } from "@/lib/motion";
import BuyButton from "@/components/buy-button";

const PERKS = [
  "All 188 pages — the complete book, every chapter and appendix",
  "Instant PDF download — read on your phone, tablet, laptop, or e-reader",
  "Yours to keep — download it again any time you need it",
];

export default function WaitlistForm() {
  return (
    <section id="buy" className="relative py-20 sm:py-28 lg:py-44 scroll-mt-24 sm:scroll-mt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="glass-strong p-6 sm:p-10 lg:p-16 relative"
        >
          <div aria-hidden className="absolute -inset-16 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(244,197,66,0.12),transparent_60%)] pointer-events-none" />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="eyebrow inline-flex justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
              Get the book
            </motion.p>
            <motion.h2 variants={fadeUp} className="h2 mt-6">
              Read it tonight.
              <br />
              <span className="italic-light">The full blueprint, instant download.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-8 flex items-end justify-center gap-2">
              <span className="font-heading font-extrabold text-[clamp(44px,9vw,72px)] leading-none text-covenant-bright glow-gold">
                R299
              </span>
              <span className="mb-2 text-parchment-mute text-[14px]">once · no subscription</span>
            </motion.div>

            <motion.ul variants={fadeUp} className="mt-9 max-w-lg mx-auto flex flex-col gap-3 text-left">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3.5 text-[15px] text-parchment">
                  <span aria-hidden className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-covenant-gold/15 border border-covenant-gold text-covenant-bright flex items-center justify-center text-[11px] font-bold">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-10 flex justify-center">
              <BuyButton size="lg" label="Buy now — R299" className="w-full sm:w-auto justify-center" />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-center text-[13px] text-parchment-mute/75">
              Secure checkout with Yoco · card or instant EFT · South African Rand
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
