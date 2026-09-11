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
    "health-insurance-act",
    "pharmaceuticals-and-medical-devices-act"
  ],
  "pharmacy-dx-electronic-prescription-full-rollout": [
    "health-insurance-act",
    "digital-society-and-mynumber-act",
    "pharmaceuticals-and-medical-devices-act"
  ],
  "online-medical-care-first-visit-deregulation": [
    "health-insurance-act",
    "pharmaceuticals-and-medical-devices-act"
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
    "road-traffic-act",
    "services-and-employment-support-for-persons-with-disabilities-act"
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
    "public-assistance-act",
    "basic-act-on-children"
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
    "school-education-act",
    "basic-act-on-children"
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
    "self-defense-forces-act",
    "penal-code-and-economic-security-clearance-act"
  ],
  "active-cyber-defense-legislation": [
    "self-defense-forces-act",
    "penal-code-and-economic-security-clearance-act"
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
    "health-insurance-act",
    "pharmaceuticals-and-medical-devices-act"
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
  ],
  "child-commissioner-independent-advocacy-body": [
    "basic-act-on-children"
  ],
  "orphan-youth-caregiver-emancipation-support-fund": [
    "basic-act-on-children"
  ],
  "young-carer-support-legalization": [
    "basic-act-on-children"
  ],
  "custody-dispute-joint-custody-civil-code-revision": [
    "basic-act-on-children",
    "civil-code-family"
  ],
  "infectious-disease-agency-jihs-japan-cdc": [
    "infectious-diseases-and-vaccination-act"
  ],
  "hpv-vaccine-male-inoculation-subsidy": [
    "infectious-diseases-and-vaccination-act"
  ],
  "hpv-vaccine-male-vaccination-public-subsidy": [
    "infectious-diseases-and-vaccination-act"
  ],
  "cruise-ship-port-facility-customs-quarantine-dx": [
    "infectious-diseases-and-vaccination-act",
    "immigration-control-and-refugee-recognition-act"
  ],
  "online-medical-care-delivery": [
    "pharmaceuticals-and-medical-devices-act",
    "health-insurance-act"
  ],
  "drug-lag-drug-loss-fast-track-approval": [
    "pharmaceuticals-and-medical-devices-act"
  ],
  "emergency-contraception-otc-pharmacy-sale": [
    "pharmaceuticals-and-medical-devices-act"
  ],
  "otc-analog-drugs-insurance-exclusion-copayment-increase": [
    "pharmaceuticals-and-medical-devices-act",
    "health-insurance-act"
  ],
  "electronic-prescriptions-refill-prescriptions-promotion": [
    "pharmaceuticals-and-medical-devices-act",
    "health-insurance-act"
  ],
  "refill-prescription-utilization-target-expansion": [
    "pharmaceuticals-and-medical-devices-act",
    "health-insurance-act"
  ],
  "regenerative-medicine-ips-cell-insurance-pricing": [
    "pharmaceuticals-and-medical-devices-act",
    "health-insurance-act"
  ],
  "disability-employment-quota-hike-agency-curb": [
    "services-and-employment-support-for-persons-with-disabilities-act"
  ],
  "developmental-disability-early-detection-support-act": [
    "services-and-employment-support-for-persons-with-disabilities-act"
  ],
  "special-needs-education-inclusive-education-support-staff": [
    "services-and-employment-support-for-persons-with-disabilities-act",
    "school-education-act"
  ],
  "dementia-basic-act-inclusive-society-barrier-free-finance": [
    "services-and-employment-support-for-persons-with-disabilities-act"
  ],
  "confinement-penalty-prison-system-reform": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "non-consensual-sexual-offenses-penal-code": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "death-penalty-abolition-life-without-parole": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "security-clearance-act-economic-security-information-protection": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "security-clearance-economic-security": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "economic-security-promotion-act-supply-chain-subsidies": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "economic-security-supply-chain-resilience": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "tokuryu-yami-baito-crackdown-legislation": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "tokuryu-yami-baito-crackdown-wiretapping-regulations": [
    "penal-code-and-economic-security-clearance-act",
    "telecommunications-business-act"
  ],
  "anonymous-fluid-criminal-groups-tokuryu-countermeasures": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "dark-part-time-job-bank-account-freezing-framework": [
    "penal-code-and-economic-security-clearance-act",
    "financial-instruments-and-exchange-act"
  ],
  "voice-cloning-deepfake-fraud-penal-code-crackdown": [
    "penal-code-and-economic-security-clearance-act"
  ],
  "bicycle-helmet-mandate-insurance": [
    "road-traffic-act"
  ],
  "bicycle-helmet-wearing-effort-obligation-penalization": [
    "road-traffic-act"
  ],
  "bicycle-traffic-violation-blue-ticket-penalty-system": [
    "road-traffic-act"
  ],
  "autonomous-delivery-robot-sidewalk-operation": [
    "road-traffic-act"
  ],
  "inter-prefectural-expressway-toll-free-social-experiment": [
    "road-traffic-act"
  ],
  "caregiving-resignation-leave-act-reform": [
    "childcare-and-caregiver-leave-act"
  ],
  "care-plan-copay-debate": [
    "long-term-care-insurance-act"
  ],
  "care-robot-staffing-ratio-deregulation": [
    "long-term-care-insurance-act"
  ],
  "counterstrike-capability-long-range-missiles": [
    "self-defense-forces-act"
  ],
  "self-defense-forces-personnel-treatment-allowance": [
    "self-defense-forces-act"
  ],
  "child-adolescent-psychiatry-beds-shortage-school-counselors": [
    "school-education-act",
    "health-insurance-act"
  ],
  "child-mental-health-school-counselor-full-deployment": [
    "school-education-act"
  ],
  "club-activities-regional-transition-middle-school": [
    "school-education-act"
  ],
  "extracurricular-club-activities-regional-transition": [
    "school-education-act"
  ],
  "school-club-community-transition": [
    "school-education-act"
  ],
  "digital-textbook-implementation-paper-coexistence": [
    "school-education-act"
  ],
  "digital-textbook-national-curriculum-full-rollout": [
    "school-education-act"
  ],
  "organic-farming-expansion-school-lunch-local-produce": [
    "school-education-act",
    "farmland-and-food-agriculture-basic-act"
  ],
  "school-lunch-allergy-epipen-standard": [
    "school-education-act"
  ],
  "school-lunch-complete-free-provision-nationwide": [
    "school-education-act"
  ],
  "school-lunch-local-procurement-organic-ratio": [
    "school-education-act",
    "farmland-and-food-agriculture-basic-act"
  ],
  "adult-guardianship-system-fundamental-reform-flexibility": [
    "civil-code-family"
  ],
  "elderly-financial-exploitation-prevention-trust": [
    "civil-code-family"
  ],
  "corporate-spousal-allowance-reduction-income-barrier": [
    "income-tax-act",
    "employees-pension-insurance-act"
  ],
  "n-divide-n-multiply-family-tax-system": [
    "income-tax-act"
  ],
  "childcare-leave-net-take-home-pay-100-percent-benefit": [
    "employment-insurance-and-worker-dispatch-act",
    "childcare-and-caregiver-leave-act"
  ],
  "childcare-short-time-work-wage-subsidy-benefit": [
    "employment-insurance-and-worker-dispatch-act",
    "childcare-and-caregiver-leave-act"
  ],
  "specialized-practical-education-training-benefit-80-percent": [
    "employment-insurance-and-worker-dispatch-act"
  ],
  "equal-pay-equal-work-bonus-severance": [
    "employment-insurance-and-worker-dispatch-act",
    "labor-standards-act"
  ],
  "resignation-agency-regulation": [
    "employment-insurance-and-worker-dispatch-act",
    "labor-standards-act"
  ],
  "resignation-agency-service-legal-framework-regulation": [
    "employment-insurance-and-worker-dispatch-act",
    "labor-standards-act"
  ],
  "resignation-agent-acceptance-employee-free-exit-rights": [
    "employment-insurance-and-worker-dispatch-act",
    "labor-standards-act"
  ],
  "autonomous-driving-level-4-public-road-liability": [
    "regional-public-transport-and-road-transport-act",
    "road-traffic-act"
  ],
  "level-4-autonomous-driving-rural-bus-service": [
    "regional-public-transport-and-road-transport-act",
    "road-traffic-act"
  ],
  "autonomous-train-goa3-driverless-regional-rail": [
    "regional-public-transport-and-road-transport-act"
  ],
  "jr-hokkaido-shikoku-freight-public-support": [
    "regional-public-transport-and-road-transport-act"
  ],
  "local-railway-reconstruction-council-bus-transition": [
    "regional-public-transport-and-road-transport-act"
  ],
  "regional-railway-restructuring-bus-conversion": [
    "regional-public-transport-and-road-transport-act"
  ],
  "unprofitable-local-rail-bus-conversion": [
    "regional-public-transport-and-road-transport-act"
  ],
  "abandoned-boats-removal-ports-coastal-cleanup": [
    "regional-public-transport-and-road-transport-act"
  ],
  "leave-at-door-delivery-point-system": [
    "regional-public-transport-and-road-transport-act"
  ],
  "shinkansen-freight-express-cargo-modal-shift": [
    "regional-public-transport-and-road-transport-act"
  ],
  "local-autonomy-act-revision-national-directive-power": [
    "local-autonomy-act"
  ],
  "local-assembly-member-shortage-side-job-reform": [
    "local-autonomy-act"
  ],
  "compact-city-location-optimization-plan-consolidation": [
    "local-autonomy-act"
  ],
  "tokyo-over-concentration-migration-subsidy": [
    "local-autonomy-act"
  ],
  "donor-conception-right-to-know-origins": [
    "maternal-and-child-health-and-fertility-act",
    "civil-code-family"
  ],
  "egg-freezing-fertility-subsidy": [
    "maternal-and-child-health-and-fertility-act"
  ],
  "infertility-treatment-advanced-medicine-cost-subsidy": [
    "maternal-and-child-health-and-fertility-act",
    "health-insurance-act"
  ],
  "nipt-prenatal-testing-accreditation-guidelines": [
    "maternal-and-child-health-and-fertility-act"
  ],
  "nipt-prenatal-testing-accreditation-system": [
    "maternal-and-child-health-and-fertility-act"
  ],
  "painless-childbirth-epidural-public-subsidy": [
    "maternal-and-child-health-and-fertility-act"
  ],
  "civil-protection-shelters-underground-stations": [
    "civil-protection-and-important-land-act"
  ],
  "missile-evacuation-underground-shelter-guidelines": [
    "civil-protection-and-important-land-act"
  ],
  "critical-land-use-regulation-act-bases-islands": [
    "civil-protection-and-important-land-act",
    "self-defense-forces-act"
  ],
  "abduction-issue-summit-talks-north-korea-sanctions": [
    "civil-protection-and-important-land-act"
  ],
  "plastic-resource-circulation-amenity-fee-expansion": [
    "basic-act-for-sound-material-cycle-society"
  ],
  "recycled-plastic-mandatory-usage-circular-economy": [
    "basic-act-for-sound-material-cycle-society"
  ],
  "pfas-drinking-water-quality-regulation": [
    "basic-act-for-sound-material-cycle-society"
  ],
  "johkasou-decentralized-sewage-transition-subsidy": [
    "basic-act-for-sound-material-cycle-society"
  ],
  "biomanufacturing-synthetic-biology-shift": [
    "basic-act-for-sound-material-cycle-society"
  ],
  "invasive-alien-species-muntjac-crayfish-control": [
    "basic-act-for-sound-material-cycle-society"
  ],
  "animal-welfare-livestock-guidelines": [
    "basic-act-for-sound-material-cycle-society"
  ],
  "overtourism-tourist-tax-congestion-surcharge-act": [
    "basic-act-for-tourism-and-ir-promotion",
    "local-autonomy-act"
  ],
  "casino-ir-gambling-addiction": [
    "basic-act-for-tourism-and-ir-promotion"
  ],
  "illegal-online-casino-crackdown-gambling-addiction": [
    "basic-act-for-tourism-and-ir-promotion",
    "penal-code-and-economic-security-clearance-act"
  ],
  "ambulance-fee-minor-illness": [
    "fire-and-disaster-management-act",
    "health-insurance-act"
  ],
  "ambulance-service-fee-charge-triage": [
    "fire-and-disaster-management-act",
    "health-insurance-act"
  ],
  "emergency-call-7119-telephone-triage-nationwide": [
    "fire-and-disaster-management-act"
  ],
  "anti-solicitation-cult-donation-relief-law": [
    "anti-unjust-solicitation-and-stalking-act",
    "consumer-contract-act"
  ],
  "anti-stalker-act-gps-attachment-regulation": [
    "anti-unjust-solicitation-and-stalking-act",
    "penal-code-and-economic-security-clearance-act"
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
