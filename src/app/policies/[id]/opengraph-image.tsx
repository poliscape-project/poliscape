import { ImageResponse } from "next/og";
import { getPolicyById } from "@/lib/policies";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// カテゴリ別カラーテーマ（鮮やかさを大幅UP＆白文字を保護するジュエルトーン設計）
const categoryThemes: Record<
  string,
  {
    bgGradient: string;
    glowTopRight: string;
    glowBottomLeft: string;
    logoColor: string;
    badgeBg: string;
    badgeBorder: string;
    label: string;
  }
> = {
  childcare: {
    // 鮮やかで温かみのあるエメラルドグリーン
    bgGradient: "linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%)",
    glowTopRight: "rgba(110, 231, 183, 0.45)",
    glowBottomLeft: "rgba(16, 185, 129, 0.3)",
    logoColor: "#047857",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "子育て・家族",
  },
  tax: {
    // 鮮やかなゴールド・リッチアンバー
    bgGradient: "linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)",
    glowTopRight: "rgba(253, 230, 138, 0.45)",
    glowBottomLeft: "rgba(245, 158, 11, 0.3)",
    logoColor: "#b45309",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "税金・お金",
  },
  economy: {
    // 鮮やかなオーシャンシアン・ティール
    bgGradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0c4a6e 100%)",
    glowTopRight: "rgba(125, 211, 252, 0.45)",
    glowBottomLeft: "rgba(14, 165, 233, 0.3)",
    logoColor: "#0369a1",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "経済・産業",
  },
  healthcare: {
    // 鮮やかで品のあるルビーローズ
    bgGradient: "linear-gradient(135deg, #e11d48 0%, #be123c 50%, #881337 100%)",
    glowTopRight: "rgba(254, 205, 211, 0.45)",
    glowBottomLeft: "rgba(244, 63, 94, 0.3)",
    logoColor: "#be123c",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "医療・健康・福祉",
  },
  pension: {
    // 鮮やかなロイヤルバイオレット
    bgGradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)",
    glowTopRight: "rgba(216, 180, 254, 0.45)",
    glowBottomLeft: "rgba(168, 85, 247, 0.3)",
    logoColor: "#6d28d9",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "年金・社会保障",
  },
  labor: {
    // 明るく活力のあるビビッドオレンジ
    bgGradient: "linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #7c2d12 100%)",
    glowTopRight: "rgba(254, 215, 170, 0.45)",
    glowBottomLeft: "rgba(249, 115, 22, 0.3)",
    logoColor: "#c2410c",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "働き方・雇用",
  },
  education: {
    // 知的で鮮烈なコバルトブルー
    bgGradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e3a8a 100%)",
    glowTopRight: "rgba(191, 219, 254, 0.45)",
    glowBottomLeft: "rgba(59, 130, 246, 0.3)",
    logoColor: "#1d4ed8",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "教育・研究・文化",
  },
  digital: {
    // 先進的なエレクトリックシアン
    bgGradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)",
    glowTopRight: "rgba(186, 230, 253, 0.45)",
    glowBottomLeft: "rgba(14, 165, 233, 0.3)",
    logoColor: "#0284c7",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "デジタル・IT・AI",
  },
  transport: {
    // 活発なイエローゴールド・テラコッタ
    bgGradient: "linear-gradient(135deg, #ca8a04 0%, #a16207 50%, #713f12 100%)",
    glowTopRight: "rgba(254, 240, 138, 0.45)",
    glowBottomLeft: "rgba(234, 179, 8, 0.3)",
    logoColor: "#a16207",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "交通・モビリティ・物流",
  },
  environment: {
    // 瑞々しいフォレストライムグリーン
    bgGradient: "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #14532d 100%)",
    glowTopRight: "rgba(187, 247, 208, 0.45)",
    glowBottomLeft: "rgba(34, 197, 94, 0.3)",
    logoColor: "#15803d",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "環境・エネルギー・防災",
  },
  society: {
    // モダンで重厚感のあるディープスレート
    bgGradient: "linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%)",
    glowTopRight: "rgba(226, 232, 240, 0.45)",
    glowBottomLeft: "rgba(100, 116, 139, 0.3)",
    logoColor: "#334155",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
    label: "社会・安全保障・司法",
  },
  default: {
    bgGradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0c4a6e 100%)",
    glowTopRight: "rgba(125, 211, 252, 0.45)",
    glowBottomLeft: "rgba(14, 165, 233, 0.3)",
    logoColor: "#0369a1",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.9)",
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
            background: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
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
          padding: "54px 68px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* 装飾光1：右上の大きな光（鮮やかさUP） */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.glowTopRight} 0%, transparent 68%)`,
          }}
        />

        {/* 装飾光2：左下の補助光（リッチな奥行き） */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.glowBottomLeft} 0%, transparent 70%)`,
          }}
        />

        {/* ロゴ行（高コントラスト＆クリーン） */}
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
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.logoColor,
              fontSize: "24px",
              fontWeight: "900",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            P
          </div>
          <span
            style={{
              color: "#ffffff",
              fontSize: "25px",
              fontWeight: "900",
              letterSpacing: "0.02em",
              textShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
          >
            PoliScape
          </span>
          <span
            style={{
              color: "#ffffffdd",
              fontSize: "19px",
              fontWeight: "600",
              textShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
          >
            ポリスケープ
          </span>
          <span
            style={{
              color: "#ffffffb0",
              fontSize: "16px",
              marginLeft: "8px",
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            | 公的データ政策プラットフォーム
          </span>
        </div>

        {/* メインコンテンツ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* カテゴリ・ステータスバッジ */}
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: "20px",
                padding: "6px 22px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span
                style={{
                  color: theme.logoColor,
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {theme.label}
              </span>
            </div>
            {statusLabel ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "1.5px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "20px",
                  padding: "6px 18px",
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {statusLabel}
                </span>
              </div>
            ) : null}
          </div>

          {/* タイトル（白文字を際立たせる二重ドロップシャドウ） */}
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 20 ? "52px" : "62px",
              fontWeight: "900",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              textShadow: "0 3px 14px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.9)",
            }}
          >
            {title}
          </div>

          {/* キャッチフレーズ（鮮明なホワイト＋シャドウ） */}
          {catchphrase ? (
            <div
              style={{
                color: "#ffffff",
                fontSize: "24px",
                lineHeight: "1.5",
                maxWidth: "980px",
                textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.9)",
                fontWeight: "500",
              }}
            >
              {catchphrase.length > 62
                ? catchphrase.slice(0, 62) + "…"
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
            borderTop: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "28px",
              color: "#ffffffdd",
              fontSize: "18px",
              fontWeight: "700",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            <span>✔ 公的データ一次情報</span>
            <span>✔ メリット・課題 両論併記</span>
            <span>✔ 完全無料</span>
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: "800",
              letterSpacing: "0.03em",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
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