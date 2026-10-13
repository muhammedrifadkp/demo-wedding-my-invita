import { W } from "@/lib/wedding";
import Reveal from "./Reveal";
import { Divider } from "./Ornaments";

export default function InvitationCard() {
  return (
    <section className="card-sec" id="invitation" aria-labelledby="inv-h">
      <h2 id="inv-h" className="sr-only">Wedding invitation</h2>
      <Reveal className="inv">
        <div className="inv-inner">
          <p className="arabic" lang="ar" dir="rtl">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
          <p className="inv-small">In the name of Allah<br />The Most Gracious &amp; the Most Merciful</p>
          <Divider />
          <p className="inv-host">{W.bride.parents}</p>
          <p className="inv-small">{W.bride.address}</p>
          <p className="inv-it">Extend their warm greetings and solicit your gracious presence to witness the Wedding Ceremony of Our Daughter</p>

          <p className="script inv-name">{W.bride.name}</p>
          <p className="inv-small">{W.bride.grand}</p>
          <p className="inv-weds script">Weds</p>
          <p className="script inv-name">{W.groom.name}</p>
          <p className="inv-small">{W.groom.family}</p>

          <p className="inv-it">Insha Allah</p>
          <dl className="inv-facts">
            <div><dt>Date</dt><dd>{W.dateLong}<small>({W.hijri})</small></dd></div>
            <div><dt>Nikah</dt><dd>{W.nikahTime}</dd></div>
            <div><dt>Venue</dt><dd>{W.venue}<small>{W.place}</small></dd></div>
            <div><dt>Reception</dt><dd>{W.reception}</dd></div>
          </dl>
          <p className="inv-note">{W.note}</p>
          <Divider />
          <p className="inv-it">Your presence and heartfelt duas will make our day complete.</p>
          <p className="inv-small">With best compliments from<br /><strong>{W.compliments}</strong></p>
        </div>
      </Reveal>
      <details className="orig">
        <summary>View the printed invitation card</summary>
        <img
          src="/images/card-640.webp"
          srcSet="/images/card-640.webp 640w, /images/card-959.webp 959w"
          sizes="(min-width: 600px) 480px, 90vw"
          width={959}
          height={1600}
          alt="The printed wedding invitation card with the full wedding details"
          loading="lazy"
          decoding="async"
        />
      </details>
    </section>
  );
}
