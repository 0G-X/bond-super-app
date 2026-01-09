"use client";

import type { ReactNode } from "react";
import {
  MantineProvider,
  bondTheme,
  Notifications,
} from "@bond/ui";
import { WalletProvider } from "@bond/wallet";

// Import Mantine styles
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

interface RootProviderProps {
  children: ReactNode;
}

/**
 * RootProvider - Combines all app providers
 * - MantineProvider: UI theme and components
 * - WalletProvider: Wallet connection and state
 * - Notifications: Toast notifications
 */
export function RootProvider({ children }: RootProviderProps) {
  return (
    <MantineProvider theme={bondTheme} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <WalletProvider>
        {children}
      </WalletProvider>
    </MantineProvider>
  );
}

export default RootProvider;
