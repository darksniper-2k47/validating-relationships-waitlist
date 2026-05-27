"use client";

import { useEffect, useState } from "react";
import { formatTimeLeft } from "@/lib/utils";

const TARGET = new Date("2026-06-15T09:00:00+02:00").getTime(); // June 15, 2026 09:00 SAST

interface Props {
  variant?: "compact" | "full";
  label?: string;
}

export default function Countdown({ variant = "compact", label }: Props) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = formatTimeLeft(TARGET - now);

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 font-body text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-parchment-mute shrink-0">
        {label && <span className="hidden md:inline">{label}</span>}
        <div className="flex items-center gap-1 sm:gap-1.5 font-mono text-covenant-bright">
          <Cell n={t.d} u="d" />
          <span className="opacity-40">:</span>
          <Cell n={t.h} u="h" />
          <span className="opacity-40">:</span>
          <Cell n={t.m} u="m" />
          <span className="opacity-40 hidden xs:inline">:</span>
          <span className="hidden xs:inline"><Cell n={t.s} u="s" /></span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-md">
      {[
        { n: t.d, u: "Days" },
        { n: t.h, u: "Hours" },
        { n: t.m, u: "Min" },
        { n: t.s, u: "Sec" },
      ].map((b) => (
        <div
          key={b.u}
          className="glass flex flex-col items-center px-4 py-5 sm:py-6"
        >
          <span className="font-display italic text-[clamp(36px,5vw,56px)] font-semibold leading-none text-covenant-bright tabular-nums glow-gold">
            {String(b.n).padStart(2, "0")}
          </span>
          <span className="mt-2 font-body text-[10px] font-medium uppercase tracking-[0.24em] text-parchment-mute">
            {b.u}
          </span>
        </div>
      ))}
    </div>
  );
}

function Cell({ n, u }: { n: number; u: string }) {
  return (
    <span className="tabular-nums">
      {String(n).padStart(2, "0")}
      <span className="opacity-60 ml-0.5">{u}</span>
    </span>
  );
}
