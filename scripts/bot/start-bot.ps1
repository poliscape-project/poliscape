# PoliScape Bots - Auto Startup Script
# LINE Bot + Telegram Bot 統合ランチャー

$ErrorActionPreference = "Continue"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Resolve-Path (Join-Path $scriptDir "../../")

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PoliScape Dev Bots Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# .env.local からキーを読み取り
$envFile = Join-Path $projectDir ".env.local"
$accessToken = ""
$hasTelegramToken = $false
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match "^LINE_CHANNEL_ACCESS_TOKEN=(.+)$") {
            $accessToken = $Matches[1].Trim()
        }
        if ($_ -match "^TELEGRAM_BOT_TOKEN=(.+)$" -and $Matches[1].Trim().Length -gt 10) {
            $hasTelegramToken = $true
        }
    }
}

# 1. Telegram Bot 起動 (ロングポーリング: トンネル不要)
$telegramProcess = $null
if ($hasTelegramToken) {
    Write-Host "[1/3] Telegram Bot を起動中..." -ForegroundColor Yellow
    $telegramProcess = Start-Process -FilePath "node" `
        -ArgumentList "--watch", "scripts/bot/telegram-bot.mjs" `
        -WorkingDirectory $projectDir `
        -PassThru -WindowStyle Minimized
    Start-Sleep -Seconds 1
    if (-not $telegramProcess.HasExited) {
        Write-Host "  ✅ Telegram Bot 起動完了 (PID: $($telegramProcess.Id))" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Telegram Bot の起動に失敗しました" -ForegroundColor Yellow
    }
}

# 2. LINE Bot サーバー起動
Write-Host "[2/3] LINE Bot サーバーを起動中..." -ForegroundColor Yellow
$botProcess = Start-Process -FilePath "node" `
    -ArgumentList "--watch", "scripts/bot/line-bot.mjs" `
    -WorkingDirectory $projectDir `
    -PassThru -WindowStyle Minimized
Start-Sleep -Seconds 2

if ($botProcess.HasExited) {
    Write-Host "  ❌ LINE Bot の起動に失敗しました" -ForegroundColor Red
} else {
    Write-Host "  ✅ LINE Bot 起動完了 (PID: $($botProcess.Id), Port: 3001)" -ForegroundColor Green
}

# 3. cloudflared トンネル起動 (LINE用)
Write-Host "[3/3] cloudflared トンネルを起動中..." -ForegroundColor Yellow
$cloudflaredPath = Join-Path $scriptDir "cloudflared.exe"
$logFile = Join-Path $scriptDir "cloudflared.log"

$tunnelProcess = Start-Process -FilePath $cloudflaredPath `
    -ArgumentList "tunnel", "--url", "http://localhost:3001" `
    -RedirectStandardError $logFile `
    -PassThru -WindowStyle Hidden

# トンネルURLが出力されるまで待機（最大30秒）
$tunnelUrl = ""
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    if (Test-Path $logFile) {
        $content = Get-Content $logFile -Raw -ErrorAction SilentlyContinue
        if ($content -match "https://[a-z0-9\-]+\.trycloudflare\.com") {
            $tunnelUrl = $Matches[0]
            break
        }
    }
}

if ($tunnelUrl) {
    Write-Host "  ✅ トンネル起動完了" -ForegroundColor Green
    Write-Host "  🔗 URL: $tunnelUrl" -ForegroundColor Cyan
    $webhookUrl = "$tunnelUrl/webhook"
    if ($accessToken) {
        try {
            $headers = @{
                "Content-Type"  = "application/json"
                "Authorization" = "Bearer $accessToken"
            }
            $body = @{ endpoint = $webhookUrl } | ConvertTo-Json
            $response = Invoke-RestMethod -Uri "https://api.line.me/v2/bot/channel/webhook/endpoint" `
                -Method Put -Headers $headers -Body $body
            Write-Host "  ✅ LINE Webhook URL を自動更新しました！" -ForegroundColor Green
        } catch {
            Write-Host "  ⚠️ 自動更新に失敗: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  ⚠️ トンネルURLの取得がタイムアウトしました" -ForegroundColor Yellow
}

# 完了ステータス表示
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  🟢 PoliScape 開発環境 稼働中！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
if ($telegramProcess -and -not $telegramProcess.HasExited) {
    Write-Host "  📱 Telegram: @polisacape_dev_bot 稼働中" -ForegroundColor Green
}
if ($botProcess -and -not $botProcess.HasExited) {
    Write-Host "  💬 LINE Bot: 稼働中 (Port 3001)" -ForegroundColor Green
}
Write-Host ""
Write-Host "このウィンドウを閉じるとBotも停止します。" -ForegroundColor Yellow
Write-Host "Ctrl+C で終了できます。" -ForegroundColor Yellow
Write-Host ""

# プロセス監視ループ
try {
    while (
        ($botProcess -and -not $botProcess.HasExited) -or `
        ($telegramProcess -and -not $telegramProcess.HasExited)
    ) {
        Start-Sleep -Seconds 10
    }
} finally {
    if ($botProcess -and -not $botProcess.HasExited) { Stop-Process -Id $botProcess.Id -Force -ErrorAction SilentlyContinue }
    if ($telegramProcess -and -not $telegramProcess.HasExited) { Stop-Process -Id $telegramProcess.Id -Force -ErrorAction SilentlyContinue }
    if ($tunnelProcess -and -not $tunnelProcess.HasExited) { Stop-Process -Id $tunnelProcess.Id -Force -ErrorAction SilentlyContinue }
    Write-Host "全Botを停止しました。" -ForegroundColor Red
}
