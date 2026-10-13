import { W } from "@/lib/wedding";
import Reveal from "./Reveal";
import { Icon } from "./Ornaments";

const gcal =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent(`Wedding of ${W.bride.first} & ${W.groom.first} (Nikah ${W.nikahTime})`) +
  "&dates=20261227T060000Z/20261227T090000Z" +
  "&location=" + encodeURIComponent(`${W.venue}, ${W.place}`) +
  "&details=" + encodeURIComponent(`Nikah at ${W.nikahTime} followed by reception.`);

export default function WeddingDetails() {
  const items = [
    { icon: "calendar", title: "Date", main: W.dateLong, sub: W.hijri },
    { icon: "nikah", title: "Nikah", main: W.nikahTime, sub: "Insha Allah" },
    { icon: "pin", title: "Venue", main: W.venue, sub: W.place },
    { icon: "feast", title: "Reception", main: W.reception, sub: "Join us for the feast" },
  ] as const;

  return (
    <section className="details" id="details" aria-labelledby="det-h">
      <p className="eyebrow">Insha Allah</p>
      <h2 id="det-h" className="script">Wedding Details</h2>
      <div className="grid">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 90} className="tile">
            <Icon name={it.icon} />
            <h3>{it.title}</h3>
            <p className="main">{it.main}</p>
            <p className="muted">{it.sub}</p>
          </Reveal>
        ))}
      </div>
      <p className="muted">{W.note}</p>
      <div className="actions">
        <a className="btn btn-gold" href={W.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
        <a className="btn btn-line" href={gcal} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
        <a className="btn btn-line" href="/nikah.ics" download>Download .ics</a>
      </div>
    </section>
  );
}
