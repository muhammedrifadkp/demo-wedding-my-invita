export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 240 24" aria-hidden="true" focusable="false">
      <path d="M0 12h92M148 12h92" stroke="currentColor" strokeWidth="1" />
      <path d="M120 3l5 9-5 9-5-9z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="104" cy="12" r="2" fill="currentColor" />
      <circle cx="136" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="24" cy="24" r="3" />
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="24" cy="12" rx="4.5" ry="8" transform={`rotate(${r} 24 24)`} />
        ))}
      </g>
    </svg>
  );
}

export function Icon({ name }: { name: "calendar" | "nikah" | "pin" | "feast" }) {
  const p: Record<string, React.ReactNode> = {
    calendar: (
      <>
        <rect x="4" y="6" width="24" height="22" rx="3" />
        <path d="M4 13h24M10 3v6M22 3v6M10 19h4M18 19h4M10 24h4" />
      </>
    ),
    nikah: (
      <>
        <circle cx="12" cy="20" r="7" />
        <circle cx="20" cy="20" r="7" />
        <path d="M16 4l2 4-2 3-2-3z" />
      </>
    ),
    pin: (
      <>
        <path d="M16 29s9-8.5 9-15a9 9 0 10-18 0c0 6.5 9 15 9 15z" />
        <circle cx="16" cy="14" r="3.5" />
      </>
    ),
    feast: (
      <>
        <circle cx="16" cy="17" r="8" />
        <circle cx="16" cy="17" r="4" />
        <path d="M3 5v8M6 5v8M3 9h3M29 5v22M29 5c-3 3-3 9 0 11" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {p[name]}
    </svg>
  );
}
