# PoliScape 最新ウォークスルー ＆ 引き継ぎ書

> **最終更新**: 2026-09-15
>
> このファイルは「常に最新の状態」を記録するメイン引き継ぎ書です。
> 新しいセッションや別端末のAIは、**まずこのファイルと `PROJECT_OVERVIEW.md` を読んで**現在地を把握してください。
> 過去セッションの詳細が必要な場合は `docs/walkthroughs/` を参照。

---

## 現在のサイト状況

| 項目 | 数値 / 状況 |
|------|------------|
| 登録済み政策データ | **500件** (JSON・badges/highlights/voices内包) |
| 根拠法データ | **53件** (`foundation-laws.json`) |
| 個別シミュレーター | **51種類** |
| UIコンポーネント | **67ファイル** |
| カテゴリ | **11カテゴリ** |
| ビルド | **1062ページ SSG事前生成（エラー0・約30秒）** |
| X投稿 | **Day 1〜8 予約済み**（詳細は `CONTENT_PIPELINE.md`） |
| CI/CD | GitHub Actions（自動デプロイ ＋ AI自動ファクトチェック）稼働中 |

---

## マルチデバイス開発体制（2026-09-15 構築完了）

### デバイス構成と役割分担

| デバイス | 役割 | 電源 | 主な作業 |
|:---|:---|:---:|:---|
| **📱 スマホ（Telegram / LINE）** | リモコン ＆ メモ帳 | いつでも | アイデア記録、政策追加指示、X投稿案生成、AIとのブレスト |
| **🖥️ 自宅デスクトップ**<br>(Ryzen 5 3600 / 24GB DDR4) | 24時間常駐サーバー | **常時ON** | Telegram Bot / LINE Bot 常駐、Gemini 3.8 Flash AI推論、Git自動 pull/push |
| **💻 ノートPC**<br>(Ryzen AI 340 / 16GB DDR5) | メイン開発（母艦） | **自由OFF** | UI・全体レイアウト改修、画面プレビュー確認しながらのコーディング |

### システム構成図

```
📱 スマホ ──→ Telegram Bot（ロングポーリング・メインコンソール）──→ 🖥️ デスクトップPC（24h常駐）
              LINE Bot（Webhook + cloudflared・サブコンソール）────→    ↕ Git auto pull/push
                                                                     ☁️ GitHub（main）
💻 ノートPC ←── git pull ──────────────────────────────────────→       ↕ 自動デプロイ
                                                                     🌐 Vercel（本番サイト）
```

### Bot 常駐環境の詳細（デスクトップPC）

| 項目 | 設定 |
|:---|:---|
| 電源・スリープ | 無効化済み（24時間稼働） |
| 自動ログオン | 設定済み |
| 起動ランチャー | `scripts/bot/start-bot.ps1`（スタートアップ登録済み） |
| GitHub 認証 | `dtake-dtake` アカウント（Write権限で Collaborator 参加済み） |

### Telegram Bot（メインコンソール: `@polisacape_dev_bot`）

| 項目 | 詳細 |
|:---|:---|
| ファイル | `scripts/bot/telegram-bot.mjs`（532行） |
| 接続方式 | **ロングポーリング**（外部トンネル不要・常駐が極めて安定） |
| マルチデバイス | スマホ・デスクトップ・ノートPCの全デバイスで同時利用可能 |
| AI モデル | Gemini 3.8 Flash（3.6 / 2.0 自動フォールバック） |
| 機能 | 政策追加（2段階承認 + インラインボタンUI）、アイデア記録、政策検索、ステータス確認、自然対話 |

### LINE Bot（サブコンソール）

| 項目 | 詳細 |
|:---|:---|
| ファイル | `scripts/bot/line-bot.mjs`（450行） |
| 接続方式 | Webhook（cloudflared トンネル経由） |
| LINE アカウント | `@320ygfjy`（PoliScape）/ Channel ID: `2011584727` |
| トンネルURL自動更新 | `start-bot.ps1` が起動時に LINE API で Webhook URL を自動設定 |
| 機能 | Telegram Bot と同等（政策追加、アイデア記録、ステータス確認、自然対話） |

### スマホからできること一覧

```
【1】アイデアの自動記録 ＆ GitHubプッシュ
  「アイデア: 政策比較チャート機能」→ docs/IDEAS.md に追記＆push

【2】政策ページの新規追加（2段階承認フロー）
  「政策追加: 高校無償化」→ AI下書き提示 → 「🚀 作成＆Push」ボタンで本番反映

【3】X投稿案の自動作成
  「ライドシェアの投稿案作って」→ 投稿テンプレート生成

【4】サイトの健康状態チェック
  「ステータス」→ 政策数・最新コミット・稼働状況を即答

【5】政策検索
  「/search 年金」→ 登録済み政策カタログの全文検索

【6】自然な相談・ブレスト
  「ヘッダーに検索バー置くのどう思う？」→ 設計相談
```

### Git 自動同期の仕組み

- **デスクトップPC**: LINE/Telegram受信時に自動 `git pull`、10分ごとの定期同期
- **ノートPC**: 作業開始時に `git pull`（Antigravityに「作業始めるよ」で自動実行）
- **Vercel**: GitHub main への push をトリガーに自動ビルド＆デプロイ

### 安全設計

- **全体レイアウト・UI改修**: スマホからは直接コード変更せず `docs/IDEAS.md` に蓄積 → ノートPCで画面を見ながら安全に実装
- **政策データ追加**: 独立した新規JSONファイルの追加のみ → 既存ページを破壊しない
- **2段階承認**: AIが下書きを提示 → ユーザーが「実行して」と明示的に承認した場合のみ反映

---

## 直近で完了した作業

### 1. カテゴリ再設計（20 → 11カテゴリ統合）
- 全76ファイルの政策JSONカテゴリフィールドを更新
- `types/policy.ts`、`page.tsx` のカテゴリ設定を11種類に統一

### 2. データアーキテクチャ移行（ハードコード → JSON内包）
- `badgeMap`、`cardDataMap`、`voicesMap` を廃止し各政策JSONファイル内に直接格納
- PolicyHighlightCards.tsx 109KB → 6.7KB、PolicyPerspectives.tsx 96KB → 11KB に大幅スリム化

### 3. 動的OGP画像のSSG化（ビルド時全500枚事前生成）
- Xのタイムアウト問題を完全解消（CDNから即時配信）

### 4. ヘッダーリニューアル ＆ タグライン統一

### 5. CI/CD ＆ 自動ファクトチェック整備

### 6. X投稿運用（Day 1〜8 予約済み）

### 7. マルチデバイス開発環境の完全構築（2026-09-14〜15）
- LINE Bot の実装・テスト完了（Gemini 3.8 Flash + 自動フォールバック）
- Telegram Bot の実装・テスト完了（ロングポーリング + インラインボタンUI）
- デスクトップPC 24時間常駐サーバーの構築（自動起動・自動ログオン・スリープ無効）
- 統合ランチャー `start-bot.ps1` の配備（LINE Webhook URL 自動更新機能付き）
- GitHub Collaborator 設定（`dtake-dtake` を Write 権限で追加）

---

## 今後やること・ロードマップ

### 直近
1. **スマホからの政策追加テスト**（Telegram Bot の 2段階承認フロー実機確認）
2. **Day 9以降のX投稿コンテンツ準備**（候補は `CONTENT_PIPELINE.md` に記載）
3. **マルチプロジェクト対応**（他の3プロジェクトも同一 Bot から操作可能に拡張）

### 中期
- Cloudflare 固定URL化（LINE Bot用、再起動時のURL変更を完全解消）
- 新機能のプロトタイピング（候補は `IDEAS.md` に記載）
- 政策データの継続的な更新・追加

---

## デスクトップPCセットアップ手順（完了済み・参考用）

1. `git clone https://github.com/poliscape-project/poliscape.git`
2. `.env.local` を作成（`GEMINI_API_KEY`, `LINE_CHANNEL_SECRET`, `LINE_CHANNEL_ACCESS_TOKEN`, `TELEGRAM_BOT_TOKEN`）
3. `cloudflared.exe` を `scripts/bot/` にダウンロード
4. `scripts/bot/start-bot.ps1` をスタートアップに登録
5. GitHub 認証設定（`gh auth login` で `dtake-dtake` アカウント）
6. Collaborator 招待承認（`poliscape-project` から Write 権限）