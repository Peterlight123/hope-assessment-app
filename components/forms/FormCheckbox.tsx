/**
 * FormCheckbox Component
 * 
 * Single accessible checkbox integrated with React Hook Form.
 * WCAG 2.1 AA compliant with keyboard navigation and screen reader support.
 * 
 * ACCESSIBILITY FEATURES:
 * - Keyboard accessible (Space to toggle)
 * - Properly associated label (clicking label toggles checkbox)
 * - Clear focus indicator
 * - Screen reader announces checked state
 * 
 * BACKEND INTEGRATION NOTES:
 * - Checkbox value submitted as boolean (true/false)
 * - For CMS "check all that apply" fields, use FormCheckboxGroup
 * - Individual checkboxes useful for Y/N questions
 * 
 * USAGE EXAMPLE:
 * <FormCheckbox
 *   label="Is an interpreter needed?"
 *   name="A1110B"
 *   form={form}
 *   guidance="Determine if patient requires language interpretation services"
 * />
 */

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GuidanceTooltip } from "./GuidanceTooltip";
import { UseFormReturn, Controller } from "react-hook-form";

interface FormCheckboxProps {
  /** Checkbox label displayed to user */
  label: string;
  /** Field name matching HOPE form specification */
  name: string;
  /** React Hook Form instance */
  form: UseFormReturn<any>;
  /** CMS guidance text for tooltip */
  guidance?: string;
  /** Field description for additional context */
  description?: string;
  /** Whether checkbox is disabled */
  disabled?: boolean;
}

export function FormCheckbox({
  label,
  name,
  form,
  guidance,
  description,
  disabled = false,
}: FormCheckboxProps) {
  const error = form.formState.errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="space-y-2">
      {/* 
        CHECKBOX WITH LABEL AND REACT HOOK FORM CONTROLLER
        WCAG 2.1 SC 1.3.1: Info and Relationships
        - Label properly associated with checkbox via htmlFor and id
        - Clicking label toggles checkbox (larger hit target)
        - Controller ensures field is registered with RHF and casts to boolean
      */}
      <div className="flex items-start gap-3">
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => (
            <Checkbox
              id={name}
              checked={field.value || false}
              onCheckedChange={(checked) => {
                // Cast CheckedState to boolean for CMS compliance
                // Radix UI checkbox can return true | false | "indeterminate"
                // CMS fields require strict boolean values
                field.onChange(checked === true);
              }}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={
                errorMessage 
                  ? `${name}-error${description ? ` ${name}-description` : ''}`
                  : description 
                  ? `${name}-description` 
                  : undefined
              }
              className={error ? "border-destructive" : ""}
            />
          )}
        />
        <div className="flex items-center gap-2 flex-1">
          <Label
            htmlFor={name}
            className="text-sm font-normal cursor-pointer leading-normal"
          >
            {label}
          </Label>
          {guidance && (
            <GuidanceTooltip 
              content={guidance} 
              fieldId={`${name} - ${label}`} 
            />
          )}
        </div>
      </div>

      {/* Optional description */}
      {description && (
        <p className="text-sm text-muted-foreground ml-7" id={`${name}-description`}>
          {description}
        </p>
      )}

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <p 
          id={`${name}-error`}
          className="text-sm text-destructive ml-7"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
