<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## PoliScape 開発運用ルール

1. **自律完遂ルール**: 政策データの追加・修正タスクは、個別の計画承認ステップをスキップし、「データ作成・更新 → check:facts 検査 → ビルド確認 → コミット・プッシュ」まで一括で自律実行すること。
2. **海外比較（international）の網羅**: 政策データを追加・更新する際は、無理のない範囲で海外主要国（米・欧・アジア等2〜3カ国）との制度比較（`international` フィールド）を積極的に含めること。
3. **データ格納場所**: `badges`, `highlights`, `voices`, `international` は各政策JSON内に直接内包すること（旧ハードコードMapへの追記は不要）。
4. **制度・法改正の最新性担保**: AIモデルの事前学習データ（2024年頃）に引きずられて制度情報が過去で止まらないよう、政策データ追加・更新時は必ず最新の法改正施行日、予算規模、最新の国会審議・制度改正の展開を調査・確認し、最新時点の状況を漏れなく網羅すること。
