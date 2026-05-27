"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, EASE } from "@/lib/motion";
import Button from "@/components/ui/button";

interface State {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export default function WaitlistForm() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", website: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (state.status === "loading") return;
    if (!form.name.trim() || !form.email.trim()) {
      setState({ status: "error", message: "Name and email are required." });
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setState({ status: "success" });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Network error. Try again, or email info@commandoffaith.org directly.",
      });
    }
  };

  const isSuccess = state.status === "success";

  return (
    <section id="waitlist" className="relative py-20 sm:py-28 lg:py-44 scroll-mt-24 sm:scroll-mt-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="glass-strong p-6 sm:p-10 lg:p-16 relative"
        >
          <div aria-hidden className="absolute -inset-16 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(244,197,66,0.12),transparent_60%)] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div key="form" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
                  <motion.p variants={fadeUp} className="eyebrow inline-flex justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-covenant-bright shadow-[0_0_12px_#F4C542]" />
                    Join the waitlist
                  </motion.p>
                  <motion.h2 variants={fadeUp} className="h2 mt-6">
                    Preorder opens this June.
                    <br />
                    <span className="italic-light">The waitlist gets first access.</span>
                  </motion.h2>
                  <motion.p variants={fadeUp} className="mt-6 text-parchment max-w-xl mx-auto">
                    Drop your name and email. The day preorders open, you get three things no public buyer will:
                  </motion.p>
                  <motion.ul variants={fadeUp} className="mt-6 max-w-lg mx-auto flex flex-col gap-3 text-left">
                    {[
                      "Chapter 1 — The Architecture of Relationships — sent free, the moment preorders open",
                      "Founding-reader pricing, below the public R299 standard",
                      "The Covenant Friendship Contract appendix as a signed digital download",
                    ].map((p) => (
                      <li key={p} className="flex items-start gap-3.5 text-[15px] text-parchment">
                        <span aria-hidden className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-covenant-gold/15 border border-covenant-gold text-covenant-bright flex items-center justify-center text-[11px] font-bold">
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </motion.ul>
                </motion.div>

                <form onSubmit={submit} className="mt-10" noValidate>
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={update("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] w-px h-px overflow-hidden"
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingField id="name" label="Full name" value={form.name} onChange={update("name")} required type="text" autoComplete="name" />
                    <FloatingField id="email" label="Email address" value={form.email} onChange={update("email")} required type="email" autoComplete="email" />
                    <FloatingField id="phone" label="WhatsApp or phone (optional)" value={form.phone} onChange={update("phone")} type="tel" autoComplete="tel" />
                    <FloatingField id="country" label="Country (optional)" value={form.country} onChange={update("country")} type="text" autoComplete="country-name" />
                  </div>

                  {state.status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 text-sm text-crimson"
                    >
                      {state.message}
                    </motion.p>
                  )}

                  <p className="mt-8 mb-3 text-center text-[13px] text-covenant-bright/90 tracking-wide">
                    Save your spot below before founding-reader pricing closes.
                  </p>
                  <div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={state.status === "loading"}
                    >
                      {state.status === "loading" ? (
                        <>
                          <span className="inline-block w-5 h-5 rounded-full border-2 border-obsidian/30 border-t-obsidian animate-spin" />
                          <span>Reserving your copy…</span>
                        </>
                      ) : (
                        <>
                          Reserve my copy
                          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                            <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="mt-5 text-center text-[13px] text-parchment-mute/75">
                    No spam. Your email is for book updates only. You can unsubscribe anytime.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-center py-8"
              >
                <motion.svg
                  viewBox="0 0 64 64"
                  className="w-24 h-24 mx-auto mb-6 text-covenant-bright drop-shadow-[0_0_20px_rgba(244,197,66,0.5)]"
                  aria-hidden
                  initial="hidden"
                  animate="show"
                >
                  <motion.circle
                    cx="32" cy="32" r="30"
                    fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                  <motion.path
                    d="M18 33 L28 43 L46 23"
                    fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                  />
                </motion.svg>
                <h3 className="font-heading font-bold text-[clamp(28px,4vw,42px)] text-white mb-4">
                  You are on the list.
                </h3>
                <p className="text-parchment max-w-md mx-auto leading-relaxed">
                  Watch your inbox. The day preorders open, you get the first chapter and the founding-reader rate.
                </p>
                <p className="font-display italic text-[22px] text-covenant-bright mt-8">
                  — Bishop Joshua
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingField({
  id, label, value, onChange, type = "text", required, autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full px-[18px] pt-[22px] pb-2 rounded-xl bg-black/30 border border-covenant-gold/20 focus:border-covenant-gold focus:ring-4 focus:ring-covenant-gold/15 focus:shadow-[0_0_30px_rgba(212,175,55,0.15)] text-parchment text-base outline-none transition-all duration-300"
      />
      <label
        htmlFor={id}
        className="absolute left-[18px] top-[18px] text-parchment-mute pointer-events-none transition-all duration-200 ease-out peer-focus:top-[6px] peer-focus:text-[11px] peer-focus:tracking-[0.15em] peer-focus:uppercase peer-focus:text-covenant-gold peer-[:not(:placeholder-shown)]:top-[6px] peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-[0.15em] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:text-covenant-gold text-sm"
      >
        {label}
      </label>
    </div>
  );
}
