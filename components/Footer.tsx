import { W } from "@/lib/wedding";
import { Divider } from "./Ornaments";

export default function Footer() {
  return (
    <footer className="foot">
      <Divider />
      <p className="script foot-names">{W.bride.first} &amp; {W.groom.first}</p>
      <p>Jazakallahu Khairan for being part of our joy.</p>
      <p className="muted">With best compliments from {W.compliments}</p>
    </footer>
  );
}
