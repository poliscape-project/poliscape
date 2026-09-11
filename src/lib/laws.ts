import { FoundationLaw } from "@/types/law";
import foundationLawsData from "@/data/laws/foundation-laws.json";

const foundationLaws: FoundationLaw[] = foundationLawsData as FoundationLaw[];

export function getAllFoundationLaws(): FoundationLaw[] {
  return foundationLaws;
}

export function getFoundationLawById(id: string): FoundationLaw | undefined {
  return foundationLaws.find((law) => law.id === id);
}

// 政策IDと根拠法（親法）の紐付けマッピング
const policyToLawsMap: Record<string, string[]> = {
  // --- 所得税法 ---
  "income-barrier": ["income-tax-act"],
  "income-barrier-career-up": ["income-tax-act", "employees-pension-insurance-act"],
  "fixed-tax-cut": ["income-tax-act"],
  "furusato-tax": ["income-tax-act"],
  "financial-income-tax": ["income-tax-act"],
  "severance-pay-tax": ["income-tax-act"],
  "defense-tax-hike": ["income-tax-act"],
  "forest-environment-tax": ["income-tax-act"],
  "accommodation-tax-tourism": ["income-tax-act"],
  "patent-box-intellectual-property-tax-incentive": ["income-tax-act"],
  "cryptocurrency-tax-reform": ["income-tax-act"],
  "single-parent-child-rearing-allowance-income-cap-easing": ["income-tax-act"],

  // --- 厚生年金保険法 ---
  "short-time-worker-social-insurance-complete-elimination-50-cap": ["employees-pension-insurance-act", "health-insurance-act"],
  "zaishoku-pension": ["employees-pension-insurance-act"],
  "pension-start-age": ["employees-pension-insurance-act", "national-pension-act"],

  // --- 国民年金法 ---
  "pension-contribution-45years": ["national-pension-act"],
  "ideco-expansion": ["national-pension-act", "income-tax-act"],

  // --- 健康保険法・高齢者医療確保法 ---
  "myna-health-insurance": ["health-insurance-act"],
  "elderly-healthcare-cost": ["health-insurance-act"],
  "high-cost-medical-cap": ["health-insurance-act"],
  "otc-similar-drug-restriction": ["health-insurance-act"],
  "childcare-support-fund": ["health-insurance-act"],
  "pharmacy-dx-electronic-prescription-full-rollout": ["health-insurance-act"],
  "online-medical-care-first-visit-deregulation": ["health-insurance-act"],
  "post-stroke-rehabilitation-insurance-duration-reform": ["health-insurance-act"],
  "pediatric-cancer-fertility-preservation-subsidies": ["health-insurance-act"],

  // --- 労働基準法 ---
  "high-professional-system": ["labor-standards-act"],
  "doctor-overtime-regulation": ["labor-standards-act"],
  "dismissal-monetary-resolution": ["labor-standards-act"],
  "digital-salary-payment": ["labor-standards-act"],
  "teacher-special-measure-act": ["labor-standards-act"],
  "customer-harassment-prevention": ["labor-standards-act"],
  "reskilling-education-benefit": ["labor-standards-act"],
  "foreign-training-employment": ["labor-standards-act"],
  "teacher-workload-reduction-school-task-outsourcing": ["labor-standards-act"],

  // --- 育児・介護休業法 ---
  "childcare-leave-benefit": ["childcare-and-caregiver-leave-act"],
  "paternity-leave-at-birth": ["childcare-and-caregiver-leave-act"],
  "kodomo-daretemo-tsuen": ["childcare-and-caregiver-leave-act"],
  "child-allowance-expansion": ["childcare-and-caregiver-leave-act"],

  // --- 道路交通法 ---
  "rideshare-deregulation": ["road-traffic-act"],
  "bicycle-blue-ticket": ["road-traffic-act"],
  "electric-kickboard-rules": ["road-traffic-act"],
  "drone-flying-car-mobility": ["road-traffic-act"],
  "myna-drivers-license": ["road-traffic-act"],
  "taxi-app-fare-dynamic-pricing-deregulation": ["road-traffic-act"],
  "railway-station-platform-door-barrier-free-mandate": ["road-traffic-act"],
  "traffic-accident-victim-mandatory-insurance-recovery": ["road-traffic-act"],

  // --- 借地借家法 ---
  "periodic-tenancy-contract-deregulation": ["act-on-land-and-building-leases"],

  // --- 消費者契約法・特定商取引法 ---
  "stealth-marketing-regulation": ["consumer-contract-act"],
  "pyramid-scheme-multilevel-marketing-cooling-off-expansion": ["consumer-contract-act"],

  // --- 気候変動適応法 ---
  "heat-illness-special-alert-cooling-shelter-designation": ["climate-change-adaptation-act"],
  "hay-fever-countermeasures": ["climate-change-adaptation-act"],
  "energy-subsidies": ["climate-change-adaptation-act"],
  "solar-panel-mandate": ["climate-change-adaptation-act"],
  "ev-battery-reuse-recycle-circular-ecosystem": ["climate-change-adaptation-act"],

  // --- 空家等対策特別措置法 ---
  "abandoned-house-tax-hike": ["act-on-special-measures-concerning-vacant-houses"],

  // --- 個人情報保護法 ---
  "alien-registration-myna-card": ["act-on-protection-of-personal-information"],
  "critical-software-bill-of-materials-sbom-mandate": ["act-on-protection-of-personal-information"],
  "local-government-core-system-standardization-2025": ["act-on-protection-of-personal-information"],

  // --- 民法（家族編） ---
  "selective-separate-surnames": ["civil-code-family"],
  "special-adoption-system-deregulation-child-rights": ["civil-code-family"],
  "victims-support-fund-and-lawyer-representation-system": ["civil-code-family"],

  // --- 不動産登記法・相続土地国庫帰属法 ---
  "inheritance-registration": ["real-property-registration-act"],
  "unoccupied-land-inheritance-state-attribution-reform": ["real-property-registration-act"]
};

/**
 * 政策IDから紐づく根拠法配列を取得する
 */
export function getFoundationLawsByPolicyId(policyId: string): FoundationLaw[] {
  const lawIds = policyToLawsMap[policyId];
  if (!lawIds || lawIds.length === 0) {
    return [];
  }
  return lawIds
    .map((id) => getFoundationLawById(id))
    .filter((law): law is FoundationLaw => law !== undefined);
}
