"use client";
import { useEffect, useRef } from "react";

type Variant = "up" | "left" | "right" | "zoom" | "fade" | "none";

/** Adds `.in` once when scrolled into view (IntersectionObserver, runs once, then disconnects). */
export default function Reveal({
  variant = "up",
  delay = 0,
  className = "",
  children,
}: {
  variant?: Variant;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rv rv-${variant} ${className}`} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
