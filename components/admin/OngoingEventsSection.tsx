import { createServerClient } from "@/lib/supabase/server";
import OngoingEventsClient from "./OngoingEventsClient";

export const dynamic = "force-dynamic";

export default async function OngoingEventsSection() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("event_info").select("*").order("position", { ascending: true });

  if (error || !data || data.length === 0) {
    return null;
  }

  return (
    <OngoingEventsClient
      eventInfo={data.map((row) => ({
        id: row.id,
        position: row.position,
        event: row.event ?? "",
        stage: row.stage ?? "",
        team_one: row.team_one ?? "",
        team_two: row.team_two ?? "",
      }))}
    />
  );
}
