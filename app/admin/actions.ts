"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, SESSION_SECONDS, checkPassword, createToken } from "@/lib/adminAuth";

export type LoginState = { error?: string };

const fails = new Map<string, number[]>(); // best-effort per-instance brute-force limit

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const ip = ((await headers()).get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (fails.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return { error: "Too many attempts. Please wait a few minutes." };

  const password = formData.get("password");
  const token = typeof password === "string" && checkPassword(password) ? createToken() : null;
  if (!token) {
    recent.push(now);
    fails.set(ip, recent);
    await new Promise((r) => setTimeout(r, 700));
    return { error: "Incorrect password." };
  }

  fails.delete(ip);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
  redirect("/admin");
}
