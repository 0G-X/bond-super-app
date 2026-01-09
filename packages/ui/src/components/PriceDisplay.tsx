"use client";

import { Text, type TextProps } from "@mantine/core";
import { bondColors } from "../theme";

export type PriceColorMode = "positive" | "negative" | "neutral" | "auto";

export interface PriceDisplayProps extends Omit<TextProps, "children"> {
  /** The price value to display */
  value: number;
  /** Number of decimal places (default: 2) */
  decimals?: number;
  /** Currency symbol (default: "$") */
  currency?: string;
  /** Whether to show the currency symbol (default: true) */
  showCurrency?: boolean;
  /** Color mode: "positive" (green), "negative" (red), "neutral", or "auto" (based on value) */
  colorMode?: PriceColorMode;
  /** Use monospace font for alignment (default: true) */
  mono?: boolean;
  /** Show thousands separator (default: true) */
  showSeparator?: boolean;
}

/**
 * Formats a number as a price string
 */
function formatPrice(
  value: number,
  decimals: number,
  currency: string,
  showCurrency: boolean,
  showSeparator: boolean
): string {
  const absValue = Math.abs(value);
  const formatted = showSeparator
    ? absValue.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : absValue.toFixed(decimals);

  const sign = value < 0 ? "-" : "";
  const currencyPrefix = showCurrency ? currency : "";

  return `${sign}${currencyPrefix}${formatted}`;
}

/**
 * Gets the color based on the color mode and value
 */
function getColor(
  colorMode: PriceColorMode,
  value: number
): string | undefined {
  switch (colorMode) {
    case "positive":
      return bondColors.success;
    case "negative":
      return bondColors.error;
    case "auto":
      if (value > 0) return bondColors.success;
      if (value < 0) return bondColors.error;
      return undefined;
    case "neutral":
    default:
      return undefined;
  }
}

/**
 * Bond PriceDisplay component
 *
 * Displays formatted price values with optional coloring.
 * Ideal for showing asset prices, portfolio values, and trading amounts.
 *
 * Features:
 * - Automatic number formatting with thousands separators
 * - Configurable decimal places
 * - Optional currency symbol
 * - Color modes: positive (green), negative (red), neutral, or auto (based on value)
 * - Monospace font for alignment in tables
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PriceDisplay value={1234.56} />
 * // Output: $1,234.56
 *
 * // With color
 * <PriceDisplay value={1234.56} colorMode="positive" />
 * // Output: $1,234.56 (green)
 *
 * // Auto color based on value
 * <PriceDisplay value={-50.00} colorMode="auto" />
 * // Output: -$50.00 (red)
 *
 * // Custom formatting
 * <PriceDisplay
 *   value={1000000}
 *   decimals={0}
 *   currency="EUR "
 *   showSeparator
 * />
 * // Output: EUR 1,000,000
 * ```
 */
export function PriceDisplay({
  value,
  decimals = 2,
  currency = "$",
  showCurrency = true,
  colorMode = "neutral",
  mono = true,
  showSeparator = true,
  ...textProps
}: PriceDisplayProps) {
  const formattedPrice = formatPrice(
    value,
    decimals,
    currency,
    showCurrency,
    showSeparator
  );
  const color = getColor(colorMode, value);

  return (
    <Text
      component="span"
      ff={mono ? "monospace" : undefined}
      c={color}
      {...textProps}
    >
      {formattedPrice}
    </Text>
  );
}

export default PriceDisplay;
