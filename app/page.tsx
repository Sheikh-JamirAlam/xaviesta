import Header from "@/components/Header";
import EventsCarouselSection from "@/components/EventsCarouselSection";
import SportsCarouselSection from "@/components/SportsCarouselSection";
import OngoingEventsSection from "@/components/OngoingEventsSection";
import StandingsSection from "@/components/StandingsSection";
import SponsorsSection from "@/components/Sponsors";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="grid grid-cols-2">
        <EventsCarouselSection />
        <SportsCarouselSection />
        <OngoingEventsSection />
        <StandingsSection />
      </section>
      <SponsorsSection />
    </main>
  );
}
