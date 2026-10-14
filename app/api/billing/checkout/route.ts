import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { BILLING_CATALOG, isProductKey, type Currency } from "@/lib/billing/catalog";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Sign in before starting checkout." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!isProductKey(body?.product) || !["USD", "NGN"].includes(body?.currency)) {
    return Response.json({ error: "Choose a valid plan and currency." }, { status: 400 });
  }
  const productKey = body.product as keyof typeof BILLING_CATALOG;
  const product = BILLING_CATALOG[productKey];
  const currency = body.currency as Currency;
  const amount = currency === "USD" ? product.usd : product.ngn;
  const apiKey = process.env.BACHS_API_KEY;
  if (!apiKey) return Response.json({ error: "Checkout is not configured yet. Add the Bachs API key to the server environment." }, { status: 503 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl || !siteUrl.startsWith("https://")) {
    return Response.json({ error: "Set NEXT_PUBLIC_SITE_URL to your public HTTPS app URL before enabling checkout." }, { status: 503 });
  }
  const origin = siteUrl.replace(/\/$/, "");
  const admin = createAdminClient();
  // This migration is newer than the checked-in generated Supabase types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: order, error: orderError } = await (admin as any).from("billing_orders").insert({
    user_id: user.id, product_key: productKey, currency, amount,
    estimated_commission: Math.round(amount * 0.2 * 100) / 100,
    credits: product.credits, status: "pending",
  }).select("id").single();
  if (orderError || !order) return Response.json({ error: "Could not start your order." }, { status: 500 });

  try {
    const apiBase = process.env.BACHS_API_BASE_URL || (apiKey.startsWith("sk_live_") ? "https://api.bachs.io" : "https://sandbox-api.bachs.io");
    const checkoutResponse = await fetch(`${apiBase}/v1/checkout-sessions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        pricing: { currency, amount: amount.toFixed(2) },
        customer: { email: user.email },
        billing_currency: currency,
        reference: order.id,
        success_url: `${origin}/billing?checkout=success`,
        cancel_url: `${origin}/billing?checkout=cancelled`,
        metadata: { yicora_order_id: order.id, user_id: user.id, product_key: productKey },
      }),
      cache: "no-store",
    });
    const result = await checkoutResponse.json();
    if (!checkoutResponse.ok || !result.checkout_id || !result.checkout_url) {
      console.error("Bachs checkout creation failed:", result);
      throw new Error("The payment provider could not start checkout. Please try again.");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (admin as any).from("billing_orders").update({ checkout_id: result.checkout_id }).eq("id", order.id);
    return Response.json({ checkoutUrl: result.checkout_url });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (admin as any).from("billing_orders").update({ status: "failed" }).eq("id", order.id);
    return Response.json({ error: error instanceof Error ? error.message : "Could not start checkout." }, { status: 502 });
  }
}
