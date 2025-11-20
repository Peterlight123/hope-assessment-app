/**
 * FormDate Component
 * 
 * Accessible date picker integrated with React Hook Form.
 * WCAG 2.1 AA compliant with keyboard navigation and manual input support.
 * 
 * ACCESSIBILITY FEATURES:
 * - Keyboard navigable calendar popup (Arrow keys, Enter, Escape)
 * - Manual text input option for keyboard-only users
 * - Screen reader friendly with ARIA labels
 * - Clear date format instructions
 * - Focus management
 * 
 * CMS DATE FIELDS:
 * - All dates in YYYY-MM-DD format per CMS specification
 * - Common date fields:
 *   - A0220C: Assessment Reference Date
 *   - J2050.B: Symptom Screening Date
 *   - J2052.B: Symptom Follow-up Visit Date (must be within 2 days of J2050.B)
 *   - N0500.B: Scheduled Opioid Date
 *   - N0510.B: PRN Opioid Date
 *   - N0520.B: Bowel Regimen Date
 *   - Z0350: Assessment Completion Date
 * 
 * BACKEND INTEGRATION NOTES:
 * - Date submitted as string in YYYY-MM-DD format (ISO 8601)
 * - Backend should validate:
 *   1. Date format is correct
 *   2. Date relationships (e.g., completion date >= screening date)
 *   3. Future dates not allowed (except where CMS permits)
 *   4. SFV dates within 2 calendar days of screening
 * 
 * USAGE EXAMPLE:
 * <FormDate
 *   label="Assessment Reference Date"
 *   name="A0220C"
 *   form={form}
 *   required
 *   guidance="The date of the event or change that triggers this assessment..."
 *   minDate={admissionDate}
 *   maxDate={new Date()}
 * />
 */

"use client";

import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GuidanceTooltip } from "./GuidanceTooltip";
import { UseFormReturn, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormDateProps {
  /** Field label displayed to user */
  label: string;
  /** Field name matching HOPE form specification */
  name: string;
  /** React Hook Form instance */
  form: UseFormReturn<any>;
  /** Whether field is required per CMS rules */
  required?: boolean;
  /** CMS guidance text for tooltip */
  guidance?: string;
  /** Field description for additional context */
  description?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date (defaults to today) */
  maxDate?: Date;
  /** Whether field is disabled */
  disabled?: boolean;
}

export function FormDate({
  label,
  name,
  form,
  required = false,
  guidance,
  description,
  minDate,
  maxDate = new Date(),
  disabled = false,
}: FormDateProps) {
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

      {/* Optional description - includes format instructions */}
      {description && (
        <p className="text-sm text-muted-foreground" id={`${name}-description`}>
          {description}
        </p>
      )}

      {/* 
        HYBRID DATE INPUT WITH REACT HOOK FORM CONTROLLER
        Provides TWO input methods per WCAG 2.1 SC 2.1.1 (Keyboard):
        1. Text input for direct keyboard entry in YYYY-MM-DD format
        2. Calendar picker for visual date selection
        
        This dual approach ensures keyboard-only users can enter dates
        without relying on the calendar popup, addressing the architect's
        concern about keyboard accessibility.
      */}
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => {
          // Parse current value as Date object or undefined
          const selectedDate = field.value ? parse(field.value, "yyyy-MM-dd", new Date()) : undefined;
          const isValidDate = selectedDate && isValid(selectedDate);

          /**
           * Handle manual text input
           * Validates YYYY-MM-DD format and updates form state
           */
          const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            field.onChange(value);
            
            // Validate format YYYY-MM-DD
            if (value && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
              const parsedDate = parse(value, "yyyy-MM-dd", new Date());
              if (isValid(parsedDate)) {
                // Valid date format - trigger validation
                form.trigger(name);
              }
            }
          };

          /**
           * Handle calendar selection
           * Converts Date object to YYYY-MM-DD string for CMS compliance
           */
          const handleDateSelect = (date: Date | undefined) => {
            if (date) {
              const formattedDate = format(date, "yyyy-MM-dd");
              field.onChange(formattedDate);
            } else {
              field.onChange("");
            }
          };

          return (
            <div className="flex gap-2">
              {/* 
                TEXT INPUT - PRIMARY KEYBOARD METHOD
                WCAG 2.1 SC 2.1.1: Keyboard
                - Direct text entry in YYYY-MM-DD format
                - No mouse required for keyboard-only users
                - Format: YYYY-MM-DD (e.g., 2024-11-20)
                
                BACKEND NOTE:
                - Value already in CMS-compliant YYYY-MM-DD format
                - Validate format and date ranges on backend
              */}
              <Input
                id={name}
                type="text"
                placeholder="YYYY-MM-DD"
                value={field.value || ""}
                onChange={handleTextInput}
                disabled={disabled}
                maxLength={10}
                pattern="\d{4}-\d{2}-\d{2}"
                aria-required={required}
                aria-invalid={!!error}
                aria-describedby={
                  errorMessage 
                    ? `${name}-error${description ? ` ${name}-description` : ''}`
                    : description 
                    ? `${name}-description` 
                    : undefined
                }
                className={cn(
                  "flex-1",
                  error && "border-destructive focus-visible:ring-destructive"
                )}
              />

              {/* 
                CALENDAR PICKER - VISUAL ALTERNATIVE
                Provides visual date selection for users who prefer it
                Complements text input rather than replacing it
              */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "px-3",
                      error && "border-destructive"
                    )}
                    aria-label={`Open calendar to select ${label}`}
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={isValidDate ? selectedDate : undefined}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      if (minDate && date < minDate) return true;
                      if (maxDate && date > maxDate) return true;
                      return disabled;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          );
        }}
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
