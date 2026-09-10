"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPolicies } from "@/lib/policies";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Baby,
  GraduationCap,
  Wallet,
  HeartPulse,
  Scale,
  CheckCircle2,
  Car,
  Shield,
  Briefcase, Trees, Leaf, Hotel, BookOpen, Ban, Smartphone,
  Search, X, LayoutGrid, List, ChevronDown, Clock, RotateCcw
} from "lucide-react";

export default function HomePage() {
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "enacted" | "discussing">("all");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [displayCount, setDisplayCount] = useState<number>(16);

  const policies = getAllPolicies();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      const status = params.get("status");
      const view = params.get("view");
      const cat = params.get("category");
      if (q) setSearchQuery(q);
      if (status === "enacted" || status === "discussing") setSelectedStatus(status);
      if (view === "compact" || view === "grid") setViewMode(view);
      if (cat) setSelectedCategory(cat);
    }
  }, []);

  const handleToggleSimpleMode = () => {
    setIsSimpleMode((prev) => !prev);
  };

  // カテゴリ一覧（防衛・交通・働き方等を含む）
  const categories = [
    { id: "all", label: "すべての政策", icon: Sparkles },
    { id: "tax", label: "税金・お金", icon: Wallet },
    { id: "pension", label: "医療・年金", icon: HeartPulse },
    { id: "childcare", label: "子育て・家族", icon: Baby },
    { id: "education", label: "教育・学生", icon: GraduationCap },
    { id: "labor", label: "働き方・雇用", icon: Briefcase },
    { id: "transport", label: "交通・地域", icon: Car },
    { id: "defense", label: "防衛・安全保障", icon: Shield },
    { id: "healthcare", label: "医療・健康", icon: HeartPulse },
    { id: "environment", label: "環境・くらし", icon: Leaf },
    { id: "economy", label: "経済・消費", icon: Scale },
    { id: "digital", label: "デジタル・IT", icon: Smartphone },
  ];

  // 政策ごとの代表バッジマッピング
  const badgeMap: Record<string, { text: string; color: string }[]> = {
    "child-allowance-expansion": [
      { text: "18歳まで延長", color: "bg-teal-50 text-teal-800" },
      { text: "所得制限なし", color: "bg-slate-100 text-slate-700" },
      { text: "第3子 月3万円", color: "bg-amber-100 text-amber-900" },
    ],
    "university-tuition-waiver": [
      { text: "私立 年約70万円免除", color: "bg-indigo-50 text-indigo-800" },
      { text: "所得制限なし", color: "bg-slate-100 text-slate-700" },
      { text: "3人扶養で全員対象", color: "bg-amber-100 text-amber-900" },
    ],
    "income-barrier": [
      { text: "103万円（税の壁）", color: "bg-amber-50 text-amber-900" },
      { text: "106万・130万（社保の壁）", color: "bg-rose-50 text-rose-800" },
      { text: "手取りの崖解消へ", color: "bg-teal-50 text-teal-800" },
    ],
    "myna-health-insurance": [
      { text: "紙保険証は失効", color: "bg-rose-50 text-rose-800" },
      { text: "資格確認書は要申請", color: "bg-amber-50 text-amber-900" },
      { text: "限度額認定が全自動", color: "bg-teal-50 text-teal-800" },
    ],
    "new-nisa": [
      { text: "生涯枠1,800万円", color: "bg-teal-50 text-teal-800" },
      { text: "非課税無期限・恒久化", color: "bg-emerald-50 text-emerald-800" },
      { text: "売却枠の翌年再利用", color: "bg-indigo-50 text-indigo-800" },
    ],
    "fixed-tax-cut": [
      { text: "1人あたり4万円減税", color: "bg-teal-50 text-teal-800" },
      { text: "扶養家族・子ども全員", color: "bg-emerald-50 text-emerald-800" },
      { text: "不足分は調整給付金", color: "bg-amber-50 text-amber-900" },
    ],
    "furusato-tax": [
      { text: "自己負担2,000円", color: "bg-teal-50 text-teal-800" },
      { text: "サイト独自ポイント禁止", color: "bg-rose-50 text-rose-800" },
      { text: "経費5割ルールの厳格化", color: "bg-slate-100 text-slate-700" },
    ],
    "invoice-system": [
      { text: "激変緩和の2割特例", color: "bg-teal-50 text-teal-800" },
      { text: "免税80%控除の経過措置", color: "bg-amber-50 text-amber-900" },
      { text: "BtoCは免税維持も", color: "bg-emerald-50 text-emerald-800" },
    ],
    "pension-start-age": [
      { text: "選択幅 60〜75歳", color: "bg-teal-50 text-teal-800" },
      { text: "最大+84%増額（75歳）", color: "bg-emerald-50 text-emerald-800" },
      { text: "損益分岐点 約82歳", color: "bg-amber-50 text-amber-900" },
    ],
    "zaishoku-pension": [
      { text: "支給停止基準 月50万円", color: "bg-teal-50 text-teal-800" },
      { text: "超過分の1/2カット", color: "bg-amber-50 text-amber-900" },
      { text: "基礎年金は全額支給", color: "bg-emerald-50 text-emerald-800" },
    ],
    "elderly-healthcare-cost": [
      { text: "一定所得以上は2割負担", color: "bg-teal-50 text-teal-800" },
      { text: "一般層約8割は1割維持", color: "bg-emerald-50 text-emerald-800" },
      { text: "緩和措置終了・本格運用", color: "bg-slate-100 text-slate-700" },
    ],
    "childcare-leave-benefit": [
      { text: "実質手取り10割", color: "bg-teal-50 text-teal-800" },
      { text: "給付率80%へ引上げ", color: "bg-emerald-50 text-emerald-800" },
      { text: "最大28日間・両親取得", color: "bg-amber-50 text-amber-900" },
    ],
    "rideshare-deregulation": [
      { text: "タクシー同等運賃", color: "bg-teal-50 text-teal-800" },
      { text: "タクシー会社が安全管理", color: "bg-emerald-50 text-emerald-800" },
      { text: "不足時間帯・エリア限定", color: "bg-amber-50 text-amber-900" },
    ],
    "high-professional-system": [
      { text: "年収1,075万円以上", color: "bg-teal-50 text-teal-800" },
      { text: "時間規制除外・残業代ゼロ", color: "bg-amber-50 text-amber-900" },
      { text: "年間104日休日＋医師面接", color: "bg-emerald-50 text-emerald-800" },
    ],
    "energy-subsidies": [
      { text: "電気最大4円・ガス17.5円引", color: "bg-teal-50 text-teal-800" },
      { text: "申請不要・全自動値引き", color: "bg-emerald-50 text-emerald-800" },
      { text: "再エネ賦課金と相殺", color: "bg-rose-50 text-rose-800" },
    ],
    "defense-tax-hike": [
      { text: "防衛費GDP比2%目標", color: "bg-slate-100 text-slate-800" },
      { text: "所得税付加税は実質相殺", color: "bg-teal-50 text-teal-800" },
      { text: "たばこ税1本3円増税", color: "bg-amber-50 text-amber-900" },
    ],
    "childcare-support-fund": [
      { text: "健保上乗せ月約450円", color: "bg-teal-50 text-teal-800" },
      { text: "総枠3.6兆円全額還元", color: "bg-emerald-50 text-emerald-800" },
      { text: "実質負担ゼロ議論", color: "bg-amber-50 text-amber-900" },
    ],
    "inheritance-registration": [
      { text: "取得から3年以内義務", color: "bg-teal-50 text-teal-800" },
      { text: "正当理由なし過料10万", color: "bg-rose-50 text-rose-800" },
      { text: "申出登記で過料回避", color: "bg-emerald-50 text-emerald-800" },
    ],
    "myna-drivers-license": [
      { text: "更新手数料400円引", color: "bg-teal-50 text-teal-800" },
      { text: "住所変更ワンストップ", color: "bg-emerald-50 text-emerald-800" },
      { text: "スマホ24hオンライン講習", color: "bg-indigo-50 text-indigo-800" },
    ],
    "severance-pay-tax": [
      { text: "20年超70万枠見直し", color: "bg-amber-50 text-amber-900" },
      { text: "一律40万平準化議論", color: "bg-rose-50 text-rose-800" },
      { text: "1/2課税は維持方針", color: "bg-teal-50 text-teal-800" },
    ],
    "gasoline-subsidies-trigger": [
      { text: "店頭10〜15円/L抑制", color: "bg-teal-50 text-teal-800" },
      { text: "国費投入累計6兆円超", color: "bg-amber-50 text-amber-900" },
      { text: "トリガー条項凍結継続", color: "bg-rose-50 text-rose-800" },
    ],
    "nursing-care-copay": [
      { text: "大半9割は1割負担維持", color: "bg-emerald-50 text-emerald-800" },
      { text: "2割負担拡大検討継続", color: "bg-amber-50 text-amber-900" },
      { text: "高額介護費上限ガード", color: "bg-teal-50 text-teal-800" },
    ],
    "electric-kickboard-rules": [
      { text: "16歳以上免許不要", color: "bg-emerald-50 text-emerald-800" },
      { text: "車道20km/歩道6km特例", color: "bg-teal-50 text-teal-800" },
      { text: "ヘルメット努力義務", color: "bg-slate-100 text-slate-700" },
    ],
    "selective-separate-surnames": [
      { text: "同姓・別姓自由選択", color: "bg-teal-50 text-teal-800" },
      { text: "改姓・名義変更コストゼロ", color: "bg-emerald-50 text-emerald-800" },
      { text: "経団連が早期法改正要望", color: "bg-amber-50 text-amber-900" },
    ],
    "school-lunch-free": [
      { text: "公立小中月約5,000円無料", color: "bg-teal-50 text-teal-800" },
      { text: "多子世帯年間10万超軽減", color: "bg-emerald-50 text-emerald-800" },
      { text: "全国一律国費負担議論", color: "bg-indigo-50 text-indigo-800" },
    ],
    "ideco-expansion": [
      { text: "70歳まで加入延長検討", color: "bg-emerald-50 text-emerald-800" },
      { text: "DB併図月2万円へ増枠", color: "bg-teal-50 text-teal-800" },
      { text: "掛金全額所得控除メリット", color: "bg-indigo-50 text-indigo-800" },
    ],
    "kodomo-daretemo-tsuen": [
      { text: "就労要件なし誰でも", color: "bg-teal-50 text-teal-800" },
      { text: "月10時間枠を創設", color: "bg-indigo-50 text-indigo-800" },
      { text: "1時間約300円", color: "bg-emerald-50 text-emerald-800" },
    ],
    "high-school-tuition-free": [
      { text: "都府で私立も全額支援", color: "bg-indigo-50 text-indigo-800" },
      { text: "国基準年収910万制限", color: "bg-slate-100 text-slate-700" },
      { text: "全国一律化の議論", color: "bg-amber-50 text-amber-900" },
    ],
    "pension-contribution-45years": [
      { text: "65歳まで納付5年延長", color: "bg-amber-50 text-amber-900" },
      { text: "第1号約100万追加負担", color: "bg-rose-50 text-rose-800" },
      { text: "満額年92万へ底上げ", color: "bg-emerald-50 text-emerald-800" },
    ],
    "abandoned-house-tax-hike": [
      { text: "管理不全空家を新設", color: "bg-amber-50 text-amber-900" },
      { text: "勧告で住宅特例解除", color: "bg-rose-50 text-rose-800" },
      { text: "固定資産税実質最大6倍", color: "bg-rose-100 text-rose-900" },
    ],
    "accommodation-tax-tourism": [
      { text: "1泊100〜2,000円超", color: "bg-sky-50 text-sky-800" },
      { text: "全国30自治体へ波及", color: "bg-teal-50 text-teal-800" },
      { text: "混雑バス・美化財源", color: "bg-emerald-50 text-emerald-800" },
    ],
    "forest-environment-tax": [
      { text: "年1,000円住民税上乗せ", color: "bg-emerald-50 text-emerald-800" },
      { text: "納税者約6,000万人", color: "bg-teal-50 text-teal-800" },
      { text: "都市部の基金積立問題", color: "bg-amber-50 text-amber-900" },
    ],
    "customer-harassment-prevention": [
      { text: "土下座強要・暴言を明文化", color: "bg-rose-50 text-rose-800" },
      { text: "企業の防止措置義務化へ", color: "bg-slate-100 text-slate-800" },
      { text: "名札名字・イニシャル化", color: "bg-teal-50 text-teal-800" },
    ],
    "reskilling-education-benefit": [
      { text: "最大80%キャッシュバック", color: "bg-violet-50 text-violet-800" },
      { text: "年間上限64万円へ拡充", color: "bg-emerald-50 text-emerald-800" },
      { text: "在職中休業給付新設", color: "bg-indigo-50 text-indigo-800" },
    ],
    "hay-fever-countermeasures": [
      { text: "スギ伐採ペース4割加速", color: "bg-emerald-50 text-emerald-800" },
      { text: "少花粉苗木9割超へ", color: "bg-teal-50 text-teal-800" },
      { text: "舌下免疫療法薬の増産", color: "bg-indigo-50 text-indigo-800" },
    ],
    "income-barrier-career-up": [
      { text: "企業へ1人最大50万円助成", color: "bg-teal-50 text-teal-800" },
      { text: "手当支給で手取り減ゼロ", color: "bg-emerald-50 text-emerald-800" },
      { text: "厚生年金加入で将来増額", color: "bg-indigo-50 text-indigo-800" },
    ],

    "financial-income-tax": [
      { text: "1億円の壁是正", color: "bg-teal-50 text-teal-800" },
      { text: "税率25〜30%案", color: "bg-blue-50 text-blue-800" },
      { text: "新NISAは完全非課税", color: "bg-emerald-50 text-emerald-800" },
    ],
    "ev-distance-tax": [
      { text: "1km数円の走行税", color: "bg-blue-50 text-blue-800" },
      { text: "EV道路維持負担", color: "bg-teal-50 text-teal-800" },
      { text: "地方負担増の批判", color: "bg-amber-50 text-amber-900" },
    ],
    "digital-salary-payment": [
      { text: "PayPay等で給与受取", color: "bg-purple-50 text-purple-800" },
      { text: "労働者の完全同意必須", color: "bg-teal-50 text-teal-800" },
      { text: "上限100万・破綻全額保証", color: "bg-emerald-50 text-emerald-800" },
    ],
    "dismissal-monetary-resolution": [
      { text: "解雇無効時の金銭解決", color: "bg-amber-50 text-amber-900" },
      { text: "補償金3〜18ヶ月相当", color: "bg-blue-50 text-blue-800" },
      { text: "労働者申立型が有力", color: "bg-teal-50 text-teal-800" },
    ],
    "teacher-special-measure-act": [
      { text: "教職調整額4%→10%超", color: "bg-teal-50 text-teal-800" },
      { text: "年収40〜60万円増額", color: "bg-emerald-50 text-emerald-800" },
      { text: "部活地域移行セット", color: "bg-blue-50 text-blue-800" },
    ],
    "high-cost-medical-cap": [
      { text: "中間層上限引き上げ検討", color: "bg-rose-50 text-rose-800" },
      { text: "国民医療費47兆円突破", color: "bg-amber-50 text-amber-900" },
      { text: "多数回該当4.4万円維持", color: "bg-emerald-50 text-emerald-800" },
    ],
    "bicycle-blue-ticket": [
      { text: "ながらスマホ反則金1.2万", color: "bg-rose-50 text-rose-800" },
      { text: "16歳以上（高校生対象）", color: "bg-blue-50 text-blue-800" },
      { text: "期日納付で前科なし", color: "bg-emerald-50 text-emerald-800" },
    ],
    "doctor-overtime-regulation": [
      { text: "年960時間上限義務化", color: "bg-teal-50 text-teal-800" },
      { text: "当直明け休息インターバル", color: "bg-blue-50 text-blue-800" },
      { text: "地域救急維持の課題", color: "bg-rose-50 text-rose-800" },
    ],
    "foreign-training-employment": [
      { text: "技能実習廃止・新制度へ", color: "bg-indigo-50 text-indigo-800" },
      { text: "条件付き転籍（転職）解禁", color: "bg-teal-50 text-teal-800" },
      { text: "3年で特定技能1号へ直結", color: "bg-emerald-50 text-emerald-800" },
    ],
    "paternity-leave-at-birth": [
      { text: "実質手取り10割（100%）", color: "bg-pink-50 text-pink-800" },
      { text: "産後8週に最大4週間", color: "bg-rose-50 text-rose-800" },
      { text: "100人超企業に公表義務", color: "bg-blue-50 text-blue-800" },
    ],
    "solar-panel-mandate": [
      { text: "新築原則85%以上設置", color: "bg-amber-50 text-amber-900" },
      { text: "約6〜8年で初期費用回収", color: "bg-emerald-50 text-emerald-800" },
      { text: "停電時1500W非常給電", color: "bg-teal-50 text-teal-800" },
    ],
    "otc-similar-drug-restriction": [
      { text: "湿布・保湿剤差額自腹化", color: "bg-rose-50 text-rose-800" },
      { text: "年間数千億円の公費是正", color: "bg-teal-50 text-teal-800" },
      { text: "重症アトピー等は3割維持", color: "bg-emerald-50 text-emerald-800" },
    ],
    "stealth-marketing-regulation": [
      { text: "景品表示法で全面禁止", color: "bg-rose-50 text-rose-800" },
      { text: "#PR #広告の明記義務", color: "bg-teal-50 text-teal-800" },
      { text: "違反企業は社名公表処分", color: "bg-slate-100 text-slate-800" },
    ],
    "drone-flying-car-mobility": [
      { text: "有人地帯レベル4自律飛行", color: "bg-sky-50 text-sky-800" },
      { text: "過疎地配送70〜80%短縮", color: "bg-emerald-50 text-emerald-800" },
      { text: "国家操縦資格の新設", color: "bg-blue-50 text-blue-800" },
    ],
    "alien-registration-myna-card": [
      { text: "在留カードとマイナ統合", color: "bg-teal-50 text-teal-800" },
      { text: "市役所訪問が不要に", color: "bg-emerald-50 text-emerald-800" },
      { text: "偽造カード不法就労撲滅", color: "bg-purple-50 text-purple-800" },
    ],
    "same-sex-marriage-equality": [
      { text: "高裁で違憲判決相次ぐ", color: "bg-rose-50 text-rose-800" },
      { text: "相続権・共同親権の平等", color: "bg-pink-50 text-pink-800" },
      { text: "憲法24条改正論争", color: "bg-amber-50 text-amber-900" },
    ],
    "security-clearance-economic-security": [
      { text: "国家秘密適性評価法", color: "bg-slate-100 text-slate-800" },
      { text: "サプライチェーン防衛", color: "bg-blue-50 text-blue-800" },
      { text: "民間社員身辺調査とプライバシー", color: "bg-amber-50 text-amber-900" },
    ],
    "ambulance-fee-minor-illness": [
      { text: "軽症選定療養費7,700円", color: "bg-rose-50 text-rose-800" },
      { text: "救急出動パンク抑止", color: "bg-red-50 text-red-800" },
      { text: "#7119相談窓口推奨", color: "bg-teal-50 text-teal-800" },
    ],
    "school-club-community-transition": [
      { text: "休日の部活を地域移行", color: "bg-emerald-50 text-emerald-800" },
      { text: "教員の過重労働解消", color: "bg-teal-50 text-teal-800" },
      { text: "月謝負担・地域格差課題", color: "bg-amber-50 text-amber-900" },
    ],
    "furusato-tax-point-ban-2025": [
      { text: "仲介サイト還元禁止", color: "bg-rose-50 text-rose-800" },
      { text: "2025年10月施行", color: "bg-slate-100 text-slate-800" },
      { text: "自治体の手数料是正", color: "bg-teal-50 text-teal-800" },
    ],
    "bicycle-helmet-mandate-insurance": [
      { text: "全年齢努力義務化", color: "bg-emerald-50 text-emerald-800" },
      { text: "青切符反則金2026年〜", color: "bg-rose-50 text-rose-800" },
      { text: "個人賠償責任保険義務", color: "bg-blue-50 text-blue-800" },
    ],
    "casino-ir-gambling-addiction": [
      { text: "大阪・夢洲2030年秋開業", color: "bg-purple-50 text-purple-800" },
      { text: "日本人入場料6,000円", color: "bg-amber-50 text-amber-900" },
      { text: "マイナ顔認証・回数制限", color: "bg-teal-50 text-teal-800" },
    ],
    "specified-skilled-worker-2-expansion": [
      { text: "11分野に大幅拡大", color: "bg-indigo-50 text-indigo-800" },
      { text: "在留期限上限なし・永住道", color: "bg-emerald-50 text-emerald-800" },
      { text: "配偶者・子どもの帯同可", color: "bg-teal-50 text-teal-800" },
    ],
    "renewable-energy-surcharge-burden": [
      { text: "賦課金3.49円/kWh改定", color: "bg-amber-50 text-amber-900" },
      { text: "電気代激変緩和補助", color: "bg-teal-50 text-teal-800" },
      { text: "FIP市場連動型へ移行", color: "bg-blue-50 text-blue-800" },
    ],
    "solar-panel-disposal-reserve-fund": [
      { text: "10kW以上外部積立義務", color: "bg-emerald-50 text-emerald-800" },
      { text: "2030年代大量廃棄対策", color: "bg-slate-100 text-slate-800" },
      { text: "パネル放置・投棄を抑止", color: "bg-rose-50 text-rose-800" },
    ],
    "national-land-reversion-system": [
      { text: "不要な相続地を国庫帰属", color: "bg-emerald-50 text-emerald-800" },
      { text: "更地・境界確定が要件", color: "bg-slate-100 text-slate-800" },
      { text: "管理負担金20万円〜前納", color: "bg-amber-50 text-amber-900" },
    ],
    "reverse-mortgage-senior-housing": [
      { text: "自宅担保で老後資金調達", color: "bg-blue-50 text-blue-800" },
      { text: "生前返済は利息のみ", color: "bg-emerald-50 text-emerald-800" },
      { text: "ノンリコース型で相続人保護", color: "bg-teal-50 text-teal-800" },
    ],
    "senior-guarantor-service-regulation": [
      { text: "おひとりさま高齢者支援", color: "bg-pink-50 text-pink-800" },
      { text: "預託金信託保全ルール", color: "bg-teal-50 text-teal-800" },
      { text: "身元保証なし入院拒否是正", color: "bg-emerald-50 text-emerald-800" },
    ],
    "school-smartphone-ban-regulation": [
      { text: "欧米で校内全面禁止拡大", color: "bg-rose-50 text-rose-800" },
      { text: "集中力向上・ネットいじめ抑止", color: "bg-indigo-50 text-indigo-800" },
      { text: "災害連絡・デジタル教育との両立", color: "bg-amber-50 text-amber-900" },
    ],
  };

  // キーワード・ステータス・カテゴリによる複合フィルタリング
  const filteredPolicies = policies.filter((policy) => {
    // カテゴリフィルター
    if (selectedCategory !== "all" && policy.category !== selectedCategory) {
      return false;
    }
    // ステータスフィルター
    if (selectedStatus !== "all" && policy.status !== selectedStatus) {
      return false;
    }
    // 検索クエリ
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = policy.title?.toLowerCase().includes(q);
      const catchMatch = policy.catchphrase?.toLowerCase().includes(q);
      const catLabelMatch = policy.categoryLabel?.toLowerCase().includes(q);
      const statusLabelMatch = policy.statusLabel?.toLowerCase().includes(q);
      const summaryMatch =
        policy.summary?.standard?.some((s) => s.toLowerCase().includes(q)) ||
        policy.summary?.simple?.some((s) => s.toLowerCase().includes(q));
      const badges = badgeMap[policy.id] || [];
      const badgeMatch = badges.some((b) => b.text.toLowerCase().includes(q));
      const changesMatch = policy.changes?.some(
        (c) =>
          c.topic.toLowerCase().includes(q) ||
          (c.highlight && c.highlight.toLowerCase().includes(q))
      );

      if (
        !titleMatch &&
        !catchMatch &&
        !catLabelMatch &&
        !statusLabelMatch &&
        !summaryMatch &&
        !badgeMatch &&
        !changesMatch
      ) {
        return false;
      }
    }
    return true;
  });

  // 表示件数分をスライス（もっと見る機能）
  const visiblePolicies = filteredPolicies.slice(0, displayCount);

  // ステータス別の件数カウント
  const countAll = policies.length;
  const countEnacted = policies.filter((p) => p.status === "enacted").length;
  const countDiscussing = policies.filter((p) => p.status === "discussing").length;

  const isFilterActive =
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSearchQuery("");
    setDisplayCount(16);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* ヘッダー */}
      <Header
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={handleToggleSimpleMode}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 flex-1 w-full">
        {/* ヒーローバナー */}
        <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 text-teal-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              シビックテック（Civic Tech）オープンプロジェクト
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              くらしに関わる「国のルール」、<br />
              <span className="text-teal-300">データと図解</span>でシンプルに。
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              SNSの過激な対立意見や民間の二次報道は排除。官公庁の白書・国会議事録などの公的データ（一次情報）だけを元に、生活への影響と両論（メリットと課題）をフラットに可視化します。
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
        </div>

        {/* サイトの3大方針バッジ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">一次情報のみ使用</div>
              <div className="text-[11px] text-slate-500">官公庁発表・国会審議に限定</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">中立・両論併記</div>
              <div className="text-[11px] text-slate-500">期待効果と懸念点を平等に</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">初心者・生活者目線</div>
              <div className="text-[11px] text-slate-500">読ませない図解・シミュレーター</div>
            </div>
          </div>
        </div>

        {/* 検索 & コントロールパネル */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
          {/* リアルタイムキーワード検索バー */}
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayCount(16);
              }}
              placeholder="政策名、キーワード、対象者で検索（例: 年収の壁、マイナ、年金、減税、スマホ...）"
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setDisplayCount(16);
                }}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                title="クリア"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ステータスタブ & 表示モード切替トグル */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
            {/* ステータスタブ */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl self-start overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedStatus("all");
                  setDisplayCount(16);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedStatus === "all"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                すべて <span className="text-[11px] font-normal text-slate-400">({countAll})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedStatus("enacted");
                  setDisplayCount(16);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedStatus === "enacted"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-600 hover:text-emerald-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                成立・施行済み <span className="text-[11px] font-normal text-slate-400">({countEnacted})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedStatus("discussing");
                  setDisplayCount(16);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedStatus === "discussing"
                    ? "bg-white text-amber-800 shadow-2xs"
                    : "text-slate-600 hover:text-amber-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                国会等で議論中 <span className="text-[11px] font-normal text-slate-400">({countDiscussing})</span>
              </button>
            </div>

            {/* 表示モード切替トグル */}
            <div className="flex items-center justify-end gap-1 p-1 bg-slate-100/90 rounded-xl self-end">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-teal-800 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="カード表示"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>カード</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("compact")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "compact"
                    ? "bg-white text-teal-800 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="コンパクト一覧表示"
              >
                <List className="w-3.5 h-3.5" />
                <span>リスト</span>
              </button>
            </div>
          </div>
        </div>

        {/* 政策一覧セクション */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "知りたいテーマをえらぶ" : `主要政策テーマ（全${policies.length}テーマ公開中）`}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                {filteredPolicies.length} 件
              </span>
              {isFilterActive && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 hover:underline transition-colors font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  条件クリア
                </button>
              )}
            </div>
          </div>

          {/* カテゴリ・ピルフィルター */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setDisplayCount(16);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* 検索・フィルター結果が0件の場合 */}
          {filteredPolicies.length === 0 && (
            <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-slate-300 space-y-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                該当する政策が見つかりませんでした
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                別のキーワードや短い単語で検索するか、カテゴリ・ステータスの絞り込みを解除してお試しください。
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-900 transition-all shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                絞り込み条件をリセット
              </button>
            </div>
          )}

          {/* カード表示モード（グリッド） */}
          {viewMode === "grid" && filteredPolicies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {visiblePolicies.map((policy) => {
                const badges = badgeMap[policy.id] || [
                  { text: policy.categoryLabel, color: "bg-teal-50 text-teal-800" },
                  { text: policy.statusLabel, color: "bg-slate-100 text-slate-700" },
                ];

                return (
                  <Link
                    key={policy.id}
                    href={`/policies/${policy.id}`}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* バッジ */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                          {policy.categoryLabel}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${
                            policy.status === "enacted"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {policy.status === "enacted" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {policy.statusLabel}
                        </span>
                      </div>

                      {/* タイトル */}
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                        {policy.catchphrase}
                      </p>

                      {/* 特大数字ハイライトバッジ */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {badges.map((b, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${b.color}`}
                          >
                            {b.text}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* カードフッター */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                      <span>シミュレーター＆図解を見る</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* コンパクト一覧表示モード（リスト） */}
          {viewMode === "compact" && filteredPolicies.length > 0 && (
            <div className="space-y-2 pt-2">
              {visiblePolicies.map((policy) => {
                const badges = badgeMap[policy.id] || [
                  { text: policy.categoryLabel, color: "bg-teal-50 text-teal-800" },
                  { text: policy.statusLabel, color: "bg-slate-100 text-slate-700" },
                ];
                const primaryBadge = badges[0];

                return (
                  <Link
                    key={policy.id}
                    href={`/policies/${policy.id}`}
                    className="group bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:border-teal-400 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100 shrink-0">
                          {policy.categoryLabel}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md shrink-0 ${
                            policy.status === "enacted"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {policy.status === "enacted" ? (
                            <CheckCircle2 className="w-2.5 h-2.5" />
                          ) : (
                            <Clock className="w-2.5 h-2.5" />
                          )}
                          {policy.statusLabel}
                        </span>
                        {primaryBadge && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${primaryBadge.color} shrink-0 hidden md:inline-block`}
                          >
                            {primaryBadge.text}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                        {policy.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {policy.catchphrase}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 shrink-0 self-end sm:self-center">
                      <span className="text-xs font-bold text-teal-700 group-hover:underline">
                        詳細
                      </span>
                      <ArrowRight className="w-4 h-4 text-teal-700 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* 「もっと見る」ボタン & ページネーション */}
          {filteredPolicies.length > visiblePolicies.length && (
            <div className="pt-6 pb-2 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setDisplayCount((prev) => prev + 16)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-800 text-white font-bold text-sm shadow-md hover:bg-teal-900 hover:shadow-lg transition-all active:scale-98"
              >
                <span>もっと見る（残り {filteredPolicies.length - visiblePolicies.length} 件）</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDisplayCount(filteredPolicies.length)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline transition-colors"
              >
                全 {filteredPolicies.length} 件を一括表示する
              </button>
            </div>
          )}

          {/* 全件表示完了時の案内 */}
          {filteredPolicies.length > 0 && filteredPolicies.length <= visiblePolicies.length && (
            <div className="pt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                <span>全 {filteredPolicies.length} 件を表示中</span>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}
