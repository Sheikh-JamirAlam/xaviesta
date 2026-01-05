import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const supabase = createServerClient();
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files" }, { status: 400 });
  }

  // 1️⃣ List existing images
  const { data: existing } = await supabase.storage.from("event-images").list("sports");

  // 2️⃣ Delete existing images
  if (existing?.length) {
    await supabase.storage.from("event-images").remove(existing.map((f) => `sports/${f.name}`));
  }

  // 3️⃣ Upload new images
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    await supabase.storage.from("event-images").upload(`sports/pic-${randomUUID()}.png`, file, { upsert: false });
  }

  return NextResponse.json({ success: true });
}
