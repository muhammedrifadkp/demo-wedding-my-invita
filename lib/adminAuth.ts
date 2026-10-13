import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE = "admin_session";
export const SESSION_SECONDS = 12 * 60 * 60;

// The signing key is derived from the password + Apps Script secret, so changing either logs everyone out.
function key() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update(`admin-session:${pw}:${process.env.APPS_SCRIPT_SECRET ?? ""}`).digest();
}

export const isConfigured = () => !!process.env.ADMIN_PASSWORD;

export function checkPassword(input: string) {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  if (!pw) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(pw).digest();
  return timingSafeEqual(a, b);
}

export function createToken() {
  const k = key();
  if (!k) return null;
  const exp = Date.now() + SESSION_SECONDS * 1000;
  return `${exp}.${createHmac("sha256", k).update(String(exp)).digest("hex")}`;
}

export function verifyToken(token: string | undefined) {
  const k = key();
  if (!k || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const expected = createHmac("sha256", k).update(exp).digest();
  const given = Buffer.from(sig, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
