"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "@/components/countdown";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("waitlist");
    if (!form) return;

    let pastHero = false;
    let inForm = false;

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.8;
      setVisible(pastHero && !inForm);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inForm = entry.isIntersecting;
        setVisible(pastHero && !inForm);
      },
      { rootMargin: "0px 0px -40% 0px" }
    );
    io.observe(form);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[55] md:hidden pointer-events-none"
        >
          <div className="relative pointer-events-auto">
            <div aria-hidden className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
            <div className="bg-obsidian/90 backdrop-blur-xl border-t border-covenant-gold/20 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <p className="text-[11px] font-medium text-parchment-mute">
                  <span className="text-covenant-bright font-semibold">Preorder opens in</span>
                </p>
                <Countdown variant="compact" />
              </div>
              <a
                href="#waitlist"
                className="btn-molten flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-[15px]"
              >
                Join the waitlist
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
