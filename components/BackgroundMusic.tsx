"use client";
import { useEffect, useImperativeHandle, useRef, useState } from "react";

export type MusicHandle = { start: () => void };

export default function BackgroundMusic({ ref, visible }: { ref: React.Ref<MusicHandle>; visible: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const wasPlaying = useRef(false);

  const play = () => {
    const a = audio.current;
    if (!a) return;
    if (!a.getAttribute("src")) a.src = "/audio/wedding_nasheed.mp3"; // fetched only after the visitor opens the invitation
    a.play().then(() => setFailed(false)).catch(() => setFailed(true));
  };

  useImperativeHandle(ref, () => ({ start: play }));

  // Pause when the tab/app is hidden; resume only if it was playing.
  useEffect(() => {
    const onVis = () => {
      const a = audio.current;
      if (!a) return;
      if (document.hidden) {
        wasPlaying.current = !a.paused;
        a.pause();
      } else if (wasPlaying.current) {
        a.play().catch(() => {});
        wasPlaying.current = false;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) play();
    else a.pause();
  };

  return (
    <>
      <audio ref={audio} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
      {visible && (
        <button
          type="button"
          className={`music${playing ? " on" : ""}`}
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Pause background music" : failed ? "Music unavailable — try playing again" : "Play background music"}
        >
          <span className="bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {playing ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
