"use client";

import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
  NumberInput as MantineNumberInput,
  type NumberInputProps as MantineNumberInputProps,
} from "@mantine/core";

export interface TextInputProps extends MantineTextInputProps {}

export interface NumberInputProps extends MantineNumberInputProps {}

/**
 * Bond TextInput component
 *
 * A styled text input with Bond dark theme defaults.
 * Wraps Mantine TextInput with Bond-specific styling.
 *
 * Default props:
 * - radius: "md"
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.currentTarget.value)}
 * />
 *
 * <TextInput
 *   label="Search"
 *   placeholder="Search..."
 *   leftSection={<IconSearch size={16} />}
 * />
 * ```
 */
export function TextInput(props: TextInputProps) {
  return <MantineTextInput {...props} />;
}

/**
 * Bond NumberInput component
 *
 * A styled number input with Bond dark theme defaults.
 * Wraps Mantine NumberInput with Bond-specific styling.
 * Ideal for trading quantities, prices, and percentages.
 *
 * Default props:
 * - radius: "md"
 *
 * @example
 * ```tsx
 * <NumberInput
 *   label="Quantity"
 *   placeholder="Enter quantity"
 *   value={quantity}
 *   onChange={setQuantity}
 *   min={0}
 *   step={1}
 * />
 *
 * <NumberInput
 *   label="Price"
 *   placeholder="0.00"
 *   decimalScale={2}
 *   prefix="$"
 *   thousandSeparator=","
 * />
 * ```
 */
export function NumberInput(props: NumberInputProps) {
  return <MantineNumberInput {...props} />;
}

export default TextInput;
