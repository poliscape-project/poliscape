# PoliScape プロジェクト全体構造

> **目的**: 公的データと客観的事実で知る、日本の政策カタログ
>
> 🌐 https://poliscape.vercel.app
> 🐦 https://x.com/poliscape_jp (@poliscape_jp / X Premium認証済み)
> 📦 https://github.com/poliscape-project/poliscape.git (main → Vercel自動デプロイ)

---

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | **Next.js 16.3.4** (App Router, SSG / Turbopack) |
| UI | **React 19** + **Tailwind CSS v4** |
| アイコン | lucide-react |
| データストア | Upstash Redis（閲覧数のみ・インメモリフォールバックあり） |
| ホスティング | Vercel（`main` push → GitHub Actions → `vercel deploy --prod` で自動デプロイ） |
| OGP画像 | `next/og` ImageResponse（ビルド時全500枚静的生成 / SSG） |
| SEO構造化データ | Schema.org JSON-LD（WebSite / Organization / Article / BreadcrumbList） |
| CI/CD | GitHub Actions（自動デプロイ ＋ AI自動ファクトチェック） |

---

## プロジェクト構成マップ

```
src/
├── app/                           # Next.js App Router
│   ├── page.tsx (34KB)            # トップページ（一覧・検索・フィルタ・バッジ表示）
│   ├── layout.tsx                 # ルートレイアウト（SEO・メタデータ・JSON-LD共通設定）
│   ├── globals.css                # Tailwind グローバルCSS
│   ├── policies/[id]/
│   │   ├── page.tsx               # 政策詳細ページ (SSG)
│   │   ├── opengraph-image.tsx    # 動的OGP画像（ビルド時500枚静的生成）
│   │   └── twitter-image.tsx      # Twitter用OGP（opengraph-imageのコピー）
│   ├── laws/
│   │   ├── page.tsx               # 根拠法一覧
│   │   └── [id]/page.tsx          # 根拠法詳細
│   ├── api/views/[id]/            # 閲覧数 API (Route Handler)
│   ├── sitemap.ts                 # SEO サイトマップ
│   └── robots.ts                  # robots.txt
│
├── components/                    # UIコンポーネント（67ファイル）
│   ├── Header.tsx                 # ヘッダー（天秤ロゴ＋根拠法リンク＋やさしい日本語トグル）
│   ├── Footer.tsx                 # フッター
│   ├── PolicyDetailView.tsx       # 政策詳細ビュー（メイン）
│   ├── PolicyHighlightCards.tsx   # 特大数字カード（6.7KB・JSONから動的取得）
│   ├── PolicyPerspectives.tsx     # 両論併記（11KB・JSONから動的取得）
│   ├── PolicyChangesCard.tsx      # ビフォーアフター
│   ├── PolicySummaryCard.tsx      # 3行要約
│   ├── PolicyTimeline.tsx         # タイムライン
│   ├── PolicySources.tsx          # 一次情報ソース
│   ├── PolicyFoundationLawCard.tsx # 根拠法カード（e-Gov公式リンク連携）
│   ├── PolicyInternationalCard.tsx # 海外主要国の制度比較カード
│   ├── PolicyModals.tsx           # モーダル
│   ├── ViewCounter.tsx            # 閲覧数カウンター
│   ├── KeyboardWidgetNav.tsx      # キーボードナビ
│   ├── LawDetailView.tsx          # 根拠法詳細ビュー
│   ├── LawsIndexView.tsx         # 根拠法一覧ビュー
│   └── [51個の個別シミュレーター] # 各政策に対応するシミュレーター
│
├── data/
│   ├── policies/                  # ★ 政策データ（500 JSON files）
│   │                              #   badges, highlights, voices は各JSONに直接格納済み
│   ├── laws/
│   │   └── foundation-laws.json   # 根拠法データ（53件・189KB）
│   └── sample-policy.json         # テンプレート・サンプル
│
├── lib/
│   ├── policies.ts (87KB)         # データアクセス層（全500 JSON import + export）
│   ├── laws.ts (32KB)             # 根拠法アクセス層（53法＋政策ID紐付けマッピング）
│   ├── jsonld.ts (5KB)            # Schema.org 構造化データ生成（SEO用JSON-LD）
│   └── redis.ts                   # Upstash Redis クライアント
│
├── types/
│   ├── policy.ts                  # 政策 TypeScript 型定義
│   └── law.ts                     # 根拠法（FoundationLaw）TypeScript 型定義
│
└── scripts/                       # ユーティリティスクリプト（8ファイル）
    ├── analyze-issue.js           # AI自動ファクトチェック（Gemini API連携）
    ├── check-facts.js             # 全500政策JSONの静的検査ツール
    ├── migrate-categories.js      # カテゴリ統合マイグレーション
    ├── migrate-badges-to-json.mjs # バッジデータをJSONに注入（実行済み）
    ├── migrate-data-to-json.mjs   # highlights/voicesをJSONに注入（実行済み）
    ├── extract-highlights.mjs     # ハイライト抽出用ツール
    ├── extract-voices.mjs         # 声データ抽出用ツール
    └── clean-highlights.cjs       # ハイライトデータ整形

.github/
├── workflows/
│   ├── deploy.yml                 # main push → Vercel本番デプロイ
│   └── ai-fact-check.yml          # Issue「事実誤認」報告 → AI自動検証＆返信
└── ISSUE_TEMPLATE/
    └── fact_check_report.md       # 事実誤認報告用Issueテンプレート
```

---

## カテゴリ構成（11カテゴリ統合済み）

| # | カテゴリID | ラベル | アイコン | OGP背景色 | 件数 |
|---|---|---|---|---|---|
| 1 | `childcare` | 子育て・家族 | Baby | エメラルドグリーン `#059669→#047857→#064e3b` | 25 |
| 2 | `tax` | 税金・お金 | Wallet | ゴールドアンバー `#d97706→#b45309→#78350f` | 32 |
| 3 | `economy` | 経済・産業 | Scale | オーシャンシアン `#0284c7→#0369a1→#0c4a6e` | 61 |
| 4 | `healthcare` | 医療・健康・福祉 | HeartPulse | ルビーローズ `#e11d48→#be123c→#881337` | 55 |
| 5 | `pension` | 年金・社会保障 | Wallet | ロイヤルバイオレット `#7c3aed→#6d28d9→#4c1d95` | 9 |
| 6 | `labor` | 働き方・雇用 | Briefcase | ビビッドオレンジ `#ea580c→#c2410c→#7c2d12` | 51 |
| 7 | `education` | 教育・研究・文化 | GraduationCap | コバルトブルー `#2563eb→#1d4ed8→#1e3a8a` | 39 |
| 8 | `digital` | デジタル・IT・AI | Smartphone | エレクトリックシアン `#0284c7→#0369a1→#075985` | 35 |
| 9 | `transport` | 交通・モビリティ・物流 | Train | イエローゴールド `#ca8a04→#a16207→#713f12` | 43 |
| 10 | `environment` | 環境・エネルギー・防災 | Leaf | フォレストグリーン `#16a34a→#15803d→#14532d` | 72 |
| 11 | `society` | 社会・安全保障・司法 | Shield | ディープスレート `#475569→#334155→#1e293b` | 78 |

---

## 政策データの型定義 (`PolicyTopic`)

```typescript
interface PolicyTopic {
  id: string                 // ファイル名と一致するユニークID
  title: string              // 「児童手当の抜本的拡充」
  catchphrase: string        // 見出しコピー
  category: PolicyCategory   // 11カテゴリのいずれか
  categoryLabel: string      // サブジャンル（「子育て・家族」等、各政策ごとに異なる）
  lastUpdated: string        // 最終更新日 (YYYY-MM-DD)
  effectiveDate?: string     // 施行時期 (例: "2024年10月")
  status: PolicyStatus       // enacted | discussing | proposed
  statusLabel: string        // 「成立・施行済み」

  // --- 時限措置フラグ ---
  temporaryPeriod?: string   // "2024年1月〜12月" のように期間を明示
  temporaryLabel?: string    // "2024年限定" 等のバッジラベル

  summary: {
    standard: string[]       // 3行要約（通常版）
    simple: string[]         // 3行要約（やさしい日本語版）
  }

  background: {
    standard: string         // 背景・目的（通常版）
    simple: string           // 背景・目的（やさしい日本語版）
  }

  changes: PolicyChangeItem[]
  perspectives: {
    benefitsTitle: string
    benefits: PolicyPerspectiveItem[]
    challengesTitle: string
    challenges: PolicyPerspectiveItem[]
  }
  timeline: PolicyTimelineStep[]
  sources: PolicySource[]

  // --- 以下はJSON内に直接格納済み（旧ハードコードから移行完了）---
  badges?: { text: string; color: string }[]       // トップページのバッジ表示
  highlights?: HighlightCardItem[]                  // 特大数字カード用データ
  voices?: VoiceSetItem                             // 両論併記の声データ
  international?: PolicyInternationalComparison     // 海外制度比較データ
}
```

---

## 政策データ追加時のチェックリスト

> [!IMPORTANT]
> badges, highlights, voices はかつて別ファイル（`page.tsx` の `badgeMap`、`PolicyHighlightCards.tsx` の `cardDataMap`、
> `PolicyPerspectives.tsx` の `voicesMap`）にハードコードされていましたが、**マイグレーション済み**です。
> 現在は **各政策JSONファイル内に直接格納** されています。以下の手順に従ってください。

新しい政策データを追加する場合、以下の **2箇所** を編集します：

1. **JSON データファイル作成**: `src/data/policies/{policy-id}.json`
   - `sample-policy.json` をテンプレートとして使用
   - `badges`, `highlights`, `voices` もこのJSON内に含める
2. **データアクセス層に登録**: `src/lib/policies.ts` に import 文と `policies` 配列へのエントリを追加

（任意）シミュレーターを追加する場合は、新しいコンポーネントを作成し `PolicyDetailView.tsx` で条件分岐を追加。

---

## ヘッダー構成（Header.tsx）

| 要素 | 実装詳細 |
|------|---------|
| **スタイル** | 上部固定・すりガラス（`sticky top-0 bg-white/80 backdrop-blur-md`） |
| **ロゴ** | ダークネイビー背景（`bg-slate-900`）× ティール天秤アイコン（`Scale`, `text-teal-400`） |
| **タイトル** | **PoliScape** ポリスケープ |
| **バッジ** | 🛡️ 公的データ準拠（`ShieldCheck` アイコン＋エメラルド背景） |
| **サブテキスト** | 公的データと客観的事実で知る、日本の政策カタログ |
| **右側ナビ1** | 📜 **根拠法アーカイブ**ボタン（`/laws` へ遷移、`Landmark` アイコン＋インディゴピル） |
| **右側ナビ2** | ✨ **やさしい日本語モード**トグル（`Sparkles` アイコン、ON時アンバー＋パルスアニメ） |

---

## OGP画像システム（完全SSG化）

- **ファイル**: `src/app/policies/[id]/opengraph-image.tsx`
- **生成**: ビルド時に `generateStaticParams` で全500枚を事前生成（SSG）
- **配信**: Vercel CDNから即時配信（Xクローラーのタイムアウトを根本解消）
- **サイズ**: 1200×630px PNG
- **デザイン**: 11カテゴリ別ジュエルトーン背景 ＋ 白ピルバッジ ＋ 天秤ロゴ

### Satoriレンダリング制約（opengraph-image.tsx内）
- `display: flex` が必須
- `textShadow` は文字列で指定可能
- `fontWeight` は `"bold"` ではなく数値 `900` を使う
- バッジ内テキストは `<div>` の中に `<span>` を入れて `color` と `fontSize` を `<span>` に設定する

---

## CI/CD ＆ 自動化パイプライン

### GitHub Actions
1. **`deploy.yml`**: `main` ブランチへの push で Vercel 本番デプロイを自動実行
2. **`ai-fact-check.yml`**: Issue に「事実誤認」「数値報告」「fact-check」ラベルが付くと、Gemini API で自動検証し結果をIssueコメントとして返信

### Issue テンプレート
- `.github/ISSUE_TEMPLATE/fact_check_report.md`: 一般ユーザーが事実誤認を報告するための定型フォーム（対象URL、現在の記述、修正案、根拠ソースを入力）

---

## 既知の制約・注意事項

### PowerShellでの日本語処理
- `Get-Content | ConvertFrom-Json` で日本語文字化け → `[System.IO.File]::ReadAllText($_, [System.Text.Encoding]::UTF8)` を使う
- `Out-File` は `[id]` をワイルドカード扱い → `[System.IO.File]::WriteAllText()` を使う

### Xカード表示
- 画像ファイルをメディアボタンから添付するとOGPカードが出ない。テキスト＋URLのみで投稿する
- 一度キャッシュされたURLは数日間再読み込みされない。`?v=N` でキャッシュバスト可能
- ポストを編集してもカードのキャッシュは更新されない。削除→再投稿が必要