import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Sign in to view your billing." }, { status: 401 });
  const admin = createAdminClient();
  const [{ data: profile }, { data: transactions }, { data: orders }] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (admin as any).from("profiles").select("credits, plan, plan_access_until, lifetime_access").eq("id", user.id).maybeSingle(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (admin as any).from("credit_transactions").select("id, amount, type, description, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (admin as any).from("billing_orders").select("id, product_key, amount, currency, status, credits, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
  ]);
  return Response.json({ profile, transactions: transactions || [], orders: orders || [] }, { headers: { "Cache-Control": "no-store" } });
}
