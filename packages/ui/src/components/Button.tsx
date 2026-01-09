"use client";

import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
} from "@mantine/core";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export interface ButtonProps extends Omit<MantineButtonProps, "variant"> {
  /** Button variant: primary, secondary, danger, or ghost */
  variant?: ButtonVariant;
  /** Button content */
  children: ReactNode;
}

/**
 * Maps Bond button variants to Mantine button props
 */
function getVariantProps(variant: ButtonVariant): Partial<MantineButtonProps> {
  switch (variant) {
    case "primary":
      return {
        variant: "filled",
        color: "blue",
      };
    case "secondary":
      return {
        variant: "light",
        color: "blue",
      };
    case "danger":
      return {
        variant: "filled",
        color: "red",
      };
    case "ghost":
      return {
        variant: "subtle",
        color: "gray",
      };
    default:
      return {
        variant: "filled",
        color: "blue",
      };
  }
}

/**
 * Bond Button component
 *
 * A styled button with Bond-specific variants:
 * - primary: Filled blue button (default)
 * - secondary: Light blue button
 * - danger: Filled red button for destructive actions
 * - ghost: Subtle/transparent button
 *
 * @example
 * ```tsx
 * <Button variant="primary">Submit</Button>
 * <Button variant="danger" onClick={handleDelete}>Delete</Button>
 * <Button variant="ghost" size="sm">Cancel</Button>
 * ```
 */
export function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const variantProps = getVariantProps(variant);

  return (
    <MantineButton {...variantProps} {...props}>
      {children}
    </MantineButton>
  );
}

export default Button;
