import { createServerClient } from "@/lib/supabase/server";
import OngoingEventsClient from "./OngoingEventsClient";

export const dynamic = "force-dynamic";

export default async function OngoingEventsSection() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("event_info").select("*").single();

  if (error || !data) {
    return null;
  }

  return (
    <OngoingEventsClient
      eventInfo={{
        id: data.id,
        event: data.event ?? "",
        stage: data.stage ?? "",
        team_one: data.team_one ?? "",
        team_two: data.team_two ?? "",
      }}
    />
  );
}
