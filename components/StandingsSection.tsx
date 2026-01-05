import { createServerClient } from "@/lib/supabase/server";
import StandingsClient from "./StandingsClient";

export default async function StandingsSection() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("standings").select("*").order("created_at");

  if (error || !data) {
    return null;
  }

  return <StandingsClient initialData={data} />;
}
