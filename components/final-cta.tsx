"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/motion";

export default function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-40 text-center pb-32 sm:pb-28 lg:pb-40">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="eyebrow inline-flex justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
            One last thing
          </motion.p>
          <motion.h2 variants={fadeUp} className="h2 mt-6 mx-auto">
            <span className="italic-light">Stop calling everyone friend.</span>
            <br />
            Get the blueprint instead.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 text-parchment-mute max-w-xl mx-auto">
            Save your spot below before founding-reader pricing closes.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Reserve my copy
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
