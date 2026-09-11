"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PolicyTopic } from "@/types/policy";
import { Header } from "@/components/Header";
import { PolicyCalculator } from "@/components/PolicyCalculator";
import { UniversityTuitionCalculator } from "@/components/UniversityTuitionCalculator";
import { IncomeBarrierCalculator } from "@/components/IncomeBarrierCalculator";
import { MynaInsuranceNavigator } from "@/components/MynaInsuranceNavigator";
import { NewNisaCalculator } from "@/components/NewNisaCalculator";
import { FixedTaxCutChecker } from "@/components/FixedTaxCutChecker";
import { FurusatoTaxCalculator } from "@/components/FurusatoTaxCalculator";
import { InvoiceSimulator } from "@/components/InvoiceSimulator";
import { PensionAgeSimulator } from "@/components/PensionAgeSimulator";
import { ZaishokuPensionCalculator } from "@/components/ZaishokuPensionCalculator";
import { ElderlyHealthcareChecker } from "@/components/ElderlyHealthcareChecker";
import { ChildcareLeaveCalculator } from "@/components/ChildcareLeaveCalculator";
import { RideshareFareCalculator } from "@/components/RideshareFareCalculator";
import { WorkStyleChecker } from "@/components/WorkStyleChecker";
import { EnergyBillChecker } from "@/components/EnergyBillChecker";
import { DefenseTaxEstimator } from "@/components/DefenseTaxEstimator";
// 追加10シミュレーター（第2弾）
import { ChildcareSupportFundCalculator } from "@/components/ChildcareSupportFundCalculator";
import { InheritanceRegistrationChecker } from "@/components/InheritanceRegistrationChecker";
import { MynaDriversLicenseNavigator } from "@/components/MynaDriversLicenseNavigator";
import { SeverancePayTaxSimulator } from "@/components/SeverancePayTaxSimulator";
import { GasolineSubsidiesChecker } from "@/components/GasolineSubsidiesChecker";
import { NursingCareCopayCalculator } from "@/components/NursingCareCopayCalculator";
import { ElectricKickboardRuleChecker } from "@/components/ElectricKickboardRuleChecker";
import { SelectiveSurnameCostChecker } from "@/components/SelectiveSurnameCostChecker";
import { SchoolLunchFreeCalculator } from "@/components/SchoolLunchFreeCalculator";
import { IdecoTaxSimulator } from "@/components/IdecoTaxSimulator";
// 新規10シミュレーター（第3弾）
import { KodomoTsuenCalculator } from "@/components/KodomoTsuenCalculator";
import { HighSchoolTuitionCalculator } from "@/components/HighSchoolTuitionCalculator";
import { Pension45YearsSimulator } from "@/components/Pension45YearsSimulator";
import { AbandonedHouseTaxSimulator } from "@/components/AbandonedHouseTaxSimulator";
import { AccommodationTaxCalculator } from "@/components/AccommodationTaxCalculator";
import { ForestEnvironmentTaxChecker } from "@/components/ForestEnvironmentTaxChecker";
import { CustomerHarassmentChecker } from "@/components/CustomerHarassmentChecker";
import { ReskillingBenefitCalculator } from "@/components/ReskillingBenefitCalculator";
import { HayFeverCostSimulator } from "@/components/HayFeverCostSimulator";
import { CareerUpBarrierSimulator } from "@/components/CareerUpBarrierSimulator";
// 新規15シミュレーター（第4弾）
import { FinancialIncomeTaxCalculator } from "@/components/FinancialIncomeTaxCalculator";
import { EvDistanceTaxSimulator } from "@/components/EvDistanceTaxSimulator";
import { DigitalSalaryBenefitChecker } from "@/components/DigitalSalaryBenefitChecker";
import { DismissalSettlementSimulator } from "@/components/DismissalSettlementSimulator";
import { TeacherSalaryAdjustSimulator } from "@/components/TeacherSalaryAdjustSimulator";
import { HighCostMedicalCapSimulator } from "@/components/HighCostMedicalCapSimulator";
import { BicycleTrafficPenaltyChecker } from "@/components/BicycleTrafficPenaltyChecker";
import { DoctorOvertimeImpactChecker } from "@/components/DoctorOvertimeImpactChecker";
import { ForeignWorkerTrainingSimulator } from "@/components/ForeignWorkerTrainingSimulator";
import { PaternityLeaveCalculator } from "@/components/PaternityLeaveCalculator";
import { SolarPanelPaybackCalculator } from "@/components/SolarPanelPaybackCalculator";
import { OtcDrugCopaySimulator } from "@/components/OtcDrugCopaySimulator";
import { StealthMarketingChecker } from "@/components/StealthMarketingChecker";
import { DroneLogisticsCalculator } from "@/components/DroneLogisticsCalculator";
import { ResidentCardMynaNavigator } from "@/components/ResidentCardMynaNavigator";
import { ViewCounter } from "@/components/ViewCounter";

import { PolicyHighlightCards } from "@/components/PolicyHighlightCards";
import { PolicyPerspectives } from "@/components/PolicyPerspectives";
import { PolicyChangesCard } from "@/components/PolicyChangesCard";
import { PolicySummaryCard } from "@/components/PolicySummaryCard";
import { PolicyTimeline } from "@/components/PolicyTimeline";
import { PolicySources } from "@/components/PolicySources";
import { PolicyFoundationLawCard } from "@/components/PolicyFoundationLawCard";
import { getFoundationLawsByPolicyId } from "@/lib/laws";
import { Footer } from "@/components/Footer";
import { ArrowLeft, FileText, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";

export const PolicyDetailView: React.FC<{ policy: PolicyTopic }> = ({ policy }) => {
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
  const [showDeepDive, setShowDeepDive] = useState<boolean>(false);
  const foundationLaws = getFoundationLawsByPolicyId(policy.id);

  const handleToggleSimpleMode = () => {
    setIsSimpleMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* グローバルヘッダー */}
      <Header
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={handleToggleSimpleMode}
      />

      {/* メインコンテンツ */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6 flex-1 w-full">
        {/* 一覧に戻るリンク */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>政策一覧にもどる</span>
          </Link>
          <span className="text-xs text-slate-400">
            {policy.categoryLabel}
          </span>
        </div>

        {/* 政策タイトル & ミニバッジ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-teal-100/70 text-teal-800">
                {policy.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                <CheckCircle2 className="w-3 h-3" />
                {policy.statusLabel}
              </span>
              <ViewCounter policyId={policy.id} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {policy.title}
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {policy.catchphrase}
            </p>
          </div>
          {policy.effectiveDate && (
            <p className="text-xs text-slate-500 self-start sm:self-auto sm:text-right">
              施行時期: {policy.effectiveDate}
            </p>
          )}
        </div>

        {/* 1. 【最初に読む】3つのポイント要約 & 背景 */}
        <PolicySummaryCard policy={policy} isSimpleMode={isSimpleMode} />

        {/* 🏛️ この政策の土台（根拠法・基本制度）アコーディオン */}
        <PolicyFoundationLawCard laws={foundationLaws} isSimpleMode={isSimpleMode} />

        {/* 2. 【超直感】受給シミュレーター（全51テーマ別に動的切り替え） */}
        {policy.id === "child-allowance-expansion" && (
          <PolicyCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "university-tuition-waiver" && (
          <UniversityTuitionCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "income-barrier" && (
          <IncomeBarrierCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "myna-health-insurance" && (
          <MynaInsuranceNavigator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "new-nisa" && (
          <NewNisaCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "fixed-tax-cut" && (
          <FixedTaxCutChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "furusato-tax" && (
          <FurusatoTaxCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "invoice-system" && (
          <InvoiceSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "pension-start-age" && (
          <PensionAgeSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "zaishoku-pension" && (
          <ZaishokuPensionCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "elderly-healthcare-cost" && (
          <ElderlyHealthcareChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "childcare-leave-benefit" && (
          <ChildcareLeaveCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "rideshare-deregulation" && (
          <RideshareFareCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "high-professional-system" && (
          <WorkStyleChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "energy-subsidies" && (
          <EnergyBillChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "defense-tax-hike" && (
          <DefenseTaxEstimator isSimpleMode={isSimpleMode} />
        )}
        {/* 第2弾シミュレーター */}
        {policy.id === "childcare-support-fund" && (
          <ChildcareSupportFundCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "inheritance-registration" && (
          <InheritanceRegistrationChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "myna-drivers-license" && (
          <MynaDriversLicenseNavigator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "severance-pay-tax" && (
          <SeverancePayTaxSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "gasoline-subsidies-trigger" && (
          <GasolineSubsidiesChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "nursing-care-copay" && (
          <NursingCareCopayCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "electric-kickboard-rules" && (
          <ElectricKickboardRuleChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "selective-separate-surnames" && (
          <SelectiveSurnameCostChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "school-lunch-free" && (
          <SchoolLunchFreeCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "ideco-expansion" && (
          <IdecoTaxSimulator isSimpleMode={isSimpleMode} />
        )}
        {/* 第3弾シミュレーター */}
        {policy.id === "kodomo-daretemo-tsuen" && (
          <KodomoTsuenCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "high-school-tuition-free" && (
          <HighSchoolTuitionCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "pension-contribution-45years" && (
          <Pension45YearsSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "abandoned-house-tax-hike" && (
          <AbandonedHouseTaxSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "accommodation-tax-tourism" && (
          <AccommodationTaxCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "forest-environment-tax" && (
          <ForestEnvironmentTaxChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "customer-harassment-prevention" && (
          <CustomerHarassmentChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "reskilling-education-benefit" && (
          <ReskillingBenefitCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "hay-fever-countermeasures" && (
          <HayFeverCostSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "income-barrier-career-up" && (
          <CareerUpBarrierSimulator isSimpleMode={isSimpleMode} />
        )}
        {/* 第4弾シミュレーター（15政策） */}
        {policy.id === "financial-income-tax" && (
          <FinancialIncomeTaxCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "ev-distance-tax" && (
          <EvDistanceTaxSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "digital-salary-payment" && (
          <DigitalSalaryBenefitChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "dismissal-monetary-resolution" && (
          <DismissalSettlementSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "teacher-special-measure-act" && (
          <TeacherSalaryAdjustSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "high-cost-medical-cap" && (
          <HighCostMedicalCapSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "bicycle-blue-ticket" && (
          <BicycleTrafficPenaltyChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "doctor-overtime-regulation" && (
          <DoctorOvertimeImpactChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "foreign-training-employment" && (
          <ForeignWorkerTrainingSimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "paternity-leave-at-birth" && (
          <PaternityLeaveCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "solar-panel-mandate" && (
          <SolarPanelPaybackCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "otc-similar-drug-restriction" && (
          <OtcDrugCopaySimulator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "stealth-marketing-regulation" && (
          <StealthMarketingChecker isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "drone-flying-car-mobility" && (
          <DroneLogisticsCalculator isSimpleMode={isSimpleMode} />
        )}
        {policy.id === "alien-registration-myna-card" && (
          <ResidentCardMynaNavigator isSimpleMode={isSimpleMode} />
        )}

        {/* 3. 【0秒理解】特大数字の4大変化カード */}
        <PolicyHighlightCards policy={policy} isSimpleMode={isSimpleMode} />

        {/* 4. 【共感理解】一言フキダシでわかる両論併記（メリット vs 課題） */}
        <PolicyPerspectives
          policyId={policy.id}
          benefitsTitle={policy.perspectives.benefitsTitle}
          benefits={policy.perspectives.benefits}
          challengesTitle={policy.perspectives.challengesTitle}
          challenges={policy.perspectives.challenges}
          isSimpleMode={isSimpleMode}
        />

        {/* 5. 【段階的開示】詳しい制度変更・経緯・一次情報（気になる人だけ展開） */}
        <div className="pt-2">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 text-center shadow-xs">
            <div className="max-w-md mx-auto">
              <div className="text-xs font-bold text-slate-700 mb-1">
                {policy.status === "discussing" || policy.status === "proposed"
                  ? "現行制度と見直し案の詳細や一次情報を確認したいですか？"
                  : "制度変更の詳細や一次情報を確認したいですか？"}
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                {policy.status === "discussing" || policy.status === "proposed"
                  ? "現行制度と議論されている見直し案の対照、国会での審議タイムライン、官公庁の公式一次資料をご覧いただけます。"
                  : "新旧対照（ビフォーアフター）、国会での決定経緯タイムライン、官公庁の公式一次資料をご覧いただけます。"}
              </p>
              <button
                type="button"
                onClick={() => setShowDeepDive((prev) => !prev)}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>
                  {showDeepDive
                    ? "詳しい解説を閉じる ▲"
                    : policy.status === "discussing" || policy.status === "proposed"
                    ? "現行と見直し案の対照・審議経緯・一次情報を見る ▼"
                    : "新旧対照・タイムライン・一次情報を見る ▼"}
                </span>
              </button>
            </div>

            {/* 展開される詳細セクション */}
            {showDeepDive && (
              <div className="mt-6 pt-6 border-t border-slate-100 text-left space-y-6 animate-in fade-in duration-300">
                {/* 新旧対照（詳しいビフォーアフター表） */}
                <PolicyChangesCard changes={policy.changes} isSimpleMode={isSimpleMode} status={policy.status} />

                {/* タイムライン */}
                <PolicyTimeline timeline={policy.timeline} isSimpleMode={isSimpleMode} />

                {/* 公的一次情報ソース */}
                <PolicySources sources={policy.sources} />
              </div>
            )}
          </div>
        </div>

        {/* 6. 【シビックテック・事実誤認報告導線】公的データとの乖離や数値誤りの指摘受付（完全ゼロ負荷・GitHub Issues） */}
        <div className="pt-2 text-center">
          <a
            href={`https://github.com/poliscape-project/poliscape/issues/new?template=fact_check_report.md&title=${encodeURIComponent(`[事実誤認・数値報告] ${policy.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100/80 px-4 py-2 rounded-xl border border-slate-200/80 shadow-2xs transition-all group"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 group-hover:scale-110 transition-transform" />
            <span>数値や公的データとの乖離・事実誤認のご指摘はこちら（GitHub）</span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
          </a>
        </div>
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
};
