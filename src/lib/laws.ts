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
  "income-barrier": [
    "income-tax-act"
  ],
  "income-barrier-career-up": [
    "income-tax-act",
    "employees-pension-insurance-act"
  ],
  "fixed-tax-cut": [
    "income-tax-act"
  ],
  "furusato-tax": [
    "income-tax-act"
  ],
  "financial-income-tax": [
    "income-tax-act",
    "financial-instruments-and-exchange-act"
  ],
  "severance-pay-tax": [
    "income-tax-act"
  ],
  "forest-environment-tax": [
    "income-tax-act",
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "accommodation-tax-tourism": [
    "income-tax-act"
  ],
  "patent-box-intellectual-property-tax-incentive": [
    "income-tax-act",
    "copyright-act"
  ],
  "cryptocurrency-tax-reform": [
    "income-tax-act"
  ],
  "single-parent-child-rearing-allowance-income-cap-easing": [
    "income-tax-act"
  ],
  "short-time-worker-social-insurance-complete-elimination-50-cap": [
    "employees-pension-insurance-act",
    "health-insurance-act"
  ],
  "zaishoku-pension": [
    "employees-pension-insurance-act"
  ],
  "pension-start-age": [
    "employees-pension-insurance-act",
    "national-pension-act"
  ],
  "pension-contribution-45years": [
    "national-pension-act"
  ],
  "ideco-expansion": [
    "national-pension-act",
    "income-tax-act"
  ],
  "myna-health-insurance": [
    "health-insurance-act",
    "digital-society-and-mynumber-act"
  ],
  "elderly-healthcare-cost": [
    "health-insurance-act"
  ],
  "high-cost-medical-cap": [
    "health-insurance-act"
  ],
  "otc-similar-drug-restriction": [
    "health-insurance-act"
  ],
  "pharmacy-dx-electronic-prescription-full-rollout": [
    "health-insurance-act",
    "digital-society-and-mynumber-act"
  ],
  "online-medical-care-first-visit-deregulation": [
    "health-insurance-act"
  ],
  "post-stroke-rehabilitation-insurance-duration-reform": [
    "health-insurance-act"
  ],
  "pediatric-cancer-fertility-preservation-subsidies": [
    "health-insurance-act"
  ],
  "high-professional-system": [
    "labor-standards-act"
  ],
  "doctor-overtime-regulation": [
    "labor-standards-act"
  ],
  "dismissal-monetary-resolution": [
    "labor-standards-act"
  ],
  "digital-salary-payment": [
    "labor-standards-act"
  ],
  "customer-harassment-prevention": [
    "labor-standards-act"
  ],
  "reskilling-education-benefit": [
    "labor-standards-act"
  ],
  "childcare-leave-benefit": [
    "childcare-and-caregiver-leave-act"
  ],
  "paternity-leave-at-birth": [
    "childcare-and-caregiver-leave-act"
  ],
  "kodomo-daretemo-tsuen": [
    "childcare-and-caregiver-leave-act"
  ],
  "rideshare-deregulation": [
    "road-traffic-act"
  ],
  "bicycle-blue-ticket": [
    "road-traffic-act"
  ],
  "electric-kickboard-rules": [
    "road-traffic-act"
  ],
  "drone-flying-car-mobility": [
    "road-traffic-act",
    "radio-act"
  ],
  "myna-drivers-license": [
    "road-traffic-act",
    "digital-society-and-mynumber-act"
  ],
  "taxi-app-fare-dynamic-pricing-deregulation": [
    "road-traffic-act"
  ],
  "railway-station-platform-door-barrier-free-mandate": [
    "road-traffic-act"
  ],
  "traffic-accident-victim-mandatory-insurance-recovery": [
    "road-traffic-act"
  ],
  "periodic-tenancy-contract-deregulation": [
    "act-on-land-and-building-leases"
  ],
  "stealth-marketing-regulation": [
    "consumer-contract-act"
  ],
  "pyramid-scheme-multilevel-marketing-cooling-off-expansion": [
    "consumer-contract-act"
  ],
  "heat-illness-special-alert-cooling-shelter-designation": [
    "climate-change-adaptation-act"
  ],
  "hay-fever-countermeasures": [
    "climate-change-adaptation-act"
  ],
  "energy-subsidies": [
    "climate-change-adaptation-act",
    "act-on-special-measures-for-renewable-energy"
  ],
  "solar-panel-mandate": [
    "climate-change-adaptation-act",
    "act-on-special-measures-for-renewable-energy"
  ],
  "ev-battery-reuse-recycle-circular-ecosystem": [
    "climate-change-adaptation-act",
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "abandoned-house-tax-hike": [
    "act-on-special-measures-concerning-vacant-houses"
  ],
  "alien-registration-myna-card": [
    "act-on-protection-of-personal-information",
    "digital-society-and-mynumber-act",
    "immigration-control-and-refugee-recognition-act"
  ],
  "critical-software-bill-of-materials-sbom-mandate": [
    "act-on-protection-of-personal-information"
  ],
  "local-government-core-system-standardization-2025": [
    "act-on-protection-of-personal-information",
    "digital-society-and-mynumber-act"
  ],
  "selective-separate-surnames": [
    "civil-code-family"
  ],
  "special-adoption-system-deregulation-child-rights": [
    "civil-code-family"
  ],
  "victims-support-fund-and-lawyer-representation-system": [
    "civil-code-family"
  ],
  "inheritance-registration": [
    "real-property-registration-act"
  ],
  "unoccupied-land-inheritance-state-attribution-reform": [
    "real-property-registration-act"
  ],
  "election-deposit-reduction-youth-political-participation": [
    "political-funds-control-act",
    "public-offices-election-act"
  ],
  "deepfake-disinformation-election-interference-regulation": [
    "political-funds-control-act",
    "public-offices-election-act"
  ],
  "internet-voting-elections-system": [
    "public-offices-election-act",
    "digital-society-and-mynumber-act"
  ],
  "welfare-recipient-medical-assistance-myna-card-mandate": [
    "public-assistance-act",
    "digital-society-and-mynumber-act"
  ],
  "child-poverty-prevention-cafeteria-permanent-subsidies": [
    "public-assistance-act"
  ],
  "loneliness-and-isolation-countermeasures-promotion-act": [
    "public-assistance-act"
  ],
  "nursing-care-copay": [
    "long-term-care-insurance-act"
  ],
  "caregiver-wage-hike-allowance-unification": [
    "long-term-care-insurance-act"
  ],
  "nursing-care-staff-wage-increase-subsidy-expansion": [
    "long-term-care-insurance-act"
  ],
  "foreign-care-worker-nursing-training": [
    "long-term-care-insurance-act",
    "immigration-control-and-refugee-recognition-act"
  ],
  "minimum-wage-1500-yen-target": [
    "minimum-wage-act"
  ],
  "child-allowance-expansion": [
    "child-allowance-and-childcare-support-act",
    "childcare-and-caregiver-leave-act"
  ],
  "childcare-support-fund": [
    "child-allowance-and-childcare-support-act",
    "health-insurance-act"
  ],
  "children-and-families-agency-support-fund-system": [
    "child-allowance-and-childcare-support-act"
  ],
  "child-support-advance-payment": [
    "child-allowance-and-childcare-support-act"
  ],
  "high-school-tuition-free": [
    "school-education-act"
  ],
  "university-tuition-waiver": [
    "school-education-act"
  ],
  "school-lunch-free": [
    "school-education-act"
  ],
  "teacher-special-measure-act": [
    "school-education-act",
    "labor-standards-act"
  ],
  "teacher-workload-reduction-school-task-outsourcing": [
    "school-education-act",
    "labor-standards-act"
  ],
  "school-bullying-serious-incident-investigation-rules": [
    "school-education-act"
  ],
  "foreign-training-employment": [
    "immigration-control-and-refugee-recognition-act",
    "labor-standards-act"
  ],
  "foreign-ikusei-shuro-training-employment-system-reform": [
    "immigration-control-and-refugee-recognition-act"
  ],
  "immigration-law-forced-repatriation": [
    "immigration-control-and-refugee-recognition-act"
  ],
  "defense-tax-hike": [
    "self-defense-forces-act",
    "income-tax-act"
  ],
  "defense-equipment-transfer-gcap-export": [
    "self-defense-forces-act"
  ],
  "coast-guard-sdf-control-protocol-defense": [
    "self-defense-forces-act"
  ],
  "active-cyber-defense-legal-framework-national-security": [
    "self-defense-forces-act"
  ],
  "active-cyber-defense-legislation": [
    "self-defense-forces-act"
  ],
  "defense-industry-manufacturing-nationalization": [
    "self-defense-forces-act",
    "companies-act"
  ],
  "agricultural-corporation-foreign-ownership-farmland-act-rules": [
    "farmland-and-food-agriculture-basic-act"
  ],
  "food-agriculture-rural-basic-act-food-security-emergency": [
    "farmland-and-food-agriculture-basic-act"
  ],
  "corporate-farmland-ownership-deregulation": [
    "farmland-and-food-agriculture-basic-act",
    "companies-act"
  ],
  "abandoned-farmland-consolidation-farmland-bank": [
    "farmland-and-food-agriculture-basic-act"
  ],
  "farmland-intermediary-management-bank-consolidation": [
    "farmland-and-food-agriculture-basic-act"
  ],
  "rice-production-adjustment-gentan-policy-diversification": [
    "farmland-and-food-agriculture-basic-act"
  ],
  "smartphone-competition-promotion-act-app-stores": [
    "antimonopoly-act",
    "telecommunications-business-act"
  ],
  "smartphone-software-competition-act": [
    "antimonopoly-act",
    "telecommunications-business-act"
  ],
  "local-bus-joint-operation-antimonopoly-exemption": [
    "antimonopoly-act"
  ],
  "credit-card-interchange-fee-transparency-disclosure": [
    "antimonopoly-act"
  ],
  "anti-ticket-resale-law-reform-dynamic-pricing": [
    "antimonopoly-act"
  ],
  "cultural-arts-creator-fair-remuneration-guidelines": [
    "antimonopoly-act",
    "freelance-protection-and-subcontract-act",
    "copyright-act"
  ],
  "freelance-protection-act": [
    "freelance-protection-and-subcontract-act"
  ],
  "freelance-protection-new-act-fair-transactions": [
    "freelance-protection-and-subcontract-act"
  ],
  "fair-trade-commission-freelance-act-enforcement": [
    "freelance-protection-and-subcontract-act"
  ],
  "subcontract-act-price-pass-through": [
    "freelance-protection-and-subcontract-act",
    "antimonopoly-act"
  ],
  "subcontract-act-price-pass-through-haul-investigation": [
    "freelance-protection-and-subcontract-act",
    "antimonopoly-act"
  ],
  "new-nisa": [
    "financial-instruments-and-exchange-act",
    "income-tax-act"
  ],
  "crypto-spot-etf-listing-approval": [
    "financial-instruments-and-exchange-act"
  ],
  "anti-money-laundering-crypto-travel-rule-enforcement": [
    "financial-instruments-and-exchange-act"
  ],
  "crypto-assets-separate-declaration-taxation-reform": [
    "financial-instruments-and-exchange-act",
    "income-tax-act"
  ],
  "crypto-assets-tax-reduction": [
    "financial-instruments-and-exchange-act",
    "income-tax-act"
  ],
  "credit-card-fraud-phishing-victim-compensation-guidelines": [
    "financial-instruments-and-exchange-act"
  ],
  "female-board-members-30-percent-target": [
    "companies-act"
  ],
  "whistleblower-protection-act-mandatory-compliance": [
    "companies-act"
  ],
  "invoice-system": [
    "consumption-tax-act"
  ],
  "duty-free-refund-airport-exit": [
    "consumption-tax-act"
  ],
  "tourist-tax-free-shopping-refund-system-resale-prevention": [
    "consumption-tax-act"
  ],
  "food-consumption-tax-zero-debate": [
    "consumption-tax-act"
  ],
  "refundable-tax-credit-negative-income-tax": [
    "consumption-tax-act",
    "income-tax-act"
  ],
  "convenience-store-certificate-issuance-government-cloud": [
    "digital-society-and-mynumber-act"
  ],
  "residence-card-mynumber-card-unification-act": [
    "digital-society-and-mynumber-act",
    "immigration-control-and-refugee-recognition-act"
  ],
  "myna-card-iphone-apple-wallet-integration": [
    "digital-society-and-mynumber-act"
  ],
  "qualification-confirmation-letter-myna": [
    "digital-society-and-mynumber-act",
    "health-insurance-act"
  ],
  "electronic-prescription-medical-dx-platform": [
    "digital-society-and-mynumber-act",
    "health-insurance-act"
  ],
  "internet-voting-overseas-disabled-voters-stepwise": [
    "digital-society-and-mynumber-act",
    "public-offices-election-act"
  ],
  "generative-ai-copyright-rules": [
    "copyright-act"
  ],
  "pirate-site-fast-cinema-isp-blocking-debate": [
    "copyright-act",
    "telecommunications-business-act"
  ],
  "anime-manga-overseas-expansion-ip-protection": [
    "copyright-act"
  ],
  "ai-safety-basic-act-regulation": [
    "copyright-act"
  ],
  "generative-ai-education-guidelines-school-use": [
    "copyright-act",
    "school-education-act"
  ],
  "telecom-emergency-roaming-mandate": [
    "telecommunications-business-act",
    "radio-act"
  ],
  "satellite-direct-to-cellular-emergency-broadband": [
    "telecommunications-business-act",
    "radio-act"
  ],
  "submarine-cable-landing-stations-decentralization": [
    "telecommunications-business-act"
  ],
  "submarine-cable-redundancy-landing-station-decentralization": [
    "telecommunications-business-act"
  ],
  "critical-infrastructure-data-center-rural-dispersion": [
    "telecommunications-business-act"
  ],
  "online-dating-safety-id-verification-mandate": [
    "telecommunications-business-act"
  ],
  "digital-inheritance-cloud-account-access-rules": [
    "telecommunications-business-act",
    "civil-code-family"
  ],
  "drone-highway-flight-corridors-radio-law-reform": [
    "radio-act"
  ],
  "drone-level-4-urban-delivery-deregulation": [
    "radio-act"
  ],
  "depopulated-area-drone-medical-delivery-airspace": [
    "radio-act"
  ],
  "drone-emergency-medical-transport-remote-islands": [
    "radio-act"
  ],
  "emergency-blood-drone-transport-cold-chain-guidelines": [
    "radio-act"
  ],
  "isolated-settlements-satellite-communications-starlink": [
    "radio-act",
    "telecommunications-business-act"
  ],
  "isolated-communities-disaster-helicopter-communication": [
    "radio-act",
    "telecommunications-business-act"
  ],
  "smart-agriculture-promotion-act": [
    "radio-act",
    "farmland-and-food-agriculture-basic-act"
  ],
  "smart-agriculture-promotion-law-robot-tractors": [
    "radio-act",
    "farmland-and-food-agriculture-basic-act"
  ],
  "civil-litigation-digitalization-e-court-web-hearings": [
    "code-of-civil-procedure-it-reform"
  ],
  "digital-will-smartphone-blockchain-legalization": [
    "code-of-civil-procedure-it-reform",
    "civil-code-family"
  ],
  "biometric-authentication-payments-privacy-guidelines": [
    "code-of-civil-procedure-it-reform",
    "act-on-protection-of-personal-information"
  ],
  "nuclear-power-operation-60years": [
    "electricity-business-and-atomic-energy-act",
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "nuclear-power-plant-lifespan-extension-over-60-years": [
    "electricity-business-and-atomic-energy-act",
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "nuclear-power-plants-60-year-extension-gx-law": [
    "electricity-business-and-atomic-energy-act",
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "next-gen-nuclear-smr-reactors-development": [
    "electricity-business-and-atomic-energy-act"
  ],
  "high-level-nuclear-waste-final-disposal-survey": [
    "electricity-business-and-atomic-energy-act"
  ],
  "electricity-capacity-market-retail-bankruptcy": [
    "electricity-business-and-atomic-energy-act"
  ],
  "grid-scale-battery-storage-power-grid-masterplan": [
    "electricity-business-and-atomic-energy-act",
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "renewable-output-curtailment-grid-masterplan": [
    "electricity-business-and-atomic-energy-act",
    "act-on-special-measures-for-renewable-energy"
  ],
  "renewable-energy-surcharge-burden": [
    "act-on-special-measures-for-renewable-energy"
  ],
  "solar-panel-disposal-reserve-fund": [
    "act-on-special-measures-for-renewable-energy"
  ],
  "solar-panel-recycling-reserve-fund-abandonment": [
    "act-on-special-measures-for-renewable-energy"
  ],
  "offshore-wind-power-eez-expansion": [
    "act-on-special-measures-for-renewable-energy"
  ],
  "floating-offshore-wind-eez-ocean-renewable-energy-act": [
    "act-on-special-measures-for-renewable-energy"
  ],
  "geothermal-power-national-parks-deregulation-hot-springs": [
    "act-on-special-measures-for-renewable-energy"
  ],
  "livestock-methane-emission-reduction": [
    "act-on-special-measures-for-renewable-energy",
    "farmland-and-food-agriculture-basic-act"
  ],
  "carbon-border-adjustment-mechanism-cbam-dialogue": [
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "hydrogen-steel-gx-decarbonization": [
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "hydrogen-ammonia-co-firing-ccs-framework": [
    "act-on-promotion-of-global-warming-countermeasures-and-gx",
    "electricity-business-and-atomic-energy-act"
  ],
  "ev-battery-gigafactory-subsidies": [
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "timber-usage-promotion-public-buildings-wooden": [
    "act-on-promotion-of-global-warming-countermeasures-and-gx"
  ],
  "disaster-prevention-weather-information-linear-rainband": [
    "disaster-countermeasures-basic-act"
  ],
  "evacuation-shelter-t-k-b-toilet-kitchen-bed-standards": [
    "disaster-countermeasures-basic-act"
  ],
  "pet-evacuation-shelter-guidelines-disaster": [
    "disaster-countermeasures-basic-act"
  ],
  "welfare-evacuation-shelters-vulnerable-direct-admission": [
    "disaster-countermeasures-basic-act"
  ],
  "disaster-waste-wide-area-disposal-temporary-storage": [
    "disaster-countermeasures-basic-act"
  ],
  "disaster-waste-wide-area-treatment-plan-mandate": [
    "disaster-countermeasures-basic-act"
  ],
  "nankai-trough-earthquake-extra-advisory-pre-evacuation-guidelines": [
    "disaster-countermeasures-basic-act"
  ],
  "japan-trench-chishima-trench-earthquake-tsunami-tower": [
    "disaster-countermeasures-basic-act"
  ],
  "sediment-disaster-red-zone-development-restriction": [
    "disaster-countermeasures-basic-act"
  ],
  "sediment-disaster-red-zone-housing-relocation-subsidies": [
    "disaster-countermeasures-basic-act"
  ],
  "river-basin-disaster-resilience-flood-control": [
    "disaster-countermeasures-basic-act"
  ],
  "river-basin-disaster-resilience-rainwater-storage-facilities": [
    "disaster-countermeasures-basic-act"
  ],
  "dam-redevelopment-pre-discharge-flood-control-hydropower": [
    "disaster-countermeasures-basic-act"
  ],
  "flood-risk-real-estate-transaction-disclosure": [
    "disaster-countermeasures-basic-act",
    "act-on-land-and-building-leases"
  ],
  "building-seismic-retrofit-mandatory-earthquake-breaker": [
    "disaster-countermeasures-basic-act"
  ],
  "dense-wooden-residential-fire-prevention": [
    "disaster-countermeasures-basic-act"
  ],
  "volcanic-disaster-prevention-helmet-evacuation-shelters": [
    "disaster-countermeasures-basic-act"
  ],
  "rural-gas-station-maintenance-ss-depopulation": [
    "disaster-countermeasures-basic-act"
  ],
  "aging-condominium-rebuilding-resolution-threshold-easing": [
    "condominium-unit-ownership-and-rebuilding-act"
  ],
  "condo-reconstruction-subdivided-ownership": [
    "condominium-unit-ownership-and-rebuilding-act"
  ],
  "tokyo-inland-earthquake-skyscraper-elevator-entrapment-mitigation": [
    "condominium-unit-ownership-and-rebuilding-act",
    "disaster-countermeasures-basic-act"
  ],
  "tower-mansion-inheritance-tax-valuation": [
    "condominium-unit-ownership-and-rebuilding-act",
    "income-tax-act"
  ],
  "tower-mansion-tax-loophole-reform-fairness": [
    "condominium-unit-ownership-and-rebuilding-act",
    "income-tax-act"
  ]
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
