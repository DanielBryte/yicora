import { createAdminClient } from "@/lib/supabase/admin";

export async function debitCredits(userId: string, amount: number, description: string) {
  const admin = createAdminClient();
  // These RPCs are introduced by the billing migration and are not in generated types yet.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (admin as any).rpc("debit_credits", {
    p_user_id: userId,
    p_amount: amount,
    p_description: description,
  });
  if (error) {
    if (error.message?.includes("INSUFFICIENT_CREDITS")) throw new Error("INSUFFICIENT_CREDITS");
    throw new Error("Could not reserve credits for this generation.");
  }
  return Number(data);
}

export async function refundCredits(userId: string, amount: number, description: string) {
  if (!amount) return;
  const admin = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin as any).rpc("refund_credits", {
    p_user_id: userId,
    p_amount: amount,
    p_description: description,
  });
  if (error) console.error("Credit refund failed:", error.message);
}

export async function hasPaidAccess(userId: string) {
  const admin = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (admin as any).from("profiles")
    .select("lifetime_access, plan_access_until")
    .eq("id", userId).maybeSingle();
  if (error || !data) return false;
  return Boolean(data.lifetime_access || (data.plan_access_until && new Date(data.plan_access_until).getTime() > Date.now()));
}
