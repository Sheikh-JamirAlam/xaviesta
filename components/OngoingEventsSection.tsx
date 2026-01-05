import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function OngoingEventsSection() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("event_info").select("*").single();

  if (error || !data) {
    return null;
  }

  return (
    <div className="relative">
      <div className="h-120 flex flex-col justify-center items-center border-t border-r border-b border-neutral-500">
        <h1 className="font-mono text-4xl">{data.event}</h1>
        <h2 className="mt-4 text-5xl">{data.stage}</h2>
        <div className="mt-10 flex items-center gap-x-10">
          <p className="text-4xl">{data.team_one}</p>
          <p className="text-xl">V/S</p>
          <p className="text-4xl">{data.team_two}</p>
        </div>
      </div>
    </div>
  );
}
