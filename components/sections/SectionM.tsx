"use client";

import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { FormSelect, FormCheckboxGroup } from "@/components/forms";
import {
  HAS_SKIN_CONDITIONS,
  SKIN_CONDITION_TYPES,
  SKIN_TREATMENTS,
} from "@/lib/constants/cms-codes";

interface SectionMProps {
  /** React Hook Form instance with HOPE form data */
  form: UseFormReturn<any>;
}

/**
 * Section M - Skin Conditions
 *
 * CMS HOPE v1.01 Section M captures patient skin condition assessment including:
 * - M1190: Presence of skin conditions
 * - M1195: Types of skin conditions (if present)
 * - M1200: Skin and ulcer/injury treatments (if present)
 *
 * SKIP PATTERN LOGIC:
 * - M1195 (Types of Skin Conditions) only appears if M1190 = "1" (Yes)
 * - M1200 (Skin Treatments) only appears if M1190 = "1" (Yes)
 *
 * BACKEND INTEGRATION NOTES:
 * - M1195 and M1200 are checkbox groups that serialize to objects with boolean flags (A-Z keys)
 * - React Hook Form automatically creates nested structure: { M1195: { A: true, B: false, ... } }
 * - Watch M1190 to determine when to show/hide conditional fields
 * - API should validate that M1195 and M1200 are not submitted if M1190 = "0"
 * - "Z" option ("None of the above") should be mutually exclusive with other selections (enforce client-side)
 *
 * @param form - React Hook Form instance containing HOPE assessment data
 */
export const SectionM: React.FC<SectionMProps> = ({ form }) => {
  /**
   * CONDITIONAL LOGIC WATCHER
   * Monitor M1190 to determine if skin condition details should be shown
   */
  const hasSkinConditions = form.watch("M1190");
  const showSkinDetails = hasSkinConditions === "1";

  /**
   * CMS SKIP PATTERN ENFORCEMENT - CLEAR STALE DATA
   * When M1190 changes from "1" (Yes) to "0" (No), clear M1195 and M1200 values
   * to prevent submitting skin condition data when parent answer is "No"
   * 
   * BACKEND NOTE:
   * This ensures that the submitted payload does not contain M1195 or M1200
   * when M1190 = "0", maintaining CMS skip pattern compliance
   */
  useEffect(() => {
    if (!showSkinDetails) {
      // Clear all M1195 checkboxes
      SKIN_CONDITION_TYPES.forEach((type) => {
        form.setValue(`M1195.${type.value}`, false, { shouldValidate: false });
      });

      // Clear all M1200 checkboxes
      SKIN_TREATMENTS.forEach((treatment) => {
        form.setValue(`M1200.${treatment.value}`, false, { shouldValidate: false });
      });
    }
  }, [showSkinDetails, form]);

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
          Section M - Skin Conditions
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Assessment of patient skin conditions and treatments in place
        </p>
      </div>

      {/* M1190 - Has Skin Conditions */}
      <div className="space-y-4">
        <FormSelect
          label="M1190 - Does the patient have one or more skin conditions?"
          name="M1190"
          form={form}
          required
          options={HAS_SKIN_CONDITIONS}
          guidance="Determine whether the patient currently has any type of skin condition, including but not limited to: ulcers, pressure injuries, surgical wounds, rashes, skin tears, or moisture-associated skin damage. If Yes, complete M1195 and M1200 below. If No, skip to Section N."
        />
      </div>

      {/* M1195 - Types of Skin Conditions (conditional - only if M1190 = "1") */}
      {showSkinDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-4 border-t"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              M1195 - Types of Skin Conditions
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Check all skin conditions that are present at the time of this assessment
            </p>
            <p className="text-xs text-amber-600 font-medium mt-2">
              NOTE: If "None of the above" (Z) is selected, no other options should be checked.
            </p>
          </div>

          <FormCheckboxGroup
            legend="Select all skin conditions present"
            name="M1195"
            form={form}
            required
            options={SKIN_CONDITION_TYPES}
            guidance="Check all types of skin conditions currently present. Include all documented conditions regardless of stage or severity. If 'Other specified condition' (Y) is selected, document details in clinical notes. The 'None of the above' option should only be selected if no skin conditions from the list are present."
            description="Check all that apply"
          />
        </motion.div>
      )}

      {/* M1200 - Skin and Ulcer/Injury Treatments (conditional - only if M1190 = "1") */}
      {showSkinDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-4 border-t"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              M1200 - Skin and Ulcer/Injury Treatments
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Check all interventions or treatments that are in place at the time of this assessment
            </p>
            <p className="text-xs text-amber-600 font-medium mt-2">
              NOTE: If "None of the above" (Z) is selected, no other treatment options should be
              checked.
            </p>
          </div>

          <FormCheckboxGroup
            legend="Select all treatments currently in place"
            name="M1200"
            form={form}
            required
            options={SKIN_TREATMENTS}
            guidance="Check all skin-related interventions and treatments currently in place to prevent or treat skin conditions. Include both preventive measures (e.g., pressure-reducing devices, turning/repositioning) and active treatments (e.g., wound care, dressings, medications). Only check interventions that are actively being implemented at the time of assessment."
            description="Check all that apply"
          />
        </motion.div>
      )}
    </motion.div>
  );
};
