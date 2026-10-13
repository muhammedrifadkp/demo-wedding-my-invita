# Aisha & Zayan — Wedding Invitation (Demo)

Next.js (App Router, TypeScript), plain CSS, no animation library.

- `npm install` · `npm run dev` · `npm run build && npm start`
- `npm run optimize` regenerates `public/images/*.webp` and `public/og-card-v2.jpg` (the WhatsApp preview card; bump the `-v2` in the script and `app/layout.tsx` when you change it, so WhatsApp fetches it fresh) from the original images in the project root.
- All wedding details live in `lib/wedding.ts`.

## Deploy to Vercel
1. Push this folder to a GitHub repo (originals in the root are not used at runtime; you may keep or remove them).
2. vercel.com → Add New Project → import the repo → Deploy (defaults work).
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your final domain so WhatsApp previews use absolute URLs.
Or from the CLI: `npx vercel --prod`.
