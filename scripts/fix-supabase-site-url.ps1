# ============================================================
# ONE-COMMAND FIX for Supabase production auth redirect bug
# ============================================================
# Run this in PowerShell:
#
#   $env:SUPABASE_ACCESS_TOKEN = "paste_your_token_here"
#   .\scripts\fix-supabase-site-url.ps1
#
# Get your token in 30 seconds:
#   1. Go to: https://supabase.com/dashboard/account/tokens
#   2. Click "Generate new token"
#   3. Name it anything, copy the token
#   4. Paste it above and run this script
# ============================================================

$ProjectRef = "trfyaeznetqgruhrvqnp"
$Token = $env:SUPABASE_ACCESS_TOKEN

if (-not $Token) {
    Write-Host ""
    Write-Host "ERROR: SUPABASE_ACCESS_TOKEN is not set." -ForegroundColor Red
    Write-Host ""
    Write-Host "Get your token here: https://supabase.com/dashboard/account/tokens" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then run:" -ForegroundColor Cyan
    Write-Host '  $env:SUPABASE_ACCESS_TOKEN = "your_token_here"' -ForegroundColor Cyan
    Write-Host '  .\scripts\fix-supabase-site-url.ps1' -ForegroundColor Cyan
    exit 1
}

$Headers = @{
    "Authorization" = "Bearer $Token"
    "Content-Type"  = "application/json"
}

$Url = "https://api.supabase.com/v1/projects/$ProjectRef/config/auth"

Write-Host ""
Write-Host "Fetching current Supabase auth config..." -ForegroundColor Cyan
$Current = Invoke-RestMethod -Uri $Url -Headers $Headers -Method GET
Write-Host "  Current Site URL : $($Current.site_url)" -ForegroundColor Yellow
Write-Host "  Current Redirects: $($Current.uri_allow_list)" -ForegroundColor Yellow

# Update: set Site URL to production and ensure all needed redirect URLs are present
$Body = @{
    site_url      = "https://yicora.com"
    uri_allow_list = "https://yicora.com/**,https://yicora.com/auth/callback,https://yicora.vercel.app/auth/callback,http://localhost:3000/**,http://localhost:3000/auth/callback"
} | ConvertTo-Json

Write-Host ""
Write-Host "Updating Site URL to https://yicora.com ..." -ForegroundColor Cyan
$Updated = Invoke-RestMethod -Uri $Url -Headers $Headers -Method PATCH -Body $Body
Write-Host ""
Write-Host "Done!" -ForegroundColor Green
Write-Host "  New Site URL : $($Updated.site_url)" -ForegroundColor Green
Write-Host "  New Redirects: $($Updated.uri_allow_list)" -ForegroundColor Green
Write-Host ""
Write-Host "Google login will now redirect correctly to https://yicora.com/auth/callback" -ForegroundColor Green
