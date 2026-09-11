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
// 第8弾（農業・食料5政策）
import riceProductionAdjustmentData from "@/data/policies/rice-production-adjustment-stockpile.json";
import smartAgriculturePromotionData from "@/data/policies/smart-agriculture-promotion-act.json";
import corporateFarmlandOwnershipData from "@/data/policies/corporate-farmland-ownership-deregulation.json";
import greenFoodSystemData from "@/data/policies/green-food-system-organic-farming.json";
import newFarmersSupportData from "@/data/policies/new-farmers-support-succession.json";
// 第9弾（畜産・酪農5政策）
import dairyCrisisData from "@/data/policies/dairy-crisis-milk-price-culling.json";
import formulaFeedData from "@/data/policies/formula-feed-stabilization-domestic-crops.json";
import animalWelfareData from "@/data/policies/animal-welfare-livestock-guidelines.json";
import avianInfluenzaData from "@/data/policies/avian-influenza-livestock-epidemic-control.json";
import livestockMethaneData from "@/data/policies/livestock-methane-emission-reduction.json";
// 第10弾（工業・製造業10政策）
import semiconductorRapidusData from "@/data/policies/semiconductor-rapidus-tsmc-subsidies.json";
import evBatteryGigafactoryData from "@/data/policies/ev-battery-gigafactory-subsidies.json";
import hydrogenSteelData from "@/data/policies/hydrogen-steel-gx-decarbonization.json";
import economicSecuritySupplyChainData from "@/data/policies/economic-security-supply-chain-resilience.json";
import subcontractActPricePassData from "@/data/policies/subcontract-act-price-pass-through.json";
import defenseIndustryManufacturingData from "@/data/policies/defense-industry-manufacturing-nationalization.json";
import industrialRobotSmartFactoryData from "@/data/policies/industrial-robot-smart-factory-automation.json";
import spaceIndustryStrategicFundData from "@/data/policies/space-industry-strategic-fund.json";
import biomanufacturingShiftData from "@/data/policies/biomanufacturing-synthetic-biology-shift.json";
import criticalMineralsDeepSeaData from "@/data/policies/critical-minerals-deep-sea-urban-mining.json";
import caregiverWageHikeData from "@/data/policies/caregiver-wage-hike-allowance-unification.json";
import homeCareCutCrisisData from "@/data/policies/home-care-reimbursement-cut-crisis.json";
import mildCareShiftData from "@/data/policies/mild-care-shift-community-support.json";
import carePlanCopayData from "@/data/policies/care-plan-copay-debate.json";
import nursingHomeMultiBedData from "@/data/policies/nursing-home-multi-bed-room-charge.json";
import careRobotStaffingData from "@/data/policies/care-robot-staffing-ratio-deregulation.json";
import caregivingResignationLeaveData from "@/data/policies/caregiving-resignation-leave-act-reform.json";
import youngCarerSupportData from "@/data/policies/young-carer-support-legalization.json";
import dementiaBasicActData from "@/data/policies/dementia-basic-act-inclusive-society.json";
import foreignCareWorkerData from "@/data/policies/foreign-care-worker-nursing-training.json";
// 第12弾（注目政策50テーマ追加・全180政策）
// バッチ1：エネルギー・環境・水産
import offshoreWindEezData from "@/data/policies/offshore-wind-power-eez-expansion.json";
import renewableCurtailmentData from "@/data/policies/renewable-output-curtailment-grid-masterplan.json";
import highLevelNuclearWasteData from "@/data/policies/high-level-nuclear-waste-final-disposal-survey.json";
import electricityCapacityMarketData from "@/data/policies/electricity-capacity-market-retail-bankruptcy.json";
import perovskiteSolarData from "@/data/policies/perovskite-solar-cells-domestic-deployment.json";
import fisheriesTraceabilityData from "@/data/policies/fisheries-distribution-traceability-anti-poaching.json";
import tacFisheryQuotaData from "@/data/policies/tac-fishery-quota-expansion-warming-seas.json";
import landBasedAquacultureData from "@/data/policies/land-based-aquaculture-ras-deregulation.json";
import commercialWhalingData from "@/data/policies/commercial-whaling-kanei-maru-fin-whale.json";
import marinePlasticGhostGearData from "@/data/policies/marine-plastic-ghost-gear-fisheries.json";
// バッチ2：観光・地域交通・司法・人権
import inboundTwoTierPricingData from "@/data/policies/inbound-two-tier-pricing-system.json";
import mtFujiEntryFeeData from "@/data/policies/mt-fuji-entry-fee-overtourism-regulation.json";
import minpaku180DayData from "@/data/policies/minpaku-180-day-limit-deregulation.json";
import unprofitableLocalRailData from "@/data/policies/unprofitable-local-rail-bus-conversion.json";
import regionalAirportConcessionData from "@/data/policies/regional-airport-concession-inbound.json";
import retrialLawReformData from "@/data/policies/retrial-law-reform-evidence-disclosure.json";
import nonConsensualSexualOffensesData from "@/data/policies/non-consensual-sexual-offenses-penal-code.json";
import genderIdentityReformData from "@/data/policies/gender-identity-act-surgery-requirement-reform.json";
import juvenileActStrictnessData from "@/data/policies/juvenile-act-specified-juveniles-strictness.json";
import tokuryuYamiBaitoData from "@/data/policies/tokuryu-yami-baito-crackdown-legislation.json";
// バッチ3：情報通信・AI・住宅・都市防災
import aiSafetyBasicActData from "@/data/policies/ai-safety-basic-act-regulation.json";
import deepfakeWatermarkOpData from "@/data/policies/deepfake-watermark-originator-profile.json";
import telecomEmergencyRoamingData from "@/data/policies/telecom-emergency-roaming-mandate.json";
import nhkInternetReceivingFeeData from "@/data/policies/nhk-internet-receiving-fee-mandate.json";
import youthSmartphoneGamingData from "@/data/policies/youth-smartphone-gaming-time-restriction.json";
import denseWoodenFirePreventionData from "@/data/policies/dense-wooden-residential-fire-prevention.json";
import towerMansionTaxValuationData from "@/data/policies/tower-mansion-inheritance-tax-valuation.json";
import embankmentRegulationActData from "@/data/policies/embankment-regulation-act-landslide-prevention.json";
import riverBasinDisasterResilienceData from "@/data/policies/river-basin-disaster-resilience-flood-control.json";
import tokyoMigrationSubsidyData from "@/data/policies/tokyo-over-concentration-migration-subsidy.json";
// バッチ4：教育・研究・安全保障・防衛
import nationalUnivTuitionHikeData from "@/data/policies/national-university-tuition-hike-debate.json";
import worldClassResearchUnivFundData from "@/data/policies/world-class-research-university-fund.json";
import elementaryClass35ShortageData from "@/data/policies/elementary-class-size-35-teacher-shortage.json";
import scholarshipForgivenessData from "@/data/policies/scholarship-loan-forgiveness-regional-employment.json";
import truancyFreeSchoolCocoloData from "@/data/policies/truancy-free-school-public-funding-cocolo.json";
import activeCyberDefenseData from "@/data/policies/active-cyber-defense-legislation.json";
import counterstrikeMissilesData from "@/data/policies/counterstrike-capability-long-range-missiles.json";
import defenseEquipmentGcapExportData from "@/data/policies/defense-equipment-transfer-gcap-export.json";
import criticalLandUseRegulationData from "@/data/policies/critical-land-use-regulation-act-bases-islands.json";
import coastGuardSdfProtocolData from "@/data/policies/coast-guard-sdf-control-protocol-defense.json";
// バッチ5：労働市場・税制・医療・公衆衛生
import minimumWage1500YenData from "@/data/policies/minimum-wage-1500-yen-target.json";
import disabilityEmploymentQuotaData from "@/data/policies/disability-employment-quota-hike-agency-curb.json";
import spotWorkGigWorkerProtectionData from "@/data/policies/spot-work-gig-worker-labor-protection.json";
import wageIncreaseTaxCreditData from "@/data/policies/wage-increase-corporate-tax-credit.json";
import jobBasedHiringGraduatesData from "@/data/policies/job-based-hiring-new-graduates-transition.json";
import infectiousDiseaseAgencyData from "@/data/policies/infectious-disease-agency-jihs-japan-cdc.json";
import emergencyContraceptionOtcData from "@/data/policies/emergency-contraception-otc-pharmacy-sale.json";
import primaryCarePhysicianReportData from "@/data/policies/primary-care-physician-function-report-system.json";
import physicianMaldistributionData from "@/data/policies/physician-geographic-maldistribution-rural-mandate.json";
import electronicPrescriptionPlatformData from "@/data/policies/electronic-prescription-medical-dx-platform.json";

import { PolicyTopic } from "@/types/policy";
// 新規追加40政策
import nDivideNMultiplyFamilyTaxData from "@/data/policies/n-divide-n-multiply-family-tax-system.json";
import cryptoSpotEtfListingData from "@/data/policies/crypto-spot-etf-listing-approval.json";
import inheritedLandNationalTreasuryData from "@/data/policies/inherited-land-national-treasury-escheat.json";
import solitaryDeathRentalModelData from "@/data/policies/solitary-death-abandoned-property-rental-model.json";
import confinementPenaltyPrisonReformData from "@/data/policies/confinement-penalty-prison-system-reform.json";
import deathPenaltyAbolitionLifeData from "@/data/policies/death-penalty-abolition-life-without-parole.json";
import illegalOnlineCasinoCrackdownData from "@/data/policies/illegal-online-casino-crackdown-gambling-addiction.json";
import mynaCardIphoneAppleWalletData from "@/data/policies/myna-card-iphone-apple-wallet-integration.json";
import donorConceptionRightToKnowData from "@/data/policies/donor-conception-right-to-know-origins.json";
import niptPrenatalTestingSystemData from "@/data/policies/nipt-prenatal-testing-accreditation-system.json";
import painlessChildbirthEpiduralSubsidyData from "@/data/policies/painless-childbirth-epidural-public-subsidy.json";
import hpvVaccineMaleSubsidyData from "@/data/policies/hpv-vaccine-male-inoculation-subsidy.json";
import pfasDrinkingWaterRegulationData from "@/data/policies/pfas-drinking-water-quality-regulation.json";
import recycledPlasticMandatoryUsageData from "@/data/policies/recycled-plastic-mandatory-usage-circular-economy.json";
import invasiveAlienSpeciesControlData from "@/data/policies/invasive-alien-species-muntjac-crayfish-control.json";
import petEvacuationShelterGuidelinesData from "@/data/policies/pet-evacuation-shelter-guidelines-disaster.json";
import constitutionalAmendmentEmergencyTermData from "@/data/policies/constitutional-amendment-emergency-term-extension.json";
import localAssemblyShortageSideJobData from "@/data/policies/local-assembly-member-shortage-side-job-reform.json";
import furusatoTaxProxyDonationData from "@/data/policies/furusato-tax-proxy-donation-disaster-relief.json";
import sdfPersonnelTreatmentAllowanceData from "@/data/policies/self-defense-forces-personnel-treatment-allowance.json";
import sportsBettingLegalizationData from "@/data/policies/sports-betting-legalization-debate.json";
import pirateSiteIspBlockingData from "@/data/policies/pirate-site-fast-cinema-isp-blocking-debate.json";
import criticalInfraDataCenterDispersionData from "@/data/policies/critical-infrastructure-data-center-rural-dispersion.json";
import missileEvacuationUndergroundShelterData from "@/data/policies/missile-evacuation-underground-shelter-guidelines.json";
import digitalTextbookImplementationData from "@/data/policies/digital-textbook-implementation-paper-coexistence.json";
import childCommissionerAdvocacyBodyData from "@/data/policies/child-commissioner-independent-advocacy-body.json";
import schoolLunchAllergyEpipenData from "@/data/policies/school-lunch-allergy-epipen-standard.json";
import expresswayMidnightTollReformData from "@/data/policies/expressway-midnight-toll-discount-reform.json";
import jrHokkaidoShikokuFreightSupportData from "@/data/policies/jr-hokkaido-shikoku-freight-public-support.json";
import parallelConventionalLinesThirdSectorData from "@/data/policies/parallel-conventional-lines-third-sector-separation.json";
import waterSupplyRegionalizationPppData from "@/data/policies/water-supply-infrastructure-regionalization-ppp.json";
import johkasouDecentralizedSewageData from "@/data/policies/johkasou-decentralized-sewage-transition-subsidy.json";
import localBusJointOperationData from "@/data/policies/local-bus-joint-operation-antimonopoly-exemption.json";
import droneEmergencyMedicalTransportData from "@/data/policies/drone-emergency-medical-transport-remote-islands.json";
import autonomousDeliveryRobotSidewalkData from "@/data/policies/autonomous-delivery-robot-sidewalk-operation.json";
import medicallyFragileChildrenSchoolNursesData from "@/data/policies/medically-fragile-children-support-school-nurses.json";
import femaleBoardMembers30PercentData from "@/data/policies/female-board-members-30-percent-target.json";
import selectiveFourDayWorkweekData from "@/data/policies/selective-four-day-workweek-system-adoption.json";
import sideJobWorkingHoursManagementData from "@/data/policies/side-job-dual-employment-working-hours-management.json";
import nationalArchivesDigitalPreservationData from "@/data/policies/national-archives-digital-preservation-governance.json";


// 第14弾（注目政策40テーマ追加・全260政策）
import nextGenNuclearSmrData from "@/data/policies/next-gen-nuclear-smr-reactors-development.json";
import safSustainableAviationFuelData from "@/data/policies/saf-sustainable-aviation-fuel-domestic-supply-mandate.json";
import gridScaleBatteryMasterplanData from "@/data/policies/grid-scale-battery-storage-power-grid-masterplan.json";
import hydrogenAmmoniaCcsData from "@/data/policies/hydrogen-ammonia-co-firing-ccs-framework.json";
import nuclearFusionEnergyStrategyData from "@/data/policies/nuclear-fusion-energy-national-strategy.json";
import perovskiteSolarMassProductionData from "@/data/policies/perovskite-solar-cells-domestic-mass-production.json";
import solarPanelRecyclingReserveData from "@/data/policies/solar-panel-recycling-reserve-fund-abandonment.json";
import nuclear60YearExtensionGxData from "@/data/policies/nuclear-power-plants-60-year-extension-gx-law.json";
import officialSecurityAssistanceOsaData from "@/data/policies/official-security-assistance-osa-framework.json";
import offerTypeOdaInfrastructureData from "@/data/policies/offer-type-oda-strategic-infrastructure-export.json";
import northernTerritoriesGraveRussiaData from "@/data/policies/northern-territories-grave-visitation-russia-policy.json";
import abductionIssueSummitSanctionsData from "@/data/policies/abduction-issue-summit-talks-north-korea-sanctions.json";
import unSecurityCouncilReformData from "@/data/policies/un-security-council-reform-japan-permanent-seat.json";
import economicCoercionCountermeasuresData from "@/data/policies/economic-coercion-countermeasures-multilateral-framework.json";
import minamitorishimaRareEarthMiningData from "@/data/policies/minamitorishima-rare-earth-deep-sea-mining-trial.json";
import bbnjHighSeasTreatyData from "@/data/policies/bbnj-high-seas-biodiversity-treaty-ratification.json";
import overtourismTwoTierPricingData from "@/data/policies/overtourism-countermeasures-two-tier-pricing-tax.json";
import nationalTreasuresRepairAdmissionData from "@/data/policies/national-treasures-cultural-properties-repair-admission-fees.json";
import animeMangaIpProtectionData from "@/data/policies/anime-manga-overseas-expansion-ip-protection.json";
import historicCastlesHotelStayData from "@/data/policies/historic-castles-temples-hotel-stay-deregulation.json";
import creatorFairRemunerationData from "@/data/policies/cultural-arts-creator-fair-remuneration-guidelines.json";
import smartArenaStadiumReformData from "@/data/policies/smart-arena-stadium-reform-private-finance.json";
import touristTaxFreeRefundSystemData from "@/data/policies/tourist-tax-free-shopping-refund-system-resale-prevention.json";
import traditionalCraftsSuccessorsData from "@/data/policies/traditional-crafts-successors-raw-materials-support.json";
import japanTrenchTsunamiTowerData from "@/data/policies/japan-trench-chishima-trench-earthquake-tsunami-tower.json";
import riverBasinRainwaterStorageData from "@/data/policies/river-basin-disaster-resilience-rainwater-storage-facilities.json";
import buildingSeismicRetrofitBreakerData from "@/data/policies/building-seismic-retrofit-mandatory-earthquake-breaker.json";
import isolatedSettlementsStarlinkData from "@/data/policies/isolated-settlements-satellite-communications-starlink.json";
import sedimentDisasterRedZoneData from "@/data/policies/sediment-disaster-red-zone-development-restriction.json";
import disasterWasteWideAreaDisposalData from "@/data/policies/disaster-waste-wide-area-disposal-temporary-storage.json";
import roadCaveInPreventionAiRadarData from "@/data/policies/road-cave-in-prevention-ai-underground-radar-pipeline.json";
import volcanicDisasterHelmetSheltersData from "@/data/policies/volcanic-disaster-prevention-helmet-evacuation-shelters.json";
import internetVotingStepwiseData from "@/data/policies/internet-voting-overseas-disabled-voters-stepwise.json";
import electionDepositReductionData from "@/data/policies/election-deposit-reduction-youth-political-participation.json";
import dietDissolutionRestrictionData from "@/data/policies/diet-dissolution-power-restriction-cabinet-limits.json";
import convenienceStoreCertificateCloudData from "@/data/policies/convenience-store-certificate-issuance-government-cloud.json";
import politicalPartySubsidiesDisclosureData from "@/data/policies/political-party-subsidies-usage-disclosure-one-yen-receipts.json";
import creditCardFraudCompensationData from "@/data/policies/credit-card-fraud-phishing-victim-compensation-guidelines.json";
import stealthMarketingCrackdownData from "@/data/policies/stealth-marketing-regulation-influencer-crackdown.json";
import civilLitigationDigitalizationECourtData from "@/data/policies/civil-litigation-digitalization-e-court-web-hearings.json";

// 第15弾（注目政策40テーマ追加・全300政策）
import onlineMedicalCareFirstVisitData from "@/data/policies/online-medical-care-first-visit-deregulation.json";
import electronicPrescriptionsRefillData from "@/data/policies/electronic-prescriptions-refill-prescriptions-promotion.json";
import primaryCarePhysicianReportingData from "@/data/policies/primary-care-physician-reporting-system.json";
import designatedIntractableDiseasesGenomeData from "@/data/policies/designated-intractable-diseases-genome-drug-discovery.json";
import ambulanceServiceFeeChargeData from "@/data/policies/ambulance-service-fee-charge-triage.json";
import niptPrenatalTestingGuidelinesData from "@/data/policies/nipt-prenatal-testing-accreditation-guidelines.json";
import hpvVaccineMaleVaccinationData from "@/data/policies/hpv-vaccine-male-vaccination-public-subsidy.json";
import longTermCareCopaymentIncreaseData from "@/data/policies/long-term-care-insurance-copayment-increase-review.json";
import reskillingIndividualSubsidyData from "@/data/policies/reskilling-job-training-individual-subsidy-expansion.json";
import domesticWorkersLaborStandardsData from "@/data/policies/domestic-workers-housekeeping-labor-standards-act.json";
import shortTimeWorkersSocialInsuranceData from "@/data/policies/short-time-workers-social-insurance-expansion-all-firms.json";
import seniorEmploymentAge70MandateData from "@/data/policies/senior-employment-securing-measures-age-70-mandate.json";
import jobHuntingHarassmentProtectionData from "@/data/policies/job-hunting-harassment-student-protection-regulations.json";
import discretionaryLaborScopeExpansionData from "@/data/policies/discretionary-labor-system-scope-expansion-health.json";
import multipleJobHoldersWorkersAccidentData from "@/data/policies/multiple-job-holders-workers-accident-compensation.json";
import resignationAgencyLegalFrameworkData from "@/data/policies/resignation-agency-service-legal-framework-regulation.json";
import foodAgricultureBasicActEmergencyData from "@/data/policies/food-agriculture-rural-basic-act-food-security-emergency.json";
import smartAgriculturePromotionActData from "@/data/policies/smart-agriculture-promotion-act-ai-robot-tractors.json";
import organicFarmingSchoolLunchData from "@/data/policies/organic-farming-expansion-school-lunch-local-produce.json";
import farmlandBankConsolidationData from "@/data/policies/farmland-intermediary-management-bank-consolidation.json";
import totalAllowableCatchTacData from "@/data/policies/total-allowable-catch-tac-marine-resources-management.json";
import forestEnvironmentTaxFundUsageData from "@/data/policies/forest-environment-tax-nationwide-collection-fund-usage.json";
import wildBoarDeerDamageGibierData from "@/data/policies/wild-boar-deer-damage-prevention-gibier-utilization.json";
import plasticResourceCirculationAmenityData from "@/data/policies/plastic-resource-circulation-amenity-fee-expansion.json";
import doctoralStudentsLivingAllowanceData from "@/data/policies/doctoral-students-postdoc-living-allowance-support.json";
import spaceStrategyFundOneTrillionData from "@/data/policies/space-basic-act-one-trillion-yen-space-strategy-fund.json";
import clubActivitiesRegionalTransitionData from "@/data/policies/club-activities-regional-transition-middle-school.json";
import kyutokuhoTeacherSalaryReformData from "@/data/policies/kyutokuho-teacher-salary-special-measures-reform.json";
import schoolLunchCompleteFreeNationwideData from "@/data/policies/school-lunch-complete-free-provision-nationwide.json";
import higherEducationStemPriorityData from "@/data/policies/higher-education-free-tuition-stem-priority-allocation.json";
import specialNeedsInclusiveSupportStaffData from "@/data/policies/special-needs-education-inclusive-education-support-staff.json";
import generativeAiEducationGuidelinesData from "@/data/policies/generative-ai-education-guidelines-school-use.json";
import localAutonomyActNationalDirectiveData from "@/data/policies/local-autonomy-act-revision-national-directive-power.json";
import unmanagedAbandonedHousesTaxRemovalData from "@/data/policies/unmanaged-abandoned-houses-tax-break-removal-enforcement.json";
import level4AutonomousDrivingRuralBusData from "@/data/policies/level-4-autonomous-driving-rural-bus-service.json";
import localRailwayReconstructionBusData from "@/data/policies/local-railway-reconstruction-council-bus-transition.json";
import rideSharingCompleteDeregulationData from "@/data/policies/ride-sharing-complete-deregulation-private-drivers.json";
import tokuryuYamiBaitoCrackdownData from "@/data/policies/tokuryu-yami-baito-crackdown-wiretapping-regulations.json";
import bicycleTrafficViolationBlueTicketData from "@/data/policies/bicycle-traffic-violation-blue-ticket-penalty-system.json";
import activeCyberDefenseLegalFrameworkData from "@/data/policies/active-cyber-defense-legal-framework-national-security.json";

// 登録されている全380政策のリスト
// 第16弾（注目政策40テーマ追加・全340政策）
import smartphoneCompetitionPromotionActData from "@/data/policies/smartphone-competition-promotion-act-app-stores.json";
import nhkInternetDistributionMandatoryData from "@/data/policies/nhk-internet-distribution-mandatory-service-fee.json";
import deepfakeDisinformationElectionData from "@/data/policies/deepfake-disinformation-election-interference-regulation.json";
import onlinePlatformDefamationData from "@/data/policies/online-platform-defamation-countermeasures-act.json";
import residenceCardMynumberCardData from "@/data/policies/residence-card-mynumber-card-unification-act.json";
import droneLevel4UrbanDeliveryData from "@/data/policies/drone-level-4-urban-delivery-deregulation.json";
import foreignStreamingServicesDomesticData from "@/data/policies/foreign-streaming-services-domestic-content-quota.json";
import digitalSalaryPaymentCashlessData from "@/data/policies/digital-salary-payment-cashless-wage-transfer.json";
import cryptoAssetsSeparateDeclarationData from "@/data/policies/crypto-assets-separate-declaration-taxation-reform.json";
import idecoAgeLimitIncrease70Data from "@/data/policies/ideco-age-limit-increase-70-contribution-expansion.json";
import towerMansionTaxLoopholeData from "@/data/policies/tower-mansion-tax-loophole-reform-fairness.json";
import creditCardInterchangeFeeData from "@/data/policies/credit-card-interchange-fee-transparency-disclosure.json";
import globalMinimumTaxMultinationalData from "@/data/policies/global-minimum-tax-multinational-corporations-15-percent.json";
import adultGuardianshipSystemReformData from "@/data/policies/adult-guardianship-system-fundamental-reform-flexibility.json";
import highDenominationBanknotePhaseoutData from "@/data/policies/high-denomination-banknote-phaseout-cashless-promotion.json";
import testamentarySubstituteTrustData from "@/data/policies/testamentary-substitute-trust-single-elderly-affairs.json";
import genderWageGapDisclosureData from "@/data/policies/gender-wage-gap-disclosure-human-capital-reporting.json";
import childcareShortTimeWorkWageData from "@/data/policies/childcare-short-time-work-wage-subsidy-benefit.json";
import corporateSpousalAllowanceReductionData from "@/data/policies/corporate-spousal-allowance-reduction-income-barrier.json";
import jointCustodyCivilCodeRevisionData from "@/data/policies/joint-custody-civil-code-revision-2026-enforcement.json";
import fourDayWorkweekPublicServantsData from "@/data/policies/four-day-workweek-public-servants-wage-levels.json";
import freelanceProtectionNewActData from "@/data/policies/freelance-protection-new-act-fair-transactions.json";
import workingHoursIntervalSystemData from "@/data/policies/working-hours-interval-system-rest-mandate-debate.json";
import customerHarassmentPreventionData from "@/data/policies/customer-harassment-prevention-legislation-employers-duty.json";
import otcAnalogDrugsInsuranceExclusionData from "@/data/policies/otc-analog-drugs-insurance-exclusion-copayment-increase.json";
import dementiaBasicActInclusiveSocietyData from "@/data/policies/dementia-basic-act-inclusive-society-barrier-free-finance.json";
import endOfLifeCareLivingWillData from "@/data/policies/end-of-life-care-living-will-death-with-dignity-legislation.json";
import childAdolescentPsychiatryBedsData from "@/data/policies/child-adolescent-psychiatry-beds-shortage-school-counselors.json";
import welfareRecipientMedicalAssistanceData from "@/data/policies/welfare-recipient-medical-assistance-myna-card-mandate.json";
import hospitalFinancialReportingMandateData from "@/data/policies/hospital-financial-reporting-mandate-bankruptcy-restructuring.json";
import myalgicEncephalomyelitisCfsData from "@/data/policies/myalgic-encephalomyelitis-cfs-disease-recognition-support.json";
import lonelyDeathPreventionHousingData from "@/data/policies/lonely-death-prevention-housing-support-monitoring.json";
import agingCondominiumRebuildingResolutionData from "@/data/policies/aging-condominium-rebuilding-resolution-threshold-easing.json";
import mandatoryEvChargingFacilitiesData from "@/data/policies/mandatory-ev-charging-facilities-new-buildings.json";
import expresswayTollCollectionExtensionData from "@/data/policies/expressway-toll-collection-extension-2115-bridge-aging.json";
import maglevChuoShinkansenDelayData from "@/data/policies/maglev-chuo-shinkansen-delay-shizuoka-water-tunnel.json";
import regionalAirportsConcessionData from "@/data/policies/regional-airports-concession-privatization-security-staff.json";
import geothermalPowerNationalParksData from "@/data/policies/geothermal-power-national-parks-deregulation-hot-springs.json";
import textileWasteFastFashionData from "@/data/policies/textile-waste-fast-fashion-recycling-regulations.json";
import securityClearanceActEconomicData from "@/data/policies/security-clearance-act-economic-security-information-protection.json";

// 第17弾（注目政策40テーマ追加・全380政策）
import integratedElementaryJuniorHighSchoolReformData from "@/data/policies/integrated-elementary-junior-high-school-reform.json";
import publicSchoolTuitionAidExpansionHighSchoolData from "@/data/policies/public-school-tuition-aid-expansion-high-school.json";
import universityScienceHumanitiesConversionSubsidyData from "@/data/policies/university-science-humanities-conversion-subsidy.json";
import integratedSchoolAfterschoolChildcareReformData from "@/data/policies/integrated-school-afterschool-childcare-reform.json";
import schoolSmartphoneBanGuidelinesDigitalDetoxData from "@/data/policies/school-smartphone-ban-guidelines-digital-detox.json";
import studentInternshipDirectRecruitingGuidelinesData from "@/data/policies/student-internship-direct-recruiting-guidelines.json";
import inHospitalClassroomsChronicallyIllChildrenData from "@/data/policies/in-hospital-classrooms-chronically-ill-children.json";
import schoolLunchLocalProcurementOrganicRatioData from "@/data/policies/school-lunch-local-procurement-organic-ratio.json";
import regionalRailwayRestructuringBusConversionData from "@/data/policies/regional-railway-restructuring-bus-conversion.json";
import demandResponsiveTransportAiOnDemandBusData from "@/data/policies/demand-responsive-transport-ai-on-demand-bus.json";
import interPrefecturalExpresswayTollFreeSocialExperimentData from "@/data/policies/inter-prefectural-expressway-toll-free-social-experiment.json";
import seniorCitizenLicenseSurrenderBenefitExpansionData from "@/data/policies/senior-citizen-license-surrender-benefit-expansion.json";
import ruralGasStationMaintenanceSsDepopulationData from "@/data/policies/rural-gas-station-maintenance-ss-depopulation.json";
import waterUtilityRegionalConsolidationAgingPipesData from "@/data/policies/water-utility-regional-consolidation-aging-pipes.json";
import coastalShippingCrewShortageModalShiftData from "@/data/policies/coastal-shipping-crew-shortage-modal-shift.json";
import municipalWasteDisposalPayAsYouThrowBagsData from "@/data/policies/municipal-waste-disposal-pay-as-you-throw-bags.json";
import subscriptionContractCancellationDarkPatternsData from "@/data/policies/subscription-contract-cancellation-dark-patterns.json";
import antiTicketResaleLawReformDynamicPricingData from "@/data/policies/anti-ticket-resale-law-reform-dynamic-pricing.json";
import doorToDoorGoldPurchaseCoolingOffExpansionData from "@/data/policies/door-to-door-gold-purchase-cooling-off-expansion.json";
import installmentSalesActBnplCreditAssessmentData from "@/data/policies/installment-sales-act-bnpl-credit-assessment.json";
import onlineDatingSafetyIdVerificationMandateData from "@/data/policies/online-dating-safety-id-verification-mandate.json";
import stealthMarketingRegulationActEnforcementData from "@/data/policies/stealth-marketing-regulation-act-enforcement.json";
import digitalInheritanceCloudAccountAccessRulesData from "@/data/policies/digital-inheritance-cloud-account-access-rules.json";
import personalInformationProtectionAnonymizationOptoutData from "@/data/policies/personal-information-protection-anonymization-optout.json";
import smartAgriculturePromotionLawRobotTractorsData from "@/data/policies/smart-agriculture-promotion-law-robot-tractors.json";
import foodWasteReductionRetailDiscardPenaltyData from "@/data/policies/food-waste-reduction-retail-discard-penalty.json";
import fisheriesResourceManagementTacSystemReformData from "@/data/policies/fisheries-resource-management-tac-system-reform.json";
import organicFarmingMidoriStrategy25PercentData from "@/data/policies/organic-farming-midori-strategy-25-percent.json";
import abandonedFarmlandConsolidationFarmlandBankData from "@/data/policies/abandoned-farmland-consolidation-farmland-bank.json";
import dairyFarmingFeedPriceStabilizationFundData from "@/data/policies/dairy-farming-feed-price-stabilization-fund.json";
import timberUsagePromotionPublicBuildingsWoodenData from "@/data/policies/timber-usage-promotion-public-buildings-wooden.json";
import wildlifeDamagePreventionGibierUtilizationData from "@/data/policies/wildlife-damage-prevention-gibier-utilization.json";
import anonymousFluidCriminalGroupsTokuryuCountermeasuresData from "@/data/policies/anonymous-fluid-criminal-groups-tokuryu-countermeasures.json";
import evacuationShelterTkbToiletKitchenBedStandardsData from "@/data/policies/evacuation-shelter-t-k-b-toilet-kitchen-bed-standards.json";
import disasterPreventionWeatherInformationLinearRainbandData from "@/data/policies/disaster-prevention-weather-information-linear-rainband.json";
import undergroundUtilityTunnelsPoleFreeUrbanResilienceData from "@/data/policies/underground-utility-tunnels-pole-free-urban-resilience.json";
import isolatedCommunitiesDisasterHelicopterCommunicationData from "@/data/policies/isolated-communities-disaster-helicopter-communication.json";
import abandonedBoatsRemovalPortsCoastalCleanupData from "@/data/policies/abandoned-boats-removal-ports-coastal-cleanup.json";
import civilProtectionSheltersUndergroundStationsData from "@/data/policies/civil-protection-shelters-underground-stations.json";
import floodRiskRealEstateTransactionDisclosureData from "@/data/policies/flood-risk-real-estate-transaction-disclosure.json";

// 第18弾（注目政策50テーマ追加・全430政策）
import abandonedGravesDemolitionTreeBurialCremationRulesData from "@/data/policies/abandoned-graves-demolition-tree-burial-cremation-rules.json";
import autonomousDrivingLevel4PublicRoadLiabilityData from "@/data/policies/autonomous-driving-level-4-public-road-liability.json";
import biometricAuthenticationPaymentsPrivacyGuidelinesData from "@/data/policies/biometric-authentication-payments-privacy-guidelines.json";
import childPovertyPreventionCafeteriaPermanentSubsidiesData from "@/data/policies/child-poverty-prevention-cafeteria-permanent-subsidies.json";
import childcareLeaveNetTakeHomePay100PercentBenefitData from "@/data/policies/childcare-leave-net-take-home-pay-100-percent-benefit.json";
import compactCityLocationOptimizationPlanConsolidationData from "@/data/policies/compact-city-location-optimization-plan-consolidation.json";
import damRedevelopmentPreDischargeFloodControlHydropowerData from "@/data/policies/dam-redevelopment-pre-discharge-flood-control-hydropower.json";
import defenseSupplyChainCyberSecurityStandardSp800Data from "@/data/policies/defense-supply-chain-cyber-security-standard-sp800.json";
import digitalWillSmartphoneBlockchainLegalizationData from "@/data/policies/digital-will-smartphone-blockchain-legalization.json";
import domesticSovereignAiLlmSupercomputerFundData from "@/data/policies/domestic-sovereign-ai-llm-supercomputer-fund.json";
import droneHighwayFlightCorridorsRadioLawReformData from "@/data/policies/drone-highway-flight-corridors-radio-law-reform.json";
import drugLagDrugLossFastTrackApprovalData from "@/data/policies/drug-lag-drug-loss-fast-track-approval.json";
import emergencyCall7119TelephoneTriageNationwideData from "@/data/policies/emergency-call-7119-telephone-triage-nationwide.json";
import floatingOffshoreWindEezOceanRenewableEnergyActData from "@/data/policies/floating-offshore-wind-eez-ocean-renewable-energy-act.json";
import foreignIkuseiShuroTrainingEmploymentSystemReformData from "@/data/policies/foreign-ikusei-shuro-training-employment-system-reform.json";
import forestEnvironmentTransferTaxAllocationFormulaReformData from "@/data/policies/forest-environment-transfer-tax-allocation-formula-reform.json";
import genericDrugSubstitutionIncentiveLongListedCopayData from "@/data/policies/generic-drug-substitution-incentive-long-listed-copay.json";
import heatstrokeSpecialAlertCoolingShelterDesignationData from "@/data/policies/heatstroke-special-alert-cooling-shelter-designation.json";
import infertilityTreatmentAdvancedMedicineCostSubsidyData from "@/data/policies/infertility-treatment-advanced-medicine-cost-subsidy.json";
import jpkiPublicPersonalAuthenticationPrivateApiOpeningData from "@/data/policies/jpki-public-personal-authentication-private-api-opening.json";
import localVitalizingCooperatorEntrepreneurshipSupportData from "@/data/policies/local-vitalizing-cooperator-entrepreneurship-support.json";
import minimumWageNationwideUniformRegionalGapReductionData from "@/data/policies/minimum-wage-nationwide-uniform-regional-gap-reduction.json";
import nankaiTroughEarthquakeExtraAdvisoryPreEvacuationGuidelinesData from "@/data/policies/nankai-trough-earthquake-extra-advisory-pre-evacuation-guidelines.json";
import nationalHealthInsuranceContributionCapIncreaseData from "@/data/policies/national-health-insurance-contribution-cap-increase.json";
import neglectedVacantHousesPropertyTaxReliefRevocationData from "@/data/policies/neglected-vacant-houses-property-tax-relief-revocation.json";
import neighborhoodAssociationJichikaiDigitalizationReformData from "@/data/policies/neighborhood-association-jichikai-digitalization-reform.json";
import newlywedMarriageHousingRelocationSupportSubsidyData from "@/data/policies/newlywed-marriage-housing-relocation-support-subsidy.json";
import nuclearPowerPlantLifespanExtensionOver60YearsData from "@/data/policies/nuclear-power-plant-lifespan-extension-over-60-years.json";
import onlineMedicationGuidanceSameDayDeliveryData from "@/data/policies/online-medication-guidance-same-day-delivery.json";
import partTimeWorkerSocialInsuranceFullCoverageEliminationData from "@/data/policies/part-time-worker-social-insurance-full-coverage-elimination.json";
import postQuantumCryptographyGovernmentMigrationPlanData from "@/data/policies/post-quantum-cryptography-government-migration-plan.json";
import postpartumDepressionMentalHealthCareExpansionData from "@/data/policies/postpartum-depression-mental-health-care-expansion.json";
import presumptionOfPaternityCivilCodeReformUnregisteredData from "@/data/policies/presumption-of-paternity-civil-code-reform-unregistered.json";
import publicNightJuniorHighSchoolPrefectureMandateData from "@/data/policies/public-night-junior-high-school-prefecture-mandate.json";
import refillPrescriptionUtilizationTargetExpansionData from "@/data/policies/refill-prescription-utilization-target-expansion.json";
import regenerativeMedicineIpsCellInsurancePricingData from "@/data/policies/regenerative-medicine-ips-cell-insurance-pricing.json";
import regionalMedicalCoordinationHospitalDownsizingData from "@/data/policies/regional-medical-coordination-hospital-downsizing.json";
import resignationAgentAcceptanceEmployeeFreeExitRightsData from "@/data/policies/resignation-agent-acceptance-employee-free-exit-rights.json";
import sedimentDisasterRedZoneHousingRelocationSubsidiesData from "@/data/policies/sediment-disaster-red-zone-housing-relocation-subsidies.json";
import seniorEmploymentAge70MandateAge75ExtensionData from "@/data/policies/senior-employment-age-70-mandate-age-75-extension.json";
import sewagePipelineAiRobotInspectionSinkholePreventionData from "@/data/policies/sewage-pipeline-ai-robot-inspection-sinkhole-prevention.json";
import specializedPracticalEducationTrainingBenefit80PercentData from "@/data/policies/specialized-practical-education-training-benefit-80-percent.json";
import spotWorkSukimaBaitoLaborProtectionWorkersCompData from "@/data/policies/spot-work-sukima-baito-labor-protection-workers-comp.json";
import submarineCableLandingStationsDecentralizationData from "@/data/policies/submarine-cable-landing-stations-decentralization.json";
import tokyoInlandEarthquakeSkyscraperElevatorEntrapmentMitigationData from "@/data/policies/tokyo-inland-earthquake-skyscraper-elevator-entrapment-mitigation.json";
import truckDriverWaitingTimeDemurrageFeeMandatoryChargeData from "@/data/policies/truck-driver-waiting-time-demurrage-fee-mandatory-charge.json";
import universalDentalCheckupMandatePeriodontalDiseaseData from "@/data/policies/universal-dental-checkup-mandate-periodontal-disease.json";
import voiceCloningDeepfakeFraudPenalCodeCrackdownData from "@/data/policies/voice-cloning-deepfake-fraud-penal-code-crackdown.json";
import wageHikeCorporateTaxCreditDeficitReliefSubsidiesData from "@/data/policies/wage-hike-corporate-tax-credit-deficit-relief-subsidies.json";
import welfareEvacuationSheltersVulnerableDirectAdmissionData from "@/data/policies/welfare-evacuation-shelters-vulnerable-direct-admission.json";

// 第19弾（注目政策50テーマ追加・全480政策）
import academicDegreeFraudPaperMillResearchIntegrityData from "@/data/policies/academic-degree-fraud-paper-mill-research-integrity.json";
import antiMoneyLaunderingCryptoTravelRuleEnforcementData from "@/data/policies/anti-money-laundering-crypto-travel-rule-enforcement.json";
import antiSolicitationCultDonationReliefLawData from "@/data/policies/anti-solicitation-cult-donation-relief-law.json";
import antiStalkerActGpsAttachmentRegulationData from "@/data/policies/anti-stalker-act-gps-attachment-regulation.json";
import autonomousTrainGoa3DriverlessRegionalRailData from "@/data/policies/autonomous-train-goa3-driverless-regional-rail.json";
import bicycleHelmetWearingEffortObligationPenalizationData from "@/data/policies/bicycle-helmet-wearing-effort-obligation-penalization.json";
import carbonBorderAdjustmentMechanismCbamDialogueData from "@/data/policies/carbon-border-adjustment-mechanism-cbam-dialogue.json";
import childMentalHealthSchoolCounselorFullDeploymentData from "@/data/policies/child-mental-health-school-counselor-full-deployment.json";
import childrenAndFamiliesAgencySupportFundSystemData from "@/data/policies/children-and-families-agency-support-fund-system.json";
import cruiseShipPortFacilityCustomsQuarantineDxData from "@/data/policies/cruise-ship-port-facility-customs-quarantine-dx.json";
import culturalPropertyHeritageNftTourismUtilizationData from "@/data/policies/cultural-property-heritage-nft-tourism-utilization.json";
import custodyDisputeJointCustodyCivilCodeRevisionData from "@/data/policies/custody-dispute-joint-custody-civil-code-revision.json";
import darkPartTimeJobBankAccountFreezingFrameworkData from "@/data/policies/dark-part-time-job-bank-account-freezing-framework.json";
import depopulatedAreaDroneMedicalDeliveryAirspaceData from "@/data/policies/depopulated-area-drone-medical-delivery-airspace.json";
import developmentalDisabilityEarlyDetectionSupportActData from "@/data/policies/developmental-disability-early-detection-support-act.json";
import digitalTextbookNationalCurriculumFullRolloutData from "@/data/policies/digital-textbook-national-curriculum-full-rollout.json";
import disabilityPensionIncomeEarningRulesSimplificationData from "@/data/policies/disability-pension-income-earning-rules-simplification.json";
import domesticFertilizerManureCompostUtilizationData from "@/data/policies/domestic-fertilizer-manure-compost-utilization.json";
import economicSecurityPromotionActSupplyChainSubsidiesData from "@/data/policies/economic-security-promotion-act-supply-chain-subsidies.json";
import elderlyFinancialExploitationPreventionTrustData from "@/data/policies/elderly-financial-exploitation-prevention-trust.json";
import electricVehicleUltraFastChargerHighwayMandateData from "@/data/policies/electric-vehicle-ultra-fast-charger-highway-mandate.json";
import extracurricularClubActivitiesRegionalTransitionData from "@/data/policies/extracurricular-club-activities-regional-transition.json";
import fairTradeCommissionFreelanceActEnforcementData from "@/data/policies/fair-trade-commission-freelance-act-enforcement.json";
import flyingCarEvtolCommercialOperationAirSafetyData from "@/data/policies/flying-car-evtol-commercial-operation-air-safety.json";
import halalKosherFoodExportPromotionAgriculturalData from "@/data/policies/halal-kosher-food-export-promotion-agricultural.json";
import japanUsEuCriticalMineralsAgreementData from "@/data/policies/japan-us-eu-critical-minerals-agreement.json";
import medicalDebtGuarantorFreeHospitalAdmissionMandateData from "@/data/policies/medical-debt-guarantor-free-hospital-admission-mandate.json";
import nursingCareStaffWageIncreaseSubsidyExpansionData from "@/data/policies/nursing-care-staff-wage-increase-subsidy-expansion.json";
import orphanYouthCaregiverEmancipationSupportFundData from "@/data/policies/orphan-youth-caregiver-emancipation-support-fund.json";
import overtourismTouristTaxCongestionSurchargeActData from "@/data/policies/overtourism-tourist-tax-congestion-surcharge-act.json";
import patentBoxIntellectualPropertyTaxIncentiveData from "@/data/policies/patent-box-intellectual-property-tax-incentive.json";
import pediatricCancerFertilityPreservationSubsidiesData from "@/data/policies/pediatric-cancer-fertility-preservation-subsidies.json";
import postStrokeRehabilitationInsuranceDurationReformData from "@/data/policies/post-stroke-rehabilitation-insurance-duration-reform.json";
import pyramidSchemeMultilevelMarketingCoolingOffExpansionData from "@/data/policies/pyramid-scheme-multilevel-marketing-cooling-off-expansion.json";
import railwayStationPlatformDoorBarrierFreeMandateData from "@/data/policies/railway-station-platform-door-barrier-free-mandate.json";
import riceProductionAdjustmentGentanPolicyDiversificationData from "@/data/policies/rice-production-adjustment-gentan-policy-diversification.json";
import schoolBullyingSeriousIncidentInvestigationRulesData from "@/data/policies/school-bullying-serious-incident-investigation-rules.json";
import shinkansenFreightExpressCargoModalShiftData from "@/data/policies/shinkansen-freight-express-cargo-modal-shift.json";
import singleParentChildRearingAllowanceIncomeCapEasingData from "@/data/policies/single-parent-child-rearing-allowance-income-cap-easing.json";
import smallBusinessSuccessionMAndAGuidelinesData from "@/data/policies/small-business-succession-m-and-a-guidelines.json";
import specialAdoptionSystemDeregulationChildRightsData from "@/data/policies/special-adoption-system-deregulation-child-rights.json";
import sportsBettingLegalizationSportsPromotionFundData from "@/data/policies/sports-betting-legalization-sports-promotion-fund.json";
import stemFemaleResearcherQuotaUniversitySupportData from "@/data/policies/stem-female-researcher-quota-university-support.json";
import subcontractActPricePassThroughHaulInvestigationData from "@/data/policies/subcontract-act-price-pass-through-haul-investigation.json";
import taxiAppFareDynamicPricingDeregulationData from "@/data/policies/taxi-app-fare-dynamic-pricing-deregulation.json";
import teacherWorkloadReductionSchoolTaskOutsourcingData from "@/data/policies/teacher-workload-reduction-school-task-outsourcing.json";
import trafficAccidentVictimMandatoryInsuranceRecoveryData from "@/data/policies/traffic-accident-victim-mandatory-insurance-recovery.json";
import universityEndowmentFund10TrillionYenSelectionData from "@/data/policies/university-endowment-fund-10-trillion-yen-selection.json";
import victimsSupportFundAndLawyerRepresentationSystemData from "@/data/policies/victims-support-fund-and-lawyer-representation-system.json";
import whistleblowerProtectionActMandatoryComplianceData from "@/data/policies/whistleblower-protection-act-mandatory-compliance.json";

// 記念碑的マイルストーン（注目政策20テーマ追加・全500政策達成）
import agriculturalCorporationForeignOwnershipFarmlandActRulesData from "@/data/policies/agricultural-corporation-foreign-ownership-farmland-act-rules.json";
import criticalSoftwareBillOfMaterialsSbomMandateData from "@/data/policies/critical-software-bill-of-materials-sbom-mandate.json";
import deepSeaRareEarthMiningEnvironmentalFrameworkData from "@/data/policies/deep-sea-rare-earth-mining-environmental-framework.json";
import disasterWasteWideAreaTreatmentPlanMandateData from "@/data/policies/disaster-waste-wide-area-treatment-plan-mandate.json";
import emergencyBloodDroneTransportColdChainGuidelinesData from "@/data/policies/emergency-blood-drone-transport-cold-chain-guidelines.json";
import evBatteryReuseRecycleCircularEcosystemData from "@/data/policies/ev-battery-reuse-recycle-circular-ecosystem.json";
import funeralCremationCapacityShortageCorpseHotelRulesData from "@/data/policies/funeral-cremation-capacity-shortage-corpse-hotel-rules.json";
import governmentExecutiveSecurityClearanceCiaFbiCollaborationData from "@/data/policies/government-executive-security-clearance-cia-fbi-collaboration.json";
import heatIllnessSpecialAlertCoolingShelterDesignationData from "@/data/policies/heat-illness-special-alert-cooling-shelter-designation.json";
import localGovernmentCoreSystemStandardization2025Data from "@/data/policies/local-government-core-system-standardization-2025.json";
import lonelinessAndIsolationCountermeasuresPromotionActData from "@/data/policies/loneliness-and-isolation-countermeasures-promotion-act.json";
import nightEconomyNoiseTransportationDeregulationData from "@/data/policies/night-economy-noise-transportation-deregulation.json";
import pharmacyDxElectronicPrescriptionFullRolloutData from "@/data/policies/pharmacy-dx-electronic-prescription-full-rollout.json";
import publicBathSentoCulturalHeritagePreservationSubsidiesData from "@/data/policies/public-bath-sento-cultural-heritage-preservation-subsidies.json";
import satelliteDirectToCellularEmergencyBroadbandData from "@/data/policies/satellite-direct-to-cellular-emergency-broadband.json";
import shortTimeWorkerSocialInsuranceCompleteElimination50CapData from "@/data/policies/short-time-worker-social-insurance-complete-elimination-50-cap.json";
import smartMeterNextGenerationDynamicDemandResponseData from "@/data/policies/smart-meter-next-generation-dynamic-demand-response.json";
import submarineCableRedundancyLandingStationDecentralizationData from "@/data/policies/submarine-cable-redundancy-landing-station-decentralization.json";
import unoccupiedLandInheritanceStateAttributionReformData from "@/data/policies/unoccupied-land-inheritance-state-attribution-reform.json";
import wildlifeDamageCountermeasuresHuntingLicenseEasingData from "@/data/policies/wildlife-damage-countermeasures-hunting-license-easing.json";

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
  // 第8弾（農業・食料5政策・全105政策）
  riceProductionAdjustmentData as PolicyTopic,
  smartAgriculturePromotionData as PolicyTopic,
  corporateFarmlandOwnershipData as PolicyTopic,
  greenFoodSystemData as PolicyTopic,
  newFarmersSupportData as PolicyTopic,
  // 第9弾（畜産・酪農5政策・全110政策）
  dairyCrisisData as PolicyTopic,
  formulaFeedData as PolicyTopic,
  animalWelfareData as PolicyTopic,
  avianInfluenzaData as PolicyTopic,
  livestockMethaneData as PolicyTopic,
  // 第10弾（工業・製造業10政策・全120政策）
  semiconductorRapidusData as PolicyTopic,
  evBatteryGigafactoryData as PolicyTopic,
  hydrogenSteelData as PolicyTopic,
  economicSecuritySupplyChainData as PolicyTopic,
  subcontractActPricePassData as PolicyTopic,
  defenseIndustryManufacturingData as PolicyTopic,
  industrialRobotSmartFactoryData as PolicyTopic,
  spaceIndustryStrategicFundData as PolicyTopic,
  biomanufacturingShiftData as PolicyTopic,
  criticalMineralsDeepSeaData as PolicyTopic,
  // 第11弾（介護・高齢者福祉10政策・全130政策）
  caregiverWageHikeData as PolicyTopic,
  homeCareCutCrisisData as PolicyTopic,
  mildCareShiftData as PolicyTopic,
  carePlanCopayData as PolicyTopic,
  nursingHomeMultiBedData as PolicyTopic,
  careRobotStaffingData as PolicyTopic,
  caregivingResignationLeaveData as PolicyTopic,
  youngCarerSupportData as PolicyTopic,
  dementiaBasicActData as PolicyTopic,
  foreignCareWorkerData as PolicyTopic,
  // 第12弾（注目政策50テーマ追加・全180政策）
  // バッチ1：エネルギー・環境・水産
  offshoreWindEezData as PolicyTopic,
  renewableCurtailmentData as PolicyTopic,
  highLevelNuclearWasteData as PolicyTopic,
  electricityCapacityMarketData as PolicyTopic,
  perovskiteSolarData as PolicyTopic,
  fisheriesTraceabilityData as PolicyTopic,
  tacFisheryQuotaData as PolicyTopic,
  landBasedAquacultureData as PolicyTopic,
  commercialWhalingData as PolicyTopic,
  marinePlasticGhostGearData as PolicyTopic,
  // バッチ2：観光・地域交通・司法・人権
  inboundTwoTierPricingData as PolicyTopic,
  mtFujiEntryFeeData as PolicyTopic,
  minpaku180DayData as PolicyTopic,
  unprofitableLocalRailData as PolicyTopic,
  regionalAirportConcessionData as PolicyTopic,
  retrialLawReformData as PolicyTopic,
  nonConsensualSexualOffensesData as PolicyTopic,
  genderIdentityReformData as PolicyTopic,
  juvenileActStrictnessData as PolicyTopic,
  tokuryuYamiBaitoData as PolicyTopic,
  // バッチ3：情報通信・AI・住宅・都市防災
  aiSafetyBasicActData as PolicyTopic,
  deepfakeWatermarkOpData as PolicyTopic,
  telecomEmergencyRoamingData as PolicyTopic,
  nhkInternetReceivingFeeData as PolicyTopic,
  youthSmartphoneGamingData as PolicyTopic,
  denseWoodenFirePreventionData as PolicyTopic,
  towerMansionTaxValuationData as PolicyTopic,
  embankmentRegulationActData as PolicyTopic,
  riverBasinDisasterResilienceData as PolicyTopic,
  tokyoMigrationSubsidyData as PolicyTopic,
  // バッチ4：教育・研究・安全保障・防衛
  nationalUnivTuitionHikeData as PolicyTopic,
  worldClassResearchUnivFundData as PolicyTopic,
  elementaryClass35ShortageData as PolicyTopic,
  scholarshipForgivenessData as PolicyTopic,
  truancyFreeSchoolCocoloData as PolicyTopic,
  activeCyberDefenseData as PolicyTopic,
  counterstrikeMissilesData as PolicyTopic,
  defenseEquipmentGcapExportData as PolicyTopic,
  criticalLandUseRegulationData as PolicyTopic,
  coastGuardSdfProtocolData as PolicyTopic,
  // バッチ5：労働市場・税制・医療・公衆衛生
  minimumWage1500YenData as PolicyTopic,
  disabilityEmploymentQuotaData as PolicyTopic,
  spotWorkGigWorkerProtectionData as PolicyTopic,
  wageIncreaseTaxCreditData as PolicyTopic,
  jobBasedHiringGraduatesData as PolicyTopic,
  infectiousDiseaseAgencyData as PolicyTopic,
  emergencyContraceptionOtcData as PolicyTopic,
  primaryCarePhysicianReportData as PolicyTopic,
  physicianMaldistributionData as PolicyTopic,
  electronicPrescriptionPlatformData as PolicyTopic,
  // 新規追加40政策
  nDivideNMultiplyFamilyTaxData as PolicyTopic,
  cryptoSpotEtfListingData as PolicyTopic,
  inheritedLandNationalTreasuryData as PolicyTopic,
  solitaryDeathRentalModelData as PolicyTopic,
  confinementPenaltyPrisonReformData as PolicyTopic,
  deathPenaltyAbolitionLifeData as PolicyTopic,
  illegalOnlineCasinoCrackdownData as PolicyTopic,
  mynaCardIphoneAppleWalletData as PolicyTopic,
  donorConceptionRightToKnowData as PolicyTopic,
  niptPrenatalTestingSystemData as PolicyTopic,
  painlessChildbirthEpiduralSubsidyData as PolicyTopic,
  hpvVaccineMaleSubsidyData as PolicyTopic,
  pfasDrinkingWaterRegulationData as PolicyTopic,
  recycledPlasticMandatoryUsageData as PolicyTopic,
  invasiveAlienSpeciesControlData as PolicyTopic,
  petEvacuationShelterGuidelinesData as PolicyTopic,
  constitutionalAmendmentEmergencyTermData as PolicyTopic,
  localAssemblyShortageSideJobData as PolicyTopic,
  furusatoTaxProxyDonationData as PolicyTopic,
  sdfPersonnelTreatmentAllowanceData as PolicyTopic,
  sportsBettingLegalizationData as PolicyTopic,
  pirateSiteIspBlockingData as PolicyTopic,
  criticalInfraDataCenterDispersionData as PolicyTopic,
  missileEvacuationUndergroundShelterData as PolicyTopic,
  digitalTextbookImplementationData as PolicyTopic,
  childCommissionerAdvocacyBodyData as PolicyTopic,
  schoolLunchAllergyEpipenData as PolicyTopic,
  expresswayMidnightTollReformData as PolicyTopic,
  jrHokkaidoShikokuFreightSupportData as PolicyTopic,
  parallelConventionalLinesThirdSectorData as PolicyTopic,
  waterSupplyRegionalizationPppData as PolicyTopic,
  johkasouDecentralizedSewageData as PolicyTopic,
  localBusJointOperationData as PolicyTopic,
  droneEmergencyMedicalTransportData as PolicyTopic,
  autonomousDeliveryRobotSidewalkData as PolicyTopic,
  medicallyFragileChildrenSchoolNursesData as PolicyTopic,
  femaleBoardMembers30PercentData as PolicyTopic,
  selectiveFourDayWorkweekData as PolicyTopic,
  sideJobWorkingHoursManagementData as PolicyTopic,
  nationalArchivesDigitalPreservationData as PolicyTopic,
  // 第14弾追加40政策
  nextGenNuclearSmrData as PolicyTopic,
  safSustainableAviationFuelData as PolicyTopic,
  gridScaleBatteryMasterplanData as PolicyTopic,
  hydrogenAmmoniaCcsData as PolicyTopic,
  nuclearFusionEnergyStrategyData as PolicyTopic,
  perovskiteSolarMassProductionData as PolicyTopic,
  solarPanelRecyclingReserveData as PolicyTopic,
  nuclear60YearExtensionGxData as PolicyTopic,
  officialSecurityAssistanceOsaData as PolicyTopic,
  offerTypeOdaInfrastructureData as PolicyTopic,
  northernTerritoriesGraveRussiaData as PolicyTopic,
  abductionIssueSummitSanctionsData as PolicyTopic,
  unSecurityCouncilReformData as PolicyTopic,
  economicCoercionCountermeasuresData as PolicyTopic,
  minamitorishimaRareEarthMiningData as PolicyTopic,
  bbnjHighSeasTreatyData as PolicyTopic,
  overtourismTwoTierPricingData as PolicyTopic,
  nationalTreasuresRepairAdmissionData as PolicyTopic,
  animeMangaIpProtectionData as PolicyTopic,
  historicCastlesHotelStayData as PolicyTopic,
  creatorFairRemunerationData as PolicyTopic,
  smartArenaStadiumReformData as PolicyTopic,
  touristTaxFreeRefundSystemData as PolicyTopic,
  traditionalCraftsSuccessorsData as PolicyTopic,
  japanTrenchTsunamiTowerData as PolicyTopic,
  riverBasinRainwaterStorageData as PolicyTopic,
  buildingSeismicRetrofitBreakerData as PolicyTopic,
  isolatedSettlementsStarlinkData as PolicyTopic,
  sedimentDisasterRedZoneData as PolicyTopic,
  disasterWasteWideAreaDisposalData as PolicyTopic,
  roadCaveInPreventionAiRadarData as PolicyTopic,
  volcanicDisasterHelmetSheltersData as PolicyTopic,
  internetVotingStepwiseData as PolicyTopic,
  electionDepositReductionData as PolicyTopic,
  dietDissolutionRestrictionData as PolicyTopic,
  convenienceStoreCertificateCloudData as PolicyTopic,
  politicalPartySubsidiesDisclosureData as PolicyTopic,
  creditCardFraudCompensationData as PolicyTopic,
  stealthMarketingCrackdownData as PolicyTopic,
  civilLitigationDigitalizationECourtData as PolicyTopic,

  // 第15弾（注目政策40テーマ追加・全300政策）
  onlineMedicalCareFirstVisitData as PolicyTopic,
  electronicPrescriptionsRefillData as PolicyTopic,
  primaryCarePhysicianReportingData as PolicyTopic,
  designatedIntractableDiseasesGenomeData as PolicyTopic,
  ambulanceServiceFeeChargeData as PolicyTopic,
  niptPrenatalTestingGuidelinesData as PolicyTopic,
  hpvVaccineMaleVaccinationData as PolicyTopic,
  longTermCareCopaymentIncreaseData as PolicyTopic,
  reskillingIndividualSubsidyData as PolicyTopic,
  domesticWorkersLaborStandardsData as PolicyTopic,
  shortTimeWorkersSocialInsuranceData as PolicyTopic,
  seniorEmploymentAge70MandateData as PolicyTopic,
  jobHuntingHarassmentProtectionData as PolicyTopic,
  discretionaryLaborScopeExpansionData as PolicyTopic,
  multipleJobHoldersWorkersAccidentData as PolicyTopic,
  resignationAgencyLegalFrameworkData as PolicyTopic,
  foodAgricultureBasicActEmergencyData as PolicyTopic,
  smartAgriculturePromotionActData as PolicyTopic,
  organicFarmingSchoolLunchData as PolicyTopic,
  farmlandBankConsolidationData as PolicyTopic,
  totalAllowableCatchTacData as PolicyTopic,
  forestEnvironmentTaxFundUsageData as PolicyTopic,
  wildBoarDeerDamageGibierData as PolicyTopic,
  plasticResourceCirculationAmenityData as PolicyTopic,
  doctoralStudentsLivingAllowanceData as PolicyTopic,
  spaceStrategyFundOneTrillionData as PolicyTopic,
  clubActivitiesRegionalTransitionData as PolicyTopic,
  kyutokuhoTeacherSalaryReformData as PolicyTopic,
  schoolLunchCompleteFreeNationwideData as PolicyTopic,
  higherEducationStemPriorityData as PolicyTopic,
  specialNeedsInclusiveSupportStaffData as PolicyTopic,
  generativeAiEducationGuidelinesData as PolicyTopic,
  localAutonomyActNationalDirectiveData as PolicyTopic,
  unmanagedAbandonedHousesTaxRemovalData as PolicyTopic,
  level4AutonomousDrivingRuralBusData as PolicyTopic,
  localRailwayReconstructionBusData as PolicyTopic,
  rideSharingCompleteDeregulationData as PolicyTopic,
  tokuryuYamiBaitoCrackdownData as PolicyTopic,
  bicycleTrafficViolationBlueTicketData as PolicyTopic,
  activeCyberDefenseLegalFrameworkData as PolicyTopic,

  // 第16弾（注目政策40テーマ追加・全340政策）
  smartphoneCompetitionPromotionActData as PolicyTopic,
  nhkInternetDistributionMandatoryData as PolicyTopic,
  deepfakeDisinformationElectionData as PolicyTopic,
  onlinePlatformDefamationData as PolicyTopic,
  residenceCardMynumberCardData as PolicyTopic,
  droneLevel4UrbanDeliveryData as PolicyTopic,
  foreignStreamingServicesDomesticData as PolicyTopic,
  digitalSalaryPaymentCashlessData as PolicyTopic,
  cryptoAssetsSeparateDeclarationData as PolicyTopic,
  idecoAgeLimitIncrease70Data as PolicyTopic,
  towerMansionTaxLoopholeData as PolicyTopic,
  creditCardInterchangeFeeData as PolicyTopic,
  globalMinimumTaxMultinationalData as PolicyTopic,
  adultGuardianshipSystemReformData as PolicyTopic,
  highDenominationBanknotePhaseoutData as PolicyTopic,
  testamentarySubstituteTrustData as PolicyTopic,
  genderWageGapDisclosureData as PolicyTopic,
  childcareShortTimeWorkWageData as PolicyTopic,
  corporateSpousalAllowanceReductionData as PolicyTopic,
  jointCustodyCivilCodeRevisionData as PolicyTopic,
  fourDayWorkweekPublicServantsData as PolicyTopic,
  freelanceProtectionNewActData as PolicyTopic,
  workingHoursIntervalSystemData as PolicyTopic,
  customerHarassmentPreventionData as PolicyTopic,
  otcAnalogDrugsInsuranceExclusionData as PolicyTopic,
  dementiaBasicActInclusiveSocietyData as PolicyTopic,
  endOfLifeCareLivingWillData as PolicyTopic,
  childAdolescentPsychiatryBedsData as PolicyTopic,
  welfareRecipientMedicalAssistanceData as PolicyTopic,
  hospitalFinancialReportingMandateData as PolicyTopic,
  myalgicEncephalomyelitisCfsData as PolicyTopic,
  lonelyDeathPreventionHousingData as PolicyTopic,
  agingCondominiumRebuildingResolutionData as PolicyTopic,
  mandatoryEvChargingFacilitiesData as PolicyTopic,
  expresswayTollCollectionExtensionData as PolicyTopic,
  maglevChuoShinkansenDelayData as PolicyTopic,
  regionalAirportsConcessionData as PolicyTopic,
  geothermalPowerNationalParksData as PolicyTopic,
  textileWasteFastFashionData as PolicyTopic,
  securityClearanceActEconomicData as PolicyTopic,  // 第17弾（注目政策40テーマ追加・全380政策）
  integratedElementaryJuniorHighSchoolReformData as PolicyTopic,
  publicSchoolTuitionAidExpansionHighSchoolData as PolicyTopic,
  universityScienceHumanitiesConversionSubsidyData as PolicyTopic,
  integratedSchoolAfterschoolChildcareReformData as PolicyTopic,
  schoolSmartphoneBanGuidelinesDigitalDetoxData as PolicyTopic,
  studentInternshipDirectRecruitingGuidelinesData as PolicyTopic,
  inHospitalClassroomsChronicallyIllChildrenData as PolicyTopic,
  schoolLunchLocalProcurementOrganicRatioData as PolicyTopic,
  regionalRailwayRestructuringBusConversionData as PolicyTopic,
  demandResponsiveTransportAiOnDemandBusData as PolicyTopic,
  interPrefecturalExpresswayTollFreeSocialExperimentData as PolicyTopic,
  seniorCitizenLicenseSurrenderBenefitExpansionData as PolicyTopic,
  ruralGasStationMaintenanceSsDepopulationData as PolicyTopic,
  waterUtilityRegionalConsolidationAgingPipesData as PolicyTopic,
  coastalShippingCrewShortageModalShiftData as PolicyTopic,
  municipalWasteDisposalPayAsYouThrowBagsData as PolicyTopic,
  subscriptionContractCancellationDarkPatternsData as PolicyTopic,
  antiTicketResaleLawReformDynamicPricingData as PolicyTopic,
  doorToDoorGoldPurchaseCoolingOffExpansionData as PolicyTopic,
  installmentSalesActBnplCreditAssessmentData as PolicyTopic,
  onlineDatingSafetyIdVerificationMandateData as PolicyTopic,
  stealthMarketingRegulationActEnforcementData as PolicyTopic,
  digitalInheritanceCloudAccountAccessRulesData as PolicyTopic,
  personalInformationProtectionAnonymizationOptoutData as PolicyTopic,
  smartAgriculturePromotionLawRobotTractorsData as PolicyTopic,
  foodWasteReductionRetailDiscardPenaltyData as PolicyTopic,
  fisheriesResourceManagementTacSystemReformData as PolicyTopic,
  organicFarmingMidoriStrategy25PercentData as PolicyTopic,
  abandonedFarmlandConsolidationFarmlandBankData as PolicyTopic,
  dairyFarmingFeedPriceStabilizationFundData as PolicyTopic,
  timberUsagePromotionPublicBuildingsWoodenData as PolicyTopic,
  wildlifeDamagePreventionGibierUtilizationData as PolicyTopic,
  anonymousFluidCriminalGroupsTokuryuCountermeasuresData as PolicyTopic,
  evacuationShelterTkbToiletKitchenBedStandardsData as PolicyTopic,
  disasterPreventionWeatherInformationLinearRainbandData as PolicyTopic,
  undergroundUtilityTunnelsPoleFreeUrbanResilienceData as PolicyTopic,
  isolatedCommunitiesDisasterHelicopterCommunicationData as PolicyTopic,
  abandonedBoatsRemovalPortsCoastalCleanupData as PolicyTopic,
  civilProtectionSheltersUndergroundStationsData as PolicyTopic,
  floodRiskRealEstateTransactionDisclosureData as PolicyTopic,
  // 第18弾（注目政策50テーマ追加・全430政策）
  abandonedGravesDemolitionTreeBurialCremationRulesData as PolicyTopic,
  autonomousDrivingLevel4PublicRoadLiabilityData as PolicyTopic,
  biometricAuthenticationPaymentsPrivacyGuidelinesData as PolicyTopic,
  childPovertyPreventionCafeteriaPermanentSubsidiesData as PolicyTopic,
  childcareLeaveNetTakeHomePay100PercentBenefitData as PolicyTopic,
  compactCityLocationOptimizationPlanConsolidationData as PolicyTopic,
  damRedevelopmentPreDischargeFloodControlHydropowerData as PolicyTopic,
  defenseSupplyChainCyberSecurityStandardSp800Data as PolicyTopic,
  digitalWillSmartphoneBlockchainLegalizationData as PolicyTopic,
  domesticSovereignAiLlmSupercomputerFundData as PolicyTopic,
  droneHighwayFlightCorridorsRadioLawReformData as PolicyTopic,
  drugLagDrugLossFastTrackApprovalData as PolicyTopic,
  emergencyCall7119TelephoneTriageNationwideData as PolicyTopic,
  floatingOffshoreWindEezOceanRenewableEnergyActData as PolicyTopic,
  foreignIkuseiShuroTrainingEmploymentSystemReformData as PolicyTopic,
  forestEnvironmentTransferTaxAllocationFormulaReformData as PolicyTopic,
  genericDrugSubstitutionIncentiveLongListedCopayData as PolicyTopic,
  heatstrokeSpecialAlertCoolingShelterDesignationData as PolicyTopic,
  infertilityTreatmentAdvancedMedicineCostSubsidyData as PolicyTopic,
  jpkiPublicPersonalAuthenticationPrivateApiOpeningData as PolicyTopic,
  localVitalizingCooperatorEntrepreneurshipSupportData as PolicyTopic,
  minimumWageNationwideUniformRegionalGapReductionData as PolicyTopic,
  nankaiTroughEarthquakeExtraAdvisoryPreEvacuationGuidelinesData as PolicyTopic,
  nationalHealthInsuranceContributionCapIncreaseData as PolicyTopic,
  neglectedVacantHousesPropertyTaxReliefRevocationData as PolicyTopic,
  neighborhoodAssociationJichikaiDigitalizationReformData as PolicyTopic,
  newlywedMarriageHousingRelocationSupportSubsidyData as PolicyTopic,
  nuclearPowerPlantLifespanExtensionOver60YearsData as PolicyTopic,
  onlineMedicationGuidanceSameDayDeliveryData as PolicyTopic,
  partTimeWorkerSocialInsuranceFullCoverageEliminationData as PolicyTopic,
  postQuantumCryptographyGovernmentMigrationPlanData as PolicyTopic,
  postpartumDepressionMentalHealthCareExpansionData as PolicyTopic,
  presumptionOfPaternityCivilCodeReformUnregisteredData as PolicyTopic,
  publicNightJuniorHighSchoolPrefectureMandateData as PolicyTopic,
  refillPrescriptionUtilizationTargetExpansionData as PolicyTopic,
  regenerativeMedicineIpsCellInsurancePricingData as PolicyTopic,
  regionalMedicalCoordinationHospitalDownsizingData as PolicyTopic,
  resignationAgentAcceptanceEmployeeFreeExitRightsData as PolicyTopic,
  sedimentDisasterRedZoneHousingRelocationSubsidiesData as PolicyTopic,
  seniorEmploymentAge70MandateAge75ExtensionData as PolicyTopic,
  sewagePipelineAiRobotInspectionSinkholePreventionData as PolicyTopic,
  specializedPracticalEducationTrainingBenefit80PercentData as PolicyTopic,
  spotWorkSukimaBaitoLaborProtectionWorkersCompData as PolicyTopic,
  submarineCableLandingStationsDecentralizationData as PolicyTopic,
  tokyoInlandEarthquakeSkyscraperElevatorEntrapmentMitigationData as PolicyTopic,
  truckDriverWaitingTimeDemurrageFeeMandatoryChargeData as PolicyTopic,
  universalDentalCheckupMandatePeriodontalDiseaseData as PolicyTopic,
  voiceCloningDeepfakeFraudPenalCodeCrackdownData as PolicyTopic,
  wageHikeCorporateTaxCreditDeficitReliefSubsidiesData as PolicyTopic,
  welfareEvacuationSheltersVulnerableDirectAdmissionData as PolicyTopic,
  // 第19弾（注目政策50テーマ追加・全480政策）
  academicDegreeFraudPaperMillResearchIntegrityData as PolicyTopic,
  antiMoneyLaunderingCryptoTravelRuleEnforcementData as PolicyTopic,
  antiSolicitationCultDonationReliefLawData as PolicyTopic,
  antiStalkerActGpsAttachmentRegulationData as PolicyTopic,
  autonomousTrainGoa3DriverlessRegionalRailData as PolicyTopic,
  bicycleHelmetWearingEffortObligationPenalizationData as PolicyTopic,
  carbonBorderAdjustmentMechanismCbamDialogueData as PolicyTopic,
  childMentalHealthSchoolCounselorFullDeploymentData as PolicyTopic,
  childrenAndFamiliesAgencySupportFundSystemData as PolicyTopic,
  cruiseShipPortFacilityCustomsQuarantineDxData as PolicyTopic,
  culturalPropertyHeritageNftTourismUtilizationData as PolicyTopic,
  custodyDisputeJointCustodyCivilCodeRevisionData as PolicyTopic,
  darkPartTimeJobBankAccountFreezingFrameworkData as PolicyTopic,
  depopulatedAreaDroneMedicalDeliveryAirspaceData as PolicyTopic,
  developmentalDisabilityEarlyDetectionSupportActData as PolicyTopic,
  digitalTextbookNationalCurriculumFullRolloutData as PolicyTopic,
  disabilityPensionIncomeEarningRulesSimplificationData as PolicyTopic,
  domesticFertilizerManureCompostUtilizationData as PolicyTopic,
  economicSecurityPromotionActSupplyChainSubsidiesData as PolicyTopic,
  elderlyFinancialExploitationPreventionTrustData as PolicyTopic,
  electricVehicleUltraFastChargerHighwayMandateData as PolicyTopic,
  extracurricularClubActivitiesRegionalTransitionData as PolicyTopic,
  fairTradeCommissionFreelanceActEnforcementData as PolicyTopic,
  flyingCarEvtolCommercialOperationAirSafetyData as PolicyTopic,
  halalKosherFoodExportPromotionAgriculturalData as PolicyTopic,
  japanUsEuCriticalMineralsAgreementData as PolicyTopic,
  medicalDebtGuarantorFreeHospitalAdmissionMandateData as PolicyTopic,
  nursingCareStaffWageIncreaseSubsidyExpansionData as PolicyTopic,
  orphanYouthCaregiverEmancipationSupportFundData as PolicyTopic,
  overtourismTouristTaxCongestionSurchargeActData as PolicyTopic,
  patentBoxIntellectualPropertyTaxIncentiveData as PolicyTopic,
  pediatricCancerFertilityPreservationSubsidiesData as PolicyTopic,
  postStrokeRehabilitationInsuranceDurationReformData as PolicyTopic,
  pyramidSchemeMultilevelMarketingCoolingOffExpansionData as PolicyTopic,
  railwayStationPlatformDoorBarrierFreeMandateData as PolicyTopic,
  riceProductionAdjustmentGentanPolicyDiversificationData as PolicyTopic,
  schoolBullyingSeriousIncidentInvestigationRulesData as PolicyTopic,
  shinkansenFreightExpressCargoModalShiftData as PolicyTopic,
  singleParentChildRearingAllowanceIncomeCapEasingData as PolicyTopic,
  smallBusinessSuccessionMAndAGuidelinesData as PolicyTopic,
  specialAdoptionSystemDeregulationChildRightsData as PolicyTopic,
  sportsBettingLegalizationSportsPromotionFundData as PolicyTopic,
  stemFemaleResearcherQuotaUniversitySupportData as PolicyTopic,
  subcontractActPricePassThroughHaulInvestigationData as PolicyTopic,
  taxiAppFareDynamicPricingDeregulationData as PolicyTopic,
  teacherWorkloadReductionSchoolTaskOutsourcingData as PolicyTopic,
  trafficAccidentVictimMandatoryInsuranceRecoveryData as PolicyTopic,
  universityEndowmentFund10TrillionYenSelectionData as PolicyTopic,
  victimsSupportFundAndLawyerRepresentationSystemData as PolicyTopic,
  whistleblowerProtectionActMandatoryComplianceData as PolicyTopic,
  // 記念碑的マイルストーン（注目政策20テーマ追加・全500政策達成）
  agriculturalCorporationForeignOwnershipFarmlandActRulesData as PolicyTopic,
  criticalSoftwareBillOfMaterialsSbomMandateData as PolicyTopic,
  deepSeaRareEarthMiningEnvironmentalFrameworkData as PolicyTopic,
  disasterWasteWideAreaTreatmentPlanMandateData as PolicyTopic,
  emergencyBloodDroneTransportColdChainGuidelinesData as PolicyTopic,
  evBatteryReuseRecycleCircularEcosystemData as PolicyTopic,
  funeralCremationCapacityShortageCorpseHotelRulesData as PolicyTopic,
  governmentExecutiveSecurityClearanceCiaFbiCollaborationData as PolicyTopic,
  heatIllnessSpecialAlertCoolingShelterDesignationData as PolicyTopic,
  localGovernmentCoreSystemStandardization2025Data as PolicyTopic,
  lonelinessAndIsolationCountermeasuresPromotionActData as PolicyTopic,
  nightEconomyNoiseTransportationDeregulationData as PolicyTopic,
  pharmacyDxElectronicPrescriptionFullRolloutData as PolicyTopic,
  publicBathSentoCulturalHeritagePreservationSubsidiesData as PolicyTopic,
  satelliteDirectToCellularEmergencyBroadbandData as PolicyTopic,
  shortTimeWorkerSocialInsuranceCompleteElimination50CapData as PolicyTopic,
  smartMeterNextGenerationDynamicDemandResponseData as PolicyTopic,
  submarineCableRedundancyLandingStationDecentralizationData as PolicyTopic,
  unoccupiedLandInheritanceStateAttributionReformData as PolicyTopic,
  wildlifeDamageCountermeasuresHuntingLicenseEasingData as PolicyTopic,
];

export function getAllPolicies(): PolicyTopic[] {
  return policies;
}

export function getPolicyById(id: string): PolicyTopic | undefined {
  return policies.find((p) => p.id === id);
}
