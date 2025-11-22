"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import {
  SectionA,
  SectionJ,
  SectionM,
  SectionN,
  SectionZ,
} from "@/components/sections";
import type { HOPEUpdateVisitForm } from "@/types/hope-forms";

/**
 * HOPE Update Visit (HUV) Assessment Page
 *
 * Periodic reassessment during the first 30 days of hospice stay per CMS HOPE v1.01
 *
 * Up to 2 update visits (HUV1 and HUV2) may be required depending on length of stay:
 * - HUV1: Required if patient remains in hospice 15-21 days after admission
 * - HUV2: Required if patient remains in hospice 29-35 days after admission
 *
 * FORM STRUCTURE:
 * - Section A: Administrative Information (basic fields only, no extended demographics)
 * - Section J: Health Conditions (symptom impact screening and follow-up visit tracking)
 * - Section M: Skin Conditions (types and treatments)
 * - Section N: Medications (opioid and bowel regimen tracking)
 * - Section Z: Record Administration (signatures and verification)
 *
 * CMS REQUIREMENTS:
 * - Update visits use basic Section A (no ethnicity, race, language fields)
 * - All other sections are required
 * - Must be completed within specified timeframe relative to admission date
 *
 * BACKEND INTEGRATION NOTES:
 * - Form data submitted via React Hook Form in structured format matching HOPEUpdateVisitForm type
 * - A0250 should be set to "2" (HUV1) or "3" (HUV2) based on visit number
 * - API endpoint: POST /api/assessments/update-visit (to be implemented)
 *
 * @see {@link HOPEUpdateVisitForm} for complete TypeScript interface
 */
export default function UpdateVisitAssessment() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * REACT HOOK FORM SETUP
   * Manages all form state, validation, and submission
   * Default values set A0250 to "2" (HUV1) - can be changed by user if HUV2
   */
  const form = useForm({
    defaultValues: {
      A0250: "2", // Default to HUV1 (Update Visit 1)
      Z0400: [], // Will be initialized by SectionZ component
    },
  });

  /**
   * DRAFT SAVE HANDLER
   * Saves current form progress without validation
   */
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const formData = form.getValues();
      console.log("📝 Draft Save - Form Data:", formData);

      // TODO: Implement API call to save draft
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Draft saved successfully! (Simulated)");
    } catch (error) {
      console.error("Draft save error:", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * FINAL SUBMISSION HANDLER
   * Validates and submits complete assessment to backend
   *
   * @param data - Complete HOPE update visit form data
   */
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log("🚀 Final Submission - Form Data:", data);

      // TODO: Implement API call to submit assessment
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(
        "Update Visit Assessment submitted successfully! (Simulated)\\n\\nIn production, this would:\\n- Save to database\\n- Generate assessment ID\\n- Queue for CMS transmission"
      );
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit assessment. Please check all fields and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Update Visit (HUV) Assessment
                </h1>
                <p className="text-sm text-gray-600">
                  HOPE v1.01 - Periodic Reassessment
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">OMB 0938-1153</span>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              Update Visit Assessment Instructions
            </h2>
            <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
              <li>Complete all required fields marked with an asterisk (*)</li>
              <li>
                Select correct visit type in Section A (HUV1 for 15-21 days, HUV2 for 29-35 days)
              </li>
              <li>Focus on changes since the previous assessment</li>
              <li>Save your progress frequently using the "Save Draft" button</li>
              <li>Verify all signatures in Section Z before submitting</li>
            </ul>
          </motion.div>

          {/* Section A - Administrative Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <SectionA form={form} />
          </motion.div>

          {/* Section J - Health Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <SectionJ form={form} />
          </motion.div>

          {/* Section M - Skin Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <SectionM form={form} />
          </motion.div>

          {/* Section N - Medications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <SectionN form={form} />
          </motion.div>

          {/* Section Z - Record Administration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <SectionZ form={form} />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end gap-4 pt-6"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-6 text-lg"
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? "Submitting..." : "Submit Assessment"}
            </Button>
          </motion.div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
