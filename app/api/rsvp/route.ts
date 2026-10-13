import { NextResponse } from "next/server";

export const runtime = "nodejs";

const NAME_MAX = 80;
const MSG_MAX = 500;
const hits = new Map<string, number[]>(); // best-effort per-instance rate limit

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/[ \t]+/g, " ").trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;
  if (!url || !secret) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  recent.push(now);
  hits.set(ip, recent);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Spam traps: honeypot must be empty, and a human takes more than 2.5s to fill the form.
  if (body.website || typeof body.elapsed !== "number" || body.elapsed < 2500) {
    return NextResponse.json({ ok: true }); // pretend success to bots, store nothing
  }

  const name = clean(body.name, NAME_MAX);
  const attending = body.attending === "yes" ? "Yes, Insha Allah" : body.attending === "no" ? "Sorry, unable to attend" : "";
  const message = clean(body.message, MSG_MAX);
  if (name.length < 2 || !attending) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, name, attending, message }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok === true) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
