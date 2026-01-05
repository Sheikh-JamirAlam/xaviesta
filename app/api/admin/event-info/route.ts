import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function PUT(req: Request) {
  const supabase = createServerClient();
  const body = await req.json();

  const { event, stage, teamOne, teamTwo } = body;

  if (!event || !stage || !teamOne || !teamTwo) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from("event_info")
    .update({
      event,
      stage,
      team_one: teamOne,
      team_two: teamTwo,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
