import { createHmac, timingSafeEqual } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

function verifySignature(rawBody: string, request: Request, secret: string) {
  const signatureV2 = request.headers.get("x-bachs-signature-v2");
  const timestampHeader = request.headers.get("x-bachs-timestamp");
  const legacySignature = request.headers.get("x-bachs-signature");
  let timestamp = timestampHeader;
  let signatures: string[] = [];
  if (signatureV2) {
    for (const part of signatureV2.split(",")) {
      const [key, value] = part.trim().split("=", 2);
      if (key === "t") timestamp = value;
      if (key === "v1" && value) signatures.push(value);
    }
  } else if (legacySignature) signatures = [legacySignature];
  if (!timestamp || !/^\d+$/.test(timestamp) || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  if (!signatures.length) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest();
  return signatures.some((signature) => {
    if (!/^[a-f\d]{64}$/i.test(signature)) return false;
    return timingSafeEqual(expected, Buffer.from(signature, "hex"));
  });
}

export async function POST(request: Request) {
  const secret = process.env.BACHS_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "Webhook is not configured." }, { status: 503 });
  const rawBody = await request.text();
  if (!verifySignature(rawBody, request, secret)) return Response.json({ error: "Invalid webhook signature." }, { status: 400 });
  let event: Record<string, unknown>;
  try { event = JSON.parse(rawBody); } catch { return Response.json({ error: "Invalid event body." }, { status: 400 }); }
  if (event.type !== "collection.succeeded") return Response.json({ received: true });
  const data = (event.data && typeof event.data === "object" ? event.data : {}) as Record<string, unknown>;
  const checkoutId = typeof data.checkout_id === "string" ? data.checkout_id : "";
  const eventId = typeof event.id === "string" ? event.id : "";
  const currency = typeof data.currency === "string" ? data.currency : "";
  const amount = typeof data.amount === "string" || typeof data.amount === "number" ? Number(data.amount) : NaN;
  if (!checkoutId || !amount || !currency || !eventId || !Number.isFinite(amount)) {
    return Response.json({ error: "Payment event is missing required fields." }, { status: 400 });
  }
  const admin = createAdminClient();
  // This RPC is introduced by the billing migration and is not in generated types yet.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: fulfilled, error } = await (admin as any).rpc("fulfill_billing_order", {
    p_checkout_id: checkoutId,
    p_event_id: eventId,
    p_amount: amount,
    p_currency: currency,
  });
  if (error) {
    console.error("Bachs payment fulfillment failed:", error.message);
    return Response.json({ error: "Payment could not be fulfilled." }, { status: 500 });
  }
  if (!fulfilled) return Response.json({ error: "Unknown checkout." }, { status: 404 });
  return Response.json({ received: true });
}
