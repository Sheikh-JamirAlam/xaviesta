import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function PUT(req: Request) {
  const supabase = createServerClient();
  const rows = await req.json();

  if (!Array.isArray(rows)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (rows.some((r) => !r.name?.trim())) {
    return NextResponse.json({ error: "Participant name required" }, { status: 400 });
  }

  const { data: existing, error: fetchError } = await supabase.from("standings").select("id");

  if (fetchError) {
    console.error(fetchError);
    return NextResponse.json({ error: "Failed to fetch standings" }, { status: 500 });
  }

  const existingIds = existing.map((r) => r.id);
  const incomingIds = rows.filter((r) => r.id).map((r) => r.id);

  if (existingIds.length > 0 && incomingIds.length === 0) {
    return NextResponse.json({ error: "Refusing to delete all standings" }, { status: 400 });
  }

  const idsToDelete = existingIds.filter((id) => !incomingIds.includes(id));

  if (idsToDelete.length > 0) {
    const { error } = await supabase.from("standings").delete().in("id", idsToDelete);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to delete rows" }, { status: 500 });
    }
  }

  const rowsToUpdate = rows.filter((r) => r.id);

  if (rowsToUpdate.length > 0) {
    const { error } = await supabase.from("standings").upsert(
      rowsToUpdate.map((r) => ({
        id: r.id,
        name: r.name,
        gold: Number(r.gold),
        silver: Number(r.silver),
        bronze: Number(r.bronze),
      })),
      { onConflict: "id" }
    );

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to update rows" }, { status: 500 });
    }
  }

  const rowsToInsert = rows.filter((r) => !r.id);

  if (rowsToInsert.length > 0) {
    const { error } = await supabase.from("standings").insert(
      rowsToInsert.map((r) => ({
        name: r.name,
        gold: Number(r.gold),
        silver: Number(r.silver),
        bronze: Number(r.bronze),
      }))
    );

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to insert rows" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
