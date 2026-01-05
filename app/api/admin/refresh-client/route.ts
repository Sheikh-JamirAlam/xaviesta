import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function PUT() {
  const supabase = createServerClient();

  const { data, error: readError } = await supabase.from("app_state").select("id, live_version").single();

  if (readError || !data) {
    console.error(readError);
    return NextResponse.json({ error: "Failed to read app_state" }, { status: 500 });
  }

  const { error: updateError } = await supabase
    .from("app_state")
    .update({
      live_version: data.live_version + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id);

  if (updateError) {
    console.error(updateError);
    return NextResponse.json({ error: "Failed to refresh client" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
