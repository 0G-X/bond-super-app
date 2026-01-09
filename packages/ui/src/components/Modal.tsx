"use client";

import {
  Modal as MantineModal,
  type ModalProps as MantineModalProps,
} from "@mantine/core";
import type { ReactNode } from "react";

export interface ModalProps extends MantineModalProps {
  /** Modal content */
  children: ReactNode;
}

/**
 * Bond Modal component
 *
 * A styled modal dialog with Bond dark theme defaults.
 * Wraps Mantine Modal with Bond-specific styling.
 *
 * Default props:
 * - centered: true
 * - padding: "lg"
 * - radius: "md"
 * - dark background color
 *
 * @example
 * ```tsx
 * const [opened, { open, close }] = useDisclosure(false);
 *
 * <Button onClick={open}>Open Modal</Button>
 *
 * <Modal opened={opened} onClose={close} title="Confirm Action">
 *   <Text>Are you sure you want to proceed?</Text>
 *   <Group mt="md" justify="flex-end">
 *     <Button variant="ghost" onClick={close}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *   </Group>
 * </Modal>
 * ```
 */
export function Modal({ children, ...props }: ModalProps) {
  return <MantineModal {...props}>{children}</MantineModal>;
}

export default Modal;
