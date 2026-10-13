"use client";
import { useEffect, useState } from "react";
import { W } from "@/lib/wedding";

const target = new Date(W.startISO).getTime();
const pad = (n: number) => String(n).padStart(2, "0");

function parts(now: number) {
  const s = Math.max(0, Math.floor((target - now) / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, over: target - now <= 0 };
}

export default function WeddingCountdown() {
  // null until mounted → server and first client render match (no hydration mismatch)
  const [t, setT] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => setT(parts(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const cells = [
    ["Days", t ? String(t.d) : "--"],
    ["Hours", t ? pad(t.h) : "--"],
    ["Minutes", t ? pad(t.m) : "--"],
    ["Seconds", t ? pad(t.s) : "--"],
  ];

  return (
    <section className="count" aria-labelledby="count-h">
      <p className="eyebrow">Counting down to</p>
      <h2 id="count-h" className="script">Our Special Day</h2>
      {t?.over ? (
        <p className="count-over">Alhamdulillah — the day has arrived. Thank you for your duas.</p>
      ) : (
        <div className="timer" role="timer" aria-label={t ? `${t.d} days, ${t.h} hours, ${t.m} minutes remaining` : "Countdown"}>
          {cells.map(([label, v]) => (
            <div key={label} className="cell">
              <b aria-hidden="true">{v}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
      <p className="muted">{W.dateLong} · {W.nikahTime} IST</p>
    </section>
  );
}
