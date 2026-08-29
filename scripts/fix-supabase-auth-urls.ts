/**
 * Script: fix-supabase-auth-urls.ts
 * 
 * Updates the Supabase project's Auth URL configuration via the Management API
 * to add production and localhost redirect URLs.
 *
 * Run with: npx tsx scripts/fix-supabase-auth-urls.ts
 */

const SUPABASE_PROJECT_REF = "trfyaeznetqgruhrvqnp";
const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;

// The production and local redirect URLs to allow
const SITE_URL = "https://yicora.com";
const REDIRECT_URLS = [
  "https://yicora.com/**",
  "https://yicora.com/auth/callback",
  "http://localhost:3000/**",
  "http://localhost:3000/auth/callback",
];

async function updateAuthConfig() {
  if (!SUPABASE_ACCESS_TOKEN) {
    console.error(
      "❌ SUPABASE_ACCESS_TOKEN is required.\n" +
      "   Get it from: https://supabase.com/dashboard/account/tokens\n" +
      "   Then run: SUPABASE_ACCESS_TOKEN=your_token npx tsx scripts/fix-supabase-auth-urls.ts"
    );
    process.exit(1);
  }

  const url = `https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}/config/auth`;

  console.log("📡 Fetching current auth config...");
  const getRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${SUPABASE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!getRes.ok) {
    const text = await getRes.text();
    console.error("❌ Failed to fetch auth config:", getRes.status, text);
    process.exit(1);
  }

  const current = await getRes.json();
  console.log("✅ Current Site URL:", current.site_url);
  console.log("✅ Current Redirect URLs:", current.uri_allow_list);

  console.log("\n📡 Updating auth config...");
  const patchRes = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${SUPABASE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_url: SITE_URL,
      uri_allow_list: REDIRECT_URLS.join(","),
    }),
  });

  if (!patchRes.ok) {
    const text = await patchRes.text();
    console.error("❌ Failed to update auth config:", patchRes.status, text);
    process.exit(1);
  }

  const updated = await patchRes.json();
  console.log("\n✅ Auth config updated successfully!");
  console.log("   New Site URL:", updated.site_url);
  console.log("   New Redirect URLs:", updated.uri_allow_list);
}

updateAuthConfig().catch(console.error);
