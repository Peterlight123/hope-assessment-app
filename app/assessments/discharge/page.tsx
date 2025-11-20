"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * HOPE Discharge (DC) Assessment Page
 * Final assessment upon discharge from hospice care
 * 
 * This form collects:
 * - Section A: Administrative Information
 * - Section J: Health Conditions
 * - Section M: Skin Conditions
 * - Section N: Medications
 * - Section Z: Record Administration
 */
export default function DischargeAssessment() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
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
            <div className="text-sm text-gray-500">
              OMB Control Number 0938-1153
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discharge Assessment Form
            </h2>
            <p className="text-gray-600 mb-8">
              Form components are being built...
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Under Construction
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
