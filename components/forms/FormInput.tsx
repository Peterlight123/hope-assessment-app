/**
 * FormInput Component
 * 
 * Accessible text input field integrated with React Hook Form.
 * WCAG 2.1 AA compliant with proper labels, error messaging, and guidance.
 * 
 * ACCESSIBILITY FEATURES:
 * - Properly associated label using htmlFor and id
 * - Error messages linked via aria-describedby
 * - Required fields indicated visually and to screen readers
 * - Clear focus states
 * - Optional guidance tooltip
 * 
 * BACKEND INTEGRATION NOTES:
 * - Uses React Hook Form register() for automatic form state management
 * - Error handling via React Hook Form's form state
 * - All form data will be submitted via POST to your API endpoint
 * - Field names should match HOPE form specification (e.g., "A0100C", "A0200")
 * 
 * USAGE EXAMPLE:
 * <FormInput
 *   label="Branch ID"
 *   name="A0100C"
 *   required
 *   placeholder="Enter 10-character branch identifier"
 *   guidance="The Branch ID consists of the first 6 digits of the CCN..."
 *   form={form}
 *   maxLength={10}
 * />
 */

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GuidanceTooltip } from "./GuidanceTooltip";
import { UseFormReturn } from "react-hook-form";

interface FormInputProps {
  /** Field label displayed to user */
  label: string;
  /** Field name matching HOPE form specification */
  name: string;
  /** React Hook Form instance */
  form: UseFormReturn<any>;
  /** Whether field is required per CMS rules */
  required?: boolean;
  /** Placeholder text for empty field */
  placeholder?: string;
  /** CMS guidance text for tooltip */
  guidance?: string;
  /** HTML input type (text, email, tel, etc.) */
  type?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Field description for additional context */
  description?: string;
  /** Whether field is disabled */
  disabled?: boolean;
}

export function FormInput({
  label,
  name,
  form,
  required = false,
  placeholder,
  guidance,
  type = "text",
  maxLength,
  description,
  disabled = false,
}: FormInputProps) {
  const error = form.formState.errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="space-y-2">
      {/* 
        WCAG 2.1 SC 3.3.2: Labels or Instructions
        - Label is programmatically associated with input via htmlFor
        - Required indicator is both visual and announced to screen readers
      */}
      <div className="flex items-center gap-2">
        <Label 
          htmlFor={name}
          className="text-sm font-medium"
        >
          {label}
          {required && (
            <span className="text-destructive ml-1" aria-label="required">
              *
            </span>
          )}
        </Label>
        {guidance && (
          <GuidanceTooltip 
            content={guidance} 
            fieldId={`${name} - ${label}`} 
          />
        )}
      </div>

      {/* Optional description for additional context */}
      {description && (
        <p className="text-sm text-muted-foreground" id={`${name}-description`}>
          {description}
        </p>
      )}

      {/* 
        INPUT FIELD
        - id matches Label's htmlFor for proper association
        - aria-required for screen reader announcement
        - aria-invalid indicates validation state
        - aria-describedby links to error message when present
        - maxLength enforces CMS field length requirements
        
        BACKEND NOTE:
        - Field value accessible via form.getValues(name)
        - On submit, send to: POST /api/hope/assessments
        - Expect format: { [name]: string }
      */}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={
          errorMessage 
            ? `${name}-error${description ? ` ${name}-description` : ''}`
            : description 
            ? `${name}-description` 
            : undefined
        }
        {...form.register(name)}
        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
      />

      {/* 
        ERROR MESSAGE
        WCAG 2.1 SC 3.3.1: Error Identification
        - Error message linked to input via aria-describedby
        - Announced to screen readers when validation fails
        - Visually distinct with red color and icon
      */}
      {errorMessage && (
        <p 
          id={`${name}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
