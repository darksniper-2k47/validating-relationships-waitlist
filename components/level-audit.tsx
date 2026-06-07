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
  const [started, setStarted] = useState(false);

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
    setStarted(false);
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
          <motion.div variants={fadeUp} className="flex justify-center">
            <motion.span
              animate={{ boxShadow: ["0 0 0px rgba(244,197,66,0)", "0 0 24px rgba(244,197,66,0.5)", "0 0 0px rgba(244,197,66,0)"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2.5 rounded-full border border-covenant-gold/60 bg-covenant-gold/10 px-4 py-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-covenant-bright"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-covenant-bright opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-covenant-bright" />
              </span>
              Interactive · 60-second test
            </motion.span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="h2 mt-6 mx-auto max-w-2xl">
            Which kind of friend
            <br />
            <span className="italic-light">are you giving the most access to?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-parchment-mute max-w-xl mx-auto">
            Take the test below. Five honest questions, sixty seconds, no email. Most people are surprised by the answer.
          </motion.p>
        </motion.header>

        <div className="relative">
          <motion.div
            aria-hidden
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -inset-3 sm:-inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(244,197,66,0.18),transparent_70%)] blur-2xl"
          />
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
              !started ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-center py-2"
              >
                <h3 className="font-heading font-bold text-[clamp(22px,5vw,40px)] leading-tight text-white mb-4 text-balance">
                  Which friend are you giving the most access to?
                </h3>
                <p className="text-parchment-mute max-w-md mx-auto mb-9 text-[15px] sm:text-base leading-relaxed">
                  Five quick questions. Sixty seconds. No email. Most people are surprised by who lands where.
                </p>
                <motion.button
                  type="button"
                  onClick={() => setStarted(true)}
                  animate={{ scale: [1, 1.035, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="btn-molten inline-flex items-center justify-center gap-3 rounded-full font-semibold px-10 py-5 text-[17px]"
                >
                  Start the test
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
                <p className="mt-5 text-[12px] text-parchment-mute/70">
                  Takes about a minute · your answers stay on your device
                </p>
              </motion.div>
              ) : (
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
              )
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
      </div>
    </section>
  );
}
