import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const supabase = createServerClient();

  const sessionToken = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const { error } = await supabase.from("admin_sessions").insert({
    session_token: sessionToken,
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    console.error("DB insert error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const cookieStore = await cookies();

  cookieStore.set("admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
