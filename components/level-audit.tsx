"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, EASE } from "@/lib/motion";
import BuyButton from "@/components/buy-button";

type Layer = "foundation" | "body" | "roof";

const QUESTIONS: { q: string; options: { label: string; layer: Layer }[] }[] = [
  {
    q: "Your closest friend just called you crying — he lost his job. What do you actually do?",
    options: [
      { label: "Drive over that night. Stay until he sleeps.", layer: "foundation" },
      { label: "Send a long voice note. Check in tomorrow.", layer: "body" },
      { label: "Tell two other people what happened. Pray for him from far.", layer: "roof" },
    ],
  },
  {
    q: "You corrected someone publicly last Sunday. By the next week they are nowhere to be found. You feel:",
    options: [
      { label: "Sad — but you would correct them again. The work is worth it.", layer: "foundation" },
      { label: "Confused. You did not think it was that serious.", layer: "body" },
      { label: "Relieved. They were not really with you anyway.", layer: "roof" },
    ],
  },
  {
    q: "A foundation friend asks to borrow R5,000. You currently have R6,000 in the bank. You:",
    options: [
      { label: "Give it. He will pay back when he can. He always does.", layer: "foundation" },
      { label: "Give half. Explain the math. No hard feelings.", layer: "body" },
      { label: "Say you cannot right now. He has not earned that yet.", layer: "roof" },
    ],
  },
  {
    q: "Someone in your inner circle starts a quiet whisper about you. You find out. You:",
    options: [
      { label: "Confront in love. Restore if possible. Reposition if not.", layer: "foundation" },
      { label: "Cool the relationship down quietly. Stop sharing as much.", layer: "body" },
      { label: "Cut them off immediately. They proved who they are.", layer: "roof" },
    ],
  },
  {
    q: "When you imagine your life in five years, which kind of friend do you have the fewest of?",
    options: [
      { label: "Foundation friends who would die on the hill with you.", layer: "foundation" },
      { label: "Body friends who serve a season faithfully then move on.", layer: "body" },
      { label: "Honestly, I cannot tell who is who. That is the problem.", layer: "roof" },
    ],
  },
];

const RESULTS: Record<Layer, { title: string; verdict: string; advice: string }> = {
  foundation: {
    title: "You are building on foundation.",
    verdict:
      "Most of your access goes to people who would still call you brother if everything else burned. Honor them. The danger now is missing the body-level people you think are foundation but are not.",
    advice: "Chapter 7 — Covenant Friends — will sharpen the rare ones you already have. Chapter 8 — Hidden Enemies — will reveal who is sitting at the wrong table.",
  },
  body: {
    title: "You are mostly building the body.",
    verdict:
      "You are giving body-level people foundation-level access. That is where the heartbreak comes from. Re-validate this year, before the next storm.",
    advice: "Read Chapter 1 — The Architecture of Relationships — and Chapter 8 — Hidden Enemies — first. David knew how to fight Goliath. It was Ahithophel that broke him.",
  },
  roof: {
    title: "Your roof is too crowded.",
    verdict:
      "You are surrounded by people who are present but not committed. When the storm comes, some will leave, and some will leak. You can feel it already.",
    advice: "Chapter 11 — The Gift of Goodbye — is going to feel like a release. It is the blueprint Bishop Joshua wishes he had at 25.",
  },
};

export default function LevelAudit() {
  const [step, setStep] = useState(0);
  const [counts, setCounts] = useState<Record<Layer, number>>({ foundation: 0, body: 0, roof: 0 });
  const [done, setDone] = useState(false);

  const answer = (layer: Layer) => {
    const next = { ...counts, [layer]: counts[layer] + 1 };
    setCounts(next);
    if (step + 1 >= QUESTIONS.length) setDone(true);
    else setStep(step + 1);
  };

  const winner: Layer = Object.entries(counts).reduce<[Layer, number]>(
    (best, [k, v]) => (v > best[1] ? [k as Layer, v] : best),
    ["foundation", -1]
  )[0];
  const result = RESULTS[winner];
  const progress = (step / QUESTIONS.length) * 100;

  const reset = () => {
    setStep(0);
    setCounts({ foundation: 0, body: 0, roof: 0 });
    setDone(false);
  };

  return (
    <section className="relative py-20 sm:py-28 lg:py-44">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.p variants={fadeUp} className="eyebrow inline-flex justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
            Before you buy
          </motion.p>
          <motion.h2 variants={fadeUp} className="h2 mt-6 mx-auto max-w-2xl">
            Find out which kind of friend
            <br />
            <span className="italic-light">you are giving the most access to.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-parchment-mute max-w-xl mx-auto">
            Five honest questions. Sixty seconds. No email required to see the result.
          </motion.p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="glass-strong p-6 sm:p-10 lg:p-16 relative overflow-hidden"
        >
          <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-covenant-gold/10">
            <motion.div
              className="h-full bg-gradient-to-r from-covenant-gold via-covenant-bright to-covenant-dark"
              animate={{ width: `${done ? 100 : progress}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="font-body text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-covenant-bright mb-4 sm:mb-6">
                  Question {step + 1} of {QUESTIONS.length}
                </p>
                <h3 className="font-heading text-[clamp(20px,4.5vw,38px)] leading-tight text-white font-bold tracking-tight mb-8 sm:mb-10 text-balance">
                  {QUESTIONS[step].q}
                </h3>
                <div className="flex flex-col gap-3">
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => answer(opt.layer)}
                      data-magnetic
                      className="group text-left rounded-xl border border-covenant-gold/20 bg-parchment/[0.02] hover:bg-parchment/[0.06] active:bg-parchment/[0.08] hover:border-covenant-gold/50 px-4 sm:px-6 py-4 sm:py-5 min-h-[60px] transition-all duration-300 flex items-center gap-4 sm:gap-5"
                    >
                      <span className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full border border-covenant-gold/40 flex items-center justify-center text-covenant-gold group-hover:bg-covenant-gold group-hover:text-obsidian transition-colors font-semibold text-sm">
                        →
                      </span>
                      <span className="text-parchment group-hover:text-white font-medium transition-colors text-[14.5px] sm:text-base leading-snug">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-center"
              >
                <p className="font-body text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-covenant-bright mb-4 sm:mb-6">
                  Your result
                </p>
                <h3 className="font-heading font-bold text-[clamp(24px,5.5vw,48px)] leading-tight text-white mb-5 sm:mb-6 max-w-2xl mx-auto text-balance">
                  {result.title}
                </h3>
                <p className="text-parchment text-[15px] sm:text-lg max-w-2xl mx-auto mb-5 sm:mb-6 leading-relaxed">{result.verdict}</p>
                <p className="font-display italic text-[clamp(16px,3.5vw,24px)] text-covenant-bright max-w-2xl mx-auto mb-8 sm:mb-10">
                  {result.advice}
                </p>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto mb-8 sm:mb-10">
                  {(["foundation", "body", "roof"] as Layer[]).map((l) => (
                    <div key={l} className={`rounded-lg p-3 sm:p-4 border ${winner === l ? "border-covenant-bright bg-covenant-gold/10" : "border-covenant-gold/15 bg-parchment/[0.02]"}`}>
                      <div className="font-display italic text-xl sm:text-2xl font-semibold text-covenant-bright">{counts[l]}</div>
                      <div className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-parchment-mute mt-1">{l}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                  <BuyButton size="lg" label="Buy now — R299" className="w-full sm:w-auto justify-center" />
                  <button
                    onClick={reset}
                    className="text-covenant-gold hover:text-covenant-bright text-sm underline-offset-4 hover:underline transition-colors py-2"
                  >
                    Take the test again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
