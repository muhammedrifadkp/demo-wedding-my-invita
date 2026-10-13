"use client";
import { useCallback, useRef, useState } from "react";
import EnvelopeOpening from "./EnvelopeOpening";
import BackgroundMusic, { type MusicHandle } from "./BackgroundMusic";

type Phase = "closed" | "opening" | "open";

export default function Experience({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const music = useRef<MusicHandle>(null);

  const open = useCallback((skip: boolean) => {
    // Must run synchronously inside the tap handler so browsers allow audio playback.
    music.current?.start();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip || reduce) {
      setPhase("open");
      window.scrollTo(0, 0);
      return;
    }
    setPhase("opening");
    window.setTimeout(() => {
      setPhase("open");
      window.scrollTo(0, 0);
    }, 1900);
  }, []);

  return (
    <div className="exp" data-open={phase !== "closed"}>
      {phase !== "open" && <EnvelopeOpening opening={phase === "opening"} onOpen={() => open(false)} onSkip={() => open(true)} />}
      <main className="page" id="main">
        {children}
      </main>
      <BackgroundMusic ref={music} visible={phase !== "closed"} />
    </div>
  );
}
