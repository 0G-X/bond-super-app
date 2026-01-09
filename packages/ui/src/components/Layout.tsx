"use client";

import {
  Stack as MantineStack,
  type StackProps as MantineStackProps,
  Group as MantineGroup,
  type GroupProps as MantineGroupProps,
  Container as MantineContainer,
  type ContainerProps as MantineContainerProps,
} from "@mantine/core";
import type { ReactNode } from "react";

// ============================================================================
// Stack
// ============================================================================

export interface StackProps extends MantineStackProps {
  /** Stack content */
  children: ReactNode;
}

/**
 * Bond Stack component
 *
 * A vertical flex container with Bond defaults.
 * Re-exports Mantine Stack with sensible defaults.
 *
 * Default props:
 * - gap: "md"
 *
 * @example
 * ```tsx
 * <Stack>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Stack>
 *
 * <Stack gap="xl" align="center">
 *   <Title>Heading</Title>
 *   <Text>Description</Text>
 * </Stack>
 * ```
 */
export function Stack({ children, gap = "md", ...props }: StackProps) {
  return (
    <MantineStack gap={gap} {...props}>
      {children}
    </MantineStack>
  );
}

// ============================================================================
// Group
// ============================================================================

export interface GroupProps extends MantineGroupProps {
  /** Group content */
  children: ReactNode;
}

/**
 * Bond Group component
 *
 * A horizontal flex container with Bond defaults.
 * Re-exports Mantine Group with sensible defaults.
 *
 * Default props:
 * - gap: "md"
 *
 * @example
 * ```tsx
 * <Group>
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </Group>
 *
 * <Group justify="space-between">
 *   <Text>Label</Text>
 *   <Text>Value</Text>
 * </Group>
 * ```
 */
export function Group({ children, gap = "md", ...props }: GroupProps) {
  return (
    <MantineGroup gap={gap} {...props}>
      {children}
    </MantineGroup>
  );
}

// ============================================================================
// Container
// ============================================================================

export interface ContainerProps extends MantineContainerProps {
  /** Container content */
  children: ReactNode;
}

/**
 * Bond Container component
 *
 * A centered container with max-width and padding.
 * Re-exports Mantine Container with Bond defaults.
 *
 * Default props:
 * - size: "lg"
 *
 * @example
 * ```tsx
 * <Container>
 *   <Title>Page Title</Title>
 *   <Text>Page content goes here...</Text>
 * </Container>
 *
 * <Container size="xl" px="md">
 *   <Stack>...</Stack>
 * </Container>
 * ```
 */
export function Container({ children, size = "lg", ...props }: ContainerProps) {
  return (
    <MantineContainer size={size} {...props}>
      {children}
    </MantineContainer>
  );
}
