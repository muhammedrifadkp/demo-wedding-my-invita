// Single source of truth for every wedding detail. Demo details for Meta Ads preview.
export const W = {
  bride: {
    name: "Aisha Fathima",
    first: "Aisha",
    grand: "Grand D/o. Late Mohammed Haji & Ibrahim Kutty",
    parents: "Mr. Farook & Mrs. Khadeeja",
    address: "Rose Villa, Beach Road, Calicut, Kerala – 673001",
  },
  groom: {
    name: "Zayan Ahmed",
    first: "Zayan",
    family: "S/o. Mr. Shakeer & Mrs. Raziya, Al-Noor, Ernakulam, Kerala",
  },
  dateLong: "Sunday, 27 December 2026",
  dateShort: "27 · 12 · 2026",
  hijri: "Chand: 18 Rajab, Hijra 1448",
  nikahTime: "11:30 AM",
  venue: "The Grand Palace Auditorium",
  place: "Calicut, Kerala",
  reception: "12:30 PM onwards",
  note: "With warm regards & blessings",
  compliments: "Relatives & Friends",
  // Wedding moment in the local time zone (Asia/Kolkata, UTC+05:30, no DST)
  startISO: "2026-12-27T11:30:00+05:30",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("The Grand Palace Auditorium, Calicut, Kerala"),
} as const;

