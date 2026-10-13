"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/admin/actions";
import { W } from "@/lib/wedding";
import type { RsvpResult, RsvpRow } from "@/lib/rsvpData";

const YES = "Yes, Insha Allah";
const NO = "Sorry, unable to attend";

const ERRORS = {
  not_configured: "APPS_SCRIPT_URL / APPS_SCRIPT_SECRET are not set on the server.",
  script_outdated: "The Apps Script is an old version. Deploy a new version of Code.gs (Deploy → Manage deployments → Edit → New version).",
  upstream: "Could not load responses from Google Sheets. Please refresh in a moment.",
} as const;

const fmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
const when = (t: string) => (isNaN(Date.parse(t)) ? t : fmt.format(new Date(t)));

// Stop spreadsheet apps from running a cell that starts with = + - @ when the CSV is opened.
const csvCell = (v: string) => `"${(/^[=+\-@\t\r]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;

function downloadCsv(rows: RsvpRow[]) {
  const lines = [["Time", "Full Name", "Attendance", "Message"].map(csvCell).join(",")];
  for (const r of rows) lines.push([when(r.time), r.name, r.attending, r.message].map(csvCell).join(","));
  const url = URL.createObjectURL(new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "rsvp-responses.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard({ result }: { result: RsvpResult }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");
  const rows = useMemo(() => (result.ok ? result.rows : []), [result]);

  const yes = rows.filter((r) => r.attending === YES).length;
  const no = rows.filter((r) => r.attending === NO).length;
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (filter === "all" || r.attending === (filter === "yes" ? YES : NO)) &&
        (!needle || r.name.toLowerCase().includes(needle) || r.message.toLowerCase().includes(needle)),
    );
  }, [rows, q, filter]);

  return (
    <main className="adm">
      <header className="adm-head">
        <div>
          <p className="eyebrow">{W.bride.first} &amp; {W.groom.first}</p>
          <h1 className="script">RSVP Responses</h1>
        </div>
        <div className="adm-actions">
          <button type="button" className="btn btn-line" onClick={() => router.refresh()}>Refresh</button>
          <form action={logout}><button type="submit" className="btn btn-line">Sign out</button></form>
        </div>
      </header>

      {!result.ok ? (
        <p className="ferr" role="alert">{ERRORS[result.error]}</p>
      ) : (
        <>
          <div className="adm-stats">
            <div><b>{yes}</b><span>Attending</span></div>
            <div><b>{no}</b><span>Unable to attend</span></div>
            <div><b>{rows.length}</b><span>Total responses</span></div>
          </div>

          <div className="adm-tools">
            <input type="search" placeholder="Search name or message" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
            <select aria-label="Filter by attendance" value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
              <option value="all">All</option>
              <option value="yes">Attending</option>
              <option value="no">Unable to attend</option>
            </select>
            <button type="button" className="btn btn-gold" onClick={() => downloadCsv(shown)} disabled={!shown.length}>Download CSV</button>
          </div>

          {shown.length === 0 ? (
            <p className="muted">{rows.length ? "No responses match your search." : "No responses yet."}</p>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr><th>Time</th><th>Name</th><th>Attendance</th><th>Message</th></tr>
                </thead>
                <tbody>
                  {shown.map((r, i) => (
                    <tr key={`${r.time}-${i}`}>
                      <td data-label="Time">{when(r.time)}</td>
                      <td data-label="Name">{r.name}</td>
                      <td data-label="Attendance"><span className={`pill ${r.attending === YES ? "yes" : "no"}`}>{r.attending === YES ? "Attending" : "Unable"}</span></td>
                      <td data-label="Message">{r.message || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </main>
  );
}
