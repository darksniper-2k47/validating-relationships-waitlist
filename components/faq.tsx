"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, EASE } from "@/lib/motion";

const ITEMS = [
  {
    q: "When does the book release?",
    a: "June 2026. The exact date drops to the waitlist first, two weeks before the public.",
  },
  {
    q: "How much will it cost?",
    a: "Standard pricing is R299 for the digital edition and R699 for the paperback bundle. Waitlist members get founding-reader pricing — below the public rate.",
  },
  {
    q: "Will there be a paperback?",
    a: "Yes. The paperback ships from Cape Town, South Africa. Digital downloads land in your inbox the moment preorders open.",
  },
  {
    q: "What if I have already read a lot of books on friendship and relationships?",
    a: "This one is different. Bishop Joshua has pastored, been betrayed, released members from his own ministry, and lived every story in the book. It is not therapy talk. It is a working blueprint, with covenant tests, building assessments, and a hidden enemy audit you can apply this week.",
  },
  {
    q: "Can I read a chapter first?",
    a: "Yes. Everyone on the waitlist gets Chapter 1 — The Architecture of Relationships — free, the day preorders open.",
  },
  {
    q: "Who is this book for?",
    a: "Pastors wounded by people they trusted. Believers confused by the word friend. Leaders who want a blueprint for who to keep close — and who to release without guilt.",
  },
  {
    q: "Will Bishop sign copies?",
    a: "Yes. The first 100 waitlist members who preorder the paperback get a personally signed copy.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28 lg:py-44">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.p variants={fadeUp} className="eyebrow inline-flex justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
            Frequently asked
          </motion.p>
          <motion.h2 variants={fadeUp} className="h2 mt-6">
            Questions readers ask
          </motion.h2>
        </motion.header>

        <div className="flex flex-col gap-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                className={`rounded-xl border transition-colors duration-300 ${
                  isOpen
                    ? "bg-parchment/[0.05] border-covenant-gold/40"
                    : "bg-parchment/[0.025] border-covenant-gold/15 hover:border-covenant-gold/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 min-h-[60px] flex items-center justify-between gap-4 active:bg-covenant-gold/5 transition-colors"
                >
                  <span className={`font-heading font-semibold text-[15px] sm:text-[clamp(16px,2vw,19px)] transition-colors leading-snug ${
                    isOpen ? "text-covenant-bright" : "text-parchment"
                  }`}>
                    {item.q}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="shrink-0 text-covenant-gold text-2xl leading-none font-light"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-7 pb-5 sm:pb-6 text-[14px] sm:text-[15px] leading-relaxed text-parchment-mute">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
