"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, EASE } from "@/lib/motion";

const ITEMS = [
  {
    q: "Is the book available now?",
    a: "Yes. It is available right now as an instant digital download. You buy it and the full book is yours in seconds — no waiting.",
  },
  {
    q: "How much is it, and how do I pay?",
    a: "R299 for the complete digital edition. You pay securely through Yoco — card or instant EFT, in South African Rand — and the book downloads straight after.",
  },
  {
    q: "What format is it? Will it work on my phone?",
    a: "It is a PDF. It opens on any phone, tablet, laptop, or e-reader. You get all 188 pages — every chapter and appendix.",
  },
  {
    q: "What if I have already read a lot of books on friendship and relationships?",
    a: "This one is different. Bishop Joshua has pastored, been betrayed, released members from his own ministry, and lived every story in the book. It is not therapy talk. It is a working blueprint, with covenant tests, building assessments, and a hidden enemy audit you can apply this week.",
  },
  {
    q: "Do I get the whole book, or just a sample?",
    a: "The whole book. The moment you pay, you get the complete blueprint — all 188 pages, ready to read tonight.",
  },
  {
    q: "Who is this book for?",
    a: "Pastors wounded by people they trusted. Believers confused by the word friend. Leaders who want a blueprint for who to keep close — and who to release without guilt.",
  },
  {
    q: "Is there a printed paperback?",
    a: "A printed edition is in the works. For now, the digital PDF gives you the full book today, at R299.",
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
