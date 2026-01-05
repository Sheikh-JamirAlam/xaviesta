import { createServerClient } from "@/lib/supabase/server";
import EventsCarouselClient from "./EventsCarouselClient";

export const dynamic = "force-dynamic";

export default async function EventsCarouselSection() {
  const supabase = createServerClient();

  const { data: images } = await supabase.storage.from("event-images").list("business");

  const slides = images?.map((img) => `https://afrwytnbszqpceznbxzj.supabase.co/storage/v1/object/public/event-images/business/${img.name}`) ?? [];

  return <EventsCarouselClient slides={slides} />;
}
