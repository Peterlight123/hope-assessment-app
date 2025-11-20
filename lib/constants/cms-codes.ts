/**
 * CMS HOPE v1.01 Constants and Code Definitions
 * Based on official CMS documentation - OMB Control Number 0938-1153
 * 
 * These constants define all valid codes, labels, and options
 * for HOPE assessment forms per CMS specifications
 */

// =============================================================================
// SECTION A: Administrative Information Constants
// =============================================================================

/**
 * A0050 - Type of Record
 */
export const RECORD_TYPES = [
  { value: "1", label: "Add new record" },
  { value: "2", label: "Modify existing record" },
  { value: "3", label: "Inactivate existing record" },
] as const;

/**
 * A0250 - Reason for Record (Assessment Timepoint)
 * Includes hospice-to-hospice transfer codes
 */
export const REASON_FOR_RECORD = [
  { value: "1", label: "Admission (ADM)" },
  { value: "2", label: "HOPE Update Visit 1 (HUV1)" },
  { value: "3", label: "HOPE Update Visit 2 (HUV2)" },
  { value: "4", label: "Transfer to different hospice - planned discharge" },
  { value: "5", label: "Transfer to different hospice - change in ownership" },
  { value: "6", label: "Transfer to different hospice - other" },
  { value: "7", label: "Transfer within same hospice - change in CCN" },
  { value: "8", label: "Transfer within same hospice - change in ownership" },
  { value: "9", label: "Discharge (DC)" },
] as const;

/**
 * A0215 - Site of Service at Admission
 * CMS-defined location codes (Admission only)
 */
export const SITE_OF_SERVICE = [
  { value: "01", label: "Patient's Home/Residence" },
  { value: "02", label: "Assisted Living Facility" },
  {
    value: "03",
    label: "Nursing Long Term Care (LTC) or Non-Skilled Nursing Facility (NF)",
  },
  { value: "04", label: "Skilled Nursing Facility (SNF)" },
  { value: "05", label: "Inpatient Hospital" },
  { value: "06", label: "Inpatient Hospice Facility (General Inpatient (GIP))" },
  { value: "07", label: "Long Term Care Hospital (LTCH)" },
  { value: "08", label: "Inpatient Psychiatric Facility" },
  {
    value: "09",
    label:
      "Hospice Home Care (Routine Home Care (RHC)) Provided in a Hospice Facility",
  },
  { value: "99", label: "Not listed" },
] as const;

/**
 * A0810 - Sex
 */
export const SEX_OPTIONS = [
  { value: "1", label: "Male" },
  { value: "2", label: "Female" },
] as const;

/**
 * A1005 - Ethnicity Options
 * "Check all that apply" - patient's Hispanic/Latino/Spanish origin
 */
export const ETHNICITY_OPTIONS = [
  { value: "A", label: "No, not of Hispanic, Latino/a, or Spanish origin" },
  { value: "B", label: "Yes, Mexican, Mexican American, Chicano/a" },
  { value: "C", label: "Yes, Puerto Rican" },
  { value: "D", label: "Yes, Cuban" },
  { value: "E", label: "Yes, another Hispanic, Latino, or Spanish origin" },
  { value: "X", label: "Patient unable to respond" },
  { value: "Y", label: "Patient declines to respond" },
] as const;

/**
 * A1010 - Race Options
 * "Check all that apply" - patient's race
 */
export const RACE_OPTIONS = [
  { value: "A", label: "White" },
  { value: "B", label: "Black or African American" },
  { value: "C", label: "American Indian or Alaska Native" },
  { value: "D", label: "Asian Indian" },
  { value: "E", label: "Chinese" },
  { value: "F", label: "Filipino" },
  { value: "G", label: "Japanese" },
  { value: "H", label: "Korean" },
  { value: "I", label: "Vietnamese" },
  { value: "J", label: "Other Asian" },
  { value: "K", label: "Native Hawaiian" },
  { value: "L", label: "Guamanian or Chamorro" },
  { value: "M", label: "Samoan" },
  { value: "N", label: "Other Pacific Islander" },
  { value: "X", label: "Patient unable to respond" },
  { value: "Y", label: "Patient declines to respond" },
  { value: "Z", label: "None of the above" },
] as const;

/**
 * A1110B - Interpreter Needed
 */
export const INTERPRETER_NEEDED = [
  { value: "0", label: "No" },
  { value: "1", label: "Yes" },
  { value: "9", label: "Unable to determine" },
] as const;

/**
 * A1400 - Payer Information Options
 * "Check all existing payer sources that apply"
 */
export const PAYER_OPTIONS = [
  { value: "A", label: "Medicare (traditional fee-for-service)" },
  { value: "B", label: "Medicare (managed care/Part C/Medicare Advantage)" },
  { value: "C", label: "Medicaid (traditional fee-for-service)" },
  { value: "D", label: "Medicaid (managed care)" },
  { value: "E", label: "Title V / Other Federal" },
  { value: "F", label: "Workers' Compensation" },
  { value: "G", label: "Other government (e.g., TRICARE, VA, etc.)" },
  { value: "H", label: "Private Insurance/Medigap" },
  { value: "I", label: "Private managed care" },
  { value: "J", label: "Self-pay" },
  { value: "K", label: "No payer source" },
  { value: "X", label: "Unknown" },
  { value: "Y", label: "Other" },
] as const;

// =============================================================================
// SECTION J: Health Conditions Constants
// =============================================================================

/**
 * J0050 - Death is Imminent
 * Life expectancy of 3 days or less?
 */
export const DEATH_IMMINENT_OPTIONS = [
  { value: "0", label: "No" },
  { value: "1", label: "Yes" },
] as const;

/**
 * J2050A - Symptom Impact Screening Completed
 */
export const YES_NO_OPTIONS = [
  { value: "0", label: "No" },
  { value: "1", label: "Yes" },
] as const;

/**
 * J2051 & J2053 - Symptom Impact Levels
 * How patient has been affected by symptoms
 */
export const SYMPTOM_IMPACT_LEVELS = [
  {
    value: "0",
    label: "Not at all – symptom does not affect the patient, including symptoms well-controlled with current treatment",
  },
  { value: "1", label: "Slight" },
  { value: "2", label: "Moderate" },
  { value: "3", label: "Severe" },
  { value: "9", label: "Not applicable (the patient is not experiencing the symptom)" },
] as const;

/**
 * J2051 & J2053 - Symptom Types
 * List of all symptoms to assess
 */
export const SYMPTOM_TYPES = [
  { key: "A", label: "Pain" },
  { key: "B", label: "Shortness of breath" },
  { key: "C", label: "Anxiety" },
  { key: "D", label: "Nausea" },
  { key: "E", label: "Vomiting" },
  { key: "F", label: "Diarrhea" },
  { key: "G", label: "Constipation" },
  { key: "H", label: "Agitation" },
] as const;

/**
 * J2052C - Reason SFV Not Completed
 * If Symptom Follow-up Visit was not completed
 */
export const SFV_NOT_COMPLETED_REASONS = [
  { value: "1", label: "Patient and/or caregiver declined an in-person visit" },
  {
    value: "2",
    label:
      "Patient unavailable (e.g., in ED, hospital, travel outside of service area, expired)",
  },
  {
    value: "3",
    label: "Attempts to contact patient and/or caregiver were unsuccessful",
  },
  { value: "9", label: "None of the above" },
] as const;

// =============================================================================
// SECTION M: Skin Conditions Constants
// =============================================================================

/**
 * M1190 - Has Skin Conditions
 */
export const HAS_SKIN_CONDITIONS = [
  { value: "0", label: "No" },
  { value: "1", label: "Yes" },
] as const;

/**
 * M1195 - Types of Skin Conditions
 * "Check all that apply"
 */
export const SKIN_CONDITION_TYPES = [
  { value: "A", label: "Diabetic foot ulcer(s)" },
  {
    value: "B",
    label:
      "Open lesion(s) other than ulcers, rash, or skin tear (cancer lesions)",
  },
  { value: "C", label: "Pressure Ulcer(s)/Injuries" },
  { value: "D", label: "Rash(es)" },
  { value: "E", label: "Skin tear(s)" },
  { value: "F", label: "Surgical wound(s)" },
  {
    value: "G",
    label:
      "Ulcers other than diabetic or pressure ulcers (e.g., venous stasis ulcer, Kennedy ulcer)",
  },
  {
    value: "H",
    label:
      "Moisture Associated Skin Damage (MASD) (e.g., incontinence-associated dermatitis [IAD], perspiration, drainage)",
  },
  { value: "Y", label: "Other specified condition" },
  { value: "Z", label: "None of the above were present" },
] as const;

/**
 * M1200 - Skin and Ulcer/Injury Treatments
 * "Check all that apply"
 */
export const SKIN_TREATMENTS = [
  { value: "A", label: "Pressure reducing device for chair" },
  { value: "B", label: "Pressure reducing device for bed" },
  { value: "C", label: "Turning/repositioning program" },
  {
    value: "D",
    label: "Nutrition or hydration intervention to manage skin problems",
  },
  { value: "E", label: "Pressure ulcer/injury care" },
  { value: "F", label: "Surgical wound care" },
  {
    value: "G",
    label:
      "Application of nonsurgical dressings (with or without topical medications) other than to feet",
  },
  {
    value: "H",
    label: "Application of ointments/medications other than to feet",
  },
  {
    value: "I",
    label: "Application of dressings to feet (with or without topical medications)",
  },
  { value: "J", label: "Incontinence Management" },
  { value: "Z", label: "None of the above were provided" },
] as const;

// =============================================================================
// SECTION N: Medications Constants
// =============================================================================

/**
 * N0500A, N0510A - Opioid Initiated or Continued
 */
export const OPIOID_INITIATED = [
  { value: "0", label: "No" },
  { value: "1", label: "Yes" },
] as const;

/**
 * N0520A - Bowel Regimen Initiated or Continued
 */
export const BOWEL_REGIMEN_OPTIONS = [
  { value: "0", label: "No" },
  {
    value: "1",
    label: "No, but there is documentation of why a bowel regimen was not initiated or continued",
  },
  { value: "2", label: "Yes" },
] as const;

// =============================================================================
// Guidance Text for CMS Business Logic
// =============================================================================

/**
 * Skip pattern instructions from HOPE Guidance Manual
 * These define conditional logic for form navigation and data validation
 * Complete implementation guide for developers building the conditional logic
 */
export const SKIP_PATTERNS = {
  // =========================================================================
  // Section J - Health Conditions Skip Patterns
  // =========================================================================
  
  // J2050 - Symptom Impact Screening
  J2050_A_NO: {
    rule: "If J2050.A = 0 (No)",
    action: "Skip J2051, J2052, J2053 and proceed to M1190 Skin Conditions",
    implementation: "Hide J2051, J2052, J2053 sections when J2050.A != 1"
  },
  J2050_A_YES: {
    rule: "If J2050.A = 1 (Yes)",
    action: "Complete J2050.B (date) and proceed to J2051",
    implementation: "Show date picker for J2050.B, then display J2051"
  },
  J2050_B_TIMING: {
    rule: "J2050.B date validation",
    action: "Symptom Impact Screening must occur within appropriate clinical timeframe",
    implementation: "Validate J2050.B is not future date and is within assessment period"
  },

  // J2051 - Symptom Impact Assessment
  J2051_COMPLETE_ALL: {
    rule: "All J2051 items (A through H) must be answered if J2050.A = 1",
    action: "Require response for all 8 symptom types",
    implementation: "All J2051 fields required when visible"
  },
  J2051_MODERATE_SEVERE_TRIGGER: {
    rule: "If ANY J2051 response is 2 (Moderate) or 3 (Severe)",
    action: "J2052 Symptom Follow-up Visit section becomes required",
    implementation: "Show J2052 if any J2051.A-H value is '2' or '3'"
  },
  J2051_NO_MODERATE_SEVERE: {
    rule: "If NO J2051 responses are Moderate (2) or Severe (3)",
    action: "Skip J2052 and J2053, proceed to M1190",
    implementation: "Hide J2052 and J2053 if all J2051.A-H values are '0', '1', or '9'"
  },

  // J2052 - Symptom Follow-up Visit (SFV)
  J2052_A_YES: {
    rule: "If J2052.A = 1 (Yes - SFV completed)",
    action: "Complete J2052.B (date) and skip to J2053 SFV Symptom Impact",
    implementation: "Show J2052.B date picker, hide J2052.C, show J2053"
  },
  J2052_A_NO: {
    rule: "If J2052.A = 0 (No - SFV not completed)",
    action: "Complete J2052.C (reason) and skip J2053, proceed to M1190",
    implementation: "Show J2052.C dropdown, hide J2052.B and J2053"
  },
  J2052_B_TIMING: {
    rule: "J2052.B SFV must occur within 2 calendar days",
    action: "In-person SFV should occur within 2 calendar days of J2050.B",
    implementation: "Validate J2052.B is within 2 days after J2050.B, warn if not"
  },

  // J2053 - SFV Symptom Impact
  J2053_ONLY_IF_SFV: {
    rule: "J2053 only appears if J2052.A = 1",
    action: "Complete all J2053 items (A through H)",
    implementation: "J2053 visible and required only when J2052.A = '1'"
  },

  // =========================================================================
  // Section M - Skin Conditions Skip Patterns
  // =========================================================================
  
  M1190_NO: {
    rule: "If M1190 = 0 (No skin conditions)",
    action: "Skip M1195 and M1200, proceed to N0500 Scheduled Opioid",
    implementation: "Hide M1195 and M1200 when M1190 != '1'"
  },
  M1190_YES: {
    rule: "If M1190 = 1 (Has skin conditions)",
    action: "Complete M1195 (types) and M1200 (treatments)",
    implementation: "Show and require M1195 and M1200 when M1190 = '1'"
  },
  M1195_NONE_EXCLUSIVE: {
    rule: "M1195.Z 'None of the above' is mutually exclusive",
    action: "If Z selected, all other checkboxes must be unchecked",
    implementation: "When M1195.Z = true, set all other M1195 values to false and vice versa"
  },
  M1200_NONE_EXCLUSIVE: {
    rule: "M1200.Z 'None of the above' is mutually exclusive",
    action: "If Z selected, all other treatment checkboxes must be unchecked",
    implementation: "When M1200.Z = true, set all other M1200 values to false and vice versa"
  },

  // =========================================================================
  // Section N - Medications Skip Patterns
  // =========================================================================
  
  // N0500 - Scheduled Opioid
  N0500_A_NO: {
    rule: "If N0500.A = 0 (No scheduled opioid)",
    action: "Skip N0500.B and proceed to N0510 PRN Opioid",
    implementation: "Hide N0500.B when N0500.A != '1'"
  },
  N0500_A_YES: {
    rule: "If N0500.A = 1 (Scheduled opioid initiated/continued)",
    action: "Complete N0500.B (date) and note that N0520 becomes required",
    implementation: "Show N0500.B date picker when N0500.A = '1'"
  },

  // N0510 - PRN Opioid
  N0510_A_NO: {
    rule: "If N0510.A = 0 (No PRN opioid)",
    action: "Skip N0510.B, check if N0520 is required based on N0500.A",
    implementation: "Hide N0510.B when N0510.A != '1'"
  },
  N0510_A_YES: {
    rule: "If N0510.A = 1 (PRN opioid initiated/continued)",
    action: "Complete N0510.B (date) and note that N0520 becomes required",
    implementation: "Show N0510.B date picker when N0510.A = '1'"
  },

  // N0520 - Bowel Regimen (Conditional Section)
  N0520_REQUIRED: {
    rule: "N0520 is REQUIRED only if N0500.A = 1 OR N0510.A = 1",
    action: "If either scheduled or PRN opioid = Yes, bowel regimen section must be completed",
    implementation: "Show N0520 only when N0500.A = '1' OR N0510.A = '1'"
  },
  N0520_NOT_REQUIRED: {
    rule: "If both N0500.A = 0 AND N0510.A = 0",
    action: "Skip N0520 entirely, proceed to Z0350",
    implementation: "Hide entire N0520 section when both N0500.A = '0' AND N0510.A = '0'"
  },
  N0520_A_NO: {
    rule: "If N0520.A = 0 (No bowel regimen)",
    action: "Skip N0520.B, proceed to Z0350",
    implementation: "Hide N0520.B when N0520.A != '2'"
  },
  N0520_A_DOCUMENTED: {
    rule: "If N0520.A = 1 (No, but documented why not)",
    action: "Skip N0520.B, proceed to Z0350",
    implementation: "Hide N0520.B when N0520.A = '1', documentation tracked elsewhere"
  },
  N0520_A_YES: {
    rule: "If N0520.A = 2 (Yes, bowel regimen initiated/continued)",
    action: "Complete N0520.B (date) before proceeding to Z0350",
    implementation: "Show N0520.B date picker when N0520.A = '2'"
  },

  // =========================================================================
  // General Validation Rules
  // =========================================================================
  
  DATE_RELATIONSHIPS: {
    rule: "All assessment dates must maintain logical relationships",
    action: "Validate: A0220 (Admission) <= J2050.B (Screening) <= J2052.B (SFV) <= Z0350 (Completion)",
    implementation: "Cross-validate all date fields for chronological consistency"
  },
  CHECKBOX_VALIDATION: {
    rule: "All 'Check all that apply' fields must have at least one selection",
    action: "Sections with checkboxes require minimum one checked item",
    implementation: "Validate checkbox groups have at least one true value"
  },
} as const;

/**
 * CMS validation rules and constraints
 */
export const VALIDATION_RULES = {
  NPI_LENGTH: 10, // National Provider Identifier must be 10 digits
  CCN_LENGTH: 6, // CMS Certification Number must be 6 characters
  SSN_FORMAT: "XXX-XX-XXXX", // Social Security Number format
  DATE_FORMAT: "YYYY-MM-DD", // Standard date format for all date fields
  MAX_SIGNATURES: 12, // Maximum number of signatures in Z0400 (A through L)
} as const;

/**
 * HOPE form section titles and descriptions
 */
export const SECTION_INFO = {
  A: {
    title: "Section A - Administrative Information",
    description: "Provider numbers, patient demographics, and payer information",
  },
  J: {
    title: "Section J - Health Conditions",
    description: "Death imminence assessment and symptom impact screening",
  },
  M: {
    title: "Section M - Skin Conditions",
    description: "Skin condition types and treatment interventions",
  },
  N: {
    title: "Section N - Medications",
    description: "Opioid management and bowel regimen tracking",
  },
  Z: {
    title: "Section Z - Record Administration",
    description: "Assessment completion date and clinician signatures",
  },
} as const;
