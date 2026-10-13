export type RsvpRow = { time: string; name: string; attending: string; message: string };
export type RsvpResult = { ok: true; rows: RsvpRow[] } | { ok: false; error: "not_configured" | "script_outdated" | "upstream" };

export async function fetchRsvps(): Promise<RsvpResult> {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;
  if (!url || !secret) return { ok: false, error: "not_configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, action: "list" }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok === true && Array.isArray(data.rows)) return { ok: true, rows: data.rows.slice().reverse() };
    // The old script version has no "list" action and answers "invalid".
    if (data?.error === "invalid") return { ok: false, error: "script_outdated" };
    return { ok: false, error: "upstream" };
  } catch {
    return { ok: false, error: "upstream" };
  }
}
