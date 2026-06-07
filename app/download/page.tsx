"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// Buyers land here after payment. Google Drive serves the book directly —
// verified direct-download link (no login wall, no preview screen).
const BOOK_URL =
  "https://drive.google.com/uc?export=download&id=1tntxGApxxBYHjVzODvdXzduoIi9Q87K1";

export default function DownloadPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="glass-strong w-full max-w-2xl p-8 sm:p-12 lg:p-16 text-center relative"
      >
        <div
          aria-hidden
          className="absolute -inset-16 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(244,197,66,0.12),transparent_60%)] pointer-events-none"
        />

        <motion.svg
          viewBox="0 0 64 64"
          className="w-20 h-20 mx-auto mb-7 text-covenant-bright drop-shadow-[0_0_20px_rgba(244,197,66,0.5)]"
          aria-hidden
          initial="hidden"
          animate="show"
        >
          <motion.circle
            cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.path
            d="M18 33 L28 43 L46 23" fill="none" stroke="currentColor" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          />
        </motion.svg>

        <p className="eyebrow inline-flex justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
          Thank you
        </p>

        <h1 className="font-heading font-bold text-[clamp(28px,5vw,46px)] text-white mt-6 leading-tight">
          Your copy is ready.
        </h1>

        <p className="mt-5 text-parchment max-w-md mx-auto leading-relaxed">
          <span className="italic-light">Validating Relationships</span> by Dr. Joshua N. Simeon.
          Tap below to download the book as a PDF. It opens on any phone, tablet, or computer.
        </p>

        <div className="mt-9">
          <a
            href={BOOK_URL}
            className="btn-molten relative inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-wide overflow-hidden select-none whitespace-nowrap px-11 py-[22px] text-[17px]"
          >
            <span className="relative z-10 inline-flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              Download the book
            </span>
          </a>
        </div>

        <p className="mt-8 text-[13px] text-parchment-mute/80 max-w-sm mx-auto leading-relaxed">
          Save the file somewhere safe. If the download does not start, {" "}
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="text-covenant-bright underline underline-offset-2">
            open it in a new tab
          </a>
          .
        </p>

        <p className="font-display italic text-[20px] text-covenant-bright mt-10">
          — Bishop Joshua
        </p>
      </motion.div>
    </main>
  );
}
