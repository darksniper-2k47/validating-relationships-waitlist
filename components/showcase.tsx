"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-44 bg-gradient-to-b from-transparent via-ember-brown/[0.12] to-transparent"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-center"
        >
          <motion.div variants={fadeUp} className="relative max-w-[420px] sm:max-w-none mx-auto w-full">
            <motion.div
              style={{ y }}
              className="relative aspect-[5/6] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] bg-gradient-to-br from-ember-brown to-ember-deep border border-covenant-gold/20"
            >
              <img
                src="/images/cover-stack.jpg"
                alt="Validating Relationships — preorder mockup"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            <div aria-hidden className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-crimson text-parchment flex flex-col items-center justify-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_8px_24px_rgba(139,0,0,0.5)] rotate-12">
              Best
              <br />
              Seller
            </div>
          </motion.div>

          <div>
            <motion.p variants={fadeUp} className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
              A book worth waiting for
            </motion.p>
            <motion.h2 variants={fadeUp} className="h2 mt-6">
              <span className="italic-light">&ldquo;Many disappointments and heartbreaks</span>
              <br />
              can be avoided if only you can learn the art of validating relationships.&rdquo;
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-8 text-[12px] tracking-[0.15em] uppercase text-covenant-gold"
            >
              — Dr. Joshua N. Simeon, from the introduction
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
