import { W } from "@/lib/wedding";
import Reveal from "./Reveal";
import { Divider, Sprig } from "./Ornaments";

export default function BrideSection() {
  return (
    <section className="scene" id="bride" aria-labelledby="bride-h">
      <Reveal variant="left" className="portrait">
        <div className="arch glow">
          <img
            src="/images/bride-480.webp"
            srcSet="/images/bride-480.webp 480w, /images/bride-800.webp 800w"
            sizes="(min-width: 900px) 380px, 78vw"
            width={480}
            height={720}
            alt={`${W.bride.name}, the bride, in an elegant terracotta and gold wedding dress with a draped dupatta`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <Sprig className="float f1" />
        <Sprig className="float f2" />
      </Reveal>
      <Reveal delay={250} className="scene-text">
        <p className="eyebrow">The Bride</p>
        <h2 id="bride-h" className="script">{W.bride.name}</h2>
        <Divider />
        <p>D/o. {W.bride.parents}</p>
        <p className="muted">{W.bride.grand}</p>
      </Reveal>
    </section>
  );
}
