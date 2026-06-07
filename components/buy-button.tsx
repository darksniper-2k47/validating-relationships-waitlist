"use client";

import { useState } from "react";
import Button from "@/components/ui/button";

interface Props {
  label?: string;
  size?: "md" | "lg";
  variant?: "molten" | "ghost";
  className?: string;
  magnetic?: boolean;
  showArrow?: boolean;
  /** Extra wrapper class so the error line aligns with the button context. */
  wrapClassName?: string;
}

export default function BuyButton({
  label = "Buy now — R299",
  size = "md",
  variant = "molten",
  className = "",
  magnetic = true,
  showArrow = true,
  wrapClassName = "",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function buy() {
    if (loading) return;
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl; // off to Yoco's secure page
        return;
      }
      if (data.error === "not_configured") {
        setErr("Checkout goes live the moment Yoco is connected.");
      } else {
        setErr(data.error || "Could not start checkout. Please try again.");
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={wrapClassName || (className.includes("w-full") ? "w-full" : "inline-flex flex-col")}>
      <Button
        variant={variant}
        size={size}
        magnetic={magnetic}
        onClick={buy}
        disabled={loading}
        className={className}
      >
        {loading ? (
          <>
            <span className="inline-block w-5 h-5 rounded-full border-2 border-current/30 border-t-current animate-spin" />
            Opening checkout…
          </>
        ) : (
          <>
            {label}
            {showArrow && (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </>
        )}
      </Button>
      {err && (
        <p className="mt-2 text-[12px] text-covenant-bright/90 leading-snug">{err}</p>
      )}
    </div>
  );
}
