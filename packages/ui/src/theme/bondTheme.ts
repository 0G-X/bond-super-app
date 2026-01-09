"use client";

import { createTheme, type MantineColorsTuple } from "@mantine/core";

/**
 * Bond color palette constants
 */
export const bondColors = {
  // Primary blue
  primary: "#3b82f6",
  // Success/Long green
  success: "#22c55e",
  long: "#22c55e",
  // Error/Short red
  error: "#ef4444",
  short: "#ef4444",
  // Background colors (dark theme)
  bgDarkest: "#0d0d0d",
  bgDark: "#141414",
  bgMedium: "#1f1f1f",
} as const;

// Primary blue shades (based on #3b82f6)
const bondBlue: MantineColorsTuple = [
  "#eff6ff",
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6", // primary - shade 5
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
];

// Success/Long green shades (based on #22c55e)
const bondGreen: MantineColorsTuple = [
  "#f0fdf4",
  "#dcfce7",
  "#bbf7d0",
  "#86efac",
  "#4ade80",
  "#22c55e", // success - shade 5
  "#16a34a",
  "#15803d",
  "#166534",
  "#14532d",
];

// Error/Short red shades (based on #ef4444)
const bondRed: MantineColorsTuple = [
  "#fef2f2",
  "#fee2e2",
  "#fecaca",
  "#fca5a5",
  "#f87171",
  "#ef4444", // error - shade 5
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#7f1d1d",
];

// Dark background shades
const bondDark: MantineColorsTuple = [
  "#C1C2C5", // text color
  "#A6A7AB",
  "#909296",
  "#5C5F66",
  "#373A40",
  "#2C2E33",
  "#1f1f1f", // bgMedium - shade 6
  "#141414", // bgDark - shade 7
  "#0d0d0d", // bgDarkest - shade 8
  "#080808",
];

/**
 * Bond theme configuration for Mantine 8
 * - Dark mode by default
 * - Custom color palette optimized for trading
 * - Inter for sans-serif, JetBrains Mono for monospace
 * - Default radius: md
 */
export const bondTheme = createTheme({
  // Font configuration
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  fontFamilyMonospace:
    "JetBrains Mono, ui-monospace, SFMono-Regular, Monaco, Consolas, monospace",
  headings: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  },

  // Default border radius
  defaultRadius: "md",

  // Color scheme
  primaryColor: "blue",
  primaryShade: { light: 6, dark: 5 },

  // Custom colors
  colors: {
    blue: bondBlue,
    green: bondGreen,
    red: bondRed,
    dark: bondDark,
  },

  // Cursor type
  cursorType: "pointer",

  // Component defaults
  components: {
    Button: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        padding: "lg",
        withBorder: false,
      },
      styles: {
        root: {
          backgroundColor: bondColors.bgDark,
        },
      },
    },
    Modal: {
      defaultProps: {
        radius: "md",
        padding: "lg",
        centered: true,
      },
      styles: {
        content: {
          backgroundColor: bondColors.bgDark,
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    NumberInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          backgroundColor: bondColors.bgDark,
        },
      },
    },
  },
});

export default bondTheme;

export type BondTheme = typeof bondTheme;
