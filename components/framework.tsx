"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const LAYERS = [
  {
    n: "01",
    name: "Foundation",
    body: "Immovable. They are with you in winter, not just harvest. They show up because they are committed, not because it is convenient.",
    quote: "“Where you go I will go, where you stay I will stay.”",
    cite: "Ruth 1:16",
  },
  {
    n: "02",
    name: "Body",
    body: "Walls get repainted. Seasonal people. Present in peace, absent in pressure. Give them the guest room, not the master bedroom.",
    quote: "“Jesus did not commit Himself to them, because He knew all men.”",
    cite: "John 2:24",
  },
  {
    n: "03",
    name: "Roof",
    body: "Some shelter you. Some leak when the rain comes. Some fly with the wind. Replace the ones that stain your ceiling.",
    quote: "“Did you hear what pastor did?”",
    cite: "— the leaking roof, Psalm 41:9",
  },
];

export default function Framework() {
  const buildingRef = useRef<HTMLDivElement>(null);

  // The build is scrubbed against the building's OWN position: it starts as the
  // building enters from the bottom and is fully assembled by the time its
  // centre reaches the centre of the screen. Works the same on mobile + desktop,
  // and the target is the HTML container (reliable, unlike scroll on SVG nodes).
  const { scrollYProgress } = useScroll({
    target: buildingRef,
    offset: ["start end", "center center"],
  });

  const foundationY = useTransform(scrollYProgress, [0.0, 0.35], [60, 0]);
  const foundationO = useTransform(scrollYProgress, [0.0, 0.3], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.28, 0.62], [80, 0]);
  const bodyO = useTransform(scrollYProgress, [0.28, 0.58], [0, 1]);
  const roofY = useTransform(scrollYProgress, [0.55, 0.85], [-80, 0]);
  const roofO = useTransform(scrollYProgress, [0.55, 0.82], [0, 1]);
  const rainO = useTransform(scrollYProgress, [0.85, 1], [0, 0.6]);
  const captionO = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <section id="framework" className="relative py-20 sm:py-28 lg:py-44 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.p variants={fadeUp} className="eyebrow inline-flex justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
            The blueprint inside
          </motion.p>
          <motion.h2 variants={fadeUp} className="h2 mt-5 sm:mt-6 mx-auto max-w-3xl">
            Every relationship is a building.
            <br />
            <span className="italic-light">Three parts. Three risks.</span>
          </motion.h2>
        </motion.header>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-center">
          {/* CONSTRUCTING BUILDING — on mobile this sits AFTER the 3 cards (the payoff); on desktop it's the left column */}
          <div
            ref={buildingRef}
            className="order-2 lg:order-1 relative aspect-[3/4] max-w-[300px] sm:max-w-md mx-auto w-full mt-6 lg:mt-0"
          >
            <div aria-hidden className="absolute -inset-12 bg-[radial-gradient(circle_at_center,rgba(244,197,66,0.12),transparent_70%)] blur-2xl rounded-full" />

            <svg viewBox="0 0 300 400" className="relative w-full h-full">
              <defs>
                <linearGradient id="goldStroke" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#F4C542" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
                <linearGradient id="bodyFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(244,197,66,0.18)" />
                  <stop offset="100%" stopColor="rgba(61,36,26,0.5)" />
                </linearGradient>
                <linearGradient id="roofGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8B0000" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#3D241A" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Sky lines */}
              <g opacity="0.25">
                <line x1="0" y1="60" x2="300" y2="60" stroke="url(#goldStroke)" strokeWidth="0.5" strokeDasharray="2 6" />
                <line x1="0" y1="190" x2="300" y2="190" stroke="url(#goldStroke)" strokeWidth="0.5" strokeDasharray="2 6" />
                <line x1="0" y1="320" x2="300" y2="320" stroke="url(#goldStroke)" strokeWidth="0.5" strokeDasharray="2 6" />
              </g>

              {/* Rain (only when roof is up) */}
              <motion.g style={{ opacity: rainO }}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <line
                    key={i}
                    x1={20 + i * 20}
                    y1={20}
                    x2={28 + i * 20}
                    y2={60}
                    stroke="rgba(244,233,213,0.5)"
                    strokeWidth="1"
                  />
                ))}
              </motion.g>

              {/* Roof */}
              <motion.g style={{ y: roofY, opacity: roofO }}>
                <path d="M30 130 L150 60 L270 130 Z" fill="url(#roofGrad)" stroke="url(#goldStroke)" strokeWidth="1.5" />
                <path d="M50 130 L80 110 L80 130 Z M220 130 L250 110 L250 130 Z" fill="rgba(139,0,0,0.4)" />
                <text x="150" y="105" textAnchor="middle" fontSize="10" fill="#D4AF37" letterSpacing="2" fontFamily="var(--font-inter)">
                  ROOF
                </text>
              </motion.g>

              {/* Body */}
              <motion.g style={{ y: bodyY, opacity: bodyO }}>
                <rect x="40" y="130" width="220" height="170" fill="url(#bodyFill)" stroke="url(#goldStroke)" strokeWidth="1.5" />
                <line x1="100" y1="130" x2="100" y2="300" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
                <line x1="150" y1="130" x2="150" y2="300" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
                <line x1="200" y1="130" x2="200" y2="300" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
                <rect x="60" y="160" width="30" height="40" fill="rgba(244,197,66,0.18)" />
                <rect x="115" y="160" width="30" height="40" fill="rgba(244,197,66,0.18)" />
                <rect x="170" y="160" width="30" height="40" fill="rgba(244,197,66,0.18)" />
                <rect x="225" y="160" width="30" height="40" fill="rgba(244,197,66,0.18)" />
                <rect x="60" y="230" width="30" height="60" fill="rgba(244,197,66,0.18)" />
                <rect x="115" y="230" width="30" height="60" fill="rgba(244,197,66,0.18)" />
                <rect x="170" y="230" width="30" height="60" fill="rgba(244,197,66,0.18)" />
                <rect x="225" y="230" width="30" height="60" fill="rgba(244,197,66,0.18)" />
                <text x="150" y="225" textAnchor="middle" fontSize="10" fill="#D4AF37" letterSpacing="2" fontFamily="var(--font-inter)">
                  BODY
                </text>
              </motion.g>

              {/* Foundation */}
              <motion.g style={{ y: foundationY, opacity: foundationO }}>
                <rect x="20" y="300" width="260" height="50" fill="rgba(212,175,55,0.25)" stroke="url(#goldStroke)" strokeWidth="2" />
                <line x1="20" y1="320" x2="280" y2="320" stroke="rgba(244,197,66,0.4)" strokeWidth="0.5" />
                <line x1="20" y1="340" x2="280" y2="340" stroke="rgba(244,197,66,0.4)" strokeWidth="0.5" />
                <text x="150" y="332" textAnchor="middle" fontSize="11" fill="#F4C542" letterSpacing="3" fontFamily="var(--font-inter)" fontWeight="600">
                  FOUNDATION
                </text>
                {/* Ground */}
                <line x1="0" y1="358" x2="300" y2="358" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                {Array.from({ length: 30 }).map((_, i) => (
                  <line
                    key={i}
                    x1={i * 10}
                    y1={360}
                    x2={i * 10 + 4}
                    y2={370}
                    stroke="rgba(212,175,55,0.2)"
                    strokeWidth="0.5"
                  />
                ))}
              </motion.g>
            </svg>

            <motion.div
              style={{ opacity: captionO }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="font-display italic text-covenant-bright text-[15px]">
                The storm reveals the structure.
              </p>
            </motion.div>
          </div>

          {/* CARDS */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            {LAYERS.map((l) => (
              <motion.article
                key={l.n}
                variants={fadeUp}
                whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.5)" }}
                className="glass p-5 sm:p-7 lg:p-9 transition-all"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="font-display italic font-semibold text-[44px] sm:text-[56px] leading-none text-covenant-gold/40 shrink-0">
                    {l.n}
                  </span>
                  <div className="flex-1 flex flex-col gap-2.5 sm:gap-3 min-w-0">
                    <h3 className="font-heading font-bold text-[22px] sm:text-[28px] text-white tracking-tight leading-tight">
                      {l.name}
                    </h3>
                    <p className="text-parchment-mute text-[14.5px] sm:text-base leading-relaxed">{l.body}</p>
                    <blockquote className="border-l border-covenant-gold/40 pl-3 sm:pl-4 mt-1 font-display italic text-covenant-bright text-[15px] sm:text-base">
                      {l.quote}
                      <cite className="block not-italic mt-1.5 font-body text-[10px] tracking-[0.2em] uppercase text-parchment-mute">
                        {l.cite}
                      </cite>
                    </blockquote>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
