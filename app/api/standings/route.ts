import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("standings").select("*").order("created_at");

  if (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }

  return NextResponse.json(data);
}
