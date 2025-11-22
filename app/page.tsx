"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ClipboardList, FileCheck, Stethoscope } from "lucide-react";
import Footer from "@/components/layout/Footer";
import FAQChatbot from "@/components/Chatbot/FAQChatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">HOPE Assessment</h1>
                  <p className="text-sm text-blue-100 mt-1">Hospice Outcomes and Patient Evaluation v1.01</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-blue-100 bg-white bg-opacity-10 px-4 py-2 rounded-lg hidden sm:block"
            >
              OMB Control #0938-1153
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Professional Healthcare Data Entry
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Quality Care Assessment <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Platform</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A professional data entry interface designed for CMS-compliant hospice patient assessments.
            Empowering clinicians to deliver compassionate care with precision, ease, and confidence.
          </p>
        </motion.div>

        {/* Assessment Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
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
          className="bg-white rounded-xl shadow-lg p-10 border border-gray-100"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Why HOPE Assessment?</h3>
            <p className="text-gray-600 mt-2">Everything clinicians need for professional, compliant assessments</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Feature text="CMS HOPE v1.01 compliant data collection" />
            <Feature text="WCAG 2.1 AA accessible interface" />
            <Feature text="Auto-save functionality to prevent data loss" />
            <Feature text="Intelligent conditional logic and skip patterns" />
            <Feature text="Section-based navigation with progress tracking" />
            <Feature text="AI-powered FAQ chatbot for instant support" />
            <Feature text="Professional responsive design" />
            <Feature text="Real-time validation and guidance tooltips" />
          </div>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8 mt-20"
        >
          <h3 className="text-2xl font-bold mb-4 text-blue-900">Enterprise-Grade Security & Compliance</h3>
          <p className="text-blue-800 leading-relaxed">
            Built on Next.js 16 with TypeScript, our platform meets CMS standards for healthcare data handling.
            Support for modern browsers ensures your data remains secure while providing an optimal user experience
            for clinicians across all devices.
          </p>
        </motion.div>
      </main>

      {/* FAQ Chatbot */}
      <FAQChatbot />

      {/* Footer */}
      <Footer />
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
      whileHover={{ y: -8 }}
    >
      <Link href={href}>
        <div className="bg-white border border-gray-200 rounded-xl p-8 h-full cursor-pointer transition-all duration-300 hover:shadow-xl">
          <div className="text-blue-600 mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="flex items-start gap-3"
    >
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-gray-700">{text}</p>
    </motion.div>
  );
}
