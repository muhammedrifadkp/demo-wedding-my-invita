import { W } from "@/lib/wedding";
import Reveal from "./Reveal";
import { Divider } from "./Ornaments";

export default function CoupleReveal() {
  return (
    <section className="couple" aria-labelledby="couple-h">
      {/* Scene C — portraits converge, then the names appear */}
      <Reveal variant="none" className="converge">
        <div className="pair" aria-hidden="true">
          <div className="arch sm bride-fig">
            <img src="/images/bride-480.webp" width={480} height={720} alt="" loading="lazy" decoding="async" />
          </div>
          <div className="arch sm groom-fig">
            <img src="/images/groom-480.webp" width={480} height={720} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
        <h2 id="couple-h" className="names">
          <span className="script n1">{W.bride.name}</span>
          <span className="weds">Weds</span>
          <span className="script n2">{W.groom.name}</span>
        </h2>
        <div className="after">
          <Divider />
          <p className="hero-date">{W.dateLong}</p>
        </div>
      </Reveal>

      {/* Scene D — the couple portrait */}
      <Reveal variant="zoom" className="final">
        <figure>
          <img
            src="/images/couple-640.webp"
            srcSet="/images/couple-640.webp 640w, /images/couple-1024.webp 1024w"
            sizes="(min-width: 600px) 440px, 88vw"
            width={1024}
            height={1536}
            alt={`${W.bride.first} and ${W.groom.first} standing together among white flowers and lanterns`}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </Reveal>
    </section>
  );
}
