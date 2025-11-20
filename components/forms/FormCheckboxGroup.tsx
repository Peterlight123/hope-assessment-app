/**
 * FormCheckboxGroup Component
 * 
 * Group of checkboxes for CMS "check all that apply" fields.
 * WCAG 2.1 AA compliant with proper grouping and keyboard navigation.
 * 
 * ACCESSIBILITY FEATURES:
 * - Fieldset/legend for proper grouping
 * - Keyboard navigation (Tab between checkboxes, Space to toggle)
 * - Screen readers announce group context
 * - Required indicator when applicable
 * - Each option has optional guidance tooltip
 * 
 * CMS BUSINESS LOGIC:
 * - Used for multi-select fields like:
 *   - A1005 (Ethnicity - Check all that apply)
 *   - A1010 (Race - Check all that apply)
 *   - A1400 (Payer Information - Check all that apply)
 *   - M1195 (Skin Condition Types - Check all that apply)
 *   - M1200 (Skin Treatments - Check all that apply)
 * 
 * - Some groups have mutually exclusive options (e.g., "Z - None of the above")
 *   The parent component should implement this logic using React Hook Form's watch()
 * 
 * BACKEND INTEGRATION NOTES:
 * - Data submitted as object with boolean values: { A: true, B: false, C: true, ... }
 * - Example: ethnicity: { A: false, B: true, C: false, D: false, E: false, X: false, Y: false }
 * - Backend should validate at least one option selected (unless all "No" answers valid)
 * 
 * USAGE EXAMPLE:
 * <FormCheckboxGroup
 *   legend="Ethnicity"
 *   name="A1005"
 *   form={form}
 *   options={ETHNICITY_OPTIONS}
 *   required
 *   description="Check all that apply"
 *   guidance="Patients should be asked to self-report ethnicity..."
 * />
 */

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GuidanceTooltip } from "./GuidanceTooltip";
import { UseFormReturn, Controller } from "react-hook-form";

interface CheckboxOption {
  value: string;
  label: string;
  /** Optional individual guidance for this specific option */
  guidance?: string;
}

interface FormCheckboxGroupProps {
  /** Group legend/label (e.g., "Ethnicity", "Race") */
  legend: string;
  /** Base field name (e.g., "A1005" for ethnicity) */
  name: string;
  /** React Hook Form instance */
  form: UseFormReturn<any>;
  /** Array of checkbox options from CMS constants */
  options: readonly CheckboxOption[];
  /** Whether at least one selection is required */
  required?: boolean;
  /** Description text (e.g., "Check all that apply") */
  description?: string;
  /** Overall CMS guidance for this group */
  guidance?: string;
  /** Whether entire group is disabled */
  disabled?: boolean;
}

export function FormCheckboxGroup({
  legend,
  name,
  form,
  options,
  required = false,
  description,
  guidance,
  disabled = false,
}: FormCheckboxGroupProps) {
  const error = form.formState.errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <fieldset className="space-y-4">
      {/* 
        FIELDSET/LEGEND for proper grouping
        WCAG 2.1 SC 1.3.1: Info and Relationships
        - Fieldset groups related checkboxes
        - Legend provides context announced by screen readers
      */}
      <div className="flex items-center gap-2">
        <legend className="text-sm font-medium">
          {legend}
          {required && (
            <span className="text-destructive ml-1" aria-label="required">
              *
            </span>
          )}
        </legend>
        {guidance && (
          <GuidanceTooltip 
            content={guidance} 
            fieldId={`${name} - ${legend}`} 
          />
        )}
      </div>

      {/* Group description (e.g., "Check all that apply") */}
      {description && (
        <p className="text-sm text-muted-foreground" id={`${name}-description`}>
          {description}
        </p>
      )}

      {/* 
        CHECKBOX LIST WITH REACT HOOK FORM CONTROLLERS
        - Each checkbox is a separate field registered with RHF via Controller
        - Field naming: {name}.{optionValue} (e.g., A1005.A, A1005.B)
        - Individual keyboard navigation between items
        - CheckedState properly cast to boolean for CMS compliance
        
        BACKEND NOTE:
        - Submitted as nested object: { A1005: { A: true, B: false, C: false, ... } }
        - Must validate that at least one is checked if required
        - Handle mutually exclusive options (e.g., Z="None" excludes others)
        - Each field is properly registered with RHF for validation and submission
      */}
      <div 
        className="space-y-3"
        role="group"
        aria-describedby={
          errorMessage 
            ? `${name}-error${description ? ` ${name}-description` : ''}`
            : description 
            ? `${name}-description` 
            : undefined
        }
      >
        {options.map((option) => {
          const fieldName = `${name}.${option.value}`;
          
          return (
            <div key={option.value} className="flex items-start gap-3">
              <Controller
                name={fieldName}
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    id={fieldName}
                    checked={field.value || false}
                    onCheckedChange={(checked) => {
                      /**
                       * CMS MUTUAL EXCLUSIVITY RULE:
                       * Option "Z" (None of the above) is mutually exclusive with other options
                       * 
                       * LOGIC:
                       * 1. If checking "Z", uncheck all other options in this group
                       * 2. If checking any other option, uncheck "Z" if it's selected
                       * 
                       * This ensures CMS-compliant data where "None of the above"
                       * cannot coexist with actual selections
                       */
                      const isZOption = option.value === "Z";
                      const isBeingChecked = checked === true;

                      if (isZOption && isBeingChecked) {
                        // Checking "Z" - uncheck all other options
                        options.forEach((opt) => {
                          if (opt.value !== "Z") {
                            form.setValue(`${name}.${opt.value}`, false);
                          }
                        });
                      } else if (!isZOption && isBeingChecked) {
                        // Checking a regular option - uncheck "Z" if it's selected
                        const zFieldName = `${name}.Z`;
                        const zValue = form.getValues(zFieldName);
                        if (zValue === true) {
                          form.setValue(zFieldName, false);
                        }
                      }

                      // Cast CheckedState to boolean for CMS compliance
                      // Prevents "indeterminate" string from leaking into form data
                      field.onChange(checked === true);
                    }}
                    disabled={disabled}
                    className="mt-0.5"
                  />
                )}
              />
              <div className="flex items-center gap-2 flex-1">
                <Label
                  htmlFor={fieldName}
                  className="text-sm font-normal cursor-pointer leading-normal"
                >
                  {option.label}
                </Label>
                {option.guidance && (
                  <GuidanceTooltip 
                    content={option.guidance} 
                    fieldId={`${fieldName} - ${option.label}`} 
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        ERROR MESSAGE
        WCAG 2.1 SC 3.3.1: Error Identification
        - Displays if group validation fails (e.g., no options selected)
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
    </fieldset>
  );
}
