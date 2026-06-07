import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

// Validating Relationships — digital edition
const AMOUNT_CENTS = 29900; // R299.00
const CURRENCY = "ZAR";
const PRODUCT = "validating-relationships-ebook";

export async function POST(req: Request) {
  const secret = process.env.YOCO_SECRET_KEY;

  // No key yet → tell the button to show a friendly "coming soon" message.
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  }

  // Build absolute URLs Yoco redirects back to.
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    new URL(req.url).origin;

  try {
    const res = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        amount: AMOUNT_CENTS,
        currency: CURRENCY,
        successUrl: `${origin}/download`,
        cancelUrl: `${origin}/?checkout=cancelled`,
        failureUrl: `${origin}/?checkout=failed`,
        metadata: { product: PRODUCT },
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.redirectUrl) {
      console.error("[checkout] Yoco create-checkout failed:", res.status, data);
      return NextResponse.json(
        { ok: false, error: data.message || "Could not start checkout." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, redirectUrl: data.redirectUrl, id: data.id });
  } catch (err) {
    console.error("[checkout] Yoco error:", err);
    return NextResponse.json({ ok: false, error: "Network error." }, { status: 502 });
  }
}
