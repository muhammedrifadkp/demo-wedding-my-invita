"use client";
import { useEffect, useRef } from "react";
import { W } from "@/lib/wedding";

export default function EnvelopeOpening({ opening, onOpen, onSkip }: { opening: boolean; onOpen: () => void; onSkip: () => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btn.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={`env${opening ? " opening" : ""}`} role="dialog" aria-modal="true" aria-label="Wedding invitation">
      <div className="env-inner">
        <p className="env-bismillah">In the name of Allah, the Most Gracious, the Most Merciful</p>
        <p className="env-invite">You are cordially invited to celebrate the wedding of</p>
        <p className="script env-names">
          <span>{W.bride.name}</span>
          <i>&amp;</i>
          <span>{W.groom.name}</span>
        </p>

        <div className="envelope" aria-hidden="true" onClick={opening ? undefined : onOpen}>
          <div className="env-back" />
          <div className="env-paper">
            <span className="script">{W.bride.first} &amp; {W.groom.first}</span>
            <small>{W.dateShort}</small>
          </div>
          <div className="env-front" />
          <div className="env-flap" />
          <div className="env-seal script">{W.bride.first[0]}&amp;{W.groom.first[0]}</div>
        </div>

        <button ref={btn} type="button" className="btn btn-gold" onClick={onOpen} disabled={opening}>
          Open Invitation
        </button>
        <button type="button" className="env-skip" onClick={onSkip} disabled={opening}>
          Skip
        </button>
      </div>
    </div>
  );
}
