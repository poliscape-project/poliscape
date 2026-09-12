import { ImageResponse } from "next/og";
import { getPolicyById } from "@/lib/policies";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const categoryColors: Record<string, { accent: string; label: string }> = {
  childcare:   { accent: "#34d399", label: "子育て・家族" },
  education:   { accent: "#60a5fa", label: "教育・研究" },
  tax:         { accent: "#f59e0b", label: "税制・家計" },
  pension:     { accent: "#a78bfa", label: "年金・社会保障" },
  healthcare:  { accent: "#f472b6", label: "医療・健康" },
  labor:       { accent: "#34d399", label: "労働・雇用" },
  economy:     { accent: "#fb923c", label: "経済・産業" },
  environment: { accent: "#4ade80", label: "環境・エネルギー" },
  security:    { accent: "#94a3b8", label: "安全保障" },
  digital:     { accent: "#22d3ee", label: "デジタル・IT" },
  transport:   { accent: "#f97316", label: "交通・インフラ" },
  agriculture: { accent: "#86efac", label: "農業・食料" },
  welfare:     { accent: "#c084fc", label: "福祉・介護" },
  housing:     { accent: "#fbbf24", label: "住宅・都市" },
  justice:     { accent: "#818cf8", label: "司法・人権" },
  tourism:     { accent: "#2dd4bf", label: "観光・地域" },
  default:     { accent: "#06b6d4", label: "政策" },
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
  const { accent, label } = categoryColors[category] ?? categoryColors["default"];
  const title: string = (policy as any).title;
  const catchphrase: string = (policy as any).catchphrase ?? "";
  const statusLabel: string = (policy as any).statusLabel ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2744 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "auto",
          }}
        >
          <span
            style={{
              color: "#e2e8f0",
              fontSize: "22px",
              fontWeight: "700",
              letterSpacing: "0.05em",
            }}
          >
            📊 PoliScape｜ポリスケープ
          </span>
          <span style={{ color: "#64748b", fontSize: "16px", marginLeft: "8px" }}>
            公的データ政策プラットフォーム
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div
              style={{
                background: `${accent}22`,
                border: `1.5px solid ${accent}88`,
                borderRadius: "20px",
                padding: "6px 18px",
                color: accent,
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              {label}
            </div>
            {statusLabel ? (
              <div
                style={{
                  background: "#ffffff18",
                  border: "1.5px solid #ffffff30",
                  borderRadius: "20px",
                  padding: "6px 18px",
                  color: "#94a3b8",
                  fontSize: "16px",
                }}
              >
                {statusLabel}
              </div>
            ) : null}
          </div>
          <div
            style={{
              color: "#f1f5f9",
              fontSize: title.length > 20 ? "48px" : "58px",
              fontWeight: "900",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {catchphrase ? (
            <div style={{ color: "#94a3b8", fontSize: "22px", lineHeight: "1.6", maxWidth: "900px" }}>
              {catchphrase.length > 60 ? catchphrase.slice(0, 60) + "…" : catchphrase}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "28px",
            borderTop: `1px solid ${accent}44`,
          }}
        >
          <div style={{ display: "flex", gap: "24px", color: "#475569", fontSize: "16px" }}>
            <span>✔ 公的データ一次情報</span>
            <span>✔ メリット・課題 両論併記</span>
            <span>✔ 完全無料</span>
          </div>
          <div style={{ color: "#475569", fontSize: "18px" }}>poliscape.vercel.app</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}