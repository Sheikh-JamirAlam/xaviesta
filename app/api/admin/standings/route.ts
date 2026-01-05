import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function PUT(req: Request) {
  const supabase = createServerClient();
  const rows = await req.json();

  if (!Array.isArray(rows)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { data: existing } = await supabase.from("standings").select("id");

  const existingIds = existing?.map((r) => r.id) ?? [];
  const incomingIds = rows.filter((r) => r.id).map((r) => r.id);

  if (existingIds.length > 0 && incomingIds.length === 0) {
    return NextResponse.json({ error: "Incoming rows have no IDs — aborting update" }, { status: 400 });
  }

  const idsToDelete = existingIds.filter((id) => !incomingIds.includes(id));

  if (idsToDelete.length) {
    await supabase.from("standings").delete().in("id", idsToDelete);
  }

  const payload = rows.map((r) => {
    const base = {
      name: r.name,
      gold: Number(r.gold),
      silver: Number(r.silver),
      bronze: Number(r.bronze),
    };
    return r.id ? { id: r.id, ...base } : base;
  });

  const { error } = await supabase.from("standings").upsert(payload, { onConflict: "id" });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
