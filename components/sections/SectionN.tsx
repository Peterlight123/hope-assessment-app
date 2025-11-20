"use client";

import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { FormSelect, FormDate } from "@/components/forms";
import {
  OPIOID_INITIATED,
  BOWEL_REGIMEN_OPTIONS,
} from "@/lib/constants/cms-codes";

interface SectionNProps {
  /** React Hook Form instance with HOPE form data */
  form: UseFormReturn<any>;
}

/**
 * Section N - Medications
 *
 * CMS HOPE v1.01 Section N captures patient medication management including:
 * - N0500: Scheduled Opioid tracking
 * - N0510: PRN (as-needed) Opioid tracking
 * - N0520: Bowel Regimen (required if either opioid is initiated/continued)
 *
 * SKIP PATTERN LOGIC:
 * - N0500.B (date) only appears if N0500.A = "1" (Yes)
 * - N0510.B (date) only appears if N0510.A = "1" (Yes)
 * - N0520 (Bowel Regimen) only appears if N0500.A = "1" OR N0510.A = "1"
 * - N0520.B (date) only appears if N0520.A = "2" (Yes)
 *
 * CMS CLINICAL RATIONALE:
 * Opioids are a primary pain management tool in hospice care, but they commonly
 * cause constipation. CMS requires documentation of bowel regimens when opioids
 * are used to prevent and manage this side effect, ensuring quality of care and
 * patient comfort.
 *
 * BACKEND INTEGRATION NOTES:
 * - Field names use dot notation for nested objects (N0500.A, N0500.B, etc.)
 * - React Hook Form automatically creates nested structure on submission
 * - Watch N0500.A and N0510.A to drive N0520 conditional rendering
 * - API should validate that N0520 is present if either opioid is initiated
 * - Date fields should be in YYYY-MM-DD format per CMS requirements
 *
 * @param form - React Hook Form instance containing HOPE assessment data
 */
export const SectionN: React.FC<SectionNProps> = ({ form }) => {
  /**
   * CONDITIONAL LOGIC WATCHERS
   * Monitor form state to determine which sections should be displayed
   */

  // Watch N0500.A (Scheduled Opioid initiated/continued)
  const scheduledOpioidInitiated = form.watch("N0500.A");
  const showScheduledOpioidDate = scheduledOpioidInitiated === "1";

  // Watch N0510.A (PRN Opioid initiated/continued)
  const prnOpioidInitiated = form.watch("N0510.A");
  const showPRNOpioidDate = prnOpioidInitiated === "1";

  /**
   * CMS RULE: Bowel Regimen section is required if EITHER opioid is initiated/continued
   * Rationale: Opioids cause constipation, so bowel management must be documented
   */
  const anyOpioidInitiated =
    scheduledOpioidInitiated === "1" || prnOpioidInitiated === "1";
  const showBowelRegimen = anyOpioidInitiated;

  // Watch N0520.A (Bowel Regimen status) to determine if date field should show
  const bowelRegimenStatus = form.watch("N0520.A");
  const showBowelRegimenDate = bowelRegimenStatus === "2"; // Only if Yes

  /**
   * CMS SKIP PATTERN ENFORCEMENT - CLEAR STALE DATA
   * When no opioids are initiated (both N0500.A and N0510.A = "0"),
   * clear N0520 values to prevent submitting bowel regimen data
   * when it should be skipped per CMS rules
   *
   * BACKEND NOTE:
   * This ensures that the submitted payload does not contain N0520
   * when both opioid fields are "0", maintaining CMS skip pattern compliance
   */
  useEffect(() => {
    if (!showBowelRegimen) {
      // Clear N0520 fields when bowel regimen section should be hidden
      form.setValue("N0520.A", undefined, { shouldValidate: false });
      form.setValue("N0520.B", undefined, { shouldValidate: false });
    }
  }, [showBowelRegimen, form]);

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
          Section N - Medications
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Opioid medication management and bowel regimen tracking
        </p>
      </div>

      {/* N0500 - Scheduled Opioid */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          N0500 - Scheduled Opioid
        </h3>
        <p className="text-sm text-gray-600">
          Track whether scheduled (around-the-clock) opioid medication was initiated or continued
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* N0500.A - Opioid Initiated/Continued */}
          <FormSelect
            label="N0500A - Was a scheduled opioid initiated or continued?"
            name="N0500.A"
            form={form}
            required
            options={OPIOID_INITIATED}
            guidance="Scheduled opioids are administered on a regular basis (e.g., every 4, 8, or 12 hours) rather than as-needed. Examples include MS Contin, OxyContin, Duragesic patches, methadone. Select Yes if a scheduled opioid was initiated (new prescription) or continued (ongoing prescription) during this assessment period."
          />

          {/* N0500.B - Date (only if opioid initiated/continued) */}
          {showScheduledOpioidDate && (
            <FormDate
              label="N0500B - Date Scheduled Opioid Initiated/Continued"
              name="N0500.B"
              form={form}
              required
              guidance="The date when the scheduled opioid medication was first started (initiated) or the date of the assessment if continuing an existing prescription. Must be within the assessment reference period."
              description="Format: YYYY-MM-DD"
              maxDate={new Date()}
            />
          )}
        </div>
      </div>

      {/* N0510 - PRN Opioid */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium text-gray-800">
          N0510 - PRN (As-Needed) Opioid
        </h3>
        <p className="text-sm text-gray-600">
          Track whether PRN (pro re nata / as-needed) opioid medication was initiated or continued
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* N0510.A - PRN Opioid Initiated/Continued */}
          <FormSelect
            label="N0510A - Was a PRN opioid initiated or continued?"
            name="N0510.A"
            form={form}
            required
            options={OPIOID_INITIATED}
            guidance="PRN (as-needed) opioids are administered only when the patient experiences breakthrough pain or other symptoms. Examples include immediate-release morphine, oxycodone, hydrocodone. Select Yes if a PRN opioid was initiated or continued during this assessment period."
          />

          {/* N0510.B - Date (only if PRN opioid initiated/continued) */}
          {showPRNOpioidDate && (
            <FormDate
              label="N0510B - Date PRN Opioid Initiated/Continued"
              name="N0510.B"
              form={form}
              required
              guidance="The date when the PRN opioid medication was first started (initiated) or the date of the assessment if continuing an existing prescription. Must be within the assessment reference period."
              description="Format: YYYY-MM-DD"
              maxDate={new Date()}
            />
          )}
        </div>
      </div>

      {/* N0520 - Bowel Regimen (conditional - only if any opioid is initiated) */}
      {showBowelRegimen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-4 border-t"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800 font-medium">
              ℹ️ Bowel Regimen Required: An opioid medication has been initiated or continued.
              CMS requires documentation of bowel management to prevent and treat opioid-induced
              constipation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800">
              N0520 - Bowel Regimen
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Document bowel regimen to manage opioid-induced constipation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* N0520.A - Bowel Regimen Status */}
            <FormSelect
              label="N0520A - Was a bowel regimen initiated or continued?"
              name="N0520.A"
              form={form}
              required
              options={BOWEL_REGIMEN_OPTIONS}
              guidance="A bowel regimen includes medications or interventions to prevent/treat constipation (e.g., stool softeners, laxatives, suppositories, dietary changes, increased fluids). Select the appropriate option: 'No', 'No but documented why not' (e.g., patient decline, medical contraindication, already regular bowel pattern), or 'Yes'."
            />

            {/* N0520.B - Date (only if bowel regimen initiated/continued = Yes) */}
            {showBowelRegimenDate && (
              <FormDate
                label="N0520B - Date Bowel Regimen Initiated/Continued"
                name="N0520.B"
                form={form}
                required
                guidance="The date when the bowel regimen was first started (initiated) or the date of the assessment if continuing an existing regimen. Must be within the assessment reference period."
                description="Format: YYYY-MM-DD"
                maxDate={new Date()}
              />
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
