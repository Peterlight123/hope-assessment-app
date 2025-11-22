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
import type { HOPEDischargeForm } from "@/types/hope-forms";

/**
 * HOPE Discharge (DC) Assessment Page
 *
 * Final assessment upon discharge from hospice care per CMS HOPE v1.01
 *
 * Discharge can occur for various reasons:
 * - Death (most common in hospice)
 * - Transfer to another hospice
 * - Revocation of hospice benefit
 * - Discharge for improvement/recovery
 *
 * FORM STRUCTURE:
 * - Section A: Administrative Information (basic fields + discharge reason)
 * - Section J: Health Conditions (final symptom assessment)
 * - Section M: Skin Conditions (final skin status)
 * - Section N: Medications (final medication status)
 * - Section Z: Record Administration (signatures and verification)
 *
 * CMS REQUIREMENTS:
 * - Discharge assessments use basic Section A (no extended demographics)
 * - A0250 must be set to appropriate discharge reason code
 * - All sections required except where patient expired prevents data collection
 * - Final assessment should be completed within 2 days of discharge event
 *
 * BACKEND INTEGRATION NOTES:
 * - Form data submitted via React Hook Form in structured format matching HOPEDischargeForm type
 * - A0250 discharge reason codes: 4=Transfer, 5=Discharge, 6=Death
 * - API endpoint: POST /api/assessments/discharge (to be implemented)
 *
 * @see {@link HOPEDischargeForm} for complete TypeScript interface
 */
export default function DischargeAssessment() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * REACT HOOK FORM SETUP
   * Manages all form state, validation, and submission
   * Default values set A0250 to "6" (Death) - most common discharge reason
   */
  const form = useForm({
    defaultValues: {
      A0250: "6", // Default to Death (most common hospice discharge)
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
   * @param data - Complete HOPE discharge form data
   */
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log("🚀 Final Submission - Form Data:", data);

      // TODO: Implement API call to submit assessment
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(
        "Discharge Assessment submitted successfully! (Simulated)\\n\\nIn production, this would:\\n- Save to database\\n- Generate assessment ID\\n- Close patient record\\n- Queue for CMS transmission"
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
                  Discharge (DC) Assessment
                </h1>
                <p className="text-sm text-gray-600">
                  HOPE v1.01 - Final Assessment
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
            className="bg-purple-50 border border-purple-200 rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold text-purple-900 mb-2">
              Discharge Assessment Instructions
            </h2>
            <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
              <li>Complete all required fields marked with an asterisk (*)</li>
              <li>
                Select correct discharge reason in Section A (Transfer, Discharge, or Death)
              </li>
              <li>
                Document patient's final status in all sections when possible
              </li>
              <li>If patient expired, complete what information is available from records</li>
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
