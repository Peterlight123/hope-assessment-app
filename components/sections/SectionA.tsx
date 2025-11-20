/**
 * Section A - Administrative Information
 * 
 * CMS HOPE v1.01 Section A includes:
 * - Provider identification (Branch ID, State, County)
 * - Assessment metadata (Reference Date, Reason for Record)
 * - Patient identification and demographics
 * - Payer information
 * - Admission-only fields (Site of Service, Ethnicity, Race, Interpreter)
 * 
 * CONDITIONAL LOGIC:
 * - Fields A0215, A1005, A1010, A1110 appear ONLY on Admission (A0250 = "1")
 * - All other fields appear on all assessment types
 * 
 * BACKEND INTEGRATION NOTES:
 * - This section submits to: POST /api/hope/assessments/section-a
 * - Expected payload format matches SectionA_Admission or SectionA type
 * - Admission assessments include additional required demographics
 * - All fields except optional ones are required per CMS specification
 * - Validate CCN format (6 chars), Branch ID (10 chars), State (2 chars)
 * 
 * WCAG 2.1 AA COMPLIANCE:
 * - All form fields have proper labels and descriptions
 * - Required fields clearly indicated
 * - Error messages announced to screen readers
 * - Keyboard navigation fully supported
 * - CMS guidance available via tooltips
 */

"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormInput,
  FormSelect,
  FormCheckboxGroup,
  FormDate,
} from "@/components/forms";
import {
  RECORD_TYPES,
  REASON_FOR_RECORD,
  SITE_OF_SERVICE,
  SEX_OPTIONS,
  ETHNICITY_OPTIONS,
  RACE_OPTIONS,
  INTERPRETER_NEEDED,
  PAYER_OPTIONS,
} from "@/lib/constants/cms-codes";

interface SectionAProps {
  /** React Hook Form instance with HOPE form data */
  form: UseFormReturn<any>;
  /** Assessment timepoint - determines which fields to show */
  timepoint?: "1" | "2" | "3" | "9"; // 1=Admission, 2=HUV1, 3=HUV2, 9=Discharge
}

export function SectionA({ form }: SectionAProps) {
  // Watch A0250 (Reason for Record) to determine assessment type
  // Admission-specific fields (A0215, A1005, A1010, A1110) only appear when A0250 = "1"
  const reasonForRecord = form.watch("A0250");
  const isAdmission = reasonForRecord === "1";

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Section A - Administrative Information
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provider identification, patient demographics, and payer information
        </p>
      </div>

      {/* ====================================================================
          PROVIDER INFORMATION
          ==================================================================== */}
      <div className="space-y-6 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold text-foreground">
          Provider Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* A0050 - Type of Record */}
          <FormSelect
            label="A0050 - Type of Record"
            name="A0050"
            form={form}
            required
            options={RECORD_TYPES}
            guidance="Indicates whether this record is new, modifies an existing record, or inactivates a record in the HOPE system."
          />

          {/* A0100_A - National Provider Identifier (NPI) */}
          <FormInput
            label="A0100A - National Provider Identifier"
            name="A0100_A"
            form={form}
            required
            maxLength={10}
            placeholder="10-digit NPI"
            guidance="The 10-digit National Provider Identifier (NPI) assigned to the hospice agency by CMS. This is a unique identification number for covered healthcare providers."
            description="Format: 10 digits"
          />

          {/* A0100_B - CMS Certification Number (CCN) */}
          <FormInput
            label="A0100B - CMS Certification Number"
            name="A0100_B"
            form={form}
            required
            maxLength={6}
            placeholder="6-character CCN"
            guidance="The 6-character CMS Certification Number (CCN) that identifies the hospice agency. Format: 2-digit state code + 4-digit provider number."
            description="Format: SSPPPP (e.g., 051234)"
          />

          {/* A0100_C - Branch Identifier (Optional) */}
          <FormInput
            label="A0100C - Branch Identifier"
            name="A0100_C"
            form={form}
            required={false}
            maxLength={10}
            placeholder="10-character ID"
            guidance="The Branch Identifier consists of the first 6 digits of the CMS Certification Number (CCN) concatenated with an organization-defined 4-digit branch number. Total length: 10 characters. Optional if agency has no branches."
            description="Format: CCCCCCBBBB (6-digit CCN + 4-digit branch)"
          />

          {/* A0200 - State (Optional per type, but recommended) */}
          <FormInput
            label="A0200 - State"
            name="A0200"
            form={form}
            required={false}
            maxLength={2}
            placeholder="e.g., CA"
            guidance="Enter the two-character postal abbreviation for the state where the hospice agency branch is located (e.g., CA for California, NY for New York)."
            description="Two-character state code"
          />

          {/* A0205 - County (Admission Only - Optional) */}
          {isAdmission && (
            <FormInput
              label="A0205 - County"
              name="A0205"
              form={form}
              required={false}
              placeholder="County name"
              guidance="Enter the name of the county where the hospice agency branch is located. This field is optional and appears on admission assessments."
            />
          )}
        </div>
      </div>

      {/* ====================================================================
          ASSESSMENT INFORMATION
          ==================================================================== */}
      <div className="space-y-6 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold text-foreground">
          Assessment Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* A0220 - Admission/Event Date */}
          <FormDate
            label="A0220 - Admission/Event Date"
            name="A0220"
            form={form}
            required
            guidance="The primary date for this assessment record. For Admission: the date the patient was admitted to hospice. For Update Visits: the visit date. For Discharge: the discharge date."
            description="Format: YYYY-MM-DD"
            maxDate={new Date()}
          />

          {/* A0220_C - Assessment Reference Date (Optional) */}
          <FormDate
            label="A0220C - Assessment Reference Date"
            name="A0220_C"
            form={form}
            required={false}
            guidance="An optional alternative or reference date for the assessment if different from A0220. For example, the date of a specific event or change in patient status that triggered this assessment."
            description="Format: YYYY-MM-DD (Optional)"
            maxDate={new Date()}
          />

          {/* A0250 - Reason for Record */}
          <FormSelect
            label="A0250 - Reason for Record"
            name="A0250"
            form={form}
            required
            options={REASON_FOR_RECORD}
            guidance="The assessment timepoint or reason for this record. Determines which HOPE items must be completed. Options include Admission (ADM), HOPE Update Visit 1 (HUV1), HOPE Update Visit 2 (HUV2), hospice transfer codes, and Discharge (DC)."
          />
        </div>

        {/* A0215 - Site of Service at Admission (ADMISSION ONLY) */}
        {isAdmission && (
          <div className="pt-4 border-t">
            <FormSelect
              label="A0215 - Site of Service at Admission"
              name="A0215"
              form={form}
              required
              options={SITE_OF_SERVICE}
              guidance="The patient's location or setting at the time of hospice admission. Examples include patient's home, assisted living facility, skilled nursing facility, inpatient hospital, etc."
              description="Required for Admission assessments only"
            />
          </div>
        )}
      </div>

      {/* ====================================================================
          PATIENT IDENTIFICATION
          ==================================================================== */}
      <div className="space-y-6 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold text-foreground">
          Patient Identification
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* A0320_B - Patient Identifier (Optional per type) */}
          <FormInput
            label="A0320B - Patient Identifier"
            name="A0320_B"
            form={form}
            required={false}
            placeholder="Unique patient ID"
            guidance="A unique identifier for the patient that is consistent across all assessments for this patient. This may be a medical record number or other organization-specific identifier. Do not use Social Security Number."
          />

          {/* A0500 - Patient Name */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-medium text-foreground">A0500 - Patient Legal Name</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormInput
                label="First Name"
                name="A0500_A"
                form={form}
                required
                placeholder="First name"
                guidance="The patient's legal first name as it appears on official documents."
              />
              
              <FormInput
                label="Middle Initial"
                name="A0500_B"
                form={form}
                required
                maxLength={1}
                placeholder="M"
                guidance="The patient's middle initial. Enter one character."
              />
              
              <FormInput
                label="Last Name"
                name="A0500_C"
                form={form}
                required
                placeholder="Last name"
                guidance="The patient's legal last name (surname) as it appears on official documents."
              />
              
              <FormInput
                label="Suffix"
                name="A0500_D"
                form={form}
                required
                placeholder="Jr., Sr., III"
                guidance="Name suffix such as Jr., Sr., II, III, etc. Enter 'N/A' if no suffix."
              />
            </div>
          </div>

          {/* A0998 - Alternate Patient Name (Admission Only - Optional) */}
          {isAdmission && (
            <FormInput
              label="A0998 - Alternate Patient Name"
              name="A0998"
              form={form}
              required={false}
              placeholder="Optional alternate or preferred name"
              guidance="An alternate or preferred name for the patient if different from the legal name. This field is optional and appears on admission assessments."
            />
          )}

          {/* A0600_A - Social Security Number */}
          <FormInput
            label="A0600A - Social Security Number"
            name="A0600_A"
            form={form}
            required
            placeholder="XXX-XX-XXXX"
            maxLength={11}
            guidance="The patient's 9-digit Social Security Number. Format: XXX-XX-XXXX. If patient does not have SSN, enter 'UNKNOWN'."
            description="Format: XXX-XX-XXXX"
          />

          {/* A0600_B - Medicare Number */}
          <FormInput
            label="A0600B - Medicare Number"
            name="A0600_B"
            form={form}
            required
            placeholder="Medicare Beneficiary ID"
            guidance="The patient's Medicare Beneficiary Identifier (MBI). This is the 11-character alphanumeric identifier that replaced the old SSN-based Medicare number."
            description="11-character Medicare MBI"
          />

          {/* A0700 - Medicaid Number */}
          <FormInput
            label="A0700 - Medicaid Number"
            name="A0700"
            form={form}
            required
            placeholder="Medicaid ID or 'N' or '+'"
            guidance="The patient's Medicaid number if applicable. Enter '+' (plus sign) if Medicaid application is pending. Enter 'N' if patient is not a Medicaid recipient."
            description="Enter ID, 'N', or '+'"
          />
        </div>
      </div>

      {/* ====================================================================
          PATIENT DEMOGRAPHICS
          ==================================================================== */}
      <div className="space-y-6 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold text-foreground">
          Patient Demographics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* A0810 - Sex */}
          <FormSelect
            label="A0810 - Sex"
            name="A0810"
            form={form}
            required
            options={SEX_OPTIONS}
            guidance="The patient's biological sex as documented in the medical record. Options: Male or Female."
          />

          {/* A0900 - Birth Date */}
          <FormDate
            label="A0900 - Birth Date"
            name="A0900"
            form={form}
            required
            guidance="The patient's date of birth as documented in official records. Used to calculate patient age and verify identification."
            description="Format: YYYY-MM-DD"
            maxDate={new Date()}
          />

          {/* A1805 - Admitted From (ADMISSION ONLY - Optional) */}
          {isAdmission && (
            <FormInput
              label="A1805 - Admitted From"
              name="A1805"
              form={form}
              required={false}
              placeholder="Location code"
              guidance="The location code indicating where the patient was admitted from. This field is optional for admission assessments."
              description="Optional location code"
            />
          )}
        </div>

        {/* A1005 - Ethnicity (ADMISSION ONLY - Check all that apply) */}
        {isAdmission && (
          <div className="pt-4 border-t">
            <FormCheckboxGroup
              legend="A1005 - Ethnicity"
              name="A1005"
              form={form}
              required
              options={ETHNICITY_OPTIONS}
              description="Check all that apply"
              guidance="Record the patient's self-reported Hispanic, Latino/a, or Spanish origin. Patients should be asked to self-report. If patient is unable or declines to respond, select the appropriate option (X or Y)."
            />
          </div>
        )}

        {/* A1010 - Race (ADMISSION ONLY - Check all that apply) */}
        {isAdmission && (
          <div className="pt-4 border-t">
            <FormCheckboxGroup
              legend="A1010 - Race"
              name="A1010"
              form={form}
              required
              options={RACE_OPTIONS}
              description="Check all that apply"
              guidance="Record the patient's self-reported race. Patients should be asked to self-report. Multiple selections allowed. If patient is unable or declines to respond, select the appropriate option (X or Y). Select 'Z - None of the above' only if patient provides a race not listed."
            />
          </div>
        )}

        {/* A1110 - Interpreter (ADMISSION ONLY) */}
        {isAdmission && (
          <div className="pt-4 border-t space-y-4">
            <FormInput
              label="A1110A - Interpreter Language"
              name="A1110.A"
              form={form}
              required
              placeholder="e.g., Spanish, Mandarin"
              guidance="Enter the primary language for which the patient needs interpretation services. Use the full language name (e.g., Spanish, Mandarin Chinese, American Sign Language)."
              description="Required for Admission assessments"
            />

            <FormSelect
              label="A1110B - Is Interpreter Needed?"
              name="A1110.B"
              form={form}
              required
              options={INTERPRETER_NEEDED}
              guidance="Indicates whether the patient requires interpreter services for effective communication. Options: 0=No, 1=Yes, 9=Unable to determine."
            />
          </div>
        )}
      </div>

      {/* ====================================================================
          PAYER INFORMATION
          ==================================================================== */}
      <div className="space-y-6 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold text-foreground">
          Payer Information
        </h3>

        <FormCheckboxGroup
          legend="A1400 - Payer Information"
          name="A1400"
          form={form}
          required
          options={PAYER_OPTIONS}
          description="Check all existing payer sources that apply"
          guidance="Identify all payer sources covering the patient's hospice services at the time of assessment. Multiple payers may be selected. Include Medicare (traditional or managed care), Medicaid (traditional or managed care), private insurance, self-pay, etc. Select all that apply."
        />
      </div>
    </div>
  );
}
