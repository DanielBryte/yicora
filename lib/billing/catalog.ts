export type Currency = "USD" | "NGN";
export type ProductKey = "credit_100" | "credit_300" | "credit_900" | "monthly" | "yearly" | "lifetime";

export const BILLING_CATALOG: Record<ProductKey, {
  title: string;
  credits: number;
  access: "none" | "month" | "year" | "lifetime";
  usd: number;
  ngn: number;
}> = {
  credit_100: { title: "100 credits", credits: 100, access: "none", usd: 5, ngn: 7000 },
  credit_300: { title: "300 credits", credits: 300, access: "none", usd: 12, ngn: 16000 },
  credit_900: { title: "900 credits", credits: 900, access: "none", usd: 30, ngn: 40000 },
  monthly: { title: "Yicora Monthly", credits: 300, access: "month", usd: 20, ngn: 27000 },
  yearly: { title: "Yicora Yearly", credits: 3600, access: "year", usd: 156, ngn: 210000 },
  lifetime: { title: "Yicora Lifetime", credits: 5000, access: "lifetime", usd: 299, ngn: 398000 },
};

export const USAGE_CREDITS = { music: 10, voice: 2, videoPerMinute: 5, realtimePerMinute: 5 } as const;

export function isProductKey(value: unknown): value is ProductKey {
  return typeof value === "string" && Object.hasOwn(BILLING_CATALOG, value);
}
