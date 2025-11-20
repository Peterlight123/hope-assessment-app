"use client";

import React, { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FormInput,
  FormSelect,
  FormDate,
} from "@/components/forms";
import {
  DEATH_IMMINENT_OPTIONS,
  YES_NO_OPTIONS,
  SYMPTOM_IMPACT_LEVELS,
  SYMPTOM_TYPES,
  SFV_NOT_COMPLETED_REASONS,
} from "@/lib/constants/cms-codes";

interface SectionJProps {
  /** React Hook Form instance with HOPE form data */
  form: UseFormReturn<any>;
}

/**
 * Section J - Health Conditions
 *
 * CMS HOPE v1.01 Section J captures patient health status including:
 * - J0050: Death is Imminent (life expectancy ≤ 3 days)
 * - J2050-J2053: Symptom Impact Screening and Follow-up Visit tracking
 *
 * SKIP PATTERN LOGIC:
 * - J2051 (Symptom Impact Assessment) only appears if J2050.A = "1" (screening completed)
 * - J2052 (Symptom Follow-up Visit) only appears if ANY J2051 symptom is "2" (Moderate) or "3" (Severe)
 * - J2053 (SFV Symptom Impact) only appears if J2052.A = "1" (SFV completed)
 *
 * BACKEND INTEGRATION NOTES:
 * - Field names use dot notation for nested objects (J2050.A, J2051.A, etc.)
 * - React Hook Form automatically creates nested structure on submission
 * - Watch for J2050.A, J2051.*, and J2052.A to drive conditional rendering
 * - API should validate that moderate/severe symptoms trigger SFV requirement
 *
 * @param form - React Hook Form instance containing HOPE assessment data
 */
export const SectionJ: React.FC<SectionJProps> = ({ form }) => {
  /**
   * CONDITIONAL LOGIC WATCHERS
   * Monitor form state to determine which sections should be displayed
   */

  // Watch J2050.A (Symptom Impact Screening Completed)
  const screeningCompleted = form.watch("J2050.A");
  const showSymptomAssessment = screeningCompleted === "1";

  // Watch all J2051 symptom values to check for moderate (2) or severe (3) symptoms
  const j2051_A = form.watch("J2051.A"); // Pain
  const j2051_B = form.watch("J2051.B"); // Shortness of breath
  const j2051_C = form.watch("J2051.C"); // Anxiety
  const j2051_D = form.watch("J2051.D"); // Nausea
  const j2051_E = form.watch("J2051.E"); // Vomiting
  const j2051_F = form.watch("J2051.F"); // Diarrhea
  const j2051_G = form.watch("J2051.G"); // Constipation
  const j2051_H = form.watch("J2051.H"); // Agitation

  /**
   * CMS RULE: Symptom Follow-up Visit (SFV) is required if ANY symptom is Moderate (2) or Severe (3)
   * This computed value determines whether J2052 section should be shown
   * IMPORTANT: Must also verify that J2051 assessment is actually visible (showSymptomAssessment)
   * to prevent skip pattern violations
   */
  const hasModerateOrSevereSymptom = useMemo(() => {
    // Only check symptoms if the assessment is actually visible
    if (!showSymptomAssessment) return false;

    const symptoms = [
      j2051_A,
      j2051_B,
      j2051_C,
      j2051_D,
      j2051_E,
      j2051_F,
      j2051_G,
      j2051_H,
    ];
    return symptoms.some((symptom) => symptom === "2" || symptom === "3");
  }, [
    showSymptomAssessment,
    j2051_A,
    j2051_B,
    j2051_C,
    j2051_D,
    j2051_E,
    j2051_F,
    j2051_G,
    j2051_H,
  ]);

  const showSFVSection = hasModerateOrSevereSymptom;

  // Watch J2052.A (SFV Completed) to determine if SFV date or reason should show
  const sfvCompleted = form.watch("J2052.A");
  const showSFVDate = sfvCompleted === "1";
  const showSFVReason = sfvCompleted === "0";

  /**
   * J2053 (SFV Symptom Impact) only shows if:
   * 1. SFV section is visible (showSFVSection = true)
   * 2. AND SFV was completed (J2052.A = "1")
   * This prevents J2053 from appearing if parent sections are hidden/skipped
   */
  const showSFVSymptomImpact = showSFVSection && sfvCompleted === "1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Section J - Health Conditions
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Patient health status assessment and symptom impact screening
        </p>
      </div>

      {/* J0050 - Death is Imminent */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          J0050 - Death is Imminent
        </h3>
        <FormSelect
          label="Does patient appear to have a life expectancy of 3 days or less?"
          name="J0050"
          form={form}
          required
          options={DEATH_IMMINENT_OPTIONS}
          guidance="Clinical assessment of whether the patient's death is imminent (life expectancy of 3 days or less). This is based on professional clinical judgment considering patient's overall condition, vital signs, and disease progression."
        />
      </div>

      {/* J2050 - Symptom Impact Screening */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium text-gray-800">
          J2050 - Symptom Impact Screening
        </h3>
        <p className="text-sm text-gray-600">
          Screening to assess how patient has been affected by symptoms over the past 2 days
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* J2050.A - Screening Completed */}
          <FormSelect
            label="J2050A - Was Symptom Impact Screening completed?"
            name="J2050.A"
            form={form}
            required
            options={YES_NO_OPTIONS}
            guidance="Indicates whether the Symptom Impact Screening (J2051) was completed. If Yes, you must complete the J2051 assessment below. If No, skip to Section M."
          />

          {/* J2050.B - Screening Date (only if screening completed) */}
          {showSymptomAssessment && (
            <FormDate
              label="J2050B - Date of Screening"
              name="J2050.B"
              form={form}
              required
              guidance="The date when the Symptom Impact Screening (J2051) was completed. Must be within the assessment reference period."
              description="Format: YYYY-MM-DD"
              maxDate={new Date()}
            />
          )}
        </div>
      </div>

      {/* J2051 - Symptom Impact Assessment (conditional - only if J2050.A = "1") */}
      {showSymptomAssessment && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-4 border-t"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              J2051 - Symptom Impact Assessment
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              How has the patient been affected by the following symptoms over the past 2 days?
            </p>
            <p className="text-xs text-amber-600 font-medium mt-2">
              IMPORTANT: If any symptom is rated as Moderate (2) or Severe (3), a Symptom
              Follow-up Visit (SFV) must be scheduled within 2 calendar days.
            </p>
          </div>

          <div className="space-y-4">
            {SYMPTOM_TYPES.map((symptom) => (
              <FormSelect
                key={symptom.key}
                label={`J2051${symptom.key} - ${symptom.label}`}
                name={`J2051.${symptom.key}`}
                form={form}
                required
                options={SYMPTOM_IMPACT_LEVELS}
                guidance={`Assess the impact of ${symptom.label.toLowerCase()} on the patient over the past 2 days. Consider severity, frequency, and effect on daily functioning. If symptom is well-controlled with treatment, select "Not at all."`}
              />
            ))}
          </div>

          {/* Alert when moderate/severe symptoms are detected */}
          {hasModerateOrSevereSymptom && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-50 border border-amber-200 rounded-lg p-4"
            >
              <p className="text-sm text-amber-800 font-medium">
                ⚠️ Symptom Follow-up Visit Required: One or more symptoms are rated as Moderate
                or Severe. Complete Section J2052 below to document the SFV.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* J2052 - Symptom Follow-up Visit (conditional - only if any J2051 is 2 or 3) */}
      {showSFVSection && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-4 border-t"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              J2052 - Symptom Follow-up Visit (SFV)
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Required when patient experiences moderate or severe symptoms. In-person visit should
              occur within 2 calendar days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* J2052.A - SFV Completed */}
            <FormSelect
              label="J2052A - Was Symptom Follow-up Visit completed?"
              name="J2052.A"
              form={form}
              required
              options={YES_NO_OPTIONS}
              guidance="Indicates whether an in-person Symptom Follow-up Visit was completed within 2 calendar days. If Yes, record the date and complete J2053. If No, provide the reason."
            />

            {/* J2052.B - SFV Date (only if SFV completed) */}
            {showSFVDate && (
              <FormDate
                label="J2052B - Date of Symptom Follow-up Visit"
                name="J2052.B"
                form={form}
                required
                guidance="Date when the in-person Symptom Follow-up Visit occurred. Should be within 2 calendar days of the initial assessment showing moderate/severe symptoms."
                description="Format: YYYY-MM-DD"
                maxDate={new Date()}
              />
            )}

            {/* J2052.C - Reason SFV Not Completed (only if SFV not completed) */}
            {showSFVReason && (
              <FormSelect
                label="J2052C - Reason SFV Not Completed"
                name="J2052.C"
                form={form}
                required
                options={SFV_NOT_COMPLETED_REASONS}
                guidance="Select the primary reason why the Symptom Follow-up Visit was not completed within 2 calendar days. Document attempts to contact and any patient/caregiver responses."
              />
            )}
          </div>
        </motion.div>
      )}

      {/* J2053 - SFV Symptom Impact (conditional - only if J2052.A = "1") */}
      {showSFVSymptomImpact && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-4 border-t"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              J2053 - SFV Symptom Impact Assessment
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Reassess symptoms during the follow-up visit to track changes and treatment
              effectiveness.
            </p>
          </div>

          <div className="space-y-4">
            {SYMPTOM_TYPES.map((symptom) => (
              <FormSelect
                key={symptom.key}
                label={`J2053${symptom.key} - ${symptom.label}`}
                name={`J2053.${symptom.key}`}
                form={form}
                required
                options={SYMPTOM_IMPACT_LEVELS}
                guidance={`Reassess the impact of ${symptom.label.toLowerCase()} during the follow-up visit. Compare to the initial J2051 assessment to evaluate treatment effectiveness and symptom progression.`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
