import Header from "@/components/Header";
import EventsCarouselSection from "@/components/admin/EventsCarouselSection";
import SportsCarouselSection from "@/components/admin/SportsCarouselSection";
import OngoingEventsSection from "@/components/admin/OngoingEventsSection";
import StandingsSection from "@/components/admin/StandingsSection";
import { requireAdmin } from "@/lib/admin-auth";
import RefreshButton from "@/components/admin/RefreshButton";

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
      <section className="flex justify-center items-center gap-x-5">
        <h1 className="mt-3 text-3xl font-semibold text-center">Xaviesta Admin</h1>
        <RefreshButton />
      </section>
    </main>
  );
}
