import { createServerClient } from "@/lib/supabase/server";
import SportsCarouselClient from "./SportsCarouselClient";

export default async function SportsCarouselSection() {
  const supabase = createServerClient();

  const { data: images } = await supabase.storage.from("event-images").list("sports");

  const slides = images?.map((img) => `https://afrwytnbszqpceznbxzj.supabase.co/storage/v1/object/public/event-images/sports/${img.name}`) ?? [];

  return <SportsCarouselClient slides={slides} />;
}
