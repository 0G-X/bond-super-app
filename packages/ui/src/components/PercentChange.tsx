"use client";

import { Text, type TextProps } from "@mantine/core";
import { bondColors } from "../theme";

export interface PercentChangeProps extends Omit<TextProps, "children"> {
  /** The percentage value to display (e.g., 5.25 for 5.25%) */
  value: number;
  /** Number of decimal places (default: 2) */
  decimals?: number;
  /** Whether to show the +/- sign (default: true) */
  showSign?: boolean;
  /** Whether to show the % symbol (default: true) */
  showPercent?: boolean;
  /** Use monospace font for alignment (default: true) */
  mono?: boolean;
  /** Invert colors (green for negative, red for positive) - useful for showing expense changes */
  invertColors?: boolean;
}

/**
 * Formats a percentage value as a string
 */
function formatPercent(
  value: number,
  decimals: number,
  showSign: boolean,
  showPercent: boolean
): string {
  const absValue = Math.abs(value);
  const formatted = absValue.toFixed(decimals);
  const sign = showSign ? (value >= 0 ? "+" : "-") : value < 0 ? "-" : "";
  const percent = showPercent ? "%" : "";

  return `${sign}${formatted}${percent}`;
}

/**
 * Gets the color based on the value and invert setting
 */
function getColor(value: number, invertColors: boolean): string {
  if (value === 0) {
    return "dimmed";
  }

  const isPositive = value > 0;

  if (invertColors) {
    return isPositive ? bondColors.error : bondColors.success;
  }

  return isPositive ? bondColors.success : bondColors.error;
}

/**
 * Bond PercentChange component
 *
 * Displays percentage changes with automatic green/red coloring.
 * Perfect for showing price changes, returns, and performance metrics.
 *
 * Features:
 * - Automatic coloring: green for positive, red for negative
 * - Optional sign display (+/-)
 * - Configurable decimal places
 * - Monospace font for alignment in tables
 * - Invertible colors (for cases where negative is good)
 *
 * @example
 * ```tsx
 * // Basic usage - positive value (green)
 * <PercentChange value={5.25} />
 * // Output: +5.25% (green)
 *
 * // Negative value (red)
 * <PercentChange value={-3.50} />
 * // Output: -3.50% (red)
 *
 * // No sign
 * <PercentChange value={2.00} showSign={false} />
 * // Output: 2.00%
 *
 * // Custom decimals
 * <PercentChange value={12.3456} decimals={1} />
 * // Output: +12.3%
 *
 * // Inverted colors (for expenses where decrease is good)
 * <PercentChange value={-10} invertColors />
 * // Output: -10.00% (green - because decrease is good)
 * ```
 */
export function PercentChange({
  value,
  decimals = 2,
  showSign = true,
  showPercent = true,
  mono = true,
  invertColors = false,
  ...textProps
}: PercentChangeProps) {
  const formattedPercent = formatPercent(value, decimals, showSign, showPercent);
  const color = getColor(value, invertColors);

  return (
    <Text
      component="span"
      ff={mono ? "monospace" : undefined}
      c={color}
      {...textProps}
    >
      {formattedPercent}
    </Text>
  );
}

export default PercentChange;
