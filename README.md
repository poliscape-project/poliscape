# PoliScape（ポリスケープ）

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](./LICENSE)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)
[![Deploy](https://img.shields.io/github/actions/workflow/status/poliscape-project/poliscape/deploy.yml?label=deploy)](https://github.com/poliscape-project/poliscape/actions)

> 対立をあおらず、公的データ（一次情報）に基づいて政策のメリット・課題をわかりやすく伝える、初心者向け政策可視化シビックテックツール

🌐 **https://poliscape.vercel.app**

---

## ✨ 特徴

- 📊 **全100政策**の網羅的アーカイブとタイムライン整理
- 🧮 **51種類の個別家計シミュレーター** — 年収・家族構成を入力して影響額を試算
- 📝 **3行要約・ビフォーアフター・特大数字**による直感的な理解
- 🌐 **やさしい日本語モード** — 外国人住民や日本語学習者にも配慮
- ⌨️ **キーボードナビゲーション対応** — アクセシビリティ
- ⚖️ **両論併記** — メリットと課題を公平に掲載

## 🛠 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router, SSG) |
| UI | React 19 + Tailwind CSS v4 |
| アイコン | lucide-react |
| データストア | Upstash Redis (閲覧数) |
| ホスティング | Vercel |
| CI/CD | GitHub Actions → Vercel |

## 📂 プロジェクト構成

```
src/
├── app/                  # Next.js App Router
│   ├── api/views/[id]/   # 閲覧数 API (Route Handler)
│   ├── policies/[id]/    # 政策詳細ページ (SSG)
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # トップページ
├── components/           # UIコンポーネント
│   ├── PolicyDetailView  # 政策詳細ビュー + シミュレーター
│   ├── ViewCounter       # 閲覧数カウンター
│   └── ...
├── data/policies/        # 政策データ (100 JSON files)
├── lib/                  # ユーティリティ
│   ├── policies.ts       # データアクセス層
│   └── redis.ts          # Upstash Redis クライアント
└── types/                # TypeScript 型定義
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
