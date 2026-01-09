"use client";

import { PrivyProvider, type PrivyClientConfig } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { zeroGMainnet, zeroGTestnet, supportedChains } from "./chains";

/**
 * Privy App ID from environment variable
 * Falls back to empty string for development (Privy will show an error in console)
 */
const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "";

/**
 * Wagmi configuration for the Bond Super App
 */
export const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: {
    [zeroGMainnet.id]: http(),
    [zeroGTestnet.id]: http(),
  },
});

/**
 * React Query client instance
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Privy configuration for the Bond Super App
 * Features:
 * - Embedded wallets with automatic creation for users without wallets
 * - Delegated actions support (configure noPromptOnSignature in Privy Dashboard)
 * - Dark theme with blue accent
 * - Email, Google, Twitter, and wallet login methods
 *
 * Note: For delegated signing without popups, use the useDelegatedSigner hook
 * after the user has delegated their wallet via useHeadlessDelegatedActions.
 * Configure signature prompts in Privy Dashboard > Embedded Wallets settings.
 */
const privyConfig: PrivyClientConfig = {
  // Embedded wallet configuration
  embeddedWallets: {
    // Automatically create embedded wallets for users who don't have one
    createOnLogin: "users-without-wallets",
    // Note: noPromptOnSignature is now configured via Privy Dashboard
    // Users need to delegate their wallet for popup-free signing
  },
  // Login methods
  loginMethods: ["email", "google", "twitter", "wallet"],
  // UI appearance
  appearance: {
    theme: "dark",
    accentColor: "#3B82F6", // Blue accent (Tailwind blue-500)
    logo: undefined, // Can be set to Bond logo URL later
  },
  // Legal configuration (optional - can be set later)
  legal: {
    termsAndConditionsUrl: undefined,
    privacyPolicyUrl: undefined,
  },
  // Default chain for the app
  defaultChain: zeroGMainnet,
  // Supported chains
  supportedChains: [...supportedChains],
};

export interface WalletProviderProps {
  children: ReactNode;
  /**
   * Optional Privy App ID override
   * If not provided, uses NEXT_PUBLIC_PRIVY_APP_ID environment variable
   */
  appId?: string;
  /**
   * Optional config overrides for Privy
   */
  config?: Partial<PrivyClientConfig>;
}

/**
 * WalletProvider wraps the application with all necessary wallet infrastructure:
 * - PrivyProvider for authentication and embedded wallets
 * - WagmiProvider for Ethereum interactions
 * - QueryClientProvider for React Query
 *
 * @example
 * ```tsx
 * import { WalletProvider } from '@bond/wallet';
 *
 * function App() {
 *   return (
 *     <WalletProvider>
 *       <YourApp />
 *     </WalletProvider>
 *   );
 * }
 * ```
 */
export function WalletProvider({
  children,
  appId,
  config,
}: WalletProviderProps) {
  const finalAppId = appId ?? PRIVY_APP_ID;

  if (!finalAppId) {
    console.warn(
      "[Bond Wallet] No Privy App ID provided. Set NEXT_PUBLIC_PRIVY_APP_ID environment variable or pass appId prop."
    );
  }

  const finalConfig: PrivyClientConfig = {
    ...privyConfig,
    ...config,
    embeddedWallets: {
      ...privyConfig.embeddedWallets,
      ...config?.embeddedWallets,
    },
    appearance: {
      ...privyConfig.appearance,
      ...config?.appearance,
    },
  };

  return (
    <PrivyProvider appId={finalAppId} config={finalConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export { privyConfig, queryClient };
