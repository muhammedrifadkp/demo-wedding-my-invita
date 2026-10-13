import { W } from "@/lib/wedding";
import { Divider } from "./Ornaments";

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <p className="eyebrow">The Wedding of</p>
      <h1 id="hero-h" className="names">
        <span className="script">{W.bride.name}</span>
        <span className="weds">Weds</span>
        <span className="script">{W.groom.name}</span>
      </h1>
      <Divider />
      <p className="hero-date">{W.dateLong}</p>
      <p className="muted">Insha Allah</p>
      <a className="scroll-cue" href="#bride" aria-label="Scroll to the couple">
        <span />
      </a>
    </section>
  );
}
