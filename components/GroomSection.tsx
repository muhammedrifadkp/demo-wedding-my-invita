import { W } from "@/lib/wedding";
import Reveal from "./Reveal";
import { Divider, Sprig } from "./Ornaments";

export default function GroomSection() {
  return (
    <section className="scene reverse" id="groom" aria-labelledby="groom-h">
      <Reveal variant="right" className="portrait">
        <div className="arch glow">
          <img
            src="/images/groom-480.webp"
            srcSet="/images/groom-480.webp 480w, /images/groom-800.webp 800w"
            sizes="(min-width: 900px) 380px, 78vw"
            width={480}
            height={720}
            alt={`${W.groom.name}, the groom, in an ivory and gold embroidered sherwani`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <Sprig className="float f1" />
        <Sprig className="float f2" />
      </Reveal>
      <Reveal delay={250} className="scene-text">
        <p className="eyebrow">The Groom</p>
        <h2 id="groom-h" className="script">{W.groom.name}</h2>
        <Divider />
        <p>{W.groom.family}</p>
      </Reveal>
    </section>
  );
}
