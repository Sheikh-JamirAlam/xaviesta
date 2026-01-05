import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session) redirect("/admin/login");

  const supabase = createServerClient();

  const { data } = await supabase.from("admin_sessions").select("*").eq("session_token", session).single();

  if (!data || new Date(data.expires_at) < new Date()) {
    redirect("/admin/login");
  }
}
