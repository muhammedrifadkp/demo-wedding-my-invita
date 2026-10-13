"use client";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"" | "yes" | "no">("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<{ name?: string; attending?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const n = name.trim();
    const errs: typeof errors = {};
    if (n.length < 2) errs.name = "Please enter your full name.";
    if (!attending) errs.attending = "Please let us know if you can attend.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, attending, message: message.trim(), website, elapsed: Date.now() - started.current }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus("success");
        return;
      }
      setErrMsg(
        data?.error === "rate_limited"
          ? "Too many attempts. Please try again in a few minutes."
          : data?.error === "not_configured"
            ? "RSVP is not available right now. Please try again later."
            : "We couldn't save your response. Please try again.",
      );
    } catch {
      setErrMsg("Network problem. Please check your connection and try again.");
    }
    setStatus("error"); // form values are kept
  }

  if (status === "success") {
    return (
      <div className="rsvp-ok" role="status">
        <p className="script">Thank you!</p>
        <p>Thank you for your response! May Allah bless you. ❤️</p>
      </div>
    );
  }

  const sending = status === "sending";
  return (
    <form className="rsvp" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="r-name">Full Name</label>
        <input id="r-name" name="name" type="text" autoComplete="name" maxLength={80} required value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "r-name-e" : undefined} />
        {errors.name && <p className="ferr" id="r-name-e" role="alert">{errors.name}</p>}
      </div>

      <fieldset className="field" aria-describedby={errors.attending ? "r-att-e" : undefined}>
        <legend>Will you attend the wedding?</legend>
        <label className={`opt${attending === "yes" ? " sel" : ""}`}>
          <input type="radio" name="attending" value="yes" checked={attending === "yes"} onChange={() => setAttending("yes")} />
          <span>Yes, Insha Allah</span>
        </label>
        <label className={`opt${attending === "no" ? " sel" : ""}`}>
          <input type="radio" name="attending" value="no" checked={attending === "no"} onChange={() => setAttending("no")} />
          <span>Sorry, unable to attend</span>
        </label>
        {errors.attending && <p className="ferr" id="r-att-e" role="alert">{errors.attending}</p>}
      </fieldset>

      <div className="field">
        <label htmlFor="r-msg">Message or Duas for the Couple <small>(optional)</small></label>
        <textarea id="r-msg" name="message" rows={4} maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} />
        <small className="count-chars">{message.length}/500</small>
      </div>

      <div className="hp" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>

      {status === "error" && <p className="ferr form-err" role="alert">{errMsg}</p>}
      <button type="submit" className="btn btn-gold" disabled={sending} aria-busy={sending}>
        {sending ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
