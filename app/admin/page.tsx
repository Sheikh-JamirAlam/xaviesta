import Header from "@/components/Header";
import EventsCarouselSection from "@/components/EventsCarouselSection";
import SportsCarouselSection from "@/components/SportsCarouselSection";
import OngoingEventsSection from "@/components/OngoingEventsSection";
import StandingsSection from "@/components/StandingsSection";

export default function Admin() {
  return (
    <main>
      <Header />
      <section className="grid grid-cols-2">
        <EventsCarouselSection />
        <SportsCarouselSection />
        <OngoingEventsSection />
        <StandingsSection />
      </section>
    </main>
  );
}
