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
| ホスティング | Vercel |
| OGP画像 | `next/og` ImageResponse（ビルド時全500枚静的生成 / SSG） |

---

## プロジェクト構成マップ

```
src/
├── app/                           # Next.js App Router
│   ├── page.tsx (34KB)            # トップページ（一覧・検索・フィルタ・バッジ表示）
│   ├── layout.tsx                 # ルートレイアウト（SEO・メタデータ共通設定）
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
├── components/                    # UIコンポーネント（63ファイル）
│   ├── Header.tsx                 # ヘッダー（天秤ロゴ＋PoliScapeタイトル）
│   ├── Footer.tsx                 # フッター
│   ├── PolicyDetailView.tsx       # 政策詳細ビュー（メイン）
│   ├── PolicyHighlightCards.tsx   # 特大数字カード（109KB, 全政策分）
│   ├── PolicyPerspectives.tsx     # 両論併記（96KB, 全政策分）
│   ├── PolicyCalculator.tsx       # 児童手当シミュレーター
│   ├── PolicyChangesCard.tsx      # ビフォーアフター
│   ├── PolicySummaryCard.tsx      # 3行要約
│   ├── PolicyTimeline.tsx         # タイムライン
│   ├── PolicySources.tsx          # 一次情報ソース
│   ├── PolicyModals.tsx           # モーダル
│   ├── ViewCounter.tsx            # 閲覧数カウンター
│   ├── KeyboardWidgetNav.tsx      # キーボードナビ
│   ├── LawDetailView.tsx          # 根拠法詳細ビュー
│   ├── LawsIndexView.tsx          # 根拠法一覧ビュー
│   └── [51個の個別シミュレーター] # 各政策に対応するシミュレーター
│
├── data/
│   ├── policies/                  # 政策データ（500 JSON files）
│   └── sample-policy.json         # テンプレート・サンプル
│
├── lib/
│   ├── policies.ts (87KB)         # データアクセス層（全500 JSON import + export）
│   └── redis.ts                   # Upstash Redis クライアント
│
├── types/
│   └── policy.ts                  # TypeScript 型定義
│
└── scripts/
    └── migrate-categories.js      # カテゴリマイグレーションスクリプト
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
PolicyTopic {
  id: string                 // ファイル名と一致するユニークID
  title: string              // 「児童手当の抜本的拡充」
  catchphrase: string        // 見出しコピー
  category: PolicyCategory   // childcare | tax | economy | healthcare | pension | labor | education | digital | transport | environment | society
  categoryLabel: string      // サブジャンル（例：「子育て・家族」「金融・経済」など）
  lastUpdated: string        // 最終更新日 (YYYY-MM-DD)
  effectiveDate?: string     // 施行時期 (例: "2024年10月")
  status: PolicyStatus       // enacted | discussing | proposed
  statusLabel: string        // 「成立・施行済み」など

  summary: {
    standard: string[]       // 3行要約（通常版）
    simple: string[]         // 3行要約（やさしい日本語版）
  }

  background: {
    standard: string         // 背景・目的（通常版）
    simple: string           // 背景・目的（やさしい日本語版）
  }

  changes: PolicyChangeItem[]      // ビフォーアフター（主な変更点）
  perspectives: {
    benefitsTitle: string
    benefits: PolicyPerspectiveItem[]    // メリット・賛成側の論点
    challengesTitle: string
    challenges: PolicyPerspectiveItem[]  // 課題・慎重側の論点
  }
  timeline: PolicyTimelineStep[]   // タイムライン
  sources: PolicySource[]          // 一次情報ソース
}
```

---

## 政策データ追加時のチェックリスト（5箇所）

新しい政策データを追加する場合、以下の **5箇所** を編集します：

1. **JSON データファイル作成**: `src/data/policies/{policy-id}.json` (`sample-policy.json` 準拠)
2. **データアクセス層に登録**: `src/lib/policies.ts` に import と export を追加
3. **トップページにバッジを追加**: `src/app/page.tsx` の `badgeMap` に政策IDとバッジを追加
4. **特大数字カード（ハイライト）を追加**: `src/components/PolicyHighlightCards.tsx` の `cardDataMap` に追加
5. **両論併記の声データを追加**: `src/components/PolicyPerspectives.tsx` の `voicesMap` に追加

---

## OGP画像システム（完全SSG化）

- **ファイル**: `src/app/policies/[id]/opengraph-image.tsx`
- **生成タイミング**: ビルド時事前生成（`generateStaticParams` によるSSG）
- **メリット**: Xクローラーのタイムアウトを回避し、CDNから即時配信（大判カードが確実に表示される）
- **サイズ**: 1200×630px PNG
- **デザイン**: 11カテゴリ別ジュエルトーン背景 ＋ 白ピルバッジ ＋ 天秤ロゴ