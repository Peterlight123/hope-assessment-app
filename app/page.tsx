"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ClipboardList, FileCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HOPE Assessment</h1>
              <p className="text-sm text-gray-600 mt-1">Hospice Outcomes and Patient Evaluation v1.01</p>
            </div>
            <div className="text-sm text-gray-500">
              OMB Control Number 0938-1153
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Quality Care Assessment Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional data entry interface for CMS-compliant hospice patient assessments.
            Built to support clinicians in delivering the highest quality of care.
          </p>
        </motion.div>

        {/* Assessment Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <AssessmentCard
            href="/assessments/admission"
            icon={<FileText className="w-12 h-12" />}
            title="Admission (ADM)"
            description="Initial comprehensive patient assessment at hospice admission"
            delay={0.1}
          />
          <AssessmentCard
            href="/assessments/update-visit"
            icon={<ClipboardList className="w-12 h-12" />}
            title="Update Visit (HUV)"
            description="Periodic reassessment during the first 30 days of hospice stay"
            delay={0.2}
          />
          <AssessmentCard
            href="/assessments/discharge"
            icon={<FileCheck className="w-12 h-12" />}
            title="Discharge (DC)"
            description="Final assessment upon discharge from hospice care"
            delay={0.3}
          />
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature text="CMS HOPE v1.01 compliant data collection" />
            <Feature text="WCAG 2.1 AA accessible interface" />
            <Feature text="Auto-save functionality to prevent data loss" />
            <Feature text="Conditional logic and skip patterns" />
            <Feature text="Section-based navigation" />
            <Feature text="Built-in guidance tooltips" />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Designed by{" "}
              <a
                href="https://peterlight123.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                peterlightspeed
              </a>
            </p>
            <p className="text-xs mt-2 text-gray-500">
              © 2025 HOPE Assessment Application. Compliant with CMS regulations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AssessmentCard({
  href,
  icon,
  title,
  description,
  delay,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href}>
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-8 h-full border-2 border-transparent hover:border-blue-500 cursor-pointer group">
          <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="mt-6 text-blue-600 font-medium group-hover:translate-x-2 transition-transform inline-block">
            Start Assessment →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <svg
        className="w-5 h-5 text-green-500 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-gray-700">{text}</span>
    </div>
  );
}
