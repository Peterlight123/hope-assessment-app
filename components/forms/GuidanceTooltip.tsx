/**
 * GuidanceTooltip Component
 * 
 * Displays CMS HOPE guidance text in an accessible popover tooltip.
 * WCAG 2.1 AA Compliant - provides alternative access to information
 * without relying solely on hover (supports keyboard navigation).
 * 
 * ACCESSIBILITY FEATURES:
 * - Keyboard accessible (Space/Enter to open)
 * - Focus management with visible focus indicator
 * - ARIA labels for screen readers
 * - Icon button with descriptive label
 * 
 * USAGE:
 * <GuidanceTooltip 
 *   content="CMS guidance text here" 
 *   fieldId="A0100C"
 * />
 */

"use client";

import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface GuidanceTooltipProps {
  /** CMS guidance text to display */
  content: string;
  /** Field ID for screen reader context (e.g., "A0100C - Branch ID") */
  fieldId: string;
}

export function GuidanceTooltip({ content, fieldId }: GuidanceTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* 
          ACCESSIBILITY NOTE:
          - aria-label provides context for screen readers
          - Keyboard accessible (Space/Enter opens popover)
          - Visible focus ring via focus-visible
          - Icon clearly indicates help is available
        */}
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`Show guidance for ${fieldId}`}
        >
          <Info className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 text-sm"
        side="right"
        align="start"
        /*
          WCAG 2.1 Success Criterion 1.4.13: Content on Hover or Focus
          - Content remains visible while focused
          - Can be dismissed with Escape key (built into Popover)
        */
      >
        <div className="space-y-2">
          <p className="font-semibold text-foreground">CMS Guidance</p>
          <p className="text-muted-foreground">{content}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
