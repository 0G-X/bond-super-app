// @bond/ui - UI components package

// ============================================================================
// Theme
// ============================================================================
export { bondTheme, bondColors, type BondTheme } from "./theme";

// ============================================================================
// Bond Components (with Bond defaults)
// ============================================================================
export {
  // Base components
  Button,
  Card,
  Modal,
  TextInput,
  NumberInput,
  // Layout components
  Stack,
  Group,
  Container,
  // Trading components
  PriceDisplay,
  PercentChange,
} from "./components";

// Export types
export type {
  ButtonProps,
  ButtonVariant,
  CardProps,
  ModalProps,
  TextInputProps,
  NumberInputProps,
  StackProps,
  GroupProps,
  ContainerProps,
  PriceDisplayProps,
  PriceColorMode,
  PercentChangeProps,
} from "./components";

// ============================================================================
// Re-export Mantine core components (for components not wrapped by Bond)
// ============================================================================
export {
  MantineProvider,
  ColorSchemeScript,
  Paper,
  Text,
  Title,
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Center,
  Anchor,
  ActionIcon,
  Burger,
  Drawer,
  NavLink,
  UnstyledButton,
  Tooltip,
  Badge,
  Loader,
  Skeleton,
  Divider,
  Space,
  ThemeIcon,
  Avatar,
  Image,
  AppShell,
  Menu,
  Overlay,
  ScrollArea,
  Tabs,
  Transition,
  rem,
  useMantineTheme,
  useMantineColorScheme,
  // Input components (not wrapped, use TextInput/NumberInput from Bond)
  Select,
  Checkbox,
  Radio,
  Switch,
  Textarea,
  PasswordInput,
  // Progress indicators
  Progress,
  RingProgress,
  // Table (basic Mantine table)
  Table,
} from "@mantine/core";

// ============================================================================
// Re-export Mantine hooks
// ============================================================================
export {
  useDisclosure,
  useMediaQuery,
  useViewportSize,
  useClickOutside,
  useHotkeys,
  useLocalStorage,
  useDebouncedValue,
  useToggle,
  useClipboard,
  useCounter,
  useInterval,
  useTimeout,
  useWindowScroll,
} from "@mantine/hooks";

// ============================================================================
// Re-export notifications
// ============================================================================
export { Notifications, notifications } from "@mantine/notifications";

// ============================================================================
// Re-export mantine-datatable for tables
// ============================================================================
export { DataTable } from "mantine-datatable";
export type { DataTableProps, DataTableColumn } from "mantine-datatable";

// ============================================================================
// Types
// ============================================================================
export type { MantineTheme, MantineColorScheme } from "@mantine/core";
