import Header from "@/components/Header";
import EventsCarouselSection from "@/components/EventsCarouselSection";
import SportsCarouselSection from "@/components/SportsCarouselSection";
import OngoingEventsSection from "@/components/OngoingEventsSection";
import StandingsSection from "@/components/StandingsSection";
import { requireAdmin } from "@/lib/admin-auth";

export default async function Admin() {
  await requireAdmin();

  return (
    <main>
      <Header />
      <section className="grid grid-cols-2">
        <EventsCarouselSection />
        <SportsCarouselSection />
        <OngoingEventsSection />
        <StandingsSection />
      </section>
      <section className="grid grid-cols-1">
        <h1 className="mt-3 text-3xl font-semibold text-center">Xaviesta Admin</h1>
      </section>
    </main>
  );
}
