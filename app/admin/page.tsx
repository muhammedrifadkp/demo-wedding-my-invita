import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { COOKIE, isConfigured, verifyToken } from "@/lib/adminAuth";
import { fetchRsvps } from "@/lib/rsvpData";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "RSVP Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!isConfigured()) {
    return (
      <main className="adm adm-narrow">
        <h1 className="script">RSVP Admin</h1>
        <p className="muted">Admin is not configured. Set the ADMIN_PASSWORD environment variable and redeploy.</p>
      </main>
    );
  }
  if (!verifyToken((await cookies()).get(COOKIE)?.value)) return <AdminLogin />;

  const result = await fetchRsvps();
  return <AdminDashboard result={result} />;
}
