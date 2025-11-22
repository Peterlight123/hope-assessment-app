/**
 * Frequently Asked Questions for HOPE Assessment
 * Used by the FAQ Chatbot to answer common user questions
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[]; // For keyword matching
}

export const FAQS: FAQ[] = [
  {
    id: "what-is-hope",
    question: "What is HOPE Assessment?",
    answer:
      "HOPE (Hospice Outcomes and Patient Evaluation) v1.01 is a CMS-required standardized assessment tool used by hospice organizations to collect comprehensive patient data. It ensures compliance with CMS regulations and improves quality of care.",
    keywords: ["hope", "what", "assessment", "cms"],
  },
  {
    id: "three-types",
    question: "What are the three assessment types?",
    answer:
      "The three main HOPE assessment types are: (1) Admission (ADM) - initial comprehensive assessment at hospice admission, (2) Update Visit (HUV) - periodic reassessment during first 30 days, and (3) Discharge (DC) - final assessment upon discharge from hospice.",
    keywords: ["types", "admission", "update", "discharge", "three"],
  },
  {
    id: "save-draft",
    question: "How do I save my work as a draft?",
    answer:
      "Click the 'Save Draft' button in the top-right corner of any assessment form. Your progress will be saved locally, allowing you to return and complete the form later without losing any data.",
    keywords: ["save", "draft", "progress", "work"],
  },
  {
    id: "required-fields",
    question: "Which fields are required?",
    answer:
      "All fields marked with a red asterisk (*) are required per CMS regulations. The assessment cannot be submitted without completing all required fields. Our system validates this automatically before submission.",
    keywords: ["required", "fields", "asterisk", "mandatory"],
  },
  {
    id: "skip-patterns",
    question: "What are skip patterns?",
    answer:
      "Skip patterns are conditional logic rules that show or hide certain fields based on your responses to other questions. This ensures you only answer questions relevant to the patient's situation and improves assessment accuracy.",
    keywords: ["skip", "patterns", "conditional", "logic", "hidden"],
  },
  {
    id: "dates-format",
    question: "How should I enter dates?",
    answer:
      "All dates should be entered in MM/DD/YYYY format using the date picker provided in the form. The system will validate that dates are logical (e.g., admission date cannot be after current assessment date).",
    keywords: ["dates", "format", "mm/dd/yyyy", "entry"],
  },
  {
    id: "section-a",
    question: "What is Section A?",
    answer:
      "Section A collects Administrative Information including type of record, provider numbers, patient demographics, admission/assessment dates, and payer information. This section establishes the assessment context and patient identity.",
    keywords: ["section", "a", "administrative", "patient", "demographics"],
  },
  {
    id: "section-j",
    question: "What does Section J cover?",
    answer:
      "Section J assesses Health Conditions including whether death is imminent and symptom impact screening (pain, dyspnea, nausea/vomiting, constipation). It helps identify patient needs and guide care planning.",
    keywords: ["section", "j", "health", "conditions", "symptoms"],
  },
  {
    id: "section-m",
    question: "What is Section M about?",
    answer:
      "Section M addresses Skin Conditions, documenting the presence of pressure injuries, stasis ulcers, and surgical wounds. It tracks skin integrity and treatments to prevent complications.",
    keywords: ["section", "m", "skin", "conditions", "wounds"],
  },
  {
    id: "section-n",
    question: "What does Section N include?",
    answer:
      "Section N covers Medications, specifically tracking scheduled and PRN opioid use and bowel regimen management. It's critical for managing pain and preventing opioid-related complications like constipation.",
    keywords: ["section", "n", "medications", "opioid", "bowel"],
  },
  {
    id: "section-z",
    question: "What is Section Z?",
    answer:
      "Section Z is Record Administration, capturing the assessment completion date, signatures from clinical staff and supervisors, and verification information. It ensures accountability and documentation of assessment review.",
    keywords: ["section", "z", "record", "administration", "signature"],
  },
  {
    id: "validation-errors",
    question: "I'm getting validation errors. What should I do?",
    answer:
      "Validation errors appear when required fields are empty or contain invalid data. Check the error messages, complete all red-marked fields, ensure dates are in correct format, and verify all answers are properly selected before resubmitting.",
    keywords: ["validation", "error", "required", "fix", "submit"],
  },
  {
    id: "accessibility",
    question: "Is this tool accessible?",
    answer:
      "Yes! The HOPE Assessment platform is WCAG 2.1 AA compliant, supporting keyboard navigation, screen readers, and high contrast modes. All form fields have clear labels and helpful tooltips.",
    keywords: ["accessible", "accessibility", "wcag", "keyboard", "screen reader"],
  },
  {
    id: "dark-mode",
    question: "How do I enable dark mode?",
    answer:
      "Click the moon/sun icon in the header to toggle between light and dark mode. Your preference is saved automatically and will be remembered on future visits.",
    keywords: ["dark", "mode", "theme", "light", "toggle"],
  },
  {
    id: "support",
    question: "Where can I get help?",
    answer:
      "You can use this chatbot to ask questions about HOPE assessment. For technical issues or CMS compliance questions, contact your system administrator or refer to the CMS HOPE v1.01 documentation.",
    keywords: ["help", "support", "contact", "question", "assistance"],
  },
];
