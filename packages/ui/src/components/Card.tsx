"use client";

import {
  Card as MantineCard,
  type CardProps as MantineCardProps,
} from "@mantine/core";
import type { ReactNode } from "react";

export interface CardProps extends MantineCardProps {
  /** Card content */
  children: ReactNode;
}

/**
 * Bond Card component
 *
 * A styled card container with Bond dark theme defaults.
 * Wraps Mantine Card with Bond-specific styling.
 *
 * Default props:
 * - padding: "lg"
 * - radius: "md"
 * - withBorder: false
 * - dark background color
 *
 * @example
 * ```tsx
 * <Card>
 *   <Text>Card content</Text>
 * </Card>
 *
 * <Card padding="xl" shadow="md">
 *   <Card.Section>
 *     <Image src="..." />
 *   </Card.Section>
 *   <Text>Description</Text>
 * </Card>
 * ```
 */
export function Card({ children, ...props }: CardProps) {
  return <MantineCard {...props}>{children}</MantineCard>;
}

// Re-export Card.Section for convenience
Card.Section = MantineCard.Section;

export default Card;
