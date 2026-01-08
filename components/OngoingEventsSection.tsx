import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function OngoingEventsSection() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("event_info").select("*").order("position", { ascending: true });

  if (error || !data) {
    return null;
  }

  return (
    <div className="h-120 relative grid grid-cols-2">
      {data.map((e, i) => (
        <div key={i} className="flex flex-col justify-center items-center border-t border-r border-b border-neutral-500">
          <h1 className="font-mono text-4xl">{e.event}</h1>
          <h2 className="mt-4 text-5xl">{e.stage}</h2>
          <div className="mt-10 flex items-center gap-x-10">
            <p className="text-4xl">{e.team_one}</p>
            <p className="text-xl">V/S</p>
            <p className="text-4xl">{e.team_two}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
