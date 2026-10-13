import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { W } from "@/lib/wedding";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--f-serif",
  display: "swap",
});
// Italic is only used below the fold, so it is not preloaded (keeps the envelope screen's critical path small).
const serifItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: "italic",
  variable: "--f-serif-i",
  display: "swap",
  preload: false,
});
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--f-script", display: "swap" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = `${W.bride.first} & ${W.groom.first} — Wedding Invitation`;
// Kept short so WhatsApp shows it in full without cutting it off.
const description = `You are cordially invited · ${W.dateLong} · Nikah at ${W.nikahTime} · ${W.venue}, ${W.place}`;
const ogImage = "/og-card-v2.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: `${W.bride.first} & ${W.groom.first}`,
    locale: "en_IN",
    images: [{ url: ogImage, width: 1200, height: 630, type: "image/jpeg", alt: `Wedding invitation of ${W.bride.first} and ${W.groom.first} — ${W.dateLong}, ${W.place}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
};

export const viewport: Viewport = { themeColor: "#f7efe0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${serifItalic.variable} ${script.variable}`}>
      <body>
        <noscript>
          <style>{`.env{display:none!important}.rv{opacity:1!important;transform:none!important}.exp[data-open="false"] .page{display:block!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
