/**
 * FormSelect Component
 * 
 * Accessible dropdown select field integrated with React Hook Form.
 * WCAG 2.1 AA compliant with keyboard navigation and screen reader support.
 * 
 * ACCESSIBILITY FEATURES:
 * - Keyboard navigable (Arrow keys, Enter, Escape)
 * - Screen reader friendly with proper ARIA attributes
 * - Required indicator for mandatory fields
 * - Error messages properly associated
 * - Clear visual focus states
 * 
 * BACKEND INTEGRATION NOTES:
 * - Options array should come from lib/constants/cms-codes.ts
 * - Selected value submitted as string matching CMS code values
 * - Example: A0250 (Reason for Record) = "1" for Admission
 * 
 * USAGE EXAMPLE:
 * <FormSelect
 *   label="Type of Record"
 *   name="A0050"
 *   form={form}
 *   required
 *   options={RECORD_TYPES}
 *   placeholder="Select record type"
 *   guidance="Indicates whether this is a new, modified, or inactivated record..."
 * />
 */

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { GuidanceTooltip } from "./GuidanceTooltip";
import { UseFormReturn, Controller } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  /** Field label displayed to user */
  label: string;
  /** Field name matching HOPE form specification */
  name: string;
  /** React Hook Form instance */
  form: UseFormReturn<any>;
  /** Array of CMS-compliant options from constants */
  options: readonly SelectOption[];
  /** Whether field is required per CMS rules */
  required?: boolean;
  /** Placeholder text when no selection made */
  placeholder?: string;
  /** CMS guidance text for tooltip */
  guidance?: string;
  /** Field description for additional context */
  description?: string;
  /** Whether field is disabled */
  disabled?: boolean;
}

export function FormSelect({
  label,
  name,
  form,
  options,
  required = false,
  placeholder = "Select an option",
  guidance,
  description,
  disabled = false,
}: FormSelectProps) {
  const error = form.formState.errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="space-y-2">
      {/* 
        LABEL WITH REQUIRED INDICATOR
        WCAG 2.1 SC 3.3.2: Labels or Instructions
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

      {/* Optional description */}
      {description && (
        <p className="text-sm text-muted-foreground" id={`${name}-description`}>
          {description}
        </p>
      )}

      {/* 
        SELECT DROPDOWN WITH REACT HOOK FORM CONTROLLER
        - Controller registers field with React Hook Form for validation and submission
        - Shadcn Select component provides keyboard navigation
        - Options populated from CMS constants for data integrity
        
        KEYBOARD SUPPORT:
        - Space/Enter: Open dropdown
        - Arrow keys: Navigate options
        - Enter: Select option
        - Escape: Close dropdown
        
        BACKEND NOTE:
        - Selected value format: CMS code string (e.g., "1", "01", "A")
        - Validate against CMS code inventory on backend
        - Controller ensures field is registered with form state and appears in submission
      */}
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <Select
            value={field.value || ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={name}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={
                errorMessage 
                  ? `${name}-error${description ? ` ${name}-description` : ''}`
                  : description 
                  ? `${name}-description` 
                  : undefined
              }
              className={error ? "border-destructive focus-visible:ring-destructive" : ""}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {/* 
                OPTIONS FROM CMS CONSTANTS
                - value: CMS code (e.g., "1", "2", "A", "B")
                - label: Human-readable description
              */}
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* ERROR MESSAGE - WCAG 2.1 SC 3.3.1: Error Identification */}
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
