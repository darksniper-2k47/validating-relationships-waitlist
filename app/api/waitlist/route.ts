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

  // Honeypot — silently succeed
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, demo: false });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey || accessKey === "your_web3forms_access_key_here") {
    // DEMO mode — log it and return success so dev UX works
    console.info("[waitlist] DEMO mode (no WEB3FORMS_ACCESS_KEY set):", parsed.data);
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New Validating Relationships waitlist signup",
        from_name: "Validating Relationships waitlist",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || "",
        country: parsed.data.country || "",
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) {
      return NextResponse.json(
        { ok: false, error: json.message || "Submission failed" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, demo: false });
  } catch (err) {
    console.error("[waitlist] forwarding error", err);
    return NextResponse.json({ ok: false, error: "Network error" }, { status: 502 });
  }
}
