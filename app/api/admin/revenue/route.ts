import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_EMAILS = new Set(["ezedinirudaniel@gmail.com", "useyicora@gmail.com"]);

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email || !ADMIN_EMAILS.has(user.email.toLowerCase())) {
    return Response.json({ error: "Forbidden" }, { status: user ? 403 : 401 });
  }
  const admin = createAdminClient();
  // This migration is newer than the checked-in generated Supabase types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (admin as any).from("billing_orders")
    .select("id, user_id, product_key, currency, amount, estimated_commission, credits, paid_at")
    .eq("status", "paid").order("paid_at", { ascending: false }).limit(500);
  if (error) return Response.json({ error: "Could not load revenue data." }, { status: 500 });
  const totals = { USD: { sales: 0, commission: 0, orders: 0 }, NGN: { sales: 0, commission: 0, orders: 0 } };
  for (const order of data || []) {
    const currency = order.currency as "USD" | "NGN";
    if (!totals[currency]) continue;
    totals[currency].sales += Number(order.amount);
    totals[currency].commission += Number(order.estimated_commission);
    totals[currency].orders += 1;
  }
  return Response.json({ totals, recent: data || [] }, { headers: { "Cache-Control": "no-store" } });
}
