import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().or(z.literal("")),
  country: z.string().max(80).optional().or(z.literal("")),
  // honeypot
  website: z.string().max(0).optional().or(z.literal("")),
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot — silently succeed (don't tip off the bot)
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
  const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
  const userAgent = req.headers.get("user-agent") || "";

  const payload = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || "",
    country: parsed.data.country || "",
    source: "waitlist-page",
    userAgent,
  };

  // PRIMARY: Google Apps Script → Google Sheet
  if (sheetsUrl) {
    try {
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.ok === false) {
        console.error("[waitlist] Sheets webhook failed:", res.status, json);
        return NextResponse.json(
          { ok: false, error: json.error || "Submission failed" },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true, sink: "sheets" });
    } catch (err) {
      console.error("[waitlist] Sheets webhook error:", err);
      return NextResponse.json({ ok: false, error: "Network error" }, { status: 502 });
    }
  }

  // FALLBACK: Web3Forms
  if (web3FormsKey && web3FormsKey !== "your_web3forms_access_key_here") {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: "New Validating Relationships waitlist signup",
          from_name: "Validating Relationships waitlist",
          ...payload,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) {
        return NextResponse.json(
          { ok: false, error: json.message || "Submission failed" },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true, sink: "web3forms" });
    } catch (err) {
      console.error("[waitlist] Web3Forms error:", err);
      return NextResponse.json({ ok: false, error: "Network error" }, { status: 502 });
    }
  }

  // DEMO mode — neither configured. Log and succeed so dev UX works.
  console.info("[waitlist] DEMO mode (set SHEETS_WEBHOOK_URL or WEB3FORMS_ACCESS_KEY):", payload);
  return NextResponse.json({ ok: true, demo: true });
}
