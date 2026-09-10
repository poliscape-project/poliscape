import childAllowanceData from "@/data/policies/child-allowance-expansion.json";
import universityTuitionData from "@/data/policies/university-tuition-waiver.json";
import incomeBarrierData from "@/data/policies/income-barrier.json";
import mynaHealthInsuranceData from "@/data/policies/myna-health-insurance.json";
import newNisaData from "@/data/policies/new-nisa.json";
import fixedTaxCutData from "@/data/policies/fixed-tax-cut.json";
import furusatoTaxData from "@/data/policies/furusato-tax.json";
import invoiceSystemData from "@/data/policies/invoice-system.json";
import pensionStartAgeData from "@/data/policies/pension-start-age.json";
import zaishokuPensionData from "@/data/policies/zaishoku-pension.json";
import elderlyHealthcareCostData from "@/data/policies/elderly-healthcare-cost.json";
import childcareLeaveBenefitData from "@/data/policies/childcare-leave-benefit.json";
import rideshareDeregulationData from "@/data/policies/rideshare-deregulation.json";
import highProfessionalSystemData from "@/data/policies/high-professional-system.json";
import energySubsidiesData from "@/data/policies/energy-subsidies.json";
import defenseTaxHikeData from "@/data/policies/defense-tax-hike.json";
// 追加10政策（第2弾）
import childcareSupportFundData from "@/data/policies/childcare-support-fund.json";
import inheritanceRegistrationData from "@/data/policies/inheritance-registration.json";
import mynaDriversLicenseData from "@/data/policies/myna-drivers-license.json";
import severancePayTaxData from "@/data/policies/severance-pay-tax.json";
import gasolineSubsidiesData from "@/data/policies/gasoline-subsidies-trigger.json";
import nursingCareCopayData from "@/data/policies/nursing-care-copay.json";
import electricKickboardData from "@/data/policies/electric-kickboard-rules.json";
import selectiveSurnameData from "@/data/policies/selective-separate-surnames.json";
import schoolLunchData from "@/data/policies/school-lunch-free.json";
import idecoExpansionData from "@/data/policies/ideco-expansion.json";
// 新規10政策（第3弾）
import kodomoTsuenData from "@/data/policies/kodomo-daretemo-tsuen.json";
import highSchoolTuitionData from "@/data/policies/high-school-tuition-free.json";
import pension45YearsData from "@/data/policies/pension-contribution-45years.json";
import abandonedHouseData from "@/data/policies/abandoned-house-tax-hike.json";
import accommodationTaxData from "@/data/policies/accommodation-tax-tourism.json";
import forestTaxData from "@/data/policies/forest-environment-tax.json";
import customerHarassmentData from "@/data/policies/customer-harassment-prevention.json";
import reskillingBenefitData from "@/data/policies/reskilling-education-benefit.json";
import hayFeverData from "@/data/policies/hay-fever-countermeasures.json";
import careerUpBarrierData from "@/data/policies/income-barrier-career-up.json";
// 新規15政策（第4弾）
import financialIncomeTaxData from "@/data/policies/financial-income-tax.json";
import evDistanceTaxData from "@/data/policies/ev-distance-tax.json";
import digitalSalaryPaymentData from "@/data/policies/digital-salary-payment.json";
import dismissalResolutionData from "@/data/policies/dismissal-monetary-resolution.json";
import teacherSpecialMeasureData from "@/data/policies/teacher-special-measure-act.json";
import highCostMedicalCapData from "@/data/policies/high-cost-medical-cap.json";
import bicycleBlueTicketData from "@/data/policies/bicycle-blue-ticket.json";
import doctorOvertimeData from "@/data/policies/doctor-overtime-regulation.json";
import foreignTrainingEmploymentData from "@/data/policies/foreign-training-employment.json";
import paternityLeaveAtBirthData from "@/data/policies/paternity-leave-at-birth.json";
import solarPanelMandateData from "@/data/policies/solar-panel-mandate.json";
import otcSimilarDrugData from "@/data/policies/otc-similar-drug-restriction.json";
import stealthMarketingData from "@/data/policies/stealth-marketing-regulation.json";
import droneMobilityData from "@/data/policies/drone-flying-car-mobility.json";
import alienRegistrationMynaData from "@/data/policies/alien-registration-myna-card.json";
// 新規15政策（第5弾）
import jointCustodyData from "@/data/policies/joint-custody-after-divorce.json";
import condoReconstructionData from "@/data/policies/condo-reconstruction-subdivided-ownership.json";
import fourDayWorkweekData from "@/data/policies/four-day-workweek-optional.json";
import freelanceProtectionData from "@/data/policies/freelance-protection-act.json";
import inheritanceGiftTaxData from "@/data/policies/inheritance-gift-tax-seven-years.json";
import housingLoanTaxCutData from "@/data/policies/housing-loan-tax-cut-energy-efficiency.json";
import seniorEmploymentData from "@/data/policies/senior-employment-70-years.json";
import snsDefamationData from "@/data/policies/sns-defamation-platform-act.json";
import generativeAiCopyrightData from "@/data/policies/generative-ai-copyright-rules.json";
import smartphoneCompetitionData from "@/data/policies/smartphone-software-competition-act.json";
import waterSupplyRateData from "@/data/policies/water-supply-privatization-rate-hike.json";
import nuclearPower60YearsData from "@/data/policies/nuclear-power-operation-60years.json";
import wildBearDamageData from "@/data/policies/wild-bear-damage-countermeasures.json";
import onlineMedicalCareData from "@/data/policies/online-medical-care-delivery.json";
import foodConsumptionTaxData from "@/data/policies/food-consumption-tax-zero-debate.json";
// 新規20政策（第6弾）
import japanDbsData from "@/data/policies/japan-dbs-child-sexual-violence.json";
import eggFreezingData from "@/data/policies/egg-freezing-fertility-subsidy.json";
import childSupportAdvanceData from "@/data/policies/child-support-advance-payment.json";
import resignationAgencyData from "@/data/policies/resignation-agency-regulation.json";
import equalPayBonusData from "@/data/policies/equal-pay-equal-work-bonus-severance.json";
import rightToDisconnectData from "@/data/policies/right-to-disconnect-after-hours.json";
import cryptoAssetsTaxData from "@/data/policies/crypto-assets-tax-reduction.json";
import refundableTaxCreditData from "@/data/policies/refundable-tax-credit-negative-income-tax.json";
import dutyFreeRefundData from "@/data/policies/duty-free-refund-airport-exit.json";
import dignityDeathData from "@/data/policies/dignity-death-advance-care-planning.json";
import qualificationLetterData from "@/data/policies/qualification-confirmation-letter-myna.json";
import tobaccoTaxBanData from "@/data/policies/tobacco-tax-outdoor-smoking-ban.json";
import dangerousDrivingData from "@/data/policies/dangerous-driving-penal-code-reform.json";
import elderlyDriverTestData from "@/data/policies/elderly-driver-practical-driving-test.json";
import leaveAtDoorData from "@/data/policies/leave-at-door-delivery-point-system.json";
import internetVotingData from "@/data/policies/internet-voting-elections-system.json";
import imperialSuccessionData from "@/data/policies/imperial-succession-female-lineage.json";
import immigrationRepatriationData from "@/data/policies/immigration-law-forced-repatriation.json";
import disposablePlasticCutleryData from "@/data/policies/disposable-plastic-cutlery-amenity-fee.json";
import foodSecurityOrderData from "@/data/policies/food-security-emergency-production-order.json";
// 第7弾（14政策・100テーマ達成）
import sameSexMarriageData from "@/data/policies/same-sex-marriage-equality.json";
import securityClearanceData from "@/data/policies/security-clearance-economic-security.json";
import ambulanceFeeData from "@/data/policies/ambulance-fee-minor-illness.json";
import schoolClubCommunityData from "@/data/policies/school-club-community-transition.json";
import furusatoPointBanData from "@/data/policies/furusato-tax-point-ban-2025.json";
import bicycleHelmetData from "@/data/policies/bicycle-helmet-mandate-insurance.json";
import casinoIrData from "@/data/policies/casino-ir-gambling-addiction.json";
import specifiedSkilledWorker2Data from "@/data/policies/specified-skilled-worker-2-expansion.json";
import renewableEnergySurchargeData from "@/data/policies/renewable-energy-surcharge-burden.json";
import solarPanelDisposalData from "@/data/policies/solar-panel-disposal-reserve-fund.json";
import nationalLandReversionData from "@/data/policies/national-land-reversion-system.json";
import reverseMortgageData from "@/data/policies/reverse-mortgage-senior-housing.json";
import seniorGuarantorData from "@/data/policies/senior-guarantor-service-regulation.json";
import schoolSmartphoneBanData from "@/data/policies/school-smartphone-ban-regulation.json";
import { PolicyTopic } from "@/types/policy";

// 登録されている全100政策のリスト
const policies: PolicyTopic[] = [
  childAllowanceData as PolicyTopic,
  universityTuitionData as PolicyTopic,
  incomeBarrierData as PolicyTopic,
  mynaHealthInsuranceData as PolicyTopic,
  newNisaData as PolicyTopic,
  fixedTaxCutData as PolicyTopic,
  furusatoTaxData as PolicyTopic,
  invoiceSystemData as PolicyTopic,
  pensionStartAgeData as PolicyTopic,
  zaishokuPensionData as PolicyTopic,
  elderlyHealthcareCostData as PolicyTopic,
  childcareLeaveBenefitData as PolicyTopic,
  rideshareDeregulationData as PolicyTopic,
  highProfessionalSystemData as PolicyTopic,
  energySubsidiesData as PolicyTopic,
  defenseTaxHikeData as PolicyTopic,
  // 第2弾（10政策）
  childcareSupportFundData as PolicyTopic,
  inheritanceRegistrationData as PolicyTopic,
  mynaDriversLicenseData as PolicyTopic,
  severancePayTaxData as PolicyTopic,
  gasolineSubsidiesData as PolicyTopic,
  nursingCareCopayData as PolicyTopic,
  electricKickboardData as PolicyTopic,
  selectiveSurnameData as PolicyTopic,
  schoolLunchData as PolicyTopic,
  idecoExpansionData as PolicyTopic,
  // 第3弾（10政策）
  kodomoTsuenData as PolicyTopic,
  highSchoolTuitionData as PolicyTopic,
  pension45YearsData as PolicyTopic,
  abandonedHouseData as PolicyTopic,
  accommodationTaxData as PolicyTopic,
  forestTaxData as PolicyTopic,
  customerHarassmentData as PolicyTopic,
  reskillingBenefitData as PolicyTopic,
  hayFeverData as PolicyTopic,
  careerUpBarrierData as PolicyTopic,
  // 第4弾（15政策）
  financialIncomeTaxData as PolicyTopic,
  evDistanceTaxData as PolicyTopic,
  digitalSalaryPaymentData as PolicyTopic,
  dismissalResolutionData as PolicyTopic,
  teacherSpecialMeasureData as PolicyTopic,
  highCostMedicalCapData as PolicyTopic,
  bicycleBlueTicketData as PolicyTopic,
  doctorOvertimeData as PolicyTopic,
  foreignTrainingEmploymentData as PolicyTopic,
  paternityLeaveAtBirthData as PolicyTopic,
  solarPanelMandateData as PolicyTopic,
  otcSimilarDrugData as PolicyTopic,
  stealthMarketingData as PolicyTopic,
  droneMobilityData as PolicyTopic,
  alienRegistrationMynaData as PolicyTopic,
  // 第5弾（15政策）
  jointCustodyData as PolicyTopic,
  condoReconstructionData as PolicyTopic,
  fourDayWorkweekData as PolicyTopic,
  freelanceProtectionData as PolicyTopic,
  inheritanceGiftTaxData as PolicyTopic,
  housingLoanTaxCutData as PolicyTopic,
  seniorEmploymentData as PolicyTopic,
  snsDefamationData as PolicyTopic,
  generativeAiCopyrightData as PolicyTopic,
  smartphoneCompetitionData as PolicyTopic,
  waterSupplyRateData as PolicyTopic,
  nuclearPower60YearsData as PolicyTopic,
  wildBearDamageData as PolicyTopic,
  onlineMedicalCareData as PolicyTopic,
  foodConsumptionTaxData as PolicyTopic,
  // 第6弾（20政策）
  japanDbsData as PolicyTopic,
  eggFreezingData as PolicyTopic,
  childSupportAdvanceData as PolicyTopic,
  resignationAgencyData as PolicyTopic,
  equalPayBonusData as PolicyTopic,
  rightToDisconnectData as PolicyTopic,
  cryptoAssetsTaxData as PolicyTopic,
  refundableTaxCreditData as PolicyTopic,
  dutyFreeRefundData as PolicyTopic,
  dignityDeathData as PolicyTopic,
  qualificationLetterData as PolicyTopic,
  tobaccoTaxBanData as PolicyTopic,
  dangerousDrivingData as PolicyTopic,
  elderlyDriverTestData as PolicyTopic,
  leaveAtDoorData as PolicyTopic,
  internetVotingData as PolicyTopic,
  imperialSuccessionData as PolicyTopic,
  immigrationRepatriationData as PolicyTopic,
  disposablePlasticCutleryData as PolicyTopic,
  foodSecurityOrderData as PolicyTopic,
  // 第7弾（14政策・全100政策到達）
  sameSexMarriageData as PolicyTopic,
  securityClearanceData as PolicyTopic,
  ambulanceFeeData as PolicyTopic,
  schoolClubCommunityData as PolicyTopic,
  furusatoPointBanData as PolicyTopic,
  bicycleHelmetData as PolicyTopic,
  casinoIrData as PolicyTopic,
  specifiedSkilledWorker2Data as PolicyTopic,
  renewableEnergySurchargeData as PolicyTopic,
  solarPanelDisposalData as PolicyTopic,
  nationalLandReversionData as PolicyTopic,
  reverseMortgageData as PolicyTopic,
  seniorGuarantorData as PolicyTopic,
  schoolSmartphoneBanData as PolicyTopic,
];

export function getAllPolicies(): PolicyTopic[] {
  return policies;
}

export function getPolicyById(id: string): PolicyTopic | undefined {
  return policies.find((p) => p.id === id);
}
