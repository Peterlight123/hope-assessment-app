/**
 * HOPE (Hospice Outcomes and Patient Evaluation) v1.01 Type Definitions
 * Based on CMS documentation - OMB Control Number 0938-1153
 * 
 * These types define the structure for all HOPE assessment forms across three timepoints:
 * - Admission (ADM)
 * - HOPE Update Visit (HUV1, HUV2)
 * - Discharge (DC)
 */

// =============================================================================
// SECTION A: Administrative Information
// =============================================================================

/**
 * A0050 - Type of Record
 * Indicates whether this is a new record, modification, or inactivation
 */
export type RecordType = "1" | "2" | "3"; // 1=Add new, 2=Modify existing, 3=Inactivate existing

/**
 * A0250 - Reason for Record
 * Identifies the timepoint/purpose of the assessment
 * Includes transfer codes for hospice-to-hospice transfers
 */
export type ReasonForRecord = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"; 
// 1=ADM, 2=HUV1, 3=HUV2, 4-8=Transfer codes, 9=DC

/**
 * A0215 - Site of Service at Admission
 * CMS-defined codes for patient location (Admission only)
 */
export type SiteOfService =
  | "01" // Patient's Home/Residence
  | "02" // Assisted Living Facility
  | "03" // Nursing Long Term Care (LTC) or Non-Skilled Nursing Facility (NF)
  | "04" // Skilled Nursing Facility (SNF)
  | "05" // Inpatient Hospital
  | "06" // Inpatient Hospice Facility (General Inpatient (GIP))
  | "07" // Long Term Care Hospital (LTCH)
  | "08" // Inpatient Psychiatric Facility
  | "09" // Hospice Home Care (Routine Home Care (RHC)) Provided in a Hospice Facility
  | "99"; // Not listed

/**
 * A0810 - Sex
 */
export type Sex = "1" | "2"; // 1=Male, 2=Female

/**
 * A1005 - Ethnicity
 * Check all that apply - patient's Hispanic/Latino/Spanish origin
 */
export interface Ethnicity {
  A: boolean; // No, not of Hispanic, Latino/a, or Spanish origin
  B: boolean; // Yes, Mexican, Mexican American, Chicano/a
  C: boolean; // Yes, Puerto Rican
  D: boolean; // Yes, Cuban
  E: boolean; // Yes, another Hispanic, Latino, or Spanish origin
  X: boolean; // Patient unable to respond
  Y: boolean; // Patient declines to respond
}

/**
 * A1010 - Race
 * Check all that apply - patient's race
 */
export interface Race {
  A: boolean; // White
  B: boolean; // Black or African American
  C: boolean; // American Indian or Alaska Native
  D: boolean; // Asian Indian
  E: boolean; // Chinese
  F: boolean; // Filipino
  G: boolean; // Japanese
  H: boolean; // Korean
  I: boolean; // Vietnamese
  J: boolean; // Other Asian
  K: boolean; // Native Hawaiian
  L: boolean; // Guamanian or Chamorro
  M: boolean; // Samoan
  N: boolean; // Other Pacific Islander
  X: boolean; // Patient unable to respond
  Y: boolean; // Patient declines to respond
  Z: boolean; // None of the above
}

/**
 * A1110 - Language
 * Patient's preferred language and interpreter needs
 */
export interface Language {
  A: string; // Preferred language (free text)
  B: "0" | "1" | "9"; // Need interpreter? 0=No, 1=Yes, 9=Unable to determine
}

/**
 * A1400 - Payer Information
 * Check all existing payer sources that apply
 */
export interface PayerInformation {
  A: boolean; // Medicare (traditional fee-for-service)
  B: boolean; // Medicare (managed care/Part C/Medicare Advantage)
  C: boolean; // Medicaid (traditional fee-for-service)
  D: boolean; // Medicaid (managed care)
  E: boolean; // Title V / Other Federal
  F: boolean; // Workers' Compensation
  G: boolean; // Other government (e.g., TRICARE, VA, etc.)
  H: boolean; // Private Insurance/Medigap
  I: boolean; // Private managed care
  J: boolean; // Self-pay
  K: boolean; // No payer source
  X: boolean; // Unknown
  Y: boolean; // Other
}

/**
 * Section A - Administrative Information
 * Common fields across all assessment timepoints
 */
export interface SectionA {
  A0050: RecordType;
  A0100_A: string; // National Provider Identifier (NPI)
  A0100_B: string; // CMS Certification Number (CCN)
  A0100_C?: string; // Branch ID (if applicable)
  A0200?: string; // State
  A0220: string; // Admission Date (YYYY-MM-DD)
  A0220_C?: string; // Assessment Reference Date (YYYY-MM-DD)
  A0250: ReasonForRecord;
  A0320_B?: string; // Patient ID
  A0500_A: string; // First name
  A0500_B: string; // Middle initial
  A0500_C: string; // Last name
  A0500_D: string; // Suffix
  A0600_A: string; // Social Security Number
  A0600_B: string; // Medicare Number
  A0700: string; // Medicaid Number ('+' if pending, 'N' if not recipient)
  A0810: Sex;
  A0900: string; // Birth Date (YYYY-MM-DD)
  A1400: PayerInformation;
}

/**
 * Section A for Admission - includes additional required fields
 * Note: CMS requires A0215, A1005, A1010, A1110 for admission packets
 */
export interface SectionA_Admission extends SectionA {
  A0205?: string; // Admission Start Date from prior hospice (for transfers)
  A0215: SiteOfService; // Site of Service at Admission (REQUIRED for admission)
  A0998?: string; // Hospice Diagnosis - Primary Terminal Diagnosis (free text)
  A1005: Ethnicity; // Ethnicity (REQUIRED for admission)
  A1010: Race; // Race (REQUIRED for admission)
  A1110: Language; // Language (REQUIRED for admission)
  A1805?: string; // Admitted From (location code)
}

// =============================================================================
// SECTION J: Health Conditions
// =============================================================================

/**
 * J0050 - Death is Imminent
 * Does patient appear to have life expectancy of 3 days or less?
 */
export type DeathImminent = "0" | "1"; // 0=No, 1=Yes

/**
 * J2051 & J2053 - Symptom Impact levels
 * 0=Not at all, 1=Slight, 2=Moderate, 3=Severe, 9=Not applicable
 */
export type SymptomImpact = "0" | "1" | "2" | "3" | "9";

/**
 * J2051 - Symptom Impact Assessment
 * How patient has been affected by symptoms over past 2 days
 */
export interface SymptomImpactAssessment {
  A: SymptomImpact; // Pain
  B: SymptomImpact; // Shortness of breath
  C: SymptomImpact; // Anxiety
  D: SymptomImpact; // Nausea
  E: SymptomImpact; // Vomiting
  F: SymptomImpact; // Diarrhea
  G: SymptomImpact; // Constipation
  H: SymptomImpact; // Agitation
}

/**
 * J2052 - Symptom Follow-up Visit (SFV)
 * Required if any J2051 response is Moderate (2) or Severe (3)
 * In-person SFV should occur within 2 calendar days
 */
export interface SymptomFollowUpVisit {
  A: "0" | "1"; // Was SFV completed? 0=No, 1=Yes
  B?: string; // Date of SFV (YYYY-MM-DD) - if A=1
  C?: "1" | "2" | "3" | "9"; // Reason SFV not completed - if A=0
  // C options: 1=Patient/caregiver declined, 2=Patient unavailable, 3=Contact unsuccessful, 9=None of above
}

/**
 * J2053 - SFV Symptom Impact
 * Symptom assessment during follow-up visit
 */
export type SFVSymptomImpact = SymptomImpactAssessment;

/**
 * J2050 - Symptom Impact Screening
 */
export interface SymptomImpactScreening {
  A: "0" | "1"; // Was screening completed? 0=No, 1=Yes
  B?: string; // Date of screening (YYYY-MM-DD) - if A=1
}

/**
 * Section J - Health Conditions
 */
export interface SectionJ {
  J0050: DeathImminent;
  J2050: SymptomImpactScreening;
  J2051?: SymptomImpactAssessment; // If J2050.A = 1
  J2052?: SymptomFollowUpVisit; // If any J2051 value is 2 or 3
  J2053?: SFVSymptomImpact; // If J2052.A = 1
}

// =============================================================================
// SECTION M: Skin Conditions
// =============================================================================

/**
 * M1190 - Skin Conditions
 * Does patient have one or more skin conditions?
 */
export type HasSkinConditions = "0" | "1"; // 0=No, 1=Yes

/**
 * M1195 - Types of Skin Conditions
 * Check all that apply
 */
export interface SkinConditionTypes {
  A: boolean; // Diabetic foot ulcer(s)
  B: boolean; // Open lesion(s) other than ulcers, rash, or skin tear (cancer lesions)
  C: boolean; // Pressure Ulcer(s)/Injuries
  D: boolean; // Rash(es)
  E: boolean; // Skin tear(s)
  F: boolean; // Surgical wound(s)
  G: boolean; // Ulcers other than diabetic or pressure ulcers
  H: boolean; // Moisture Associated Skin Damage (MASD)
  Y: boolean; // Other specified condition
  Z: boolean; // None of the above were present
}

/**
 * M1200 - Skin and Ulcer/Injury Treatments
 * Check all interventions/treatments in place at time of assessment
 */
export interface SkinTreatments {
  A: boolean; // Pressure reducing device for chair
  B: boolean; // Pressure reducing device for bed
  C: boolean; // Turning/repositioning program
  D: boolean; // Nutrition or hydration intervention to manage skin problems
  E: boolean; // Pressure ulcer/injury care
  F: boolean; // Surgical wound care
  G: boolean; // Application of nonsurgical dressings (not feet)
  H: boolean; // Application of ointments/medications (not feet)
  I: boolean; // Application of dressings to feet
  J: boolean; // Incontinence Management
  Z: boolean; // None of the above were provided
}

/**
 * Section M - Skin Conditions
 */
export interface SectionM {
  M1190: HasSkinConditions;
  M1195?: SkinConditionTypes; // If M1190 = 1
  M1200?: SkinTreatments; // If M1190 = 1
}

// =============================================================================
// SECTION N: Medications
// =============================================================================

/**
 * N0500 - Scheduled Opioid
 */
export interface ScheduledOpioid {
  A: "0" | "1"; // Was scheduled opioid initiated or continued? 0=No, 1=Yes
  B?: string; // Date initiated/continued (YYYY-MM-DD) - if A=1
}

/**
 * N0510 - PRN Opioid
 */
export interface PRNOpioid {
  A: "0" | "1"; // Was PRN opioid initiated or continued? 0=No, 1=Yes
  B?: string; // Date initiated/continued (YYYY-MM-DD) - if A=1
}

/**
 * N0520 - Bowel Regimen
 * Complete only if N0500.A or N0510.A = 1
 */
export interface BowelRegimen {
  A: "0" | "1" | "2"; // 0=No, 1=No but documented why not, 2=Yes
  B?: string; // Date initiated/continued (YYYY-MM-DD) - if A=2 (Note: Label shows 'A' but should be 'B')
}

/**
 * Section N - Medications
 */
export interface SectionN {
  N0500: ScheduledOpioid;
  N0510: PRNOpioid;
  N0520?: BowelRegimen; // Required if N0500.A=1 or N0510.A=1
}

// =============================================================================
// SECTION Z: Record Administration
// =============================================================================

/**
 * Z0400 - Signature(s) of Person(s) Completing the Record
 * Multiple clinicians can sign for different sections
 */
export interface Signature {
  signature: string;
  title: string;
  sections: string; // Which sections completed
  date: string; // Date section completed (YYYY-MM-DD)
}

/**
 * Z0500 - Signature of Person Verifying Record Completion
 */
export interface VerificationSignature {
  A: string; // Signature
  B: string; // Date (YYYY-MM-DD)
}

/**
 * Section Z - Record Administration
 */
export interface SectionZ {
  Z0350: string; // Date Assessment Completed (YYYY-MM-DD)
  Z0400: Signature[]; // Array of signatures (A through L, up to 12)
  Z0500: VerificationSignature;
}

// =============================================================================
// Complete HOPE Forms
// =============================================================================

/**
 * HOPE Admission (ADM) Assessment
 * Complete form for admission timepoint
 */
export interface HOPEAdmissionForm {
  sectionA: SectionA_Admission;
  sectionJ: SectionJ;
  sectionM: SectionM;
  sectionN: SectionN;
  sectionZ: SectionZ;
}

/**
 * HOPE Update Visit (HUV) Assessment
 * Simpler form for update visits (HUV1, HUV2)
 */
export interface HOPEUpdateVisitForm {
  sectionA: SectionA; // No additional admission fields
  sectionJ: SectionJ;
  sectionM: SectionM;
  sectionN: SectionN;
  sectionZ: SectionZ;
}

/**
 * HOPE Discharge (DC) Assessment
 */
export interface HOPEDischargeForm {
  sectionA: SectionA;
  sectionJ: SectionJ;
  sectionM: SectionM;
  sectionN: SectionN;
  sectionZ: SectionZ;
}

/**
 * Union type for any HOPE form
 */
export type HOPEForm = HOPEAdmissionForm | HOPEUpdateVisitForm | HOPEDischargeForm;

/**
 * Form submission status for tracking
 */
export type FormStatus = "draft" | "in-progress" | "pending-review" | "completed" | "submitted";

/**
 * Complete form metadata
 */
export interface HOPEFormMetadata {
  id: string;
  formType: ReasonForRecord;
  patientId: string;
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
  lastSavedAt?: string;
  submittedAt?: string;
}

/**
 * Complete HOPE form with metadata
 */
export interface CompleteHOPEForm {
  metadata: HOPEFormMetadata;
  data: HOPEForm;
}
