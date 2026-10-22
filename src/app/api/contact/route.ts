import { NextResponse } from "next/server";

const TYPES = ["contact", "audit", "calculator"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Light, per-instance rate limit. For heavier traffic use a shared store.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 6;

function limited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

const clean = (value: unknown, max: number): string =>
  typeof value === "string" ? value.replace(/\r/g, "").trim().slice(0, max) : "";

export async function POST(request: Request) {
  // Same-origin only.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const type = TYPES.find((t) => t === body.type);
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 60);
  const role = clean(body.role, 80);
  const message = clean(body.message, 4000);
  const consent = body.consent === true;

  if (!type || !EMAIL.test(email) || !consent || (type === "contact" && (!name || message.length < 5))) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const subject = `[${type}] ${name || email}`;
  const text = [
    `Type: ${type}`,
    `Name: ${name || "(not given)"}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not given)"}`,
    `Role: ${role || "(not given)"}`,
    "",
    message || "(no message)",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log("\n--- Contact form (email not configured, logged in development only) ---\n" + subject + "\n" + text + "\n");
      return NextResponse.json({ ok: true, mode: "development" });
    }
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
    });
    if (!response.ok) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
