import Experience from "@/components/Experience";
import HeroSection from "@/components/HeroSection";
import BrideSection from "@/components/BrideSection";
import GroomSection from "@/components/GroomSection";
import CoupleReveal from "@/components/CoupleReveal";
import InvitationCard from "@/components/InvitationCard";
import WeddingCountdown from "@/components/WeddingCountdown";
import WeddingDetails from "@/components/WeddingDetails";
import RsvpSection from "@/components/RsvpSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <Experience>
      <HeroSection />
      <BrideSection />
      <GroomSection />
      <CoupleReveal />
      <InvitationCard />
      <WeddingCountdown />
      <WeddingDetails />
      <RsvpSection />
      <Footer />
    </Experience>
  );
}
