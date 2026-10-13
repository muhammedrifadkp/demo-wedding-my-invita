"use client";
import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";
import { W } from "@/lib/wedding";

export default function AdminLogin() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <main className="adm adm-narrow">
      <p className="eyebrow">{W.bride.first} &amp; {W.groom.first}</p>
      <h1 className="script">RSVP Admin</h1>
      <form className="rsvp" action={action}>
        <div className="field">
          <label htmlFor="a-pw">Password</label>
          <input id="a-pw" name="password" type="password" autoComplete="current-password" required autoFocus aria-invalid={!!state.error} />
          {state.error && <p className="ferr" role="alert">{state.error}</p>}
        </div>
        <button type="submit" className="btn btn-gold" disabled={pending} aria-busy={pending}>
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
