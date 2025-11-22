"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-4">About HOPE</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A professional CMS-compliant data entry interface for hospice clinicians.
              Designed to deliver quality care assessment with precision and ease.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-4">Assessment Types</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/assessments/admission"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Admission (ADM)
                </Link>
              </li>
              <li>
                <Link
                  href="/assessments/update-visit"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Update Visit (HUV)
                </Link>
              </li>
              <li>
                <Link
                  href="/assessments/discharge"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Discharge (DC)
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-4">Compliance</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>CMS HOPE v1.01 Compliant</li>
              <li>WCAG 2.1 AA Accessible</li>
              <li>OMB Control #0938-1153</li>
              <li>© 2025 All Rights Reserved</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Designer Credit CTA */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">
              Crafted with care for quality healthcare
            </p>
            <Link
              href="https://peterlight123.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Heart className="w-4 h-4" />
              Designed by peterlightspeed
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            Built with Next.js 16, TypeScript, and Tailwind CSS • Professional & Accessible
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
