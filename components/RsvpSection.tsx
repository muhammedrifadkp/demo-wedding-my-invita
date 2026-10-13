import Reveal from "./Reveal";
import RsvpForm from "./RsvpForm";
import { Divider } from "./Ornaments";

export default function RsvpSection() {
  return (
    <section className="rsvp-sec" id="rsvp" aria-labelledby="rsvp-h">
      <p className="eyebrow">Kindly respond</p>
      <h2 id="rsvp-h" className="script">RSVP</h2>
      <Divider />
      <Reveal className="rsvp-card">
        <RsvpForm />
      </Reveal>
    </section>
  );
}
