"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "@/components/countdown";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Top urgency strip — compact on mobile */}
      <div className="fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-ember-deep/95 via-ember-brown/90 to-ember-deep/95 backdrop-blur-md border-b border-covenant-gold/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-3">
          <p className="text-[10px] sm:text-[12px] font-medium tracking-wide text-parchment-mute truncate">
            <span className="text-covenant-bright font-semibold">Preorder opens</span>
            <span className="hidden xs:inline"> · </span>
            <span className="hidden xs:inline">June 15, 2026</span>
          </p>
          <Countdown variant="compact" label="Opens in" />
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`fixed top-[28px] sm:top-9 inset-x-0 z-[55] transition-all duration-500 ${
          scrolled
            ? "bg-obsidian/75 border-b border-covenant-gold/15 backdrop-blur-xl py-2.5"
            : "bg-transparent py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-9 sm:h-9" aria-hidden>
              <defs>
                <linearGradient id="g-nav" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#F4C542" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" fill="none" stroke="url(#g-nav)" strokeWidth="1.5" />
              <path
                d="M14 27 L14 13 L20 22 L26 13 L26 27"
                fill="none"
                stroke="url(#g-nav)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-[13px] sm:text-[15px] text-white">Command of Faith</span>
              <span className="hidden sm:inline font-body text-[10px] tracking-[0.2em] uppercase text-parchment-mute">
                Ministries Worldwide
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[14px] font-medium text-parchment">
            <a href="#hook" className="hover:text-covenant-bright transition-colors">The book</a>
            <a href="#framework" className="hover:text-covenant-bright transition-colors">Framework</a>
            <a href="#chapters" className="hover:text-covenant-bright transition-colors">Chapters</a>
            <a href="#author" className="hover:text-covenant-bright transition-colors">Author</a>
            <a href="#faq" className="hover:text-covenant-bright transition-colors">FAQ</a>
          </nav>

          <a
            href="#waitlist"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-covenant-gold/50 text-covenant-bright text-[13px] font-semibold tracking-wide hover:bg-covenant-gold/10 hover:border-covenant-bright transition-colors"
          >
            Join waitlist
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden w-11 h-11 inline-flex flex-col items-center justify-center gap-1.5 -mr-2 active:bg-covenant-gold/10 rounded-full"
          >
            <span className={`block w-5 h-px bg-covenant-bright transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block w-5 h-px bg-covenant-bright transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu — full-screen sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[58] md:hidden bg-obsidian/85 backdrop-blur-lg"
            />
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              aria-label="mobile"
              className="fixed top-[88px] inset-x-4 z-[59] md:hidden glass-strong p-6 flex flex-col gap-1 text-[17px]"
            >
              {[
                ["The book", "#hook"],
                ["Framework", "#framework"],
                ["Chapters", "#chapters"],
                ["Author", "#author"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-parchment hover:text-covenant-bright border-b border-covenant-gold/10 last:border-b-0 font-heading"
                >
                  {label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={() => setOpen(false)}
                className="btn-molten mt-4 px-6 py-3.5 rounded-full text-center font-semibold inline-flex items-center justify-center gap-2"
              >
                Join the waitlist
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
