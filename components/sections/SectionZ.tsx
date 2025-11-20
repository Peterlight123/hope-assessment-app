"use client";

import React, { useEffect } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput, FormDate } from "@/components/forms";

interface SectionZProps {
  /** React Hook Form instance with HOPE form data */
  form: UseFormReturn<any>;
}

/**
 * Section Z - Record Administration
 *
 * CMS HOPE v1.01 Section Z captures record completion and signature information:
 * - Z0350: Date assessment was completed
 * - Z0400: Signatures of person(s) completing the record (up to 12 clinicians)
 * - Z0500: Verification signature confirming record accuracy
 *
 * SIGNATURE REQUIREMENTS:
 * - Multiple clinicians can sign for different sections they completed
 * - Each signature must include: name, title, sections completed, and date
 * - Final verification signature required from supervising clinician
 *
 * CMS COMPLIANCE NOTES:
 * - All dates must be in YYYY-MM-DD format
 * - Signature dates should not be before assessment dates
 * - **At least one signature is REQUIRED in Z0400** (enforced by disabling removal of last entry)
 * - Verification signature (Z0500) is mandatory for all assessments
 *
 * BACKEND INTEGRATION NOTES:
 * - Z0400 is an array that can contain 0-12 signature objects
 * - Each signature object has: { signature, title, sections, date }
 * - React Hook Form Field Array manages add/remove operations
 * - API should validate minimum one signature and required verification
 * - Consider implementing electronic signature integration for production
 *
 * @param form - React Hook Form instance containing HOPE assessment data
 */
export const SectionZ: React.FC<SectionZProps> = ({ form }) => {
  /**
   * FIELD ARRAY FOR DYNAMIC SIGNATURES
   * React Hook Form's useFieldArray manages the Z0400 signature array
   * Allows adding/removing signature entries dynamically
   */
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "Z0400",
  });

  /**
   * CMS REQUIREMENT: ENSURE AT LEAST ONE SIGNATURE
   * Initialize Z0400 with one empty signature if the array is empty
   * This prevents submitting an assessment with zero clinician signatures
   */
  useEffect(() => {
    if (fields.length === 0) {
      append({
        signature: "",
        title: "",
        sections: "",
        date: "",
      });
    }
  }, [fields.length, append]);

  /**
   * Add new signature entry to the Z0400 array
   * CMS allows up to 12 signatures (A through L)
   */
  const addSignature = () => {
    if (fields.length < 12) {
      append({
        signature: "",
        title: "",
        sections: "",
        date: "",
      });
    }
  };

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
          Section Z - Record Administration
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Assessment completion date, signatures, and verification
        </p>
      </div>

      {/* Z0350 - Date Assessment Completed */}
      <div className="space-y-4">
        <FormDate
          label="Z0350 - Date Assessment Completed"
          name="Z0350"
          form={form}
          required
          guidance="The date when this HOPE assessment was fully completed. This should be the date all sections were finalized and ready for signature. Must be within the assessment reference period and should not be a future date."
          description="Format: YYYY-MM-DD"
          maxDate={new Date()}
        />
      </div>

      {/* Z0400 - Signature(s) of Person(s) Completing the Record */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              Z0400 - Signature(s) of Person(s) Completing the Record
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Signatures of all clinicians who completed sections of this assessment (up to 12)
            </p>
          </div>
          <Button
            type="button"
            onClick={addSignature}
            disabled={fields.length >= 12}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Signature
          </Button>
        </div>

        {/* Signature Entries */}
        <AnimatePresence mode="popLayout">
          {fields.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
            >
              <p className="text-sm text-gray-600">
                No signatures added yet. Click "Add Signature" to add a clinician signature.
              </p>
            </motion.div>
          )}

          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Signature {index + 1} of {fields.length}
                </h4>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="flex items-center gap-2"
                  title={
                    fields.length === 1
                      ? "Cannot remove the last signature - CMS requires at least one"
                      : "Remove this signature"
                  }
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Signature (Name) */}
                <FormInput
                  label="Signature (Name)"
                  name={`Z0400.${index}.signature`}
                  form={form}
                  required
                  placeholder="e.g., John Smith, RN"
                  guidance="Full name and credentials of the person signing. Include professional credentials (RN, MD, LCSW, etc.)."
                  description="Full name with credentials"
                />

                {/* Title/Discipline */}
                <FormInput
                  label="Title/Discipline"
                  name={`Z0400.${index}.title`}
                  form={form}
                  required
                  placeholder="e.g., Registered Nurse, Social Worker"
                  guidance="Professional title or discipline of the person signing (e.g., Registered Nurse, Physician, Social Worker, Chaplain, etc.)."
                  description="Professional title"
                />

                {/* Sections Completed */}
                <FormInput
                  label="Sections Completed"
                  name={`Z0400.${index}.sections`}
                  form={form}
                  required
                  placeholder="e.g., A, J, M"
                  guidance="List the section letters completed by this person (e.g., 'A, J' if they completed Administrative and Health Conditions sections). Use capital letters separated by commas."
                  description="Section letters (e.g., A, J, M)"
                />

                {/* Date Signed */}
                <FormDate
                  label="Date Section(s) Completed"
                  name={`Z0400.${index}.date`}
                  form={form}
                  required
                  guidance="The date when this person completed their portion of the assessment. Should not be before the assessment start date or after the completion date (Z0350)."
                  description="Format: YYYY-MM-DD"
                  maxDate={new Date()}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* CMS Requirement Notes */}
        {fields.length > 0 && (
          <div className="text-xs text-gray-500 mt-2 space-y-1">
            <p>CMS allows up to 12 signatures. {12 - fields.length} signature slot(s) remaining.</p>
            {fields.length === 1 && (
              <p className="text-amber-600 font-medium">
                ⚠️ At least one signature is required. The last signature cannot be removed.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Z0500 - Verification Signature */}
      <div className="space-y-4 pt-4 border-t">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-amber-800 font-medium">
            ⚠️ Verification Signature Required: A supervising clinician must verify the accuracy
            and completeness of this assessment before submission.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800">
            Z0500 - Signature of Person Verifying Record Completion
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Final verification signature confirming assessment accuracy and completeness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Z0500.A - Verification Signature */}
          <FormInput
            label="Z0500A - Verification Signature (Name)"
            name="Z0500.A"
            form={form}
            required
            placeholder="e.g., Jane Doe, MD"
            guidance="Full name and credentials of the supervising clinician verifying the accuracy and completeness of this assessment. This person is certifying that all required sections have been completed correctly and the information is accurate."
            description="Full name with credentials"
          />

          {/* Z0500.B - Verification Date */}
          <FormDate
            label="Z0500B - Date of Verification"
            name="Z0500.B"
            form={form}
            required
            guidance="The date when the supervising clinician verified the assessment. Should be on or after the assessment completion date (Z0350) and all individual signature dates (Z0400)."
            description="Format: YYYY-MM-DD"
            maxDate={new Date()}
          />
        </div>
      </div>
    </motion.div>
  );
};
