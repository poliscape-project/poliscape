# PoliScape（ポリスケープ）

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](./LICENSE)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)
[![Deploy](https://img.shields.io/github/actions/workflow/status/poliscape-project/poliscape/deploy.yml?label=deploy)](https://github.com/poliscape-project/poliscape/actions)

> 公的データと客観的事実で知る、日本の政策カタログ

🌐 **https://poliscape.vercel.app**

---

## ✨ 特徴

- 📊 **全500政策**の網羅的アーカイブとタイムライン整理
- ⚖️ **両論併記** — メリットと課題を公平に掲載
- 📖 **53の根拠法アーカイブ** — 関連法律の解説と政策の紐づけ
- 🧮 **51種類の個別家計シミュレーター** — 年収・家族構成を入力して影響額を試算
- 📝 **3行要約・ビフォーアフター・特大数字**による直感的な理解
- 🌐 **やさしい日本語モード** — 外国人住民や日本語学習者にも配慮
- 🖼️ **動的OGP画像** — 政策ごとにカテゴリ色のリンクカードを自動生成
- ⌨️ **キーボードナビゲーション対応** — アクセシビリティ

## 📁 カテゴリ（11種類）

| カテゴリ | ラベル | 件数 |
|---|---|---|
| `childcare` | 子育て・家族 | 25 |
| `tax` | 税金・お金 | 32 |
| `economy` | 経済・産業 | 61 |
| `healthcare` | 医療・健康・福祉 | 55 |
| `pension` | 年金・社会保障 | 9 |
| `labor` | 働き方・雇用 | 51 |
| `education` | 教育・研究・文化 | 39 |
| `digital` | デジタル・IT・AI | 35 |
| `transport` | 交通・モビリティ・物流 | 43 |
| `environment` | 環境・エネルギー・防災 | 72 |
| `society` | 社会・安全保障・司法 | 78 |

## 🛠 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router, SSG, Turbopack) |
| UI | React 19 + Tailwind CSS v4 |
| アイコン | lucide-react |
| OGP画像 | next/og ImageResponse（ビルド時に全500枚を静的生成） |
| データストア | Upstash Redis (閲覧数) |
| ホスティング | Vercel |
| CI/CD | GitHub Actions → Vercel |

## 📂 プロジェクト構成

```
src/
├── app/                        # Next.js App Router
│   ├── page.tsx                # トップページ（一覧・検索・フィルタ）
│   ├── layout.tsx              # ルートレイアウト
│   ├── policies/[id]/
│   │   ├── page.tsx            # 政策詳細ページ (SSG)
│   │   ├── opengraph-image.tsx # 動的OGP画像（ビルド時500枚静的生成）
│   │   └── twitter-image.tsx   # Twitter用OGP
│   ├── laws/
│   │   ├── page.tsx            # 根拠法一覧
│   │   └── [id]/page.tsx       # 根拠法詳細 (SSG)
│   ├── api/views/[id]/         # 閲覧数 API (Route Handler)
│   ├── sitemap.ts              # SEO サイトマップ
│   └── robots.ts               # robots.txt
├── components/                 # UIコンポーネント（63ファイル）
│   ├── Header.tsx              # ヘッダー（天秤ロゴ）
│   ├── Footer.tsx              # フッター
│   ├── PolicyDetailView.tsx    # 政策詳細ビュー
│   ├── PolicyHighlightCards.tsx # 特大数字カード（全政策分）
│   ├── PolicyPerspectives.tsx  # 両論併記（全政策分）
│   ├── LawDetailView.tsx       # 根拠法詳細ビュー
│   ├── LawsIndexView.tsx       # 根拠法一覧ビュー
│   ├── ViewCounter.tsx         # 閲覧数カウンター
│   └── [51個の個別シミュレーター]
├── data/
│   └── policies/               # 政策データ (500 JSON files)
├── lib/
│   ├── policies.ts             # データアクセス層
│   └── redis.ts                # Upstash Redis クライアント
└── types/
    └── policy.ts               # TypeScript 型定義
```

## 🚀 ローカル開発

```bash
npm install
npm run dev
# http://localhost:3000 で起動
```

## 📜 ライセンス

- **ソースコード**: [MIT License](./LICENSE)
- **政策データ・コンテンツ**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)

詳細は [LICENSE](./LICENSE) をご確認ください。

## 🤝 コントリビューション

Issue や Pull Request を歓迎します。編集方針（中立性・一次情報の尊重・両論併記）に沿った貢献をお願いします。

---

© 2025 PoliScape Project
