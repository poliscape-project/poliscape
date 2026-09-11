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
  "pharmacy-dx-electronic-prescription-full-rollout": ["health-insurance-act"],
  "online-medical-care-first-visit-deregulation": ["health-insurance-act"],
  "post-stroke-rehabilitation-insurance-duration-reform": ["health-insurance-act"],
  "pediatric-cancer-fertility-preservation-subsidies": ["health-insurance-act"],

  // --- 労働基準法 ---
  "high-professional-system": ["labor-standards-act"],
  "doctor-overtime-regulation": ["labor-standards-act"],
  "dismissal-monetary-resolution": ["labor-standards-act"],
  "digital-salary-payment": ["labor-standards-act"],
  "customer-harassment-prevention": ["labor-standards-act"],
  "reskilling-education-benefit": ["labor-standards-act"],

  // --- 育児・介護休業法 ---
  "childcare-leave-benefit": ["childcare-and-caregiver-leave-act"],
  "paternity-leave-at-birth": ["childcare-and-caregiver-leave-act"],
  "kodomo-daretemo-tsuen": ["childcare-and-caregiver-leave-act"],

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
  "unoccupied-land-inheritance-state-attribution-reform": ["real-property-registration-act"],

  // --- 政治資金規正法 ---
  "election-deposit-reduction-youth-political-participation": ["political-funds-control-act", "public-offices-election-act"],
  "deepfake-disinformation-election-interference-regulation": ["political-funds-control-act", "public-offices-election-act"],

  // --- 公職選挙法 ---
  "internet-voting-elections-system": ["public-offices-election-act"],

  // --- 生活保護法 ---
  "welfare-recipient-medical-assistance-myna-card-mandate": ["public-assistance-act"],
  "child-poverty-prevention-cafeteria-permanent-subsidies": ["public-assistance-act"],
  "loneliness-and-isolation-countermeasures-promotion-act": ["public-assistance-act"],

  // --- 介護保険法 ---
  "nursing-care-copay": ["long-term-care-insurance-act"],
  "caregiver-wage-hike-allowance-unification": ["long-term-care-insurance-act"],
  "nursing-care-staff-wage-increase-subsidy-expansion": ["long-term-care-insurance-act"],
  "foreign-care-worker-nursing-training": ["long-term-care-insurance-act", "immigration-control-and-refugee-recognition-act"],

  // --- 最低賃金法 ---
  "minimum-wage-1500-yen-target": ["minimum-wage-act"],

  // --- 児童手当法・子ども・子育て支援法 ---
  "child-allowance-expansion": ["child-allowance-and-childcare-support-act", "childcare-and-caregiver-leave-act"],
  "childcare-support-fund": ["child-allowance-and-childcare-support-act", "health-insurance-act"],
  "children-and-families-agency-support-fund-system": ["child-allowance-and-childcare-support-act"],
  "child-support-advance-payment": ["child-allowance-and-childcare-support-act"],

  // --- 学校教育法 ---
  "high-school-tuition-free": ["school-education-act"],
  "university-tuition-waiver": ["school-education-act"],
  "school-lunch-free": ["school-education-act"],
  "teacher-special-measure-act": ["school-education-act", "labor-standards-act"],
  "teacher-workload-reduction-school-task-outsourcing": ["school-education-act", "labor-standards-act"],
  "school-bullying-serious-incident-investigation-rules": ["school-education-act"],

  // --- 出入国管理及び難民認定法 ---
  "foreign-training-employment": ["immigration-control-and-refugee-recognition-act", "labor-standards-act"],
  "foreign-ikusei-shuro-training-employment-system-reform": ["immigration-control-and-refugee-recognition-act"],
  "immigration-law-forced-repatriation": ["immigration-control-and-refugee-recognition-act"],

  // --- 自衛隊法 ---
  "defense-tax-hike": ["self-defense-forces-act", "income-tax-act"],
  "defense-equipment-transfer-gcap-export": ["self-defense-forces-act"],
  "coast-guard-sdf-control-protocol-defense": ["self-defense-forces-act"],
  "active-cyber-defense-legal-framework-national-security": ["self-defense-forces-act"],
  "active-cyber-defense-legislation": ["self-defense-forces-act"],
  "defense-industry-manufacturing-nationalization": ["self-defense-forces-act"],

  // --- 農地法・食料・農業・農村基本法 ---
  "agricultural-corporation-foreign-ownership-farmland-act-rules": ["farmland-and-food-agriculture-basic-act"],
  "food-agriculture-rural-basic-act-food-security-emergency": ["farmland-and-food-agriculture-basic-act"],
  "corporate-farmland-ownership-deregulation": ["farmland-and-food-agriculture-basic-act"],
  "abandoned-farmland-consolidation-farmland-bank": ["farmland-and-food-agriculture-basic-act"],
  "farmland-intermediary-management-bank-consolidation": ["farmland-and-food-agriculture-basic-act"],
  "rice-production-adjustment-gentan-policy-diversification": ["farmland-and-food-agriculture-basic-act"]
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
