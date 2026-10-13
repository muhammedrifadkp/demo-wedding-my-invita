// Generates optimized web assets in public/images from the untouched originals in the project root.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
mkdirSync("public/images", { recursive: true });

const jobs = [
  ["bride-img-main.png", "bride", [480, 800]],
  ["groom-img-main.png", "groom", [480, 800]],
  ["Bride&Groom.png", "couple", [640, 1024]],
  ["invitation-card.jpeg", "card", [640, 959]],
];
for (const [src, name, widths] of jobs) {
  for (const w of widths) {
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(`public/images/${name}-${w}.webp`);
  }
}
// WhatsApp / Open Graph preview card (JPEG, 1200x630): couple in an arch on the left, details on the right.
// The file name carries a version so WhatsApp/Facebook fetch it fresh instead of reusing a cached preview.
const W = 1200, H = 630, PW = 440, PH = 540, PX = 80, PY = 45;
const arch = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}"><path d="M0 ${PH}V${PW / 2}A${PW / 2} ${PW / 2} 0 0 1 ${PW} ${PW / 2}V${PH}Z" fill="#fff"/></svg>`);
const photo = await sharp("Bride&Groom.png")
  .resize(PW, PH, { fit: "cover", position: "top" })
  .composite([{ input: arch, blend: "dest-in" }])
  .png()
  .toBuffer();
const cx = 840;
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#efe4d0"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="#b8924a" stroke-width="2.5"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#b8924a" stroke-opacity=".5" stroke-width="1"/>
  <path d="M${PX - 10} ${PY + PH + 10}V${PY + PW / 2}A${PW / 2 + 10} ${PW / 2 + 10} 0 0 1 ${PX + PW + 10} ${PY + PW / 2}V${PY + PH + 10}Z" fill="none" stroke="#b8924a" stroke-width="2.5"/>
  <g font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="${cx}" y="150" font-size="22" letter-spacing="7" fill="#7a5c25" font-weight="bold">THE WEDDING OF</text>
    <text x="${cx}" y="250" font-size="104" font-style="italic" fill="#6b3a2b">Aisha</text>
    <text x="${cx}" y="312" font-size="56" font-style="italic" fill="#b8924a">&amp;</text>
    <text x="${cx}" y="400" font-size="104" font-style="italic" fill="#6b3a2b">Zayan</text>
    <path d="M${cx - 90} 438H${cx + 90}" stroke="#b8924a" stroke-width="2"/>
    <text x="${cx}" y="482" font-size="32" font-weight="bold" fill="#3b2a22">Sunday, 27 December 2026</text>
    <text x="${cx}" y="524" font-size="26" fill="#6b5646">Nikah at 11:30 AM</text>
    <text x="${cx}" y="560" font-size="26" fill="#6b5646">The Grand Palace Auditorium, Calicut</text>
  </g>
</svg>`);
await sharp(card)
  .composite([{ input: photo, left: PX, top: PY }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("public/og-card-v2.jpg");
console.log("done");
