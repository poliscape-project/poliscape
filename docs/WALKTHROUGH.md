# PoliScape 最新ウォークスルー ＆ 引き継ぎ書

> **最終更新**: 2026-09-14
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

## 直近で完了した作業

### 1. カテゴリ再設計（20 → 11カテゴリ統合）
- 全76ファイルの政策JSONカテゴリフィールドを更新
- `types/policy.ts`、`page.tsx` のカテゴリ設定を11種類に統一
- マイグレーションスクリプト `scripts/migrate-categories.js` で検証済み

### 2. データアーキテクチャ移行（ハードコード → JSON内包）
- `badgeMap`（page.tsx）、`cardDataMap`（PolicyHighlightCards.tsx）、`voicesMap`（PolicyPerspectives.tsx）を廃止
- すべてのバッジ・ハイライト・声データを**各政策JSONファイル内に直接格納**
- 結果、PolicyHighlightCards.tsx は 109KB → 6.7KB、PolicyPerspectives.tsx は 96KB → 11KB に大幅スリム化

### 3. 動的OGP画像のSSG化（ビルド時全500枚事前生成）
- `opengraph-image.tsx` で `generateStaticParams` を実装
- Xのタイムアウト問題を完全解消（CDNから即時配信）
- 11カテゴリ別ジュエルトーン背景 ＋ 白ピルバッジ ＋ 天秤ロゴ

### 4. ヘッダーリニューアル ＆ タグライン統一
- `Header.tsx`: ダークネイビー×ティール天秤ロゴ、根拠法アーカイブボタン、やさしい日本語トグル
- `layout.tsx`: SEOメタデータ全箇所を「公的データと客観的事実で知る、日本の政策カタログ」に統一

### 5. CI/CD ＆ 自動ファクトチェック整備
- `.github/workflows/deploy.yml`: main push → Vercel自動デプロイ
- `.github/workflows/ai-fact-check.yml`: Issue報告 → Gemini APIで自動検証＆返信
- `.github/ISSUE_TEMPLATE/fact_check_report.md`: 事実誤認報告テンプレート

### 6. X投稿運用（Day 1〜8 予約済み）
- X公式の予約機能にて Day 1〜8 を設定完了
- 児童手当、年収の壁、新NISA、ライドシェア、高齢者医療費、育休給付、年金開始年齢、自転車青切符

### 7. 開発体制の設計・ドキュメント整備
- **メイン開発**: ノートPC（Ryzen AI 340）で腰を据えて作業。完了後 git push して電源OFF自由。
- **サブ開発・常時待機**: 自宅デスクトップ（Ryzen 3600 / 24GB）でLINE Bot受信サーバーを稼働。
- **スキマ時間**: スマホのLINEからデスクトップに指示（アイデア記録、量産指示など）。
- **同期方式**: `docs/` 配下のMarkdownをGitHubで一元管理。セッション履歴の自動同期は不要。

---

## 今後やること・ロードマップ

### 直近（次セッション）
1. **スマホ（LINE）× デスクトップ連携Botの構築**
   - LINE Messaging APIチャンネル作成
   - デスクトップ側常駐スクリプト（LINE受信 → AI処理 → LINE返信）
   - Cloudflare Tunnel等で安全に接続
2. **Day 9以降のX投稿コンテンツ準備**
   - 候補は `CONTENT_PIPELINE.md` に記載

### 中期
- 新機能のプロトタイピング（候補は `IDEAS.md` に記載）
- 政策データの継続的な更新・追加

---

## デスクトップPCセットアップ時の手順

1. `git clone https://github.com/poliscape-project/poliscape.git`
2. `.env.local` を作成（ノートPC側からコピー。内容: `GEMINI_API_KEY` 等）
3. `npm install`
4. `npm run dev` で動作確認