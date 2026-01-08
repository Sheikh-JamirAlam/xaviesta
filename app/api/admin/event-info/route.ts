import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

type EventInfo = {
  id: string;
  event: string;
  stage: string;
  team_one: string;
  team_two: string;
};

export async function PUT(req: Request) {
  const supabase = createServerClient();
  const body: EventInfo[] = await req.json();

  if (!Array.isArray(body) || body.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updates = body.map((row) =>
    supabase
      .from("event_info")
      .update({
        event: row.event,
        stage: row.stage,
        team_one: row.team_one,
        team_two: row.team_two,
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id)
  );

  const results = await Promise.all(updates);

  const hasError = results.some((r) => r.error);

  if (hasError) {
    console.error(results.map((r) => r.error));
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
