import { ImageResponse } from "next/og";
import { getPolicyById } from "@/lib/policies";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// カテゴリ別カラーテーマ（背景色そのものが大きく変化）
const categoryThemes: Record<
  string,
  {
    bgGradient: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    accentBorder: string;
    glowColor: string;
    label: string;
  }
> = {
  childcare: {
    bgGradient: "linear-gradient(135deg, #064e3b 0%, #022c22 65%, #011710 100%)", // 深いエメラルドグリーン
    badgeBg: "#05966944",
    badgeText: "#6ee7b7",
    badgeBorder: "#34d399",
    accentBorder: "#10b98166",
    glowColor: "#10b98133",
    label: "子育て・家族",
  },
  tax: {
    bgGradient: "linear-gradient(135deg, #78350f 0%, #451a03 65%, #230b01 100%)", // 深いゴールド・アンバー
    badgeBg: "#d9770644",
    badgeText: "#fde68a",
    badgeBorder: "#fbbf24",
    accentBorder: "#f59e0b66",
    glowColor: "#f59e0b33",
    label: "税金・お金",
  },
  economy: {
    bgGradient: "linear-gradient(135deg, #0e7490 0%, #083344 65%, #021a24 100%)", // 深いオーシャンシアン
    badgeBg: "#0891b244",
    badgeText: "#a5f3fc",
    badgeBorder: "#22d3ee",
    accentBorder: "#06b6d466",
    glowColor: "#06b6d433",
    label: "経済・産業",
  },
  healthcare: {
    bgGradient: "linear-gradient(135deg, #881337 0%, #4c0519 65%, #24020a 100%)", // 深いワインローズ
    badgeBg: "#e11d4844",
    badgeText: "#fecdd3",
    badgeBorder: "#fb7185",
    accentBorder: "#f43f5e66",
    glowColor: "#f43f5e33",
    label: "医療・健康・福祉",
  },
  pension: {
    bgGradient: "linear-gradient(135deg, #581c87 0%, #2e1065 65%, #150630 100%)", // 深いロイヤルパープル
    badgeBg: "#9333ea44",
    badgeText: "#e9d5ff",
    badgeBorder: "#c084fc",
    accentBorder: "#a855f766",
    glowColor: "#a855f733",
    label: "年金・社会保障",
  },
  labor: {
    bgGradient: "linear-gradient(135deg, #9a3412 0%, #431407 65%, #240802 100%)", // 深いウォームオレンジ
    badgeBg: "#ea580c44",
    badgeText: "#fed7aa",
    badgeBorder: "#fb923c",
    accentBorder: "#f9731666",
    glowColor: "#f9731633",
    label: "働き方・雇用",
  },
  education: {
    bgGradient: "linear-gradient(135deg, #1e3a8a 0%, #172554 65%, #091026 100%)", // 深いコバルトブルー
    badgeBg: "#2563eb44",
    badgeText: "#bfdbfe",
    badgeBorder: "#60a5fa",
    accentBorder: "#3b82f666",
    glowColor: "#3b82f633",
    label: "教育・研究・文化",
  },
  digital: {
    bgGradient: "linear-gradient(135deg, #0369a1 0%, #082f49 65%, #021726 100%)", // 深いスカイブルー
    badgeBg: "#0284c744",
    badgeText: "#bae6fd",
    badgeBorder: "#38bdf8",
    accentBorder: "#0ea5e966",
    glowColor: "#0ea5e933",
    label: "デジタル・IT・AI",
  },
  transport: {
    bgGradient: "linear-gradient(135deg, #854d0e 0%, #422006 65%, #1f0e02 100%)", // 深いテラコッタ・アンバー
    badgeBg: "#ca8a0444",
    badgeText: "#fef08a",
    badgeBorder: "#facc15",
    accentBorder: "#eab30866",
    glowColor: "#eab30833",
    label: "交通・モビリティ・物流",
  },
  environment: {
    bgGradient: "linear-gradient(135deg, #14532d 0%, #052e16 65%, #02170a 100%)", // 深いフォレストグリーン
    badgeBg: "#16a34a44",
    badgeText: "#bbf7d0",
    badgeBorder: "#4ade80",
    accentBorder: "#22c55e66",
    glowColor: "#22c55e33",
    label: "環境・エネルギー・防災",
  },
  society: {
    bgGradient: "linear-gradient(135deg, #334155 0%, #0f172a 65%, #020617 100%)", // 深いスレートネイビー
    badgeBg: "#47556944",
    badgeText: "#e2e8f0",
    badgeBorder: "#94a3b8",
    accentBorder: "#64748b66",
    glowColor: "#64748b33",
    label: "社会・安全保障・司法",
  },
  default: {
    bgGradient: "linear-gradient(135deg, #0e7490 0%, #083344 65%, #021a24 100%)",
    badgeBg: "#0891b244",
    badgeText: "#a5f3fc",
    badgeBorder: "#22d3ee",
    accentBorder: "#06b6d466",
    glowColor: "#06b6d433",
    label: "政策",
  },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Image({ params }: Props) {
  const { id } = await params;
  const policy = getPolicyById(id);

  if (!policy) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94a3b8",
            fontSize: "48px",
            fontWeight: "bold",
          }}
        >
          PoliScape
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const category = (policy as any).category ?? "default";
  const theme = categoryThemes[category] ?? categoryThemes["default"];

  const title: string = (policy as any).title;
  const catchphrase: string = (policy as any).catchphrase ?? "";
  const statusLabel: string = (policy as any).statusLabel ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: theme.bgGradient,
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* 装飾：右上の光（カテゴリ色） */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* ロゴ行（文字化けなしのクリーンなデザイン） */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: theme.badgeText,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#022c22",
              fontSize: "22px",
              fontWeight: "900",
            }}
          >
            P
          </div>
          <span
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "800",
              letterSpacing: "0.02em",
            }}
          >
            PoliScape
          </span>
          <span
            style={{
              color: "#ffffff99",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            ポリスケープ
          </span>
          <span
            style={{
              color: "#ffffff66",
              fontSize: "16px",
              marginLeft: "8px",
            }}
          >
            | 公的データ政策プラットフォーム
          </span>
        </div>

        {/* メインコンテンツ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          {/* カテゴリ・ステータスバッジ */}
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div
              style={{
                background: theme.badgeBg,
                border: `2px solid ${theme.badgeBorder}`,
                borderRadius: "20px",
                padding: "8px 22px",
                color: theme.badgeText,
                fontSize: "20px",
                fontWeight: "800",
                letterSpacing: "0.02em",
              }}
            >
              {theme.label}
            </div>
            {statusLabel ? (
              <div
                style={{
                  background: "#ffffff1f",
                  border: "1.5px solid #ffffff44",
                  borderRadius: "20px",
                  padding: "8px 20px",
                  color: "#e2e8f0",
                  fontSize: "17px",
                  fontWeight: "500",
                }}
              >
                {statusLabel}
              </div>
            ) : null}
          </div>

          {/* タイトル */}
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 20 ? "50px" : "60px",
              fontWeight: "900",
              lineHeight: "1.22",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {title}
          </div>

          {/* キャッチフレーズ */}
          {catchphrase ? (
            <div
              style={{
                color: "#e2e8f0e0",
                fontSize: "24px",
                lineHeight: "1.55",
                maxWidth: "960px",
              }}
            >
              {catchphrase.length > 60
                ? catchphrase.slice(0, 60) + "…"
                : catchphrase}
            </div>
          ) : null}
        </div>

        {/* 下部：アクセントライン + 特徴 + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "24px",
            borderTop: `1.5px solid ${theme.accentBorder}`,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              color: "#ffffffaa",
              fontSize: "17px",
              fontWeight: "500",
            }}
          >
            <span>✔ 公的データ一次情報</span>
            <span>✔ メリット・課題 両論併記</span>
            <span>✔ 完全無料</span>
          </div>
          <div
            style={{
              color: theme.badgeText,
              fontSize: "20px",
              fontWeight: "700",
              letterSpacing: "0.02em",
            }}
          >
            poliscape.vercel.app
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}