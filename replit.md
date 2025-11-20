# HOPE Assessment Application

## Overview
Professional Next.js-based HOPE (Hospice Outcomes and Patient Evaluation) v1.01 Assessment Application. This is a CMS-compliant data entry interface for hospice clinicians.

**Purpose**: Provide a secure, accessible, and compliant web application for collecting HOPE assessment data across three timepoints: Admission (ADM), Update Visit (HUV), and Discharge (DC).

**Current State**: Initial project setup complete with Next.js 16, TypeScript, Tailwind CSS, and all required dependencies installed. Development server running successfully on port 5000.

## Recent Changes
- **2025-01-20**: Initial project setup
  - Configured Next.js 16 with App Router and TypeScript
  - Installed React Hook Form, Zod, Framer Motion, date-fns, Zustand
  - Set up Tailwind CSS with custom theme
  - Created homepage with assessment type navigation
  - Configured development server on port 5000

## Project Architecture

### Technology Stack
- **Frontend Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.17
- **Form Management**: React Hook Form 7.66.1 with Zod 4.1.12 validation
- **State Management**: Zustand 5.0.8
- **Animations**: Framer Motion 12.23.24
- **Date Handling**: date-fns 4.1.0

### Directory Structure
```
├── app/                          # Next.js App Router pages
│   ├── assessments/             # Assessment form pages
│   │   ├── admission/           # Admission (ADM) assessment
│   │   ├── update-visit/        # HOPE Update Visit (HUV) assessment
│   │   └── discharge/           # Discharge (DC) assessment
│   ├── api/                     # API routes (for backend integration)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (buttons, inputs, etc.)
│   ├── forms/                   # Form-specific components
│   └── layout/                  # Layout components (headers, footers, nav)
├── lib/                         # Utility libraries
│   ├── utils/                   # Utility functions
│   ├── store/                   # Zustand state management stores
│   ├── schemas/                 # Zod validation schemas
│   └── constants/               # CMS constants and definitions
├── types/                       # TypeScript type definitions
└── public/                      # Static assets
```

### Key CMS Requirements
- **OMB Control Number**: 0938-1153
- **Compliance**: WCAG 2.1 AA, Section 508
- **Assessment Timepoints**:
  1. Admission (ADM) - Initial comprehensive assessment
  2. HOPE Update Visit (HUV) - Up to 2 periodic assessments within first 30 days
  3. Discharge (DC) - Final assessment at discharge

### HOPE Form Sections
All three assessment types share common sections:
- **Section A**: Administrative Information (Provider Numbers, Patient Demographics, Payer Information)
- **Section J**: Health Conditions (Death Imminent, Symptom Impact Screening)
- **Section M**: Skin Conditions (Types, Treatments)
- **Section N**: Medications (Scheduled/PRN Opioids, Bowel Regimen)
- **Section Z**: Record Administration (Signatures, Certifications)

### Development Notes
- Dev server binds to 0.0.0.0:5000 (required for Replit environment)
- Auto-save functionality will sync with backend API (to be implemented by user)
- Conditional logic implements CMS skip patterns per HOPE Guidance Manual
- All code includes inline comments explaining CMS business rules

## User Preferences
- Professional, clean UI inspired by Engrace Hospice design
- Smooth animations and transitions using Framer Motion
- Comprehensive inline code comments for backend developer integration
- Footer credit: "Designed by peterlightspeed" with portfolio link

## Next Steps
1. Complete TypeScript type definitions for all HOPE form sections
2. Build reusable form components with accessibility features
3. Implement Section A-Z components for each assessment type
4. Add conditional logic and skip patterns
5. Implement auto-save functionality
6. Create validation schemas for all fields
7. Test end-to-end across all three assessment types
